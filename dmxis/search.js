const FIXTURE_GROUPS = {
    'Black Box': [
        { name: 'All LEDs', fixtureTypes: ['LED'], filter: () => true },
        { name: 'Row 1 LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('1.') },
        { name: 'Row 2 LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('2.') },
        { name: 'Row 3 LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('3.') },
        { name: 'Left LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('L.') },
        { name: 'Right LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('R.') },
        { name: 'All Gobos', fixtureTypes: ['Motorized Par'], filter: () => true },
        { name: 'Row 1 Gobos', fixtureTypes: ['Motorized Par'], filter: f => f.name.includes('1.') },
        { name: 'Row 2 Gobos', fixtureTypes: ['Motorized Par'], filter: f => f.name.includes('2.') },
        { name: 'All Pars', fixtureTypes: ['Par', 'Par2'], filter: () => true },
        { name: 'Row 1 Pars', fixtureTypes: ['Par', 'Par2'], filter: f => f.name.includes('1.') },
        { name: 'Row 3 Pars', fixtureTypes: ['Par', 'Par2'], filter: f => f.name.includes('3.') },
        { name: 'Left Pars', fixtureTypes: ['Par', 'Par2'], filter: f => f.name.includes('L.') },
        { name: 'Right Pars', fixtureTypes: ['Par', 'Par2'], filter: f => f.name.includes('R.') },
        { name: 'All Trees', fixtureTypes: ['Tree'], filter: () => true },
        { name: 'All Box Lights', fixtureTypes: ['BoxLight'], filter: () => true }
    ],
    'Auditorium': [
        { name: 'All LEDs', fixtureTypes: ['LED'], filter: () => true }
    ],
    'Mobile': [
        { name: 'All Uplighting', fixtureTypes: ['Uplighting'], filter: () => true },
        { name: 'All Band LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('BandLED') },
        { name: 'All Drama LEDs', fixtureTypes: ['LED'], filter: f => f.name.includes('DramaLED') },
        { name: 'All Trees', fixtureTypes: ['Tree'], filter: () => true },
        { name: 'Tree 1', fixtureTypes: ['Tree'], filter: f => f.name === 'Tree 1' },
        { name: 'Tree 2', fixtureTypes: ['Tree'], filter: f => f.name === 'Tree 2' },
        { name: 'All Tube Lights', fixtureTypes: ['Tube Light'], filter: () => true },
        { name: 'All Floods', fixtureTypes: ['Flood'], filter: () => true }
    ]
};

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search fixture groups or lights...">
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
        } else if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation(); // Prevent document click event
            const selectedResult = results.querySelector('.search-result.selected');
            if (selectedResult) {
                if (selectedResult.dataset.group) {
                    const groupName = selectedResult.dataset.group;
                    const group = FIXTURE_GROUPS[currentMode].find(g => g.name === groupName);
                    if (group) {
                        selectFixturesByGroup(group);
                        closeSearchModal();
                    }
                } else if (selectedResult.dataset.fixture) {
                    const fixtureName = selectedResult.dataset.fixture;
                    selectSingleFixture(fixtureName);
                    closeSearchModal();
                }
                updateFixtureLabelGrid();
                updateFixtureGroupPositions();
            }
        }
    });

    results.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click event
        const result = e.target.closest('.search-result');
        if (result && !result.classList.contains('disabled')) {
            if (result.dataset.group) {
                const groupName = result.dataset.group;
                const group = FIXTURE_GROUPS[currentMode].find(g => g.name === groupName);
                if (group) {
                    selectFixturesByGroup(group);
                    closeSearchModal();
                }
            } else if (result.dataset.fixture) {
                const fixtureName = result.dataset.fixture;
                selectSingleFixture(fixtureName);
                closeSearchModal();
            }
            updateFixtureLabelGrid();
            updateFixtureGroupPositions();
        }
    });

    // Handle click outside to close modal
    document.addEventListener('click', (e) => {
        if (modal.style.display === 'flex' && !modal.querySelector('.search-container').contains(e.target)) {
            closeSearchModal();
        }
    });
}

function selectFixturesByGroup(group) {
    const fixtures = getCurrentModeFixtures();
    selectedFixtures.clear();
    currentHighlightedFixture = null;
    let minChannel = Infinity;

    fixtures.forEach(fixture => {
        if (group.fixtureTypes.includes(fixture.type) && group.filter(fixture)) {
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
}

function selectSingleFixture(fixtureName) {
    const fixtures = getCurrentModeFixtures();
    selectedFixtures.clear();
    currentHighlightedFixture = null;
    let minChannel = Infinity;

    const fixture = fixtures.find(f => f.name === fixtureName);
    if (fixture) {
        selectedFixtures.add(fixture.from);
        currentHighlightedFixture = fixture.from;
        minChannel = fixture.from;
        const targetPage = Math.floor((minChannel - 1) / FADERS_PER_PAGE);
        if (targetPage !== currentPage) {
            changePage(targetPage);
        }
    }
}

function updateSearchResults(query, results) {
    results.innerHTML = '';
    results.dataset.selectedIndex = '0';
    const groups = FIXTURE_GROUPS[currentMode] || [];
    const fixtures = getCurrentModeFixtures();
    
    // Filter groups
    const filteredGroups = query
        ? groups.filter(g => g.name.toLowerCase().includes(query))
        : groups;
    
    // Filter fixtures
    const filteredFixtures = query
        ? fixtures.filter(f => f.name.toLowerCase().includes(query))
        : fixtures;

    // Combine results
    const combinedResults = [
        ...filteredGroups.map(g => ({ type: 'group', name: g.name, group: g })),
        ...filteredFixtures.map(f => ({ type: 'fixture', name: f.name, fixture: f }))
    ];

    combinedResults.forEach((item, index) => {
        const result = document.createElement('div');
        result.className = 'search-result';
        if (item.type === 'group') {
            result.dataset.group = item.name;
        } else {
            result.dataset.fixture = item.name;
        }
        result.tabIndex = 0;
        result.innerHTML = item.type === 'group' ? `<strong>Group:</strong> ${item.name}` : `<strong>Fixture:</strong> ${item.name}`;
        if (index === 0) {
            result.classList.add('selected');
        }
        results.appendChild(result);
    });

    if (combinedResults.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-result disabled';
        noResults.textContent = 'No fixture groups or lights found';
        results.appendChild(noResults);
        results.dataset.selectedIndex = '-1';
    }

    console.log(`Search results updated: ${combinedResults.length} items`);
}

function updateResultSelection(results, selectedIndex) {
    const resultItems = results.querySelectorAll('.search-result:not(.disabled)');
    resultItems.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
        if (index === selectedIndex) {
            item.scrollIntoView({ block: 'nearest' });
        }
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

document.addEventListener('DOMContentLoaded', () => {
    createSearchModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        openSearchModal();
    }
});