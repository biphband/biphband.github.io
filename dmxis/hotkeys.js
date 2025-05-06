document.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;
    const isSlider = activeElement.classList.contains('fader');
    const isValueInput = activeElement.classList.contains('fader-value') && activeElement.classList.contains('editable');
    const isColorMenu = activeElement.closest('.color-modal');
    const isSearchMenu = activeElement.closest('.search-modal');
    const allContainers = Array.from(document.querySelectorAll('.fader-container'));
    const currentChannel = lastSelectedChannel;
    const currentContainer = currentChannel ? allContainers.find(c => parseInt(c.dataset.channel) === currentChannel) : null;
    const currentIndex = currentContainer ? allContainers.indexOf(currentContainer) : -1;
    const fixtures = currentMode === 'Black Box' ? blackBoxFixtures : 
                    currentMode === 'Auditorium' ? auditoriumFixtures : 
                    currentMode === 'Mobile' ? mobileFixtures : [];
    const isFixtureLabelGrid = activeElement.closest('.fixture-label-grid') || document.activeElement.classList.contains('fixture-label');
    const isMenuOpen = document.getElementById('menu').classList.contains('open');

    // Handle 'Escape' key to close menu if open and no modals or inputs are active
    if (event.key === 'Escape' && !isColorMenu && !isSearchMenu && !isValueInput && !isSlider && isMenuOpen) {
        event.preventDefault();
        const menu = document.getElementById('menu');
        menu.classList.remove('open');
        return;
    }

    // Helper function to get sorted fixtures
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

    // Handle modals (color or search)
    if (isColorMenu || isSearchMenu) {
        if (event.key === 'Escape') {
            event.preventDefault();
            if (isColorMenu) {
                closeColorModal();
            } else if (isSearchMenu) {
                closeSearchModal();
            }
            return;
        }

        if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            const modalClass = isColorMenu ? '.color-modal' : '.search-modal';
            const results = document.querySelector(`${modalClass} .color-results, ${modalClass} .search-results`);
            const selectedIndex = parseInt(results.dataset.selectedIndex) || 0;
            const resultItems = results.querySelectorAll('.color-result:not(.disabled), .search-result:not(.disabled)');

            let newIndex = selectedIndex;
            if (event.key === 'ArrowDown') {
                newIndex = selectedIndex < resultItems.length - 1 ? selectedIndex + 1 : 0;
            } else if (event.key === 'ArrowUp') {
                newIndex = selectedIndex > 0 ? selectedIndex - 1 : resultItems.length - 1;
            }

            if (newIndex !== selectedIndex && resultItems.length > 0) {
                results.dataset.selectedIndex = newIndex;
                if (isColorMenu) {
                    updateColorSelection(results, newIndex);
                } else {
                    updateResultSelection(results, newIndex);
                }
                if (resultItems[newIndex]) {
                    resultItems[newIndex].scrollIntoView({ block: 'nearest' });
                }
            }
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if (isColorMenu) {
                const results = document.querySelector('.color-modal .color-results');
                const selectedIndex = parseInt(results.dataset.selectedIndex) || 0;
                const resultItems = results.querySelectorAll('.color-result:not(.disabled)');
                if (resultItems[selectedIndex]) {
                    resultItems[selectedIndex].click();
                }
            } else if (isSearchMenu) {
                const results = document.querySelector('.search-modal .search-results');
                const selectedIndex = parseInt(results.dataset.selectedIndex) || 0;
                const resultItems = results.querySelectorAll('.search-result:not(.disabled)');
                if (resultItems[selectedIndex]) {
                    resultItems[selectedIndex].click();
                }
            }
            return;
        }

        if ((isColorMenu && activeElement.classList.contains('color-input')) ||
            (isSearchMenu && activeElement.classList.contains('search-input'))) {
            return;
        }
    }

    // 'm': Toggle hamburger menu
    if (event.key === 'm' && !isValueInput && !isSlider && !isColorMenu && !isSearchMenu) {
        if (activeElement.classList.contains('search-input') || activeElement.classList.contains('color-input')) {
            return;
        }
        event.preventDefault();
        toggleMenu();
        return;
    }

        // Cmd+C or Ctrl+C: Copy selected fixture values and colors with parameter names
        if ((event.metaKey || event.ctrlKey) && event.key === 'c' && !isValueInput && !isSlider && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        if (selectedFixtures.size > 0) {
            copiedFixtureData = {
                channels: [],
                labels: new Map()
            };
            selectedFixtures.forEach(fixtureStart => {
                const fixture = fixtures.find(f => f.from === fixtureStart);
                if (fixture && fixture.type in fixtureParameters) {
                    const params = fixtureParameters[fixture.type];
                    for (let ch = fixture.from; ch <= fixture.to; ch++) {
                        const idx = ch - 1;
                        const paramIndex = (ch - fixture.from) % params.length;
                        const paramName = params[paramIndex].name;
                        copiedFixtureData.channels.push({
                            channel: ch,
                            value: faderValues[idx],
                            parameter: paramName
                        });
                    }
                    const labelState = labelBackgroundStates.get(`label-${fixtureStart}`);
                    if (labelState) {
                        copiedFixtureData.labels.set(fixtureStart, {
                            hex: labelState.hex,
                            opacity: labelState.currentOpacity
                        });
                    }
                }
            });
            console.log('Copied fixture data:', copiedFixtureData);
        } else if (selectedChannels.size > 0) {
            copiedFixtureData = {
                channels: Array.from(selectedChannels).map(ch => {
                    const fixture = fixtures.find(f => ch >= f.from && ch <= f.to);
                    let paramName = 'Unknown';
                    if (fixture && fixture.type in fixtureParameters) {
                        const params = fixtureParameters[fixture.type];
                        const paramIndex = (ch - fixture.from) % params.length;
                        paramName = params[paramIndex].name;
                    }
                    return {
                        channel: ch,
                        value: faderValues[ch - 1],
                        parameter: paramName
                    };
                }),
                labels: new Map()
            };
            console.log('Copied channel values:', copiedFixtureData.channels);
        }
        return;
    }

        // Cmd+V or Ctrl+V: Paste copied fixture values and colors by parameter name
        if ((event.metaKey || event.ctrlKey) && event.key === 'v' && !isValueInput && !isSlider && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        if (copiedFixtureData && (selectedChannels.size > 0 || selectedFixtures.size > 0)) {
            const channelsToUpdate = new Set();
            const fixturesToUpdate = [];
            const labelChanges = new Map();
            const channelChanges = new Map();

            if (selectedFixtures.size > 0) {
                selectedFixtures.forEach(fixtureStart => {
                    const fixture = fixtures.find(f => f.from === fixtureStart);
                    if (fixture && fixture.type in fixtureParameters) {
                        const params = fixtureParameters[fixture.type];
                        // Map copied parameters to target fixture's channels
                        copiedFixtureData.channels.forEach(({ parameter, value }) => {
                            const paramIndex = params.findIndex(p => p.name === parameter);
                            if (paramIndex !== -1) {
                                const channel = fixture.from + paramIndex;
                                if (channel <= fixture.to) {
                                    const idx = channel - 1;
                                    channelsToUpdate.add(idx);
                                    channelChanges.set(idx, {
                                        initialValue: faderValues[idx],
                                        targetValue: value
                                    });
                                }
                            }
                        });
                        fixturesToUpdate.push(fixture);
                        // Apply label color from the first copied fixture or specific fixture
                        const labelState = copiedFixtureData.labels.get(fixtureStart) || copiedFixtureData.labels.values().next().value;
                        if (labelState) {
                            labelChanges.set(fixtureStart, {
                                hex: labelState.hex,
                                opacity: labelState.opacity
                            });
                        }
                    }
                });
            } else {
                // Handle channel selection (less precise, map to same parameter if possible)
                selectedChannels.forEach(ch => {
                    const idx = ch - 1;
                    const fixture = fixtures.find(f => ch >= f.from && ch <= f.to);
                    if (fixture && fixture.type in fixtureParameters) {
                        const params = fixtureParameters[fixture.type];
                        const paramIndex = (ch - fixture.from) % params.length;
                        const paramName = params[paramIndex].name;
                        const copiedChannel = copiedFixtureData.channels.find(c => c.parameter === paramName);
                        if (copiedChannel) {
                            channelsToUpdate.add(idx);
                            channelChanges.set(idx, {
                                initialValue: faderValues[idx],
                                targetValue: copiedChannel.value
                            });
                        }
                    }
                });
            }

            fadeChannelsAndLabels(channelChanges, labelChanges, fixturesToUpdate);
            createFaders();
            updateFixtureLabelGrid();
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateSliders);
            }
            if (!labelAnimationFrameId) {
                labelAnimationFrameId = requestAnimationFrame(updateLabelBackgrounds);
            }
        }
        return;
    }

    // 'c': Open color menu
    if (event.key === 'c' && !isValueInput && !isSlider && !isColorMenu && !isSearchMenu) {
        if (activeElement.classList.contains('search-input')) {
            return;
        }
        event.preventDefault();
        closeSearchModal();
        openColorModal();
        return;
    }

    // 'b': Blackout selected fixtures or all fixtures
    if (event.key === 'b' && !isValueInput && !isSlider && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        if (selectedFixtures.size > 0) {
            blackoutSelectedFixtures();
        } else {
            blackout();
        }
        return;
    }

    // 'Escape': Deselect or close value input
    if (event.key === 'Escape' && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        if (isValueInput) {
            const container = activeElement.parentElement;
            const fader = container.querySelector('.fader');
            const faderIndex = parseInt(fader.id.replace('fader-', ''));
            activeElement.classList.remove('editable');
            activeElement.readOnly = true;
            activeElement.value = Math.round((faderValues[faderIndex] / 127) * 100);
        } else {
            deselectAll();
        }
        return;
    }

        // Cmd+A or Ctrl+A: Select all channels
        if ((event.metaKey || event.ctrlKey) && event.key === 'a' && !isValueInput) {
        event.preventDefault();
        selectedChannels.clear();
        selectedFixtures.clear();
        currentHighlightedFixture = null;
        for (let i = 1; i <= TOTAL_PAGES * FADERS_PER_PAGE; i++) {
            selectedChannels.add(i);
        }
        lastSelectedChannel = 1;

        allContainers.forEach(c => {
            const ch = parseInt(c.dataset.channel);
            c.classList.add('selected');
            updateFixtureTitle(c);
            highlightFixture(ch);
        });

        document.querySelectorAll('.fixture-group').forEach(group => {
            group.classList.remove('active', 'group-highlighted');
        });
        const pageStart = currentPage * FADERS_PER_PAGE + 1;
        const pageEnd = pageStart + FADERS_PER_PAGE - 1;
        selectedChannels.forEach(ch => {
            if (ch >= pageStart && ch <= pageEnd) {
                highlightFixture(ch);
            }
        });

        updateFixtureGroupPositions();
        return;
    }

    // Spacebar: Flash selected fixtures
    if (event.key === ' ' && !isValueInput) {
        event.preventDefault();
        let targetChannels = [];

        if (selectedFixtures.size > 0 && selectedChannels.size === 0) {
            selectedFixtures.forEach(fixtureStart => {
                const fixture = fixtures.find(f => f.from === fixtureStart);
                if (fixture && fixture.type in fixtureParameters) {
                    const params = fixtureParameters[fixture.type];
                    const shutterIdx = params.findIndex(p => p.name === 'Shutter');
                    const whiteIdx = params.findIndex(p => p.name === 'White');
                    if (shutterIdx !== -1) {
                        const ch = fixture.from + shutterIdx;
                        if (ch <= fixture.to) targetChannels.push(ch);
                    }
                    if (whiteIdx !== -1) {
                        const ch = fixture.from + whiteIdx;
                        if (ch <= fixture.to) targetChannels.push(ch);
                    }
                }
            });
        } else if (selectedChannels.size > 0) {
            targetChannels = Array.from(selectedChannels);
        }

        if (targetChannels.length === 0) return;

        const originalValues = new Map();
        targetChannels.forEach(ch => {
            const idx = ch - 1;
            originalValues.set(ch, faderValues[idx]);
        });

        const flashSequence = [
            { value: 0, delay: 100 },
            { value: 127, delay: 100 },
            { value: 0, delay: 100 },
            { value: 127, delay: 100 }
        ];

        let step = 0;
        function executeFlash() {
            if (step < flashSequence.length) {
                const { value } = flashSequence[step];
                targetChannels.forEach(ch => {
                    const idx = ch - 1;
                    faderValues[idx] = value;
                    const sliderId = `fader-${idx}`;
                    const midiChannel = Math.floor(idx / 128);
                    const ccNumber = idx % 128;

                    if (sliderStates.has(sliderId)) {
                        const state = sliderStates.get(sliderId);
                        state.current = value;
                        state.target = value;
                    } else {
                        sliderStates.set(sliderId, {
                            current: value,
                            target: value,
                            midiChannel: midiChannel,
                            ccNumber: ccNumber
                        });
                    }

                    const slider = document.getElementById(sliderId);
                    if (slider) {
                        slider.value = value;
                        const vi = slider.parentElement.querySelector('.fader-value');
                        if (vi && !vi.classList.contains('editable')) {
                            vi.value = Math.round((value / 127) * 100);
                        }
                    }

                    sendMIDICC(midiChannel, ccNumber, value);
                });
                setTimeout(() => {
                    step++;
                    executeFlash();
                }, flashSequence[step].delay);
            } else {
                targetChannels.forEach(ch => {
                    const idx = ch - 1;
                    const originalValue = originalValues.get(ch);
                    faderValues[idx] = originalValue;
                    const sliderId = `fader-${idx}`;
                    const midiChannel = Math.floor(idx / 128);
                    const ccNumber = idx % 128;

                    if (sliderStates.has(sliderId)) {
                        const state = sliderStates.get(sliderId);
                        state.current = originalValue;
                        state

        .target = originalValue;
                    } else {
                        sliderStates.set(sliderId, {
                            current: originalValue,
                            target: originalValue,
                            midiChannel: midiChannel,
                            ccNumber: ccNumber
                        });
                    }

                    const slider = document.getElementById(sliderId);
                    if (slider) {
                        slider.value = originalValue;
                        const vi = slider.parentElement.querySelector('.fader-value');
                        if (vi && !vi.classList.contains('editable')) {
                            vi.value = Math.round((originalValue / 127) * 100);
                        }
                    }

                    sendMIDICC(midiChannel, ccNumber, originalValue);
                });
            }
        }
        executeFlash();
        return;
    }

        // Arrow Left/Right: Navigate channels or fixtures
        if (['ArrowLeft', 'ArrowRight'].includes(event.key) && !isValueInput && !(event.metaKey || event.ctrlKey) && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        const sortedFixtures = getSortedFixtures();
        const validFixtures = sortedFixtures.filter(f => f !== null);
        const fixtureLabelGrid = document.getElementById('fixtureLabelGrid');
        const fixtureLabels = Array.from(fixtureLabelGrid.querySelectorAll('.fixture-label:not(.empty)'));

        // If no fixture is selected, select the first valid fixture on right arrow
        if (currentHighlightedFixture === null && selectedFixtures.size === 0 && validFixtures.length > 0) {
            if (event.key === 'ArrowRight') {
                const firstFixture = validFixtures[0];
                selectFixture(firstFixture.from);
                const selectedItem = fixtureLabels.find(label => parseInt(label.dataset.fixture) === firstFixture.from);
                if (selectedItem) {
                    selectedItem.focus();
                    selectedItem.scrollIntoView({ block: 'nearest' });
                }
                setTimeout(updateFixtureGroupPositions, 100);
            }
            return;
        }

        if (isFixtureLabelGrid || currentHighlightedFixture !== null) {
            // Navigate fixtures based on their sorted order
            const currentFixtureIndex = sortedFixtures.findIndex(f => f && f.from === currentHighlightedFixture);
            let newFixtureIndex = currentFixtureIndex;

            if (event.key === 'ArrowLeft') {
                do {
                    newFixtureIndex = newFixtureIndex > 0 ? newFixtureIndex - 1 : sortedFixtures.length - 1;
                } while (sortedFixtures[newFixtureIndex] === null && newFixtureIndex !== currentFixtureIndex);
            } else {
                do {
                    newFixtureIndex = newFixtureIndex < sortedFixtures.length - 1 ? newFixtureIndex + 1 : 0;
                } while (sortedFixtures[newFixtureIndex] === null && newFixtureIndex !== currentFixtureIndex);
            }

            // Prevent infinite loop if all fixtures are null
            if (sortedFixtures[newFixtureIndex] === null) return;

            const newFixture = sortedFixtures[newFixtureIndex];
            if (event.shiftKey) {
                // Track the first fixture selected in the shift range
                if (!window.shiftSelectionStart) {
                    window.shiftSelectionStart = currentHighlightedFixture;
                }
                const startIndex = sortedFixtures.findIndex(f => f && f.from === window.shiftSelectionStart);
                const endIndex = newFixtureIndex;
                selectedFixtures.clear();
                const minIndex = Math.min(startIndex, endIndex);
                const maxIndex = Math.max(startIndex, endIndex);
                for (let i = minIndex; i <= maxIndex; i++) {
                    if (sortedFixtures[i]) {
                        selectedFixtures.add(sortedFixtures[i].from);
                    }
                }
                currentHighlightedFixture = newFixture.from;
                document.querySelectorAll('.fixture-group').forEach(group => {
                    if (selectedFixtures.has(parseInt(group.dataset.fixture))) {
                        group.classList.add('group-highlighted');
                    } else {
                        group.classList.remove('group-highlighted');
                    }
                });
                document.querySelectorAll('.fixture-label').forEach(item => {
                    if (selectedFixtures.has(parseInt(item.dataset.fixture))) {
                        item.classList.add('group-highlighted');
                    } else {
                        item.classList.remove('group-highlighted');
                    }
                });
            } else {
                // Clear shift selection start when not holding shift
                window.shiftSelectionStart = null;
                selectedFixtures.clear();
                selectFixture(newFixture.from);
            }

            const selectedItem = fixtureLabels.find(label => parseInt(label.dataset.fixture) === newFixture.from);
            if (selectedItem) {
                selectedItem.focus();
                selectedItem.scrollIntoView({ block: 'nearest' });
            }
            setTimeout(updateFixtureGroupPositions, 100);
        } else {
            // Channel navigation
            const pageStart = currentPage * FADERS_PER_PAGE + 1;
            const pageEnd = pageStart + FADERS_PER_PAGE - 1;
            const allContainers = Array.from(document.querySelectorAll('.fader-container'));

            if (selectedChannels.size === 0 && currentIndex === -1) {
                selectContainer(allContainers[0]);
            } else {
                let nextIndex;
                if (event.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : allContainers.length - 1;
                } else {
                    nextIndex = currentIndex < allContainers.length - 1 ? currentIndex + 1 : 0;
                }

                if (event.shiftKey) {
                    const nextChannel = parseInt(allContainers[nextIndex].dataset.channel);
                    selectedChannels.add(nextChannel);
                    lastSelectedChannel = nextChannel;
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
                        const channels = group.dataset.channels.split(',').map(Number);
                        if (channels.some(ch => selectedChannels.has(ch))) {
                            group.classList.add('active');
                        } else {
                            group.classList.remove('active');
                        }
                    });
                    updateFixtureGroupPositions();
                } else {
                    selectContainer(allContainers[nextIndex]);
                }
            }
        }
        return;
    }

    // Arrow Up/Down: Adjust fader values
    if (['ArrowUp', 'ArrowDown'].includes(event.key) && !isValueInput && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        let step;
        if (event.shiftKey) {
            step = 127;
        } else if (event.metaKey || event.ctrlKey) {
            step = 32;
        } else if (event.altKey) {
            step = 13;
        } else {
            step = 6;
        }

        let targetChannels = [];
        if (selectedChannels.size > 0) {
            targetChannels = Array.from(selectedChannels);
        } else if (selectedFixtures.size > 0) {
            selectedFixtures.forEach(fixtureStart => {
                const fixture = fixtures.find(f => f.from === fixtureStart);
                if (fixture && fixture.type in fixtureParameters) {
                    const params = fixtureParameters[fixture.type];
                    const shutterIdx = params.findIndex(p => p.name === 'Shutter');
                    if (shutterIdx !== -1) {
                        const shutterChannel = fixture.from + shutterIdx;
                        if (shutterChannel <= fixture.to) {
                            targetChannels.push(shutterChannel);
                        }
                    }
                }
            });
        }

        if (targetChannels.length === 0) return;

        targetChannels.forEach(ch => {
            const idx = ch - 1;
            const sliderId = `fader-${idx}`;
            const midiChannel = Math.floor(idx / 128);
            const ccNumber = idx % 128;
            let currentValue = faderValues[idx];

            if (event.key === 'ArrowUp') {
                currentValue = event.shiftKey ? 127 : Math.min(127, currentValue + step);
            } else {
                currentValue = event.shiftKey ? 0 : Math.max(0, currentValue - step);
            }

            faderValues[idx] = currentValue;

            if (sliderStates.has(sliderId)) {
                const state = sliderStates.get(sliderId);
                state.target = currentValue;
            } else {
                sliderStates.set(sliderId, {
                    current: currentValue,
                    target: currentValue,
                    midiChannel: midiChannel,
                    ccNumber: ccNumber
                });
            }

            const slider = document.getElementById(sliderId);
            if (slider) {
                slider.value = currentValue;
                const vi = slider.parentElement.querySelector('.fader-value');
                if (vi && !vi.classList.contains('editable')) {
                    vi.value = Math.round((currentValue / 127) * 100);
                }
            }

            sendMIDICC(midiChannel, ccNumber, currentValue);
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateSliders);
            }
        });
        return;
    }

        // Cmd+Arrow Left/Right or Ctrl+Arrow Left/Right: Change page
        if ((event.metaKey || event.ctrlKey) && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        if (event.key === 'ArrowLeft' && currentPage > 0) {
            changePage(currentPage - 1);
            document.querySelectorAll('.fixture-group').forEach(group => {
                if (selectedFixtures.has(parseInt(group.dataset.fixture))) {
                    group.classList.add('group-highlighted');
                } else {
                    group.classList.remove('group-highlighted');
                }
            });
            setTimeout(updateFixtureGroupPositions, 100);
        } else if (event.key === 'ArrowRight' && currentPage < TOTAL_PAGES - 1) {
            changePage(currentPage + 1);
            document.querySelectorAll('.fixture-group').forEach(group => {
                if (selectedFixtures.has(parseInt(group.dataset.fixture))) {
                    group.classList.add('group-highlighted');
                } else {
                    group.classList.remove('group-highlighted');
                }
            });
            setTimeout(updateFixtureGroupPositions, 100);
        }
        return;
    }

    // Number keys: Edit fader value
    if (/[0-9]/.test(event.key) && selectedChannels.size > 0 && !isValueInput && !isColorMenu && !isSearchMenu) {
        event.preventDefault();
        const container = allContainers.find(c => parseInt(c.dataset.channel) === lastSelectedChannel);
        if (container) {
            const valueInput = container.querySelector('.fader-value');
            valueInput.classList.add('editable');
            valueInput.readOnly = false;
            valueInput.focus();
            valueInput.value = event.key;
            valueInput.setSelectionRange(valueInput.value.length, valueInput.value.length);
        }
        return;
    }

    // Enter in value input: Apply fader value
    if (event.key === 'Enter' && isValueInput) {
        event.preventDefault();
        const container = activeElement.parentElement;
        const fader = container.querySelector('.fader');
        const faderIndex = parseInt(fader.id.replace('fader-', ''));
        const inputValue = parseInt(activeElement.value);

        if (!isNaN(inputValue)) {
            const newValue = Math.min(127, Math.max(0, Math.round((inputValue / 100) * 127)));
            const targetChannels = selectedChannels.size > 0 ? Array.from(selectedChannels) : [faderIndex + 1];

            targetChannels.forEach(ch => {
                const idx = ch - 1;
                faderValues[idx] = newValue;
                const sliderId = `fader-${idx}`;
                const midiChannel = Math.floor(idx / 128);
                const ccNumber = idx % 128;

                if (sliderStates.has(sliderId)) {
                    const state = sliderStates.get(sliderId);
                    state.target = newValue;
                } else {
                    sliderStates.set(sliderId, {
                        current: newValue,
                        target: newValue,
                        midiChannel: midiChannel,
                        ccNumber: ccNumber
                    });
                }

                const slider = document.getElementById(sliderId);
                if (slider) {
                    slider.value = newValue;
                    const vi = slider.parentElement.querySelector('.fader-value');
                    if (vi) {
                        vi.value = Math.round((newValue / 127) * 100);
                        vi.classList.remove('editable');
                        vi.readOnly = true;
                    }
                }

                sendMIDICC(midiChannel, ccNumber, newValue);
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(updateSliders);
                }
            });
        }
        activeElement.classList.remove('editable');
        activeElement.readOnly = true;
        return;
    }
});

function updateColorSelection(results, selectedIndex) {
    const resultItems = results.querySelectorAll('.color-result:not(.disabled), .search-result:not(.disabled)');
    resultItems.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

function updateSliderState(idx, value) {
    const sliderId = `fader-${idx}`;
    if (sliderStates.has(sliderId)) {
        const state = sliderStates.get(sliderId);
        state.current = value;
        state.target = value;
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.value = value;
            const valueInput = slider.parentElement.querySelector('.fader-value');
            if (valueInput) {
                valueInput.value = Math.round((value / 127) * 100);
            }
        }
    } else {
        sliderStates.set(sliderId, {
            current: value,
            target: value,
            midiChannel: Math.floor(idx / 128),
            ccNumber: idx % 128
        });
    }
}