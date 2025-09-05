function sortFixtureLabels(sortBy) {
    const fixtureLabelGrid = document.getElementById('fixtureLabelGrid');
    const fixtures = getCurrentModeFixtures();
    let sortedFixtures;

    // Toggle the grid layout class based on sort mode
    if (sortBy === 'Type') {
        fixtureLabelGrid.classList.add('type-mode');
    } else {
        fixtureLabelGrid.classList.remove('type-mode');
    }

    if (sortBy === 'Type') {
        if (currentMode === 'Black Box') {
            const customOrder = [
                'LED - 1.1', 'LED - 1.2', 'LED - 1.3', 'LED - 1.4', 'LED - 1.5', 'LED - 1.6',
                'LED - 2.1', 'LED - 2.2', 'LED - 2.3', 'LED - 2.4', 'LED - 2.5', 'LED - 2.6',
                'LED - 3.1', 'LED - 3.2', 'LED - 3.3', 'LED - 3.4', 'LED - 3.5', 'LED - 3.6',
                'LED - L.1', 'LED - L.2', 'LED - L.3', null, null, null,
                'LED - R.1', 'LED - R.2', 'LED - R.3', null, null, null,
                'Par - 1.1', 'Par - 1.2', 'Par - 1.3', 'Par - 1.4', null, null,
                'Par - 3.1', 'Par - 3.2', 'Par - 3.3', 'Par - 3.4', null, null,
                'Par - L.1', 'Par - L.2', 'Par - L.3', 'Par - L.4', null, null,
                'Par - R.1', 'Par - R.2', 'Par - R.3', 'Par - R.4', null, null,
                'Gobo - 1.1', 'Gobo - 1.2', 'Gobo - 1.3', 'Gobo - 1.4', null, null,
                'Gobo - 2.1', 'Gobo - 2.2', 'Gobo - 2.3', 'Gobo - 2.4', null, null,
                'Box Lights row 3', 'Box Lights row 2', 'Box Lights row 1', null, null, null,
                'LED Tree', null, null, null, null, null
            ];
            sortedFixtures = customOrder.map(name => name ? fixtures.find(f => f.name === name) : null);
        } else if (currentMode === 'Mobile') {
            const customOrder = [
                'Flood', null, null, null, null, null,
                'BandLED', 'BandLED', 'BandLED', 'BandLED', 'BandLED', 'BandLED',
                'DramaLED', 'DramaLED', 'DramaLED', 'DramaLED', 'DramaLED', 'DramaLED',
                'Tree 1', 'Tree 1', 'Tree 1', 'Tree 1', 'Tree 1', null,
                'Tree 1', 'Tree 1', 'Tree 1', 'Tree 1', 'Tree 1', null,
                'Tree 2', 'Tree 2', 'Tree 2', 'Tree 2', 'Tree 2', null,
                'Tree 2', 'Tree 2', 'Tree 2', 'Tree 2', null, null,
                'Tube Light 1', 'Tube Light 2', 'Tube Light 3', 'Tube Light 4', null, null,
                'Tube Light 5', 'Tube Light 6', 'Tube Light 7', 'Tube Light 8', null, null,
                'Uplighting', 'Uplighting', 'Uplighting', 'Uplighting', 'Uplighting', 'Uplighting',
                'Uplighting', 'Uplighting', 'Uplighting', 'Uplighting', 'Uplighting', 'Uplighting'
            ];
            sortedFixtures = customOrder.map(name => name ? fixtures.find(f => f.name === name) : null);
        } else if (currentMode === 'Auditorium') {
            const customOrder = [
                'Row 1 Floods', 'Row 2 Floods', null, null, null, null,
                'LED 1', 'LED 2', 'LED 3', 'LED 4', null, null,
                'LED 5', 'LED 6', 'LED 7', 'LED 8', null, null,
                'LED Row 2', null, null, null, null, null
            ];
            sortedFixtures = customOrder.map(name => name ? fixtures.find(f => f.name === name) : null);
        } else {
            // Default type sorting for other modes
            sortedFixtures = [...fixtures].sort((a, b) => a.type.localeCompare(b.type) || a.from - b.from);
        }
    } else {
        // Address mode
        sortedFixtures = [...fixtures].sort((a, b) => a.from - b.from);
    }

    fixtureLabelGrid.innerHTML = '';
    sortedFixtures.forEach(fixture => {
        const item = document.createElement('div');
        if (fixture) {
            item.className = 'fixture-label';
            item.dataset.fixture = fixture.from;
            item.textContent = fixture.name;
            item.onclick = (e) => selectFixture(fixture.from, e.shiftKey, e.metaKey);
            if (selectedFixtures.has(fixture.from)) {
                item.classList.add('group-highlighted');
            }
            const state = labelBackgroundStates.get(`label-${fixture.from}`);
            if (state) {
                item.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
            }
        } else {
            item.className = 'fixture-label empty';
        }
        fixtureLabelGrid.appendChild(item);
    });

    updateFixtureGroupPositions();
}

function createSortToggle() {
    const toggle = document.getElementById('sortToggle');
    const savedSortBy = localStorage.getItem('sortMode') || 'Type';
    toggle.textContent = `Sort: ${savedSortBy}`;
    toggle.dataset.sortBy = savedSortBy;

    toggle.onclick = () => {
        const sortBy = toggle.dataset.sortBy === 'Type' ? 'Address' : 'Type';
        toggle.textContent = `Sort: ${sortBy}`;
        toggle.dataset.sortBy = sortBy;
        localStorage.setItem('sortMode', sortBy);
        sortFixtureLabels(sortBy);
    };

    sortFixtureLabels(savedSortBy);
}

document.addEventListener('DOMContentLoaded', () => {
    createSortToggle();
});