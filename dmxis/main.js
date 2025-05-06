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

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

function changeMode(mode) {
    currentMode = mode;
    document.getElementById('appTitle').textContent = `${mode} Lights`;
    currentHighlightedFixture = null;
    selectedChannels = new Set();
    lastSelectedChannel = null;
    selectedFixtures = new Set();
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
    midiOutput = outputs.find(output => output.name === 'Network Session 8');
    //midiOutput = outputs.find(output => output.name === 'IAC Driver Bus 1');
    if (!midiOutput) {
        console.error('MIDI: No output named "IAC Driver Bus 1" found');
    }
}

function onMIDIFailure() {
    console.error('MIDI: Failed to access MIDI devices');
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
    
    // Collect all channels and set label states for all fixtures
    fixtures.forEach(fixture => {
        for (let ch = fixture.from; ch <= fixture.to; ch++) {
            channelsToBlackout.add(ch - 1);
        }
        labelChanges.set(fixture.from, {
            hex: '#333333',
            opacity: 0
        });
    });

    const channelChanges = new Map();
    channelsToBlackout.forEach(idx => {
        channelChanges.set(idx, {
            initialValue: faderValues[idx] || 0,
            targetValue: 0
        });
    });

    fadeChannelsAndLabels(channelChanges, labelChanges, fixtures);
    deselectAll();
}

function blackoutSelectedFixtures() {
    const channelsToBlackout = new Set();
    const affectedFixtures = [];
    const labelChanges = new Map();
    
    selectedFixtures.forEach(fixtureStart => {
        const fixture = getCurrentModeFixtures().find(f => f.from === fixtureStart);
        if (fixture) {
            for (let ch = fixture.from; ch <= fixture.to; ch++) {
                channelsToBlackout.add(ch - 1);
            }
            affectedFixtures.push(fixture);
            labelChanges.set(fixtureStart, {
                hex: '#333333',
                opacity: 0
            });
        }
    });

    const channelChanges = new Map();
    channelsToBlackout.forEach(idx => {
        channelChanges.set(idx, {
            initialValue: faderValues[idx] || 0,
            targetValue: 0
        });
    });

    fadeChannelsAndLabels(channelChanges, labelChanges, affectedFixtures);
}

function fadeChannelsAndLabels(channelChanges, labelChanges, fixtures) {
    const FADE_DURATION = 1000; // 1 second fade
    const STEPS = 20; // Number of steps for smooth fade
    const STEP_INTERVAL = FADE_DURATION / STEPS;
    let step = 0;

    // Initialize(section truncated for brevity)
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

            sliderStates.set(fader.id, {
                current: faderValues[faderIndex],
                target: faderValues[faderIndex],
                midiChannel: midiChannel,
                ccNumber: ccNumber
            });

            container.onclick = (e) => {
                if (e.target === fader || e.target === valueInput) return;
                selectContainer(container, e.shiftKey, e.metaKey);
            };

            container.ondblclick = (e) => {
                selectSameParameterContainers(container, e.metaKey);
            };

            fader.oninput = (e) => {
                const val = parseInt(e.target.value);
                const faderIndex = parseInt(e.target.id.replace('fader-', ''));
                faderValues[faderIndex] = val;
                const state = sliderStates.get(e.target.id);
                state.target = val;
                valueInput.value = Math.round((val / 127) * 100);

                // Check if this is a shutter channel
                if (fixture && channel === fixture.from) {
                    const label = document.querySelector(`.fixture-label[data-fixture="${fixture.from}"]`);
                    if (label && val === 0) {
                        labelBackgroundStates.set(`label-${fixture.from}`, {
                            currentOpacity: labelBackgroundStates.get(`label-${fixture.from}`)?.currentOpacity || 0,
                            targetOpacity: 0,
                            hex: labelBackgroundStates.get(`label-${fixture.from}`)?.hex || '#333333',
                            rgba: hexToRGBA(labelBackgroundStates.get(`label-${fixture.from}`)?.hex || '#333333', 0)
                        });
                        label.style.backgroundColor = hexToRGBA(labelBackgroundStates.get(`label-${fixture.from}`)?.hex || '#333333', 0);
                        if (!labelAnimationFrameId) {
                            labelAnimationFrameId = requestAnimationFrame(updateLabelBackgrounds);
                        }
                    }
                }

                selectedChannels.forEach(ch => {
                    const idx = ch - 1;
                    faderValues[idx] = val;
                    const sliderId = `fader-${idx}`;
                    const midiChannel = Math.floor(idx / 128);
                    const ccNumber = idx % 128;

                    if (sliderStates.has(sliderId)) {
                        const s = sliderStates.get(sliderId);
                        s.target = val;
                        const slider = document.getElementById(sliderId);
                        if (slider) {
                            slider.value = val;
                            const vi = slider.parentElement.querySelector('.fader-value');
                            if (vi && !vi.classList.contains('editable')) {
                                vi.value = Math.round((val / 127) * 100);
                            }
                        }
                    } else {
                        sliderStates.set(sliderId, {
                            current: faderValues[idx],
                            target: val,
                            midiChannel: midiChannel,
                            ccNumber: ccNumber
                        });
                    }

                    // Check if selected channel is a shutter channel
                    const selFixture = fixtures.find(f => ch === f.from);
                    if (selFixture && ch === selFixture.from && val === 0) {
                        const label = document.querySelector(`.fixture-label[data-fixture="${selFixture.from}"]`);
                        if (label) {
                            labelBackgroundStates.set(`label-${selFixture.from}`, {
                                currentOpacity: labelBackgroundStates.get(`label-${selFixture.from}`)?.currentOpacity || 0,
                                targetOpacity: 0,
                                hex: labelBackgroundStates.get(`label-${selFixture.from}`)?.hex || '#333333',
                                rgba: hexToRGBA(labelBackgroundStates.get(`label-${selFixture.from}`)?.hex || '#333333', 0)
                            });
                            label.style.backgroundColor = hexToRGBA(labelBackgroundStates.get(`label-${selFixture.from}`)?.hex || '#333333', 0);
                            if (!labelAnimationFrameId) {
                                labelAnimationFrameId = requestAnimationFrame(updateLabelBackgrounds);
                            }
                        }
                    }
                });

                if (selectedChannels.size === 0) {
                    selectContainer(container);
                }

                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(updateSliders);
                }
            };

            fader.onmousedown = () => selectContainer(container);
            fader.ontouchstart = () => selectContainer(container);

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
    if (!isFaderContainer && !isFixtureGroup && !isFixtureLabel && !isMenu && !isHamburger && !isPageButton && !isColorWheel && !isFixtureTypeButton && !isColorModal && (selectedChannels.size > 0 || selectedFixtures.size > 0)) {
        deselectAll();
    }
});