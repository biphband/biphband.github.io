const fixtureParameters = {
    'Uplighting': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Macro Speed', abbr: '⏩' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' }
    ],
    'Flood': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Macro Speed', abbr: '⏩' },
        { name: 'Warm', abbr: '🟡' },
        { name: 'White', abbr: '⚪️' }
    ],
    'BoxLight': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: '', abbr: '' }
    ],
    'LED': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Speed', abbr: '⏩' }
    ],
    'Par': [
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' },
        { name: 'Colors', abbr: '🎨' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Speed', abbr: '⏩' },
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' }
    ],
    'Par2': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Speed', abbr: '⏩' },
        { name: '', abbr: '' }
    ],
    'Tree': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Macro Speed', abbr: '⏩' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' }
    ],
    'Tube Light': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Color Macros', abbr: '▶️' },
        { name: 'Background Color', abbr: 'BC' },
        { name: 'Background Shutter', abbr: 'BS' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Macro Speed', abbr: '⏩' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' },
        { name: 'Warm White', abbr: '🟡' }
    ],
    'Motorized Par': [
        { name: 'Colors', abbr: '🎨' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Gobos', abbr: '⭐️' },
        { name: 'Prism', abbr: '🌟' },
        { name: 'Prism Rotate', abbr: '💫' },
        { name: 'Fan Out', abbr: '✨' },
        { name: 'Blur', abbr: '🌫' },
        { name: 'Focus', abbr: '🎯' },
        { name: 'Pan', abbr: '↔️' },
        { name: 'Small Pan', abbr: '🤏🏻' },
        { name: 'Tilt', abbr: '↕️' },
        { name: 'Small Tilt', abbr: '🤏🏻' },
        { name: 'Presets', abbr: '▶️' },
        { name: 'Reset', abbr: '💾' },
        { name: 'Bulb', abbr: '🛠' },
        { name: '-', abbr: '-' },
        { name: '-', abbr: '-' },
        { name: '-', abbr: '-' },
        { name: '-', abbr: '-' }
    ],
    'Auditorium Flood': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'White', abbr: '⚪️' },
        { name: 'Warm', abbr: '🟡' },
        { name: 'Strobe', abbr: '⚡' },
    ],
    'AuditoriumLED': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Macro Speed', abbr: '⏩' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' }
    ],
    'AuditoriumLEDrow2': [
        { name: 'Shutter', abbr: '(💡)' },
        { name: 'Strobe', abbr: '⚡' },
        { name: 'Macros', abbr: '▶️' },
        { name: 'Macro Speed', abbr: '⏩' },
        { name: 'Red', abbr: '🔴' },
        { name: 'Green', abbr: '🟢' },
        { name: 'Blue', abbr: '🔵' },
        { name: 'White', abbr: '⚪️' }
    ],
        'Fog Machine': [
        { name: 'Shutter', abbr: '(💨)' },
    ]
};

const blackBoxFixtures = [
    { name: "Gobo - 2.1", type: 'Motorized Par', from: 1, to: 20 },
    { name: "Gobo - 2.2", type: 'Motorized Par', from: 21, to: 40 },
    { name: "Gobo - 2.3", type: 'Motorized Par', from: 41, to: 60 },
    { name: "Gobo - 2.4", type: 'Motorized Par', from: 61, to: 80 },
    { name: "Gobo - 1.1", type: 'Motorized Par', from: 81, to: 100 },
    { name: "Gobo - 1.2", type: 'Motorized Par', from: 101, to: 120 },
    { name: "Gobo - 1.3", type: 'Motorized Par', from: 121, to: 140 },
    { name: "Gobo - 1.4", type: 'Motorized Par', from: 141, to: 160 },
    { name: "Box Lights row 3", type: 'BoxLight', from: 161, to: 163 },
    { name: "Box Lights row 2", type: 'BoxLight', from: 164, to: 166 },
    { name: "Box Lights row 1", type: 'BoxLight', from: 167, to: 169 },
    { name: "LED - 2.1", type: 'LED', from: 170, to: 177 },
    { name: "LED - 2.2", type: 'LED', from: 178, to: 185 },
    { name: "LED - 2.3", type: 'LED', from: 186, to: 193 },
    { name: "LED - 2.4", type: 'LED', from: 194, to: 201 },
    { name: "LED - 2.5", type: 'LED', from: 202, to: 209 },
    { name: "LED - 2.6", type: 'LED', from: 210, to: 217 },
    { name: "LED - R.3", type: 'LED', from: 218, to: 225 },
    { name: "LED - R.2", type: 'LED', from: 226, to: 233 },
    { name: "LED - R.1", type: 'LED', from: 234, to: 241 },
    { name: "LED - 1.6", type: 'LED', from: 242, to: 249 },
    { name: "LED - 1.5", type: 'LED', from: 250, to: 257 },
    { name: "LED - 1.4", type: 'LED', from: 258, to: 265 },
    { name: "LED - 1.3", type: 'LED', from: 266, to: 273 },
    { name: "LED - 1.2", type: 'LED', from: 274, to: 281 },
    { name: "LED - 1.1", type: 'LED', from: 282, to: 289 },
    { name: "LED - L.1", type: 'LED', from: 290, to: 297 },
    { name: "LED - L.2", type: 'LED', from: 298, to: 305 },
    { name: "LED - L.3", type: 'LED', from: 306, to: 313 },
    { name: "LED - 3.1", type: 'LED', from: 314, to: 321 },
    { name: "LED - 3.2", type: 'LED', from: 322, to: 329 },
    { name: "LED - 3.3", type: 'LED', from: 330, to: 337 },
    { name: "LED - 3.4", type: 'LED', from: 338, to: 345 },
    { name: "LED - 3.5", type: 'LED', from: 346, to: 353 },
    { name: "LED - 3.6", type: 'LED', from: 354, to: 361 },
    { name: "Par - R.4", type: 'Par', from: 362, to: 370 },
    { name: "Par - R.3", type: 'Par', from: 371, to: 379 },
    { name: "Par - R.2", type: 'Par', from: 380, to: 388 },
    { name: "Par - R.1", type: 'Par', from: 389, to: 397 },
    { name: "Par - 1.4", type: 'Par', from: 398, to: 406 },
    { name: "Par - 1.3", type: 'Par', from: 407, to: 415 },
    { name: "Par - 1.2", type: 'Par', from: 416, to: 424 },
    { name: "Par - 1.1", type: 'Par', from: 425, to: 433 },
    { name: "Par - L.1", type: 'Par', from: 434, to: 442 },
    { name: "Par - L.2", type: 'Par2', from: 443, to: 451 },
    { name: "Par - L.3", type: 'Par2', from: 452, to: 460 },
    { name: "Par - L.4", type: 'Par', from: 461, to: 469 },
    { name: "Par - 3.1", type: 'Par', from: 470, to: 478 },
    { name: "Par - 3.2", type: 'Par', from: 479, to: 487 },
    { name: "Par - 3.3", type: 'Par', from: 488, to: 496 },
    { name: "Par - 3.4", type: 'Par', from: 497, to: 505 },
    { name: "Fog", type: 'Fog Machine', from: 506, to: 506 }
];

const auditoriumFixtures = [
    { name: "LED Row 2", type: 'AuditoriumLEDrow2', from: 1, to: 8 },
    { name: "Row 1 Floods", type: 'Auditorium Flood', from: 9, to: 12 },
    { name: "Row 2 Floods", type: 'Auditorium Flood', from: 20, to: 23 },
    { name: "LED 1", type: 'AuditoriumLED', from: 101, to: 108 },
    { name: "LED 2", type: 'AuditoriumLED', from: 109, to: 116 },
    { name: "LED 3", type: 'AuditoriumLED', from: 117, to: 124 },
    { name: "LED 4", type: 'AuditoriumLED', from: 125, to: 132 },
    { name: "LED 5", type: 'AuditoriumLED', from: 133, to: 140 },
    { name: "LED 6", type: 'AuditoriumLED', from: 141, to: 148 },
    { name: "LED 7", type: 'AuditoriumLED', from: 149, to: 156 },
    { name: "LED 8", type: 'AuditoriumLED', from: 157, to: 164 },
    { name: "Tube Light 1", type: 'Tube Light', from: 365, to: 376 },
    { name: "Tube Light 2", type: 'Tube Light', from: 377, to: 388 },
    { name: "Tube Light 3", type: 'Tube Light', from: 389, to: 400 },
    { name: "Tube Light 4", type: 'Tube Light', from: 401, to: 412 },
    { name: "Tube Light 5", type: 'Tube Light', from: 413, to: 424 },
    { name: "Tube Light 6", type: 'Tube Light', from: 425, to: 436 },
    { name: "Tube Light 7", type: 'Tube Light', from: 437, to: 448 },
    { name: "Tube Light 8", type: 'Tube Light', from: 449, to: 460 },
    { name: "Fog", type: 'Fog Machine', from: 506, to: 506 }
];

const mobileFixtures = [
    { name: "Uplighting", type: 'Uplighting', from: 1, to: 8 },
    { name: "Uplighting", type: 'Uplighting', from: 9, to: 16 },
    { name: "Uplighting", type: 'Uplighting', from: 17, to: 24 },
    { name: "Uplighting", type: 'Uplighting', from: 25, to: 32 },
    { name: "Uplighting", type: 'Uplighting', from: 33, to: 40 },
    { name: "Uplighting", type: 'Uplighting', from: 41, to: 48 },
    { name: "Uplighting", type: 'Uplighting', from: 49, to: 56 },
    { name: "Uplighting", type: 'Uplighting', from: 57, to: 64 },
    { name: "Uplighting", type: 'Uplighting', from: 65, to: 72 },
    { name: "Uplighting", type: 'Uplighting', from: 73, to: 80 },
    { name: "Uplighting", type: 'Uplighting', from: 81, to: 88 },
    { name: "Uplighting", type: 'Uplighting', from: 89, to: 96 },
    { name: "Flood", type: 'Flood', from: 97, to: 102 },
    { name: "BandLED", type: 'LED', from: 103, to: 110 },
    { name: "BandLED", type: 'LED', from: 111, to: 118 },
    { name: "BandLED", type: 'LED', from: 119, to: 126 },
    { name: "BandLED", type: 'LED', from: 127, to: 134 },
    { name: "BandLED", type: 'LED', from: 135, to: 142 },
    { name: "BandLED", type: 'LED', from: 143, to: 150 },
    { name: "DramaLED", type: 'LED', from: 151, to: 158 },
    { name: "DramaLED", type: 'LED', from: 159, to: 166 },
    { name: "DramaLED", type: 'LED', from: 167, to: 174 },
    { name: "DramaLED", type: 'LED', from: 175, to: 182 },
    { name: "DramaLED", type: 'LED', from: 183, to: 190 },
    { name: "DramaLED", type: 'LED', from: 191, to: 198 },
    { name: "Tree 1", type: 'Tree', from: 199, to: 206 },
    { name: "Tree 1", type: 'Tree', from: 207, to: 214 },
    { name: "Tree 1", type: 'Tree', from: 215, to: 222 },
    { name: "Tree 1", type: 'Tree', from: 223, to: 230 },
    { name: "Tree 1", type: 'Tree', from: 231, to: 238 },
    { name: "Tree 1", type: 'Tree', from: 239, to: 246 },
    { name: "Tree 1", type: 'Tree', from: 247, to: 254 },
    { name: "Tree 1", type: 'Tree', from: 255, to: 262 },
    { name: "Tree 1", type: 'Tree', from: 263, to: 270 },
    { name: "Tree 1", type: 'Tree', from: 279, to: 286 },
    { name: "Tree 2", type: 'Tree', from: 287, to: 294 },
    { name: "Tree 2", type: 'Tree', from: 295, to: 302 },
    { name: "Tree 2", type: 'Tree', from: 303, to: 310 },
    { name: "Tree 2", type: 'Tree', from: 311, to: 318 },
    { name: "Tree 2", type: 'Tree', from: 319, to: 326 },
    { name: "Tree 2", type: 'Tree', from: 327, to: 334 },
    { name: "Tree 2", type: 'Tree', from: 335, to: 342 },
    { name: "Tree 2", type: 'Tree', from: 343, to: 350 },
    { name: "Tree 2", type: 'Tree', from: 351, to: 358 },
    { name: "Tube Light 1", type: 'Tube Light', from: 365, to: 376 },
    { name: "Tube Light 2", type: 'Tube Light', from: 377, to: 388 },
    { name: "Tube Light 3", type: 'Tube Light', from: 389, to: 400 },
    { name: "Tube Light 4", type: 'Tube Light', from: 401, to: 412 },
    { name: "Tube Light 5", type: 'Tube Light', from: 413, to: 424 },
    { name: "Tube Light 6", type: 'Tube Light', from: 425, to: 436 },
    { name: "Tube Light 7", type: 'Tube Light', from: 437, to: 448 },
    { name: "Tube Light 8", type: 'Tube Light', from: 449, to: 460 },
    { name: "Fog", type: 'Fog Machine', from: 506, to: 506 }
];

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

function getSortedFixtures() {
    const fixtures = currentMode === 'Black Box' ? blackBoxFixtures :
                    currentMode === 'Auditorium' ? auditoriumFixtures :
                    currentMode === 'Mobile' ? mobileFixtures : [];
    const sortBy = localStorage.getItem('sortMode') || 'Type';
    let sortedFixtures;

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
        } else {
            sortedFixtures = [...fixtures].sort((a, b) => a.type.localeCompare(b.type) || a.from - b.from);
        }
    } else {
        sortedFixtures = [...fixtures].sort((a, b) => a.from - b.from);
    }

    return sortedFixtures;
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

function selectAllFixturesInRow(fixtureStartChannel, metaKey = false) {
    const fixtures = getCurrentModeFixtures();
    const sortedFixtures = getSortedFixtures();
    const fixture = fixtures.find(f => f.from === fixtureStartChannel);
    if (!fixture) return;

    const fixtureIndex = sortedFixtures.findIndex(f => f && f.from === fixtureStartChannel);
    const rowIndex = Math.floor(fixtureIndex / 6); // 6 columns per row
    const rowStart = rowIndex * 6;
    const rowEnd = rowStart + 5;

    if (!metaKey) {
        selectedFixtures.clear();
        currentHighlightedFixture = fixtureStartChannel;
    }

    for (let i = rowStart; i <= rowEnd && i < sortedFixtures.length; i++) {
        const rowFixture = sortedFixtures[i];
        if (rowFixture) {
            selectedFixtures.add(rowFixture.from);
        }
    }

    const fixturePage = Math.floor((fixtureStartChannel - 1) / FADERS_PER_PAGE);
    if (fixturePage !== currentPage) {
        changePage(fixturePage);
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

function selectFixture(fixtureStartChannel, shiftKey = false, metaKey = false) {
    const fixtures = getCurrentModeFixtures();
    const sortedFixtures = getSortedFixtures();
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
        const currentIndex = sortedFixtures.findIndex(f => f && f.from === currentHighlightedFixture);
        const targetIndex = sortedFixtures.findIndex(f => f && f.from === fixtureStartChannel);
        const start = Math.min(currentIndex, targetIndex);
        const end = Math.max(currentIndex, targetIndex);
        for (let i = start; i <= end; i++) {
            if (sortedFixtures[i]) {
                selectedFixtures.add(sortedFixtures[i].from);
            }
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

function selectSimilarNamedFixtures(fixtureStartChannel, metaKey = false) {
    const fixtures = getCurrentModeFixtures();
    const fixture = fixtures.find(f => f.from === fixtureStartChannel);
    if (!fixture) return;

    // Find the fixture group that this fixture belongs to
    const groups = FIXTURE_GROUPS[currentMode] || [];
    const targetGroup = groups.find(group => 
        group.fixtureTypes.includes(fixture.type) && group.filter(fixture)
    );

    // Handle selection
    if (!metaKey) {
        selectedFixtures.clear();
        currentHighlightedFixture = fixtureStartChannel;
    }

    // Select fixtures in the target group (or just the clicked fixture if no group)
    let minChannel = fixture.from;
    if (targetGroup) {
        fixtures.forEach(f => {
            if (targetGroup.fixtureTypes.includes(f.type) && targetGroup.filter(f)) {
                selectedFixtures.add(f.from);
                minChannel = Math.min(minChannel, f.from);
            }
        });
    } else {
        selectedFixtures.add(fixtureStartChannel);
    }

    // Change page to show the earliest fixture
    const targetPage = Math.floor((minChannel - 1) / FADERS_PER_PAGE);
    if (targetPage !== currentPage) {
        changePage(targetPage);
    }

    // Update UI
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

    requestAnimationFrame(() => {
        updateFixtureGroupPositions();
        updateFixtureLabelGrid();
    });
}

function selectAllFixturesOfType(type, clearSelection = true) {
    const fixtures = getCurrentModeFixtures();
    if (clearSelection) {
        selectedFixtures.clear();
        currentHighlightedFixture = null;
    }
    let minChannel = Infinity;

    fixtures.forEach(fixture => {
        if (fixture.type === type) {
            selectedFixtures.add(fixture.from);
            minChannel = Math.min(minChannel, fixture.from);
        }
    });

    if (selectedFixtures.size > 0 && clearSelection) {
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

function createFixtureLabelGrid() {
    const fixtureTypeButtons = document.getElementById('fixtureTypeButtons');
    fixtureTypeButtons.innerHTML = '';

    const fixtures = getCurrentModeFixtures();
    const fixtureTypes = [...new Set(fixtures.map(f => f.type))].sort();

    const pluralNames = {
        'LED': 'LEDs',
        'Par': 'Pars',
        'Par2': 'Pars', // Map Par2 to Pars to combine them
        'Motorized Par': 'Gobos',
        'Tree': 'Trees',
        'Uplighting': 'Uplightings',
        'BoxLight': 'Box Lights',
        'Flood': 'Floods',
        'Tube Light': 'Tube Lights'
    };

    // Create a map to group fixture types for buttons
    const buttonGroups = fixtureTypes.reduce((acc, type) => {
        const displayName = pluralNames[type] || type + 's';
        if (displayName === 'Pars') {
            acc['Pars'] = acc['Pars'] || { name: 'Pars', types: [] };
            acc['Pars'].types.push(type);
        } else {
            acc[displayName] = { name: displayName, types: [type] };
        }
        return acc;
    }, {});

    // Create buttons for each group
    Object.values(buttonGroups).forEach(group => {
        const button = document.createElement('button');
        button.className = 'fixture-type-button';
        button.textContent = `All ${group.name}`;
        button.onclick = () => {
            group.types.forEach((type, index) => selectAllFixturesOfType(type, index === 0));
        };
        fixtureTypeButtons.appendChild(button);
    });

    const fixtureLabelGrid = document.getElementById('fixtureLabelGrid');
    fixtureLabelGrid.innerHTML = '';
    const sortedFixtures = getSortedFixtures();

    for (let i = 0; i < 72; i++) { // 12 rows x 6 columns
        const label = document.createElement('div');
        label.className = 'fixture-label';
        label.tabIndex = 0;
        const fixture = sortedFixtures[i];

        if (fixture) {
            label.dataset.fixture = fixture.from;
            label.textContent = fixture.name;
            label.onclick = (e) => {
                selectFixture(fixture.from, e.shiftKey, e.metaKey);
            };
            label.ondblclick = (e) => {
                selectSimilarNamedFixtures(fixture.from, e.metaKey);
            };
            const state = labelBackgroundStates.get(`label-${fixture.from}`);
            if (state) {
                label.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
            }
        } else {
            label.className = 'fixture-label empty';
            label.textContent = '';
        }

        fixtureLabelGrid.appendChild(label);
    }

    createSortToggle();
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
        const state = labelBackgroundStates.get(`label-${fixtureId}`);
        if (state) {
            item.style.backgroundColor = hexToRGBA(state.hex, state.currentOpacity);
        }
    });
}

function updateFixtureGroupPositions() {
    document.body.offsetHeight;

    const grid = document.getElementById('faderGrid');
    const faderRows = grid.querySelectorAll('.fader-row');
    const pageStart = currentPage * FADERS_PER_PAGE + 1;
    const pageEnd = pageStart + FADERS_PER_PAGE - 1;

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