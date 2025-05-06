let midiOutput = null;
let currentPage = 0;
let currentMode = 'Black Box';
const FADERS_PER_PAGE = 32;
const TOTAL_PAGES = 16;
const faderValues = new Array(TOTAL_PAGES * FADERS_PER_PAGE).fill(0);
const sliderStates = new Map();
let animationFrameId = null;
let labelBackgroundStates = new Map();
let labelAnimationFrameId = null;
let currentHighlightedFixture = null;
let selectedChannels = new Set();
let lastSelectedChannel = null;
let selectedFixtures = new Set();
let isColorWheelOpen = false;
let copiedFixtureData = null; // Store copied fixture data (channels and labels)

const MOTORIZED_PAR_BLACKOUT_VALUES = {
    'Colors': 56,
    'Strobe': 127,
    'Shutter': 0,
    'Gobos': 0,
    'Prism': 127,
    'Prism Rotate': 0,
    'Fan Out': 127,
    'Blur': 127,
    'Focus': 64,
    'Pan': 82,
    'Small Pan': 0,
    'Tilt': 38,
    'Small Tilt': 0,
    'Presets': 0,
    'Reset': 0,
    'Bulb': 0,
    '-': 0
};

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    }
}

function changeMode(mode) {
    currentMode = mode;
    document.getElementById('appTitle').textContent = `${mode} Lights`;
    currentHighlightedFixture = null;
    selectedChannels = new Set();
    lastSelectedChannel = null;
    selectedFixtures = new Set();
    // Reset faderValues for Motorized Pars to default blackout values
    const fixtures = getCurrentModeFixtures();
    fixtures.forEach(fixture => {
        if (fixture.type === 'Motorized Par') {
            const params = fixtureParameters[fixture.type];
            for (let ch = fixture.from; ch <= fixture.to; ch++) {
                const idx = ch - 1;
                const paramIndex = (ch - fixture.from) % params.length;
                const paramName = params[paramIndex].name;
                faderValues[idx] = MOTORIZED_PAR_BLACKOUT_VALUES[paramName] || 0;
            }
        } else {
            for (let ch = fixture.from; ch <= fixture.to; ch++) {
                const idx = ch - 1;
                faderValues[idx] = 0;
            }
        }
    });
    const grid = document.getElementById('faderGrid');
    grid.querySelectorAll('.fixture-group').forEach(group => group.remove());
    createFaders();
    createMacroButtons();
    createFixtureLabelGrid();
    toggleMenu();
}

function changePage(page) {
    if (page >= 0 && page < TOTAL_PAGES) {
        currentPage = page;
        selectedChannels = new Set();
        lastSelectedChannel = null;
        updatePageButtons();
        createFaders();
        createFixtureLabelGrid();
    }
}

function initMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(onMIDISuccess, onMIDIFailure);
    }
}

function onMIDISuccess(midiAccess) {
    const outputs = Array.from(midiAccess.outputs.values());
    // Available MIDI output options
    const midiOptions = [
        'Network Session 1', // Mac, Wireless
        'IAC Driver Bus 1',  // Mac, Wired
        'loopMIDI Port 1'      // PC, Wired
    ];

    // Find available outputs that match our options
    const availableOutputs = outputs.filter(output => midiOptions.includes(output.name));

    // Default selection logic: prefer 'IAC Driver Bus 1' if available, otherwise first available
    if (availableOutputs.length > 0) {
        midiOutput = availableOutputs.find(output => output.name === 'IAC Driver Bus 1') || availableOutputs[0];
        console.log(`MIDI: Selected output "${midiOutput.name}"`);
    } else {
        console.error('MIDI: No supported MIDI output found');
    }

    // Update menu to highlight selected MIDI output
    updateMIDISelectionUI();
}

function onMIDIFailure() {
    console.error('MIDI: Failed to access MIDI devices');
}

function selectMIDIOutput(outputName) {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(midiAccess => {
            const outputs = Array.from(midiAccess.outputs.values());
            const selectedOutput = outputs.find(output => output.name === outputName);
            if (selectedOutput) {
                midiOutput = selectedOutput;
                console.log(`MIDI: Switched to output "${outputName}"`);
                // Resend current fader values to the new MIDI output
                for (let i = 0; i < faderValues.length; i++) {
                    const value = faderValues[i];
                    const midiChannel = Math.floor(i / 128);
                    const ccNumber = i % 128;
                    sendMIDICC(midiChannel, ccNumber, value);
                }
                updateMIDISelectionUI();
            } else {
                console.error(`MIDI: Output "${outputName}" not found`);
            }
            toggleMenu();
        }, onMIDIFailure);
    }
}

function updateMIDISelectionUI() {
    const midiButtons = document.querySelectorAll('.menu .midi-section button');
    midiButtons.forEach(button => {
        const outputName = button.getAttribute('onclick').match(/selectMIDIOutput\('([^']+)'\)/)[1];
        if (midiOutput && outputName === midiOutput.name) {
            button.style.background = '#a5a5a5';
        } else {
            button.style.background = '#555';
        }
    });
}

function sendMIDICC(midiChannel, cc, value) {
    if (midiOutput) {
        midiOutput.send([0xB0 + midiChannel, cc, value]);
    }
}

function updateSliders() {
    let needsUpdate = false;

    for (const [sliderId, state] of sliderStates) {
        const idx = parseInt(sliderId.replace('fader-', ''));
        if (state.current !== state.target) {
            const diff = state.target - state.current;
            state.current += diff * 0.08;

            if (Math.abs(diff) < 0.1) {
                state.current = state.target;
            }

            const roundedValue = Math.round(state.current);
            faderValues[idx] = roundedValue;
            sendMIDICC(state.midiChannel, state.ccNumber, roundedValue);

            const slider = document.getElementById(sliderId);
            if (slider) {
                slider.value = roundedValue;
                const valueInput = slider.parentElement.querySelector('.fader-value');
                if (valueInput && !valueInput.classList.contains('editable')) {
                    valueInput.value = Math.round((roundedValue / 127) * 100);
                }
            }

            needsUpdate = true;
        }
    }

    if (needsUpdate) {
        animationFrameId = requestAnimationFrame(updateSliders);
    } else {
        animationFrameId = null;
    }
}

function updateLabelBackgrounds() {
    let needsUpdate = false;

    for (const [labelId, state] of labelBackgroundStates) {
        if (Math.abs(state.currentOpacity - state.targetOpacity) > 0.001) {
            const diff = state.targetOpacity - state.currentOpacity;
            state.currentOpacity += diff * 0.08;

            if (Math.abs(diff) < 0.001) {
                state.currentOpacity = state.targetOpacity;
            }

            const label = document.querySelector(`.fixture-label[data-fixture="${labelId.replace('label-', '')}"]`);
            if (label) {
                label.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
            } else {
                console.warn(`Label for ${labelId} not found`);
            }

            needsUpdate = true;
        }
    }

    if (needsUpdate) {
        labelAnimationFrameId = requestAnimationFrame(updateLabelBackgrounds);
    } else {
        labelAnimationFrameId = null;
    }
}

// Helper function to convert hex to rgba
function hexToRGBA(hex, opacity) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function blackout() {
    const fixtures = getCurrentModeFixtures();
    const channelsToBlackout = new Set();
    const labelChanges = new Map();
    const channelChanges = new Map();

    fixtures.forEach(fixture => {
        if (fixture.type === 'Motorized Par') {
            // Handle Motorized Par fixtures with specific values
            const params = fixtureParameters[fixture.type];
            for (let ch = fixture.from; ch <= fixture.to; ch++) {
                const idx = ch - 1;
                const paramIndex = (ch - fixture.from) % params.length;
                const paramName = params[paramIndex].name;
                const targetValue = MOTORIZED_PAR_BLACKOUT_VALUES[paramName] || 0;
                channelsToBlackout.add(idx);
                channelChanges.set(idx, {
                    initialValue: faderValues[idx] || 0,
                    targetValue: targetValue
                });
            }
        } else {
            // Other fixtures: set all channels to 0
            for (let ch = fixture.from; ch <= fixture.to; ch++) {
                const idx = ch - 1;
                channelsToBlackout.add(idx);
                channelChanges.set(idx, {
                    initialValue: faderValues[idx] || 0,
                    targetValue: 0
                });
            }
        }
        labelChanges.set(fixture.from, {
            hex: '#333333',
            opacity: 0
        });
    });

    fadeChannelsAndLabels(channelChanges, labelChanges, fixtures);
    deselectAll();
}

function blackoutSelectedFixtures() {
    const channelsToBlackout = new Set();
    const affectedFixtures = [];
    const labelChanges = new Map();
    const channelChanges = new Map();

    selectedFixtures.forEach(fixtureStart => {
        const fixture = getCurrentModeFixtures().find(f => f.from === fixtureStart);
        if (fixture) {
            if (fixture.type === 'Motorized Par') {
                // Handle Motorized Par fixtures with specific values
                const params = fixtureParameters[fixture.type];
                for (let ch = fixture.from; ch <= fixture.to; ch++) {
                    const idx = ch - 1;
                    const paramIndex = (ch - fixture.from) % params.length;
                    const paramName = params[paramIndex].name;
                    const targetValue = MOTORIZED_PAR_BLACKOUT_VALUES[paramName] || 0;
                    channelsToBlackout.add(idx);
                    channelChanges.set(idx, {
                        initialValue: faderValues[idx] || 0,
                        targetValue: targetValue
                    });
                }
            } else {
                // Other fixtures: set all channels to 0
                for (let ch = fixture.from; ch <= fixture.to; ch++) {
                    const idx = ch - 1;
                    channelsToBlackout.add(idx);
                    channelChanges.set(idx, {
                        initialValue: faderValues[idx] || 0,
                        targetValue: 0
                    });
                }
            }
            affectedFixtures.push(fixture);
            labelChanges.set(fixtureStart, {
                hex: '#333333',
                opacity: 0
            });
        }
    });

    fadeChannelsAndLabels(channelChanges, labelChanges, affectedFixtures);
}

function fadeChannelsAndLabels(channelChanges, labelChanges, fixtures) {
    const FADE_DURATION = 1000; // 1 second fade
    const STEPS = 20; // Number of steps for smooth fade
    const STEP_INTERVAL = FADE_DURATION / STEPS;
    let step = 0;

    // Initialize label background states for affected fixtures
    labelChanges.forEach((change, fixtureStart) => {
        labelBackgroundStates.set(`label-${fixtureStart}`, {
            currentOpacity: labelBackgroundStates.get(`label-${fixtureStart}`)?.currentOpacity || 0,
            targetOpacity: change.opacity,
            hex: change.hex,
            rgba: hexToRGBA(change.hex, change.opacity)
        });
    });

    function fadeStep() {
        if (step <= STEPS) {
            const progress = step / STEPS;
            channelChanges.forEach(({ initialValue, targetValue }, idx) => {
                const newValue = Math.round(initialValue + (targetValue - initialValue) * progress);
                faderValues[idx] = newValue;
                updateSliderState(idx, newValue);
                const midiChannel = Math.floor(idx / 128);
                const ccNumber = idx % 128;
                sendMIDICC(midiChannel, ccNumber, newValue);
            });

            // Update label backgrounds
            fixtures.forEach(fixture => {
                const labelState = labelBackgroundStates.get(`label-${fixture.from}`);
                if (labelState) {
                    const targetChange = labelChanges.get(fixture.from);
                    if (targetChange) {
                        const newOpacity = labelState.currentOpacity + (targetChange.opacity - labelState.currentOpacity) * progress;
                        labelState.currentOpacity = newOpacity;
                        labelState.hex = targetChange.hex;
                        labelState.rgba = hexToRGBA(targetChange.hex, newOpacity);
                        const label = document.querySelector(`.fixture-label[data-fixture="${fixture.from}"]`);
                        if (label) {
                            label.style.backgroundColor = labelState.rgba;
                        }
                    }
                }
            });

            createFaders();
            if (!labelAnimationFrameId) {
                labelAnimationFrameId = requestAnimationFrame(updateLabelBackgrounds);
            }
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateSliders);
            }

            step++;
            setTimeout(fadeStep, STEP_INTERVAL);
        }
    }

    fadeStep();
}

function deselectAll() {
    currentHighlightedFixture = null;
    selectedChannels.clear();
    lastSelectedChannel = null;
    selectedFixtures.clear();

    const allContainers = document.querySelectorAll('.fader-container');
    allContainers.forEach(container => {
        container.classList.remove('selected');
        container.classList.remove('highlighted');
        const valueInput = container.querySelector('.fader-value');
        if (valueInput.classList.contains('editable')) {
            valueInput.classList.remove('editable');
            valueInput.readOnly = true;
            valueInput.value = Math.round((faderValues[parseInt(container.querySelector('.fader').id.replace('fader-', ''))] / 127) * 100);
        }
    });

    document.querySelectorAll('.fixture-group').forEach(group => {
        group.classList.remove('active', 'group-highlighted');
    });

    document.querySelectorAll('.fixture-label').forEach(item => {
        item.classList.remove('active', 'group-highlighted');
    });

    if (isColorWheelOpen) {
        toggleColorWheel();
    }

    updateFixtureGroupPositions();
}

function createPageButtons() {
    const pageSelector = document.getElementById('pageSelector');
    pageSelector.innerHTML = '';

    for (let row = 0; row < 2; row++) {
        const pageRow = document.createElement('div');
        pageRow.className = 'page-row';

        for (let col = 0; col < 8; col++) {
            const pageNum = row * 8 + col;
            const button = document.createElement('button');
            button.className = 'page-button';
            button.tabIndex = -1;

            const pageText = document.createElement('div');
            pageText.textContent = `Page ${pageNum + 1}`;

            const rangeText = document.createElement('div');
            rangeText.className = 'range';
            const startCh = pageNum * 32 + 1;
            const endCh = startCh + 31;
            rangeText.textContent = `${startCh} - ${endCh}`;

            button.appendChild(pageText);
            button.appendChild(rangeText);
            button.onclick = () => changePage(pageNum);
            pageRow.appendChild(button);
        }
        pageSelector.appendChild(pageRow);
    }
    updatePageButtons();
}

function createMacroButtons() {
    const macroButtons = document.getElementById('macroButtons');
    macroButtons.innerHTML = '';

    for (let row = 0; row < 2; row++) {
        const macroRow = document.createElement('div');
        macroRow.className = 'page-row';

        for (let col = 0; col < 8; col++) {
            const buttonIndex = row * 8 + col;
            const button = document.createElement('button');
            button.className = 'page-button';
            button.tabIndex = -1;

            const pageText = document.createElement('div');
            const rangeText = document.createElement('div');
            rangeText.className = 'range';
            rangeText.textContent = '';

            if (buttonIndex === 0) {
                pageText.textContent = 'Blackout';
                button.appendChild(pageText);
                button.appendChild(rangeText);
                button.onclick = () => {
                    blackout();
                };
            } else {
                pageText.textContent = '';
                rangeText.textContent = '';
                button.appendChild(pageText);
                button.appendChild(rangeText);
                button.disabled = true;
            }
            macroRow.appendChild(button);
        }
        macroButtons.appendChild(macroRow);
    }
}

function createFaders() {
    sliderStates.clear();
    const grid = document.getElementById('faderGrid');
    grid.innerHTML = '';

    const pageStart = currentPage * FADERS_PER_PAGE + 1;
    const pageEnd = pageStart + FADERS_PER_PAGE - 1;
    const containers = [];
    const faderRows = [];
    const fixtures = getCurrentModeFixtures();

    for (let row = 0; row < 2; row++) {
        const faderRow = document.createElement('div');
        faderRow.className = 'fader-row';
        faderRows[row] = faderRow;

        for (let col = 0; col < 16; col++) {
            const i = row * 16 + col;
            const faderIndex = currentPage * FADERS_PER_PAGE + i;
            const channel = faderIndex + 1;

            const container = document.createElement('div');
            container.className = 'fader-container';
            container.dataset.channel = channel;

            const fixture = fixtures.find(f => channel >= f.from && channel <= f.to);
            if (fixture) {
                container.dataset.fixture = fixture.from;
            }

            const fader = document.createElement('input');
            fader.type = 'range';
            fader.min = 0;
            fader.max = 127;
            fader.value = faderValues[faderIndex];
            fader.className = 'fader';
            fader.id = `fader-${faderIndex}`;
            fader.tabIndex = -1;
            fader.style.writingMode = 'vertical-lr';
            fader.style.direction = 'rtl';

            const label = document.createElement('div');
            label.className = 'fader-label';
            label.textContent = `${faderIndex + 1}`;

            const symbol = document.createElement('div');
            symbol.className = 'fader-symbol';
            if (fixture && fixture.type in fixtureParameters) {
                const paramIndex = (channel - fixture.from) % fixtureParameters[fixture.type].length;
                symbol.textContent = fixtureParameters[fixture.type][paramIndex].abbr;
            } else {
                symbol.textContent = '';
            }

            const valueInput = document.createElement('input');
            valueInput.type = 'text';
            valueInput.className = 'fader-value';
            valueInput.value = Math.round((faderValues[faderIndex] / 127) * 100);
            valueInput.readOnly = true;

            const midiChannel = Math.floor(faderIndex / 128);
            const ccNumber = faderIndex % 128;
            sendMIDICC(midiChannel, ccNumber, faderValues[faderIndex]); // Send initial MIDI value

            sliderStates.set(fader.id, {
                current: faderValues[faderIndex],
                target: faderValues[faderIndex],
                midiChannel: midiChannel,
                ccNumber: ccNumber
            });

            container.appendChild(label);
            container.appendChild(fader);
            container.appendChild(symbol);
            container.appendChild(valueInput);
            faderRow.appendChild(container);
            containers.push({ container, channel, fixture, row, col });

            if (selectedChannels.has(channel)) {
                container.classList.add('selected');
                updateFixtureTitle(container);
                highlightFixture(channel);
            }

            fader.addEventListener('input', () => {
                const value = parseInt(fader.value);
                faderValues[faderIndex] = value;
                sliderStates.get(fader.id).target = value;
                valueInput.value = Math.round((value / 127) * 100);
                sendMIDICC(midiChannel, ccNumber, value);
                updateFixtureLabelBackground(channel);
            });

            valueInput.addEventListener('click', () => {
                valueInput.select();
            });

            container.addEventListener('click', (e) => {
                if (e.target === fader || e.target === valueInput) return;
                handleChannelSelection(channel, e);
            });
        }
        grid.appendChild(faderRow);
    }

    requestAnimationFrame(() => updateFixtureGroupPositions());
}

function updatePageButtons() {
    const buttons = document.querySelectorAll('.page-button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentPage && !button.disabled);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        initMIDI();
        createPageButtons();
        createMacroButtons();
        createFaders();
        createFixtureLabelGrid();
    });
});

window.addEventListener('resize', updateFixtureGroupPositions);

document.addEventListener('click', (e) => {
    const isFaderContainer = e.target.closest('.fader-container');
    const isFixtureGroup = e.target.closest('.fixture-group');
    const isFixtureLabel = e.target.closest('.fixture-label');
    const isMenu = e.target.closest('.menu');
    const isHamburger = e.target.closest('.hamburger');
    const isPageButton = e.target.closest('.page-button');
    const isColorWheel = e.target.closest('#colorWheelModal');
    const isFixtureTypeButton = e.target.closest('.fixture-type-button');
    const isColorModal = e.target.closest('.color-modal');
    const menu = document.getElementById('menu');
    if (!isMenu && !isHamburger && menu.classList.contains('open')) {
        closeMenu();
    }
    if (!isFaderContainer && !isFixtureGroup && !isFixtureLabel && !isMenu && !isHamburger && !isPageButton && !isColorWheel && !isFixtureTypeButton && !isColorModal && (selectedChannels.size > 0 || selectedFixtures.size > 0)) {
        deselectAll();
    }
});