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
let copiedChannelValues = null; // Store copied channel values

function getCurrentModeFixtures() {
    switch (currentMode) {
        case 'Black Box':
            return blackBoxFixtures;
        case 'Auditorium':
            return auditoriumFixtures;
        case 'Mobile':
            return mobileFixtures;
        default:
            return [];
    }
}

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
    midiOutput = outputs.find(output => output.name === 'IAC Driver Bus 1');
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
        if (state.currentOpacity !== state.targetOpacity) {
            const diff = state.targetOpacity - state.currentOpacity;
            state.currentOpacity += diff * 0.08;

            if (Math.abs(diff) < 0.001) {
                state.currentOpacity = state.targetOpacity;
            }

            const label = document.querySelector(`.fixture-label[data-fixture="${labelId.replace('label-', '')}"]`);
            if (label) {
                label.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
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

function selectContainer(container, shiftKey = false, metaKey = false) {
    currentHighlightedFixture = null;
    selectedFixtures.clear();
    const channel = parseInt(container.dataset.channel);

    if (shiftKey && lastSelectedChannel !== null) {
        selectedChannels.clear();
        const start = Math.min(lastSelectedChannel, channel);
        const end = Math.max(lastSelectedChannel, channel);
        for (let ch = start; ch <= end; ch++) {
            selectedChannels.add(ch);
        }
    } else if (metaKey) {
        if (selectedChannels.has(channel)) {
            selectedChannels.delete(channel);
        } else {
            selectedChannels.add(channel);
        }
    } else {
        selectedChannels.clear();
        selectedChannels.add(channel);
    }

    const allContainers = Array.from(document.querySelectorAll('.fader-container'));
    allContainers.forEach(c => {
        const ch = parseInt(c.dataset.channel);
        if (selectedChannels.has(ch)) {
            c.classList.add('selected');
            updateFixtureTitle(c);
            highlightFixture(ch);
        } else {
            c.classList.remove('selected');
            c.classList.remove('highlighted');
        }
    });

    document.querySelectorAll('.fixture-group').forEach(group => {
        group.classList.remove('active', 'group-highlighted');
    });
    selectedChannels.forEach(ch => {
        const pageStart = currentPage * FADERS_PER_PAGE + 1;
        const pageEnd = pageStart + FADERS_PER_PAGE - 1;
        if (ch >= pageStart && ch <= pageEnd) {
            highlightFixture(ch);
        }
    });

    lastSelectedChannel = channel;
    updateFixtureGroupPositions();
    updateFixtureLabelGrid();
}

function selectSameParameterContainers(container, metaKey = false) {
    currentHighlightedFixture = null;
    selectedFixtures.clear();
    const channel = parseInt(container.dataset.channel);
    const fixtures = getCurrentModeFixtures();
    const fixture = fixtures.find(f => channel >= f.from && channel <= f.to);
    if (!fixture || !fixture.type in fixtureParameters) return;

    const paramIndex = (channel - fixture.from) % fixtureParameters[fixture.type].length;
    const paramName = fixtureParameters[fixture.type][paramIndex].name;

    const sameTypeFixtures = fixtures.filter(f => f.type === fixture.type);
    const channels = sameTypeFixtures.reduce((acc, f) => {
        const start = f.from + paramIndex;
        if (start <= f.to) {
            acc.push(start);
        }
        return acc;
    }, []);

    if (!metaKey) {
        selectedChannels.clear();
    }
    channels.forEach(ch => selectedChannels.add(ch));
    lastSelectedChannel = channel;

    const allContainers = document.querySelectorAll('.fader-container');
    allContainers.forEach(c => {
        const ch = parseInt(c.dataset.channel);
        if (selectedChannels.has(ch)) {
            c.classList.add('selected');
            updateFixtureTitle(c);
            highlightFixture(ch);
        } else {
            c.classList.remove('selected');
            c.classList.remove('highlighted');
        }
    });

    document.querySelectorAll('.fixture-group').forEach(group => {
        group.classList.remove('active', 'group-highlighted');
    });
    selectedChannels.forEach(ch => {
        const pageStart = currentPage * FADERS_PER_PAGE + 1;
        const pageEnd = pageStart + FADERS_PER_PAGE - 1;
        if (ch >= pageStart && ch <= pageEnd) {
            highlightFixture(ch);
        }
    });

    updateFixtureGroupPositions();
    updateFixtureLabelGrid();
}

function selectFixture(fixtureStartChannel, shiftKey = false, metaKey = false) {
    const fixtures = getCurrentModeFixtures();
    const fixture = fixtures.find(f => f.from === fixtureStartChannel);
    if (!fixture) return;

    const fixturePage = Math.floor((fixture.from - 1) / FADERS_PER_PAGE);
    if (fixturePage !== currentPage) {
        changePage(fixturePage);
    }

    selectedChannels.clear();
    lastSelectedChannel = null;

    if (metaKey) {
        if (selectedFixtures.has(fixtureStartChannel)) {
            selectedFixtures.delete(fixtureStartChannel);
        } else {
            selectedFixtures.add(fixtureStartChannel);
        }
        currentHighlightedFixture = fixtureStartChannel;
    } else if (shiftKey && currentHighlightedFixture !== null) {
        selectedFixtures.clear();
        const currentIndex = fixtures.findIndex(f => f.from === currentHighlightedFixture);
        const targetIndex = fixtures.findIndex(f => f.from === fixtureStartChannel);
        const start = Math.min(currentIndex, targetIndex);
        const end = Math.max(currentIndex, targetIndex);
        for (let i = start; i <= end; i++) {
            selectedFixtures.add(fixtures[i].from);
        }
        currentHighlightedFixture = fixtureStartChannel;
    } else {
        selectedFixtures.clear();
        selectedFixtures.add(fixtureStartChannel);
        currentHighlightedFixture = fixtureStartChannel;
    }

    document.querySelectorAll('.fixture-group').forEach(group => {
        const fixtureId = parseInt(group.dataset.fixture);
        if (selectedFixtures.has(fixtureId)) {
            group.classList.add('group-highlighted');
        } else {
            group.classList.remove('group-highlighted');
        }
        group.classList.remove('active');
    });

    document.querySelectorAll('.fixture-label').forEach(item => {
        const fixtureId = parseInt(item.dataset.fixture);
        if (selectedFixtures.has(fixtureId)) {
            item.classList.add('group-highlighted');
        } else {
            item.classList.remove('group-highlighted');
        }
        item.classList.remove('active');
    });

    updateFixtureGroupPositions();
    updateFixtureLabelGrid();
}

function selectAllFixturesOfType(type) {
    const fixtures = getCurrentModeFixtures();
    selectedFixtures.clear();
    currentHighlightedFixture = null;
    let minChannel = Infinity;

    fixtures.forEach(fixture => {
        if (fixture.type === type) {
            selectedFixtures.add(fixture.from);
            minChannel = Math.min(minChannel, fixture.from);
        }
    });

    if (selectedFixtures.size > 0) {
        currentHighlightedFixture = Array.from(selectedFixtures)[0];
        const targetPage = Math.floor((minChannel - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }

    updateFixtureLabelGrid();
    updateFixtureGroupPositions();
}

function updateFixtureTitle(container) {
    const channel = parseInt(container.dataset.channel);
    const fixtures = getCurrentModeFixtures();
    const fixture = fixtures.find(f => channel >= f.from && channel <= f.to);
    if (fixture && fixture.type in fixtureParameters) {
        const paramIndex = (channel - fixture.from) % fixtureParameters[fixture.type].length;
        const paramName = fixtureParameters[fixture.type][paramIndex].name;
        const group = document.querySelector(`.fixture-group[data-fixture="${fixture.from}"]`);
        if (group) {
            const title = group.querySelector('.fixture-title');
            title.textContent = `${fixture.name} - ${paramName}`;
        }
    }
}

function highlightFixture(channel) {
    const fixtures = getCurrentModeFixtures();
    const fixture = fixtures.find(f => channel >= f.from && channel <= f.to);
    if (fixture && selectedChannels.has(channel)) {
        const activeGroup = document.querySelector(`.fixture-group[data-channels*="${channel}"]`);
        if (activeGroup) {
            activeGroup.classList.add('active');
        }
        const activeContainer = document.querySelector(`.fader-container[data-channel="${channel}"]`);
        if (activeContainer) {
            activeContainer.classList.add('highlighted');
        }
    }
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
                    faderValues.fill(0);
                    for (let i = 0; i < faderValues.length; i++) {
                        const midiChannel = Math.floor(i / 128);
                        const ccNumber = i % 128;
                        sendMIDICC(midiChannel, ccNumber, 0);
                    }
                    sliderStates.forEach((state, sliderId) => {
                        state.target = 0;
                        state.current = 0;
                        const slider = document.getElementById(sliderId);
                        if (slider) {
                            slider.value = 0;
                            const valueInput = slider.parentElement.querySelector('.fader-value');
                            if (valueInput) {
                                valueInput.value = 0;
                            }
                        }
                    });
                    // Reset all label backgrounds
                    labelBackgroundStates.forEach((state, labelId) => {
                        state.targetOpacity = 0;
                        state.currentOpacity = state.currentOpacity || 0;
                        state.hex = '#333333';
                        state.rgba = hexToRGBA('#333333', 0);
                    });
                    document.querySelectorAll('.fixture-label').forEach(label => {
                        label.style.backgroundColor = hexToRGBA('#333333', 0);
                    });
                    if (!labelAnimationFrameId) {
                        labelAnimationFrameId = requestAnimationFrame(updateLabelBackgrounds);
                    }
                    deselectAll();
                    createFaders();
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

function createFixtureLabelGrid() {
    const fixtureLabelGrid = document.getElementById('fixtureLabelGrid');
    const fixtureTypeButtons = document.getElementById('fixtureTypeButtons');
    fixtureLabelGrid.innerHTML = '';
    fixtureTypeButtons.innerHTML = '';

    const fixtures = getCurrentModeFixtures();
    // Get unique fixture types
    const fixtureTypes = [...new Set(fixtures.map(f => f.type))].sort();
    
    // Pluralize fixture type names
    const pluralNames = {
        'LED': 'LEDs',
        'Par': 'Pars',
        'BoxLight': 'Box Lights',
        'Motorized Par': 'Motorized Pars',
        'Tree': 'Trees',
        'Uplighting': 'Uplightings',
        'Flood': 'Floods',
        'Tube Light': 'Tube Lights'
    };

    // Create buttons for each fixture type
    fixtureTypes.forEach(type => {
        const button = document.createElement('button');
        button.className = 'fixture-type-button';
        button.textContent = `All ${pluralNames[type] || type + 's'}`;
        button.onclick = () => selectAllFixturesOfType(type);
        fixtureTypeButtons.appendChild(button);
    });

    // Create fixture labels
    fixtures.forEach(fixture => {
        const item = document.createElement('div');
        item.className = 'fixture-label';
        item.dataset.fixture = fixture.from;
        item.textContent = fixture.name;
        item.onclick = (e) => {
            selectFixture(fixture.from, e.shiftKey, e.metaKey);
        };
        if (selectedFixtures.has(fixture.from)) {
            item.classList.add('group-highlighted');
        }
        // Restore or set background color
        const state = labelBackgroundStates.get(`label-${fixture.from}`);
        if (state) {
            item.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
        }
        fixtureLabelGrid.appendChild(item);
    });

    requestAnimationFrame(() => updateFixtureGroupPositions());
}

function updateFixtureLabelGrid() {
    const fixtureLabelGrid = document.getElementById('fixtureLabelGrid');
    const items = fixtureLabelGrid.querySelectorAll('.fixture-label');
    items.forEach(item => {
        const fixtureId = parseInt(item.dataset.fixture);
        if (selectedFixtures.has(fixtureId)) {
            item.classList.add('group-highlighted');
        } else {
            item.classList.remove('group-highlighted');
        }
        // Preserve background color
        const state = labelBackgroundStates.get(`label-${fixtureId}`);
        if (state) {
            item.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
        }
    });
}

function updatePageButtons() {
    const buttons = document.querySelectorAll('.page-button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentPage && !button.disabled);
    });
}

function updateFixtureGroupPositions() {
    // Force reflow to ensure accurate offset calculations
    document.body.offsetHeight;

    const grid = document.getElementById('faderGrid');
    const faderRows = grid.querySelectorAll('.fader-row');
    const pageStart = currentPage * FADERS_PER_PAGE + 1;
    const pageEnd = pageStart + FADERS_PER_PAGE - 1;

    // Remove existing fixture groups to prevent duplicates
    grid.querySelectorAll('.fixture-group').forEach(group => group.remove());

    const fixtures = getCurrentModeFixtures();
    const pageFixtures = fixtures.filter(f => f.from <= pageEnd && f.to >= pageStart);
    pageFixtures.forEach(fixture => {
        const startCh = Math.max(fixture.from, pageStart);
        const endCh = Math.min(fixture.to, pageEnd);
        if (startCh > endCh) return;

        const startIndex = startCh - pageStart;
        const endIndex = endCh - pageStart;
        const startRow = Math.floor(startIndex / 16);
        const endRow = Math.floor(endIndex / 16);
        const segments = [];

        for (let row = startRow; row <= endRow; row++) {
            const colStart = row === startRow ? startIndex % 16 : 0;
            const colEnd = row === endRow ? endIndex % 16 : 15;
            segments.push({ row, colStart, colEnd, startCh: row === startRow ? startCh : pageStart + row * 16 });
        }

        segments.forEach(({ row, colStart, colEnd, startCh }) => {
            if (row >= faderRows.length) return;
            const firstContainer = faderRows[row].querySelectorAll('.fader-container')[colStart];
            const lastContainer = faderRows[row].querySelectorAll('.fader-container')[colEnd];
            if (firstContainer && lastContainer) {
                let group = document.createElement('div');
                group.className = 'fixture-group';
                group.dataset.fixture = fixture.from;
                group.dataset.startChannel = startCh;
                group.dataset.channels = Array.from({ length: Math.min(endCh, pageStart + (row + 1) * 16 - 1) - startCh + 1 }, (_, i) => startCh + i).join(',');
                const title = document.createElement('div');
                title.className = 'fixture-title';
                title.textContent = fixture.name;
                group.appendChild(title);
                grid.appendChild(group);

                group.onclick = (e) => {
                    selectFixture(fixture.from, e.shiftKey, e.metaKey);
                };

                const top = faderRows[row].offsetTop - 2.2 * 16;
                const left = firstContainer.offsetLeft;
                const width = lastContainer.offsetLeft + lastContainer.offsetWidth - left;

                if (width > 0) {
                    group.style.top = `${top}px`;
                    group.style.left = `${left}px`;
                    group.style.width = `${width}px`;
                    group.style.height = `2rem`;
                    group.style.display = 'block';
                    group.style.visibility = 'visible';
                    group.style.opacity = '1';
                }

                const channels = group.dataset.channels.split(',').map(Number);
                if (channels.some(ch => selectedChannels.has(ch))) {
                    group.classList.add('active');
                }

                if (selectedFixtures.has(fixture.from)) {
                    group.classList.add('group-highlighted');
                }
            }
        });
    });

    updateFixtureLabelGrid();
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