const COLORS = [
    { name: 'Warm White', hex: '#F0D7A9', rgb: [127, 115, 0, 100] },
    { name: 'Red', hex: '#FF0000', rgb: [127, 0, 0] },
    { name: 'Ruby', hex: '#E0115F', rgb: [127, 8, 47] },
    { name: 'Maroon', hex: '#800000', rgb: [64, 0, 0] },
    { name: 'Crimson', hex: '#DC143C', rgb: [127, 10, 28] },
    { name: 'Tomato', hex: '#FF6347', rgb: [127, 50, 35] },
    { name: 'Coral', hex: '#FF7F50', rgb: [127, 63, 32] },
    { name: 'Salmon', hex: '#FA8072', rgb: [127, 64, 57] },
    { name: 'Orange', hex: '#FFA500', rgb: [127, 64, 0] },
    { name: 'Amber', hex: '#FFBF00', rgb: [127, 75, 0] },
    { name: 'Yellow', hex: '#FFDB58', rgb: [127, 109, 0] },
    { name: 'Highlighter', hex: '#FFFF00', rgb: [127, 127, 0] },
    { name: 'Gold', hex: '#FFD700', rgb: [127, 90, 0] },
    { name: 'Goldenrod', hex: '#DAA520', rgb: [109, 83, 16] },
    { name: 'Olive', hex: '#808000', rgb: [64, 64, 0] },
    { name: 'Lime', hex: '#32CD32', rgb: [60, 127, 0] },
    { name: 'Green', hex: '#00FF00', rgb: [0, 127, 0] },
    { name: 'Mint', hex: '#98FF98', rgb: [66, 127, 66] },
    { name: 'Emerald', hex: '#50C878', rgb: [40, 127, 15] },
    { name: 'Turquoise', hex: '#40E0D0', rgb: [32, 127, 102] },
    { name: 'Teal', hex: '#008080', rgb: [0, 127, 63] },
    { name: 'Cerulean', hex: '#007BA7', rgb: [0, 61, 83] },
    { name: 'Cyan', hex: '#00FFFF', rgb: [0, 127, 127] },
    { name: 'Aqua', hex: '#00FFFF', rgb: [0, 127, 127] },
    { name: 'Sky Blue', hex: '#87CEEB', rgb: [67, 103, 127] },
    { name: 'Sapphire', hex: '#0F52BA', rgb: [15, 41, 127] },
    { name: 'Blue', hex: '#0000FF', rgb: [0, 0, 127] },
    { name: 'Indigo', hex: '#350082', rgb: [15, 0, 127] },
    { name: 'Purple', hex: '#800080', rgb: [64, 0, 127] },
    { name: 'Orchid', hex: '#DA70D6', rgb: [109, 56, 107] },
    { name: 'Magenta', hex: '#FF00FF', rgb: [127, 0, 127] },
    { name: 'Hot Pink', hex: '#ff1d8e', rgb: [127, 0, 64] },
    { name: 'Baby Pink', hex: '#ff84c1', rgb: [127, 0, 64, 50] },
    { name: 'Peach', hex: '#FFDAB9', rgb: [127, 50, 40, 30] },
    { name: 'Periwinkle', hex: '#CCCCFF', rgb: [102, 102, 127] },
    { name: 'Plum', hex: '#DDA0DD', rgb: [109, 64, 109] },
    { name: 'Dusk', hex: '#A0522D', rgb: [80, 41, 22] },
    { name: 'Cool White', hex: '#E0F7FA', rgb: [0, 0, 70, 127] },
    { name: 'White', hex: '#FFFFFF', rgb: [127, 115, 70, 127] }
];

function createColorModal() {
    const modal = document.createElement('div');
    modal.className = 'color-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="color-container">
            <input type="text" class="color-input" placeholder="Search colors...">
            <div class="color-results"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('.color-input');
    const results = modal.querySelector('.color-results');

    input.addEventListener('input', () => {
        console.log('Color modal input event triggered');
        const query = input.value.toLowerCase();
        updateColorResults(query, results);
    });

    input.addEventListener('keydown', (e) => {
        console.log('Color modal input keydown:', e.key);
        if (e.key === 'Escape') {
            closeColorModal();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selectedResult = results.querySelector('.color-result.selected');
            if (selectedResult) {
                const colorName = selectedResult.dataset.color;
                applyColor(colorName);
                closeColorModal();
            }
        }
    });

    results.addEventListener('click', (e) => {
        const result = e.target.closest('.color-result');
        if (result && !result.classList.contains('disabled')) {
            const colorName = result.dataset.color;
            applyColor(colorName);
            closeColorModal();
        }
    });

    // Handle click outside to close modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeColorModal();
        }
    });
}

function updateColorResults(query, results) {
    results.innerHTML = '';
    results.dataset.selectedIndex = '0';
    const filteredColors = query
        ? COLORS.filter(c => c.name.toLowerCase().includes(query))
        : COLORS;

    filteredColors.forEach((color, index) => {
        const result = document.createElement('div');
        result.className = 'color-result';
        result.dataset.color = color.name;
        result.tabIndex = 0;
        result.innerHTML = `
            <span class="color-swatch" style="background-color: ${color.hex};"></span>
            ${color.name}
        `;
        if (index === 0) {
            result.classList.add('selected');
        }
        results.appendChild(result);
    });

    if (filteredColors.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'color-result disabled';
        noResults.textContent = 'No colors found';
        results.appendChild(noResults);
        results.dataset.selectedIndex = '-1';
    }

    console.log(`Color results updated: ${filteredColors.length} items`);
}

function updateColorSelection(results, selectedIndex) {
    const resultItems = results.querySelectorAll('.color-result:not(.disabled)');
    resultItems.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

function openColorModal() {
    const modal = document.querySelector('.color-modal');
    if (!modal) {
        console.error('Color modal not found; recreating');
        createColorModal();
        setTimeout(openColorModal, 0);
        return;
    }

    const input = modal.querySelector('.color-input');
    const results = modal.querySelector('.color-results');
    console.log('Opening color modal');
    modal.style.display = 'flex';
    input.value = '';
    updateColorResults('', results);
    input.focus();
}

function closeColorModal() {
    const modal = document.querySelector('.color-modal');
    if (!modal) {
        console.error('Color modal not found');
        return;
    }

    console.log('Closing color modal');
    modal.style.display = 'none';
}

function applyColor(colorName) {
    const color = COLORS.find(c => c.name === colorName);
    if (!color) {
        console.error(`Color ${colorName} not found`);
        return;
    }

    // Map rgb array to color properties
    const red = color.rgb[0] || 0;
    const green = color.rgb[1] || 0;
    const blue = color.rgb[2] || 0;
    const white = color.rgb[3] || 0;
    const warm = color.rgb[4] || 0;

    const fixtures = getCurrentModeFixtures().filter(f =>
        selectedFixtures.size > 0
            ? selectedFixtures.has(f.from)
            : ['LED', 'Par', 'Uplighting'].includes(f.type)
    );

    if (fixtures.length === 0) {
        console.log('No fixtures selected or available for color change');
        return;
    }

    // Preserve selectedFixtures
    fixtures.forEach(fixture => {
        selectedFixtures.add(fixture.from);
    });

    const changes = [];
    fixtures.forEach(fixture => {
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

    // Reset only unselected fixture channels
    faderValues.forEach((_, idx) => {
        let shouldReset = true;
        fixtures.forEach(fixture => {
            if (idx >= fixture.from - 1 && idx < fixture.to) {
                shouldReset = false;
            }
        });
        if (shouldReset) {
            faderValues[idx] = 0;
            updateSliderState(idx, 0);
            const midiChannel = Math.floor(idx / 128);
            const ccNumber = idx % 128;
            sendMIDICC(midiChannel, ccNumber, 0);
        }
    });

    sliderStates.forEach((state, sliderId) => {
        const idx = parseInt(sliderId.replace('fader-', ''));
        let shouldReset = true;
        fixtures.forEach(fixture => {
            if (idx >= fixture.from - 1 && idx < fixture.to) {
                shouldReset = false;
            }
        });
        if (shouldReset) {
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
        }
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

document.addEventListener('DOMContentLoaded', () => {
    createColorModal();
});