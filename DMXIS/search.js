const SCENE_PRESETS = {
    'Black Box': [
        { name: 'Blackout', action: blackout },
        { name: 'Gobos ON', action: gobosOn },
        { name: 'Gobos OFF', action: gobosOff },
        { name: 'Gobo Positions - Stage', action: goboPositionsStage },
        { name: 'Gobo Settings - Spotlights', action: goboSettingsSpotlights },
        { name: 'LEDs and Pars warm white', color: '#FFC107', action: ledsAndParsWarmWhite, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs warm white', color: '#FFC107', action: ledsWarmWhite, fixtureTypes: ['LED'] },
        { name: 'Pars warm white', color: '#FFC107', action: parsWarmWhite, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars white', color: '#FFFFFF', action: ledsAndParsWhite, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs white', color: '#FFFFFF', action: ledsWhite, fixtureTypes: ['LED'] },
        { name: 'Pars white', color: '#FFFFFF', action: parsWhite, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars cool white', color: '#E0F7FA', action: ledsAndParsCoolWhite, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs cool white', color: '#E0F7FA', action: ledsCoolWhite, fixtureTypes: ['LED'] },
        { name: 'Pars cool white', color: '#E0F7FA', action: parsCoolWhite, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars red', color: '#FF0000', action: ledsAndParsRed, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs red', color: '#FF0000', action: ledsRed, fixtureTypes: ['LED'] },
        { name: 'Pars red', color: '#FF0000', action: parsRed, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars green', color: '#00FF00', action: ledsAndParsGreen, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs green', color: '#00FF00', action: ledsGreen, fixtureTypes: ['LED'] },
        { name: 'Pars green', color: '#00FF00', action: parsGreen, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars blue', color: '#0000FF', action: ledsAndParsBlue, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs blue', color: '#0000FF', action: ledsBlue, fixtureTypes: ['LED'] },
        { name: 'Pars blue', color: '#0000FF', action: parsBlue, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars cyan', color: '#00FFFF', action: ledsAndParsCyan, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs cyan', color: '#00FFFF', action: ledsCyan, fixtureTypes: ['LED'] },
        { name: 'Pars cyan', color: '#00FFFF', action: parsCyan, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars magenta', color: '#FF00FF', action: ledsAndParsMagenta, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs magenta', color: '#FF00FF', action: ledsMagenta, fixtureTypes: ['LED'] },
        { name: 'Pars magenta', color: '#FF00FF', action: parsMagenta, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars yellow', color: '#FFFF00', action: ledsAndParsYellow, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs yellow', color: '#FFFF00', action: ledsYellow, fixtureTypes: ['LED'] },
        { name: 'Pars yellow', color: '#FFFF00', action: parsYellow, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars orange', color: '#FFA500', action: ledsAndParsOrange, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs orange', color: '#FFA500', action: ledsOrange, fixtureTypes: ['LED'] },
        { name: 'Pars orange', color: '#FFA500', action: parsOrange, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars purple', color: '#800080', action: ledsAndParsPurple, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs purple', color: '#800080', action: ledsPurple, fixtureTypes: ['LED'] },
        { name: 'Pars purple', color: '#800080', action: parsPurple, fixtureTakes: ['Par'] },
        { name: 'LEDs and Pars pink', color: '#FF69B4', action: ledsAndParsPink, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs pink', color: '#FF69B4', action: ledsPink, fixtureTypes: ['LED'] },
        { name: 'Pars pink', color: '#FF69B4', action: parsPink, fixtureTypes: ['Par'] },
        { name: 'LEDs and Pars amber', color: '#FFBF00', action: ledsAndParsAmber, fixtureTypes: ['LED', 'Par'] },
        { name: 'LEDs amber', color: '#FFBF00', action: ledsAmber, fixtureTypes: ['LED'] },
        { name: 'Pars amber', color: '#FFBF00', action: parsAmber, fixtureTypes: ['Par'] }
    ],
    'Auditorium': [
        { name: 'Blackout', action: blackout }
    ],
    'Mobile': [
        { name: 'Blackout', action: blackout },
        { name: 'Uplighting red', color: '#FF0000', action: uplightingRed, fixtureTypes: ['Uplighting'] },
        { name: 'Uplighting blue', color: '#0000FF', action: uplightingBlue, fixtureTypes: ['Uplighting'] }
    ]
};

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search scenes/presets...">
            <div class="search-results"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('.search-input');
    const results = modal.querySelector('.search-results');

    input.addEventListener('input', () => {
        console.log('Search modal input event triggered');
        const query = input.value.toLowerCase();
        updateSearchResults(query, results);
    });

    input.addEventListener('keydown', (e) => {
        console.log('Search modal input keydown:', e.key);
        if (e.key === 'Escape') {
            closeSearchModal();
            e.preventDefault();
        }
    });

    results.addEventListener('click', (e) => {
        const result = e.target.closest('.search-result');
        if (result && !result.classList.contains('disabled')) {
            const presetName = result.dataset.preset;
            const preset = SCENE_PRESETS[currentMode].find(p => p.name === presetName);
            if (preset && preset.action) {
                if (preset.fixtureTypes) {
                    selectFixturesByType(preset.fixtureTypes);
                }
                preset.action();
                closeSearchModal();
                updateFixtureGroupPositions();
            }
        }
    });
}

function selectFixturesByType(fixtureTypes) {
    const fixtures = getCurrentModeFixtures();
    selectedFixtures.clear();
    currentHighlightedFixture = null;
    let minChannel = Infinity;

    fixtures.forEach(fixture => {
        if (fixtureTypes.includes(fixture.type)) {
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

function updateSearchResults(query, results) {
    results.innerHTML = '';
    results.dataset.selectedIndex = '0';
    const presets = SCENE_PRESETS[currentMode] || [];
    const filteredPresets = query
        ? presets.filter(p => p.name.toLowerCase().includes(query))
        : presets;

    filteredPresets.forEach((preset, index) => {
        const result = document.createElement('div');
        result.className = 'search-result';
        result.dataset.preset = preset.name;
        result.tabIndex = 0;

        let content = preset.color
            ? `<span class="color-swatch" style="background-color: ${preset.color};"></span> ${preset.name}`
            : preset.name;

        result.innerHTML = content;
        if (index === 0) {
            result.classList.add('selected');
        }
        results.appendChild(result);
    });

    if (filteredPresets.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-result disabled';
        noResults.textContent = 'No results found';
        results.appendChild(noResults);
        results.dataset.selectedIndex = '-1';
    }

    console.log(`Search results updated: ${filteredPresets.length} items`);
}

function updateResultSelection(results, selectedIndex) {
    const resultItems = results.querySelectorAll('.search-result:not(.disabled)');
    resultItems.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

function openSearchModal() {
    const modal = document.querySelector('.search-modal');
    if (!modal) {
        console.error('Search modal not found; recreating');
        createSearchModal();
        setTimeout(openSearchModal, 0);
        return;
    }

    const input = modal.querySelector('.search-input');
    const results = modal.querySelector('.search-results');
    console.log('Opening search modal');
    modal.style.display = 'flex';
    input.value = '';
    updateSearchResults('', results);
    input.focus();
}

function closeSearchModal() {
    const modal = document.querySelector('.search-modal');
    if (!modal) {
        console.error('Search modal not found');
        return;
    }

    console.log('Closing search modal');
    modal.style.display = 'none';
}

function blackout() {
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
    deselectAll();
    createFaders();
}

function gobosOn() {
    blackout();
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Motorized Par');
    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
        const shutterChannel = fixture.from;
        const idx = shutterChannel - 1;
        faderValues[idx] = 127;
        updateSliderState(idx, 127);
        sendMIDICC(Math.floor(idx / 128), idx % 128, 127);
    });
    if (fixtures.length > 0) {
        const targetPage = Math.floor((fixtures[0].from - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }
    updateFixtureLabelGrid();
    createFaders();
}

function gobosOff() {
    blackout();
    createFaders();
}

function goboPositionsStage() {
    blackout();
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Motorized Par');
    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
        const panChannel = fixture.from + 9;
        const tiltChannel = fixture.from + 11;
        if (panChannel <= fixture.to && tiltChannel <= fixture.to) {
            const panIdx = panChannel - 1;
            const tiltIdx = tiltChannel - 1;
            faderValues[panIdx] = 64;
            faderValues[tiltIdx] = 64;
            updateSliderState(panIdx, 64);
            updateSliderState(tiltIdx, 64);
            sendMIDICC(Math.floor(panIdx / 128), panIdx % 128, 64);
            sendMIDICC(Math.floor(tiltIdx / 128), tiltIdx % 128, 64);
        }
    });
    if (fixtures.length > 0) {
        const targetPage = Math.floor((fixtures[0].from - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }
    updateFixtureLabelGrid();
    createFaders();
}

function goboSettingsSpotlights() {
    blackout();
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Motorized Par');
    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
        const shutterChannel = fixture.from;
        const colorChannel = fixture.from + 0;
        const goboChannel = fixture.from + 3;
        if (goboChannel <= fixture.to) {
            const idxList = [shutterChannel - 1, colorChannel - 1, goboChannel - 1];
            idxList.forEach(idx => {
                faderValues[idx] = 127;
                updateSliderState(idx, 127);
                sendMIDICC(Math.floor(idx / 128), idx % 128, 127);
            });
        }
    });
    if (fixtures.length > 0) {
        const targetPage = Math.floor((fixtures[0].from - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }
    updateFixtureLabelGrid();
    createFaders();
}

let fadeAnimationId = null;

function startFadeTransition(changes, duration = 2000) {
    const startTime = performance.now();
    const initialValues = changes.map(change => ({
        idx: change.idx,
        startValue: faderValues[change.idx] || 0,
        targetValue: change.value
    }));

    function updateFade(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        initialValues.forEach(({ idx, startValue, targetValue }) => {
            const newValue = Math.round(startValue + (targetValue - startValue) * progress);
            faderValues[idx] = newValue;
            updateSliderState(idx, newValue);
            const midiChannel = Math.floor(idx / 128);
            const ccNumber = idx % 128;
            sendMIDICC(midiChannel, ccNumber, newValue);
        });

        createFaders();

        if (progress < 1) {
            fadeAnimationId = requestAnimationFrame(updateFade);
        } else {
            fadeAnimationId = null;
        }
    }

    if (fadeAnimationId) {
        cancelAnimationFrame(fadeAnimationId);
    }
    fadeAnimationId = requestAnimationFrame(updateFade);
}

function setColor(fixtures, red, green, blue, white = 0, warm = 0) {
    const changes = [];

    // Clear all fader values except for the fixtures being modified
    faderValues.fill(0);
    sliderStates.forEach((state, sliderId) => {
        const idx = parseInt(sliderId.replace('fader-', ''));
        state.target = 0;
        state.current = 0;
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.value = 0;
            const valueInput = slider.parentElement.querySelector('.fader-value');
            if (valueInput && !valueInput.classList.contains('editable')) {
                valueInput.value = 0;
            }
        }
    });

    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
        const params = fixtureParameters[fixture.type];
        const shutterIdx = fixture.from - 1;
        const redIdx = fixture.from + params.findIndex(p => p.name === 'Red') - 1;
        const greenIdx = fixture.from + params.findIndex(p => p.name === 'Green') - 1;
        const blueIdx = fixture.from + params.findIndex(p => p.name === 'Blue') - 1;
        const whiteIdx = params.find(p => p.name === 'White') ? fixture.from + params.findIndex(p => p.name === 'White') - 1 : -1;
        const warmIdx = params.find(p => p.name === 'Warm') ? fixture.from + params.findIndex(p => p.name === 'Warm') - 1 : -1;

        const indices = [shutterIdx];
        if (redIdx >= fixture.from - 1 && redIdx < fixture.to) indices.push(redIdx);
        if (greenIdx >= fixture.from - 1 && greenIdx < fixture.to) indices.push(greenIdx);
        if (blueIdx >= fixture.from - 1 && blueIdx < fixture.to) indices.push(blueIdx);
        if (whiteIdx >= fixture.from - 1 && whiteIdx < fixture.to) indices.push(whiteIdx);
        if (warmIdx >= fixture.from - 1 && warmIdx < fixture.to) indices.push(warmIdx);

        indices.forEach(idx => {
            let value = 0;
            if (idx === shutterIdx) value = 127;
            else if (idx === redIdx) value = red;
            else if (idx === greenIdx) value = green;
            else if (idx === blueIdx) value = blue;
            else if (idx === whiteIdx) value = white;
            else if (idx === warmIdx) value = warm;

            changes.push({ idx, value });
        });
    });

    if (fixtures.length > 0) {
        const targetPage = Math.floor((fixtures[0].from - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }

    startFadeTransition(changes, 2000);
    updateFixtureLabelGrid();
    createFaders();
}

function ledsAndParsWarmWhite() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 0, 0, 0, 0, 127);
}

function ledsWarmWhite() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 0, 0, 0, 0, 127);
}

function parsWarmWhite() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 0, 0, 0, 0, 127);
}

function ledsAndParsWhite() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 0, 0, 0, 127);
}

function ledsWhite() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 0, 0, 0, 127);
}

function parsWhite() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 0, 0, 0, 127);
}

function ledsAndParsCoolWhite() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 0, 0, 127, 127);
}

function ledsCoolWhite() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 0, 0, 127, 127);
}

function parsCoolWhite() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 0, 0, 127, 127);
}

function ledsAndParsRed() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 127, 0, 0);
}

function ledsRed() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 127, 0, 0);
}

function parsRed() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 127, 0, 0);
}

function ledsAndParsGreen() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 0, 127, 0);
}

function ledsGreen() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 0, 127, 0);
}

function parsGreen() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 0, 127, 0);
}

function ledsAndParsBlue() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 0, 0, 127);
}

function ledsBlue() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 0, 0, 127);
}

function parsBlue() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 0, 0, 127);
}

function ledsAndParsCyan() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 0, 127, 127);
}

function ledsCyan() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 0, 127, 127);
}

function parsCyan() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 0, 127, 127);
}

function ledsAndParsMagenta() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 127, 0, 127);
}

function ledsMagenta() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 127, 0, 127);
}

function parsMagenta() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 127, 0, 127);
}

function ledsAndParsYellow() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 127, 127, 0);
}

function ledsYellow() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 127, 127, 0);
}

function parsYellow() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 127, 127, 0);
}

function ledsAndParsOrange() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 127, 64, 0);
}

function ledsOrange() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 127, 64, 0);
}

function parsOrange() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 127, 64, 0);
}

function ledsAndParsPurple() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 64, 0, 127);
}

function ledsPurple() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 64, 0, 127);
}

function parsPurple() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 64, 0, 127);
}

function ledsAndParsPink() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 127, 0, 64);
}

function ledsPink() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 127, 0, 64);
}

function parsPink() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 127, 0, 64);
}

function ledsAndParsAmber() {
    const fixtures = blackBoxFixtures.filter(f => ['LED', 'Par'].includes(f.type));
    setColor(fixtures, 127, 75, 0);
}

function ledsAmber() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'LED');
    setColor(fixtures, 127, 75, 0);
}

function parsAmber() {
    const fixtures = blackBoxFixtures.filter(f => f.type === 'Par');
    setColor(fixtures, 127, 75, 0);
}

function uplightingRed() {
    const fixtures = mobileFixtures.filter(f => f.type === 'Uplighting');
    selectedFixtures.clear();
    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
        const shutterIdx = fixture.from - 1;
        const redIdx = fixture.from + 4 - 1;
        const indices = [shutterIdx, redIdx];
        indices.forEach(idx => {
            const value = idx === shutterIdx ? 127 : 127;
            faderValues[idx] = value;
            updateSliderState(idx, value);
            sendMIDICC(Math.floor(idx / 128), idx % 128, value);
        });
    });
    if (fixtures.length > 0) {
        const targetPage = Math.floor((fixtures[0].from - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }
    updateFixtureLabelGrid();
    createFaders();
}

function uplightingBlue() {
    const fixtures = mobileFixtures.filter(f => f.type === 'Uplighting');
    selectedFixtures.clear();
    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
        const shutterIdx = fixture.from - 1;
        const blueIdx = fixture.from + 6 - 1;
        const indices = [shutterIdx, blueIdx];
        indices.forEach(idx => {
            const value = idx === shutterIdx ? 127 : 127;
            faderValues[idx] = value;
            updateSliderState(idx, value);
            sendMIDICC(Math.floor(idx / 128), idx % 128, value);
        });
    });
    if (fixtures.length > 0) {
        const targetPage = Math.floor((fixtures[0].from - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }
    updateFixtureLabelGrid();
    createFaders();
}

document.addEventListener('DOMContentLoaded', () => {
    createSearchModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        openSearchModal();
    }
});