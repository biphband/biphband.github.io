const titleMap = {
'E': 'English', 'H': 'History', 'P': 'Physics', 'C': 'Chemistry', 'I': 'Chinese',
'O': 'Economics', 'B': 'Biology', 'M': 'Math', 'Q': 'Honors Physics',
'R': 'Honors Biology', 'S': 'Honors Chemistry', 'A': 'Pre-Calculus A',
'U': 'Pre-Calculus B', 'V': 'Pre-Calculus AB', 'W': 'Chinese 9',
'X': 'Chinese 10', 'Y': 'Chinese 11'
};

const labelMap = {
'A': 'Attendance', 'D': 'Distribution of Exam', 'B': 'BIBSC Section',
'T': 'Exam Transition', 'C': 'Common Section', 'M': 'Multiple Choice',
'F': 'Free Response', 'E': 'Essay', 'R': 'Break', 'Z': 'Custom'
};

const notesMap = {
'X': '',
'C': 'Clear your desk except for a pencil and eraser\nAny water, pencil cases, etc. can be placed on the floor next to you',
'D': 'Do not flip over your exam booklet until instructed to do so',
'N': 'Confirm that your name is on your exam booklet',
'B': 'During the break:\n✅ Go to the restroom\n✅ Stretch your legs\n✅ Mentally prepare\n\n❌ Check devices, notes\n❌ Discuss test details\n❌ Open backpacks',
'P': 'Pencils down. Prepare exams for collection.'
};

const colorMap = {
'B': { light: '#1e90ff', dark: '#0e3c6a', class: 'blue-gradient', text: 'white' },
'C': { light: '#32cd32', dark: '#195819', class: 'green-gradient', text: 'white' },
'R': { light: '#ff4500', dark: '#733119', class: 'red-gradient', text: 'white' },
'P': { light: '#9932cc', dark: '#4b0082', class: 'purple-gradient', text: 'white' },
'G': { light: '#ffffff', dark: '#d3d3d3', class: 'gray-gradient', text: 'black' },
'K': { light: '#333333', dark: '#000000', class: 'charcoal-gradient', text: 'white' }
};

const defaultColors = {
'A': 'G', 'D': 'G', 'B': 'B', 'T': 'G', 'C': 'P', 'M': 'B', 'F': 'P', 'E': 'P', 'R': 'G', 'Z': 'K'
};

const timeMap = new Map();
for (let hour = 0; hour < 24; hour++) {
for (let minute = 0; minute < 60; minute += 10) {
  const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const code = String(hour * 6 + minute / 10).padStart(2, '0');
  timeMap.set(code, time);
  timeMap.set(time, code);
}
}

let sections = [
{ id: 1, label: 'A', time: '08:00', notes: 'C', color: 'G' },
{ id: 2, label: 'D', time: '08:10', notes: 'D', color: 'G' },
{ id: 3, label: 'B', time: '08:20', notes: 'N', color: 'B' },
{ id: 4, label: 'T', time: '09:20', notes: 'B', color: 'G' },
{ id: 5, label: 'C', time: '09:30', notes: 'N', color: 'P' },
{ id: 6, label: 'Z', time: '09:40', notes: 'P', color: 'K' }
];
let nextId = 7;
let schedule = [];
let timer;
let title = 'B';
let customTitle = '';
let hasPlayedSound = {};
let milestoneSounds = {};
let audioContext;

function populateTimeDropdowns() {
const times = Array.from(timeMap.entries())
  .filter(([key]) => key.length === 2)
  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
sections.forEach(section => {
  const select = document.getElementById(`time-${section.id}`);
  if (select) {
    select.innerHTML = times.map(([code, time]) =>
      `<option value="${code}" ${time === section.time ? 'selected' : ''}>${time}</option>`
    ).join('');
  }
});
}

function setupColorPickers() {
sections.forEach(section => {
  const picker = document.getElementById(`color-picker-${section.id}`);
  const grid = document.getElementById(`color-grid-${section.id}`);
  if (picker && grid) {
    picker.style.backgroundColor = colorMap[section.color].light;
    picker.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll('.color-grid').forEach(g => {
        if (g !== grid) g.style.display = 'none';
      });
      grid.style.display = grid.style.display === 'grid' ? 'none' : 'grid';
    };
    grid.querySelectorAll('.color-option').forEach(option => {
      option.style.backgroundColor = colorMap[option.dataset.value].light;
      option.onclick = (e) => {
        e.stopPropagation();
        section.color = option.dataset.value;
        picker.style.backgroundColor = colorMap[section.color].light;
        grid.style.display = 'none';
      };
    });
  }
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.color-picker') && !e.target.closest('.color-grid')) {
    document.querySelectorAll('.color-grid').forEach(grid => {
      grid.style.display = 'none';
    });
  }
});
}

function setupCustomInputs() {
const titleSelect = document.getElementById('title-input');
const customTitleInput = document.getElementById('custom-title-input');
titleSelect.addEventListener('change', () => {
  customTitleInput.style.display = titleSelect.value === 'Z' ? 'block' : 'none';
  if (titleSelect.value !== 'Z') customTitleInput.value = '';
});

sections.forEach(section => {
  const labelSelect = document.getElementById(`label-${section.id}`);
  const notesSelect = document.getElementById(`notes-${section.id}`);
  const customNotesInput = document.getElementById(`custom-notes-${section.id}`);
  if (notesSelect && customNotesInput) {
    notesSelect.addEventListener('change', () => {
      customNotesInput.style.display = notesSelect.value === 'Z' ? 'block' : 'none';
      if (notesSelect.value !== 'Z') customNotesInput.value = '';
    });
  }
  if (labelSelect) {
    labelSelect.addEventListener('change', () => {
      const newLabel = labelSelect.value;
      section.label = newLabel;
      if (defaultColors[newLabel]) {
        section.color = defaultColors[newLabel];
        const picker = document.getElementById(`color-picker-${section.id}`);
        if (picker) picker.style.backgroundColor = colorMap[section.color].light;
      }
    });
  }
});
}

function playBeep(frequency = 1000, duration = 0.11) {
if (!audioContext) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
}
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0, audioContext.currentTime);
gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
oscillator.start();
oscillator.stop(audioContext.currentTime + duration);
}

function playEndSound() {
playBeep(1000, 0.11);
setTimeout(() => playBeep(1000, 0.11), 150);
}

function playMilestoneBeep() {
playBeep(800, 0.1);
}

function formatDate(date) {
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = date.getDate();
const suffix = (day % 10 === 1 && day !== 11) ? 'st' : (day % 10 === 2 && day !== 12) ? 'nd' : (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
}

function deleteSection(id) {
if (sections.length <= 2 || id === 6) {
  alert('At least one section is required before End of Exam.');
  return;
}
sections = sections.filter(section => section.id !== id);
const sectionElement = document.querySelector(`.form-section[data-id="${id}"]`);
if (sectionElement) sectionElement.remove();
}

function addSection() {
const endOfExam = sections.find(s => s.id === 6);
sections = sections.filter(s => s.id !== 6);
const newSection = { id: nextId, label: 'A', time: '00:00', notes: 'X', color: 'G' };
sections.push(newSection);
sections.push(endOfExam);
const sectionsContainer = document.getElementById('sections-container');
const endOfExamElement = sectionsContainer.querySelector(`.form-section[data-id="6"]`);
sectionsContainer.removeChild(endOfExamElement);
const newSectionElement = document.createElement('div');
newSectionElement.className = 'form-section';
newSectionElement.dataset.id = nextId;
newSectionElement.innerHTML = `
  <button class="delete-section" onclick="deleteSection(${nextId})">x</button>
  <div class="color-picker" id="color-picker-${nextId}" style="background-color: #ffffff;"></div>
  <div class="color-grid" id="color-grid-${nextId}">
    <div class="color-option G" data-value="G"></div>
    <div class="color-option B" data-value="B"></div>
    <div class="color-option C" data-value="C"></div>
    <div class="color-option R" data-value="R"></div>
    <div class="color-option P" data-value="P"></div>
    <div class="color-option K" data-value="K"></div>
  </div>
  <select id="label-${nextId}">
    <option value="A">Attendance</option>
    <option value="D">Distribution of Exam</option>
    <option value="B">BIBSC Section</option>
    <option value="T">Exam Transition</option>
    <option value="C">Common Section</option>
    <option value="M">Multiple Choice</option>
    <option value="F">Free Response</option>
    <option value="E">Essay</option>
    <option value="R">Break</option>
    <option value="Z">Custom</option>
  </select>
  <select id="time-${nextId}">
    ${Array.from(timeMap.entries())
      .filter(([key]) => key.length === 2)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([code, time]) => `<option value="${code}">${time}</option>`)
      .join('')}
  </select>
  <select id="notes-${nextId}">
    <option value="X"></option>
    <option value="C">Clear your desk...</option>
    <option value="D">Do not flip over...</option>
    <option value="N">Confirm that your...</option>
    <option value="B">During the break...</option>
    <option value="P">Pencils down...</option>
    <option value="Z">Custom</option>
  </select>
  <input type="text" id="custom-notes-${nextId}" style="display: none;" placeholder="Enter custom notes">
`;
sectionsContainer.appendChild(newSectionElement);
sectionsContainer.appendChild(endOfExamElement);
populateTimeDropdowns();
setupColorPickers();
setupCustomInputs();
nextId++;
}

function generateShareUrl() {
const titleCode = document.getElementById('title-input').value || 'B';
let config = titleCode;
if (titleCode === 'Z') {
  const customTitleText = document.getElementById('custom-title-input').value || '';
  config += `|${encodeURIComponent(customTitleText)}`;
}
const sectionsData = sections.map(section => {
  const label = document.getElementById(`label-${section.id}`)?.value || 'A';
  const timeCode = document.getElementById(`time-${section.id}`)?.value || '00';
  let notes = document.getElementById(`notes-${section.id}`)?.value || 'X';
  const color = section.color || 'G';
  let sectionData = `${label}${timeCode}${notes}${color}`;
  if (notes === 'Z') {
    const customNotes = document.getElementById(`custom-notes-${section.id}`)?.value || '';
    sectionData += `|${encodeURIComponent(customNotes)}`;
  }
  return sectionData;
}).join('');
config += sectionsData;
return `${window.location.origin}${window.location.pathname}?config=${encodeURIComponent(config)}`;
}

document.getElementById('add-section').addEventListener('click', addSection);

document.getElementById('preview-share-btn').addEventListener('click', () => {
const currentDate = new Date().toLocaleDateString('en-CA');
title = document.getElementById('title-input').value || 'B';
if (title === 'Z') {
  customTitle = document.getElementById('custom-title-input').value || 'Custom Exam';
} else {
  customTitle = '';
}
schedule = [];
hasPlayedSound = {};
milestoneSounds = {};
for (let section of sections) {
  const labelElement = document.getElementById(`label-${section.id}`);
  const timeElement = document.getElementById(`time-${section.id}`);
  const notesElement = document.getElementById(`notes-${section.id}`);
  if (!labelElement || !timeElement || !notesElement) {
    alert(`Missing input elements for section ${section.id}. Please check the form.`);
    return;
  }
  const label = labelElement.value || 'A';
  const timeCode = timeElement.value;
  const time = timeMap.get(timeCode);
  if (!timeCode || !time) {
    alert(`Invalid time for ${labelMap[label] || 'Custom Section'}. Select a valid time.`);
    return;
  }
  let notes = notesElement.value || 'X';
  const color = section.color || 'G';
  if (notes === 'Z') {
    const customNotes = document.getElementById(`custom-notes-${section.id}`)?.value || '';
    notesMap['Z' + section.id] = customNotes;
    notes = 'Z' + section.id;
  }
  schedule.push({ id: section.id, label, time, notes, color });
  hasPlayedSound[section.id] = false;
  milestoneSounds[section.id] = { '15min': false, '10min': false, '5min': false, '1min': false };
}
for (let i = 1; i < schedule.length; i++) {
  const prevTime = new Date(`${currentDate}T${schedule[i-1].time}:00`);
  const currTime = new Date(`${currentDate}T${schedule[i].time}:00`);
  if (currTime <= prevTime) {
    alert('Times must be in chronological order.');
    return;
  }
}
audioContext = new (window.AudioContext || window.webkitAudioContext)();
audioContext.resume().then(() => console.log('Audio context resumed'));
const url = generateShareUrl();
window.open(url, '_blank');
});

window.addEventListener('load', () => {
populateTimeDropdowns();
setupColorPickers();
setupCustomInputs();
const urlParams = new URLSearchParams(window.location.search);
const configParam = urlParams.get('config');
if (configParam) {
  try {
    const config = decodeURIComponent(configParam);
    if (config.length < 1) throw new Error('Config string too short');
    
    let index = 0;
    const titleCode = config[index++];
    let customTitleText = '';
    if (titleCode === 'Z') {
      if (config[index] !== '|') throw new Error('Expected | after custom title code');
      index++;
      const endOfTitle = config.slice(index).search(/[ADBTCMFERZ]/) + index;
      if (endOfTitle === index - 1) throw new Error('No section data found after custom title');
      customTitleText = decodeURIComponent(config.slice(index, endOfTitle));
      titleMap['Z'] = customTitleText;
      index = endOfTitle;
    }
    if (!titleMap[titleCode] && titleCode !== 'Z') {
      throw new Error(`Invalid title code: ${titleCode}`);
    }
    title = titleCode;
    customTitle = titleCode === 'Z' ? customTitleText : '';
    document.getElementById('title-input').value = titleCode;
    if (titleCode === 'Z') {
      document.getElementById('custom-title-input').value = customTitleText;
      document.getElementById('custom-title-input').style.display = 'block';
    }

    sections = [];
    const sectionsContainer = document.getElementById('sections-container');
    sectionsContainer.innerHTML = '';
    nextId = 1;
    while (index < config.length) {
      if (index + 4 > config.length) throw new Error(`Incomplete section data at index ${index}`);
      const label = config[index++];
      const timeCode = config.slice(index, index + 2);
      index += 2;
      let notes = config[index++];
      let color = config[index++];
      let customNotes = '';
      if (notes === 'Z' && index < config.length && config[index] === '|') {
        index++;
        const endOfNotes = config.slice(index).search(/[ADBTCMFERZ]/) + index;
        customNotes = decodeURIComponent(config.slice(index, endOfNotes === index - 1 ? config.length : endOfNotes));
        notesMap['Z' + nextId] = customNotes;
        notes = 'Z' + nextId;
        index = endOfNotes === index - 1 ? config.length : endOfNotes;
      }
      const time = timeMap.get(timeCode);
      if (!labelMap[label] && label !== 'Z') throw new Error(`Invalid label code for section ${nextId}: ${label}`);
      if (!time) throw new Error(`Invalid time code for section ${nextId}: ${timeCode}`);
      if (!notesMap[notes] && !notes.startsWith('Z')) throw new Error(`Invalid notes code for section ${nextId}: ${notes}`);
      if (!colorMap[color]) throw new Error(`Invalid color code for section ${nextId}: ${color}`);
      
      const sectionId = (label === 'Z' && index >= config.length) ? 6 : nextId;
      sections.push({ id: sectionId, label, time, notes, color });
      const newSection = document.createElement('div');
      newSection.className = 'form-section';
      newSection.dataset.id = sectionId;
      newSection.innerHTML = `
        <button class="delete-section" onclick="deleteSection(${sectionId})" ${sectionId === 6 ? 'style="visibility: hidden;"' : ''}>x</button>
        <div class="color-picker" id="color-picker-${sectionId}" style="background-color: ${colorMap[color].light};"></div>
        <div class="color-grid" id="color-grid-${sectionId}">
          <div class="color-option G" data-value="G"></div>
          <div class="color-option B" data-value="B"></div>
          <div class="color-option C" data-value="C"></div>
          <div class="color-option R" data-value="R"></div>
          <div class="color-option P" data-value="P"></div>
          <div class="color-option K" data-value="K"></div>
        </div>
        <select id="label-${sectionId}">
          <option value="A" ${label === 'A' ? 'selected' : ''}>Attendance</option>
          <option value="D" ${label === 'D' ? 'selected' : ''}>Distribution of Exam</option>
          <option value="B" ${label === 'B' ? 'selected' : ''}>BIBSC Section</option>
          <option value="T" ${label === 'T' ? 'selected' : ''}>Exam Transition</option>
          <option value="C" ${label === 'C' ? 'selected' : ''}>Common Section</option>
          <option value="M" ${label === 'M' ? 'selected' : ''}>Multiple Choice</option>
          <option value="F" ${label === 'F' ? 'selected' : ''}>Free Response</option>
          <option value="E" ${label === 'E' ? 'selected' : ''}>Essay</option>
          <option value="R" ${label === 'R' ? 'selected' : ''}>Break</option>
          <option value="Z" ${label === 'Z' ? 'selected' : ''}>Custom</option>
        </select>
        <select id="time-${sectionId}">
          ${Array.from(timeMap.entries())
            .filter(([key]) => key.length === 2)
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .map(([code, t]) => `<option value="${code}" ${code === timeCode ? 'selected' : ''}>${t}</option>`)
            .join('')}
        </select>
        <select id="notes-${sectionId}">
          <option value="X" ${notes === 'X' ? 'selected' : ''}></option>
          <option value="C" ${notes === 'C' ? 'selected' : ''}>Clear your desk...</option>
          <option value="D" ${notes === 'D' ? 'selected' : ''}>Do not flip over...</option>
          <option value="N" ${notes === 'N' ? 'selected' : ''}>Confirm that your...</option>
          <option value="B" ${notes === 'B' ? 'selected' : ''}>During the break...</option>
          <option value="P" ${notes === 'P' ? 'selected' : ''}>Pencils down...</option>
          <option value="Z${sectionId}" ${notes.startsWith('Z') ? 'selected' : ''}>Custom</option>
        </select>
        <input type="text" id="custom-notes-${sectionId}" style="display: ${notes.startsWith('Z') ? 'block' : 'none'};" value="${customNotes}" placeholder="Enter custom notes">
      `;
      sectionsContainer.appendChild(newSection);
      if (sectionId !== 6) nextId++;
    }
    schedule = sections.map(section => ({ ...section }));
    schedule.forEach(section => {
      hasPlayedSound[section.id] = false;
      milestoneSounds[section.id] = { '15min': false, '10min': false, '5min': false, '1min': false };
    });
    populateTimeDropdowns();
    setupColorPickers();
    setupCustomInputs();
    document.getElementById('form-screen').style.display = 'none';
    document.getElementById('timer-screen').style.display = 'block';
    document.body.classList.add('timer-active');
    document.getElementById('title-display').textContent = `${title === 'Z' ? customTitle : titleMap[title]} Exam`;
    document.getElementById('date-display').textContent = formatDate(new Date());
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  } catch (e) {
    console.error('Invalid config in URL:', e.message);
    alert('Invalid configuration in URL. Showing default form.');
    populateTimeDropdowns();
    setupColorPickers();
    setupCustomInputs();
  }
}
});

function updateCountdown() {
const now = new Date();
const container = document.querySelector('.container');
const statusText = document.getElementById('status');
const countdownText = document.getElementById('countdown');
const notesDisplay = document.getElementById('notes-display');
const logoImage = document.getElementById('logo-image');

const currentDate = now.toLocaleDateString('en-CA');

if (!schedule || schedule.length === 0) {
  statusText.style.display = 'none';
  countdownText.className = 'message';
  countdownText.textContent = 'No sections configured.';
  notesDisplay.textContent = '';
  logoImage.src = 'blacklogo.png';
  document.body.className = 'gray-gradient timer-active';
  container.style.color = 'black';
  clearInterval(timer);
  return;
}

const firstTime = new Date(`${currentDate}T${schedule[0].time}:00`);
const midnight = new Date(`${currentDate}T00:00:00`);

if (now >= midnight && now < firstTime) {
  document.body.className = `${colorMap[schedule[0].color].class} timer-active`;
  container.style.color = colorMap[schedule[0].color].text;
  logoImage.src = colorMap[schedule[0].color].text === 'white' ? 'whitelogo.png' : 'blacklogo.png';
  statusText.innerHTML = `${labelMap[schedule[0].label] || notesMap[schedule[0].notes] || 'Custom Section'} starts in:`;
  notesDisplay.textContent = notesMap[schedule[0].notes] || '';
  const timeLeft = firstTime - now;
  updateTimerDisplay(timeLeft, countdownText);
  return;
}

let currentSection = null;
let nextTime = null;
let nextSection = null;
for (let i = 0; i < schedule.length; i++) {
  const startTime = new Date(`${currentDate}T${schedule[i].time}:00`);
  const endTime = (i + 1 < schedule.length)
    ? new Date(`${currentDate}T${schedule[i + 1].time}:00`)
    : new Date(startTime.getTime() + 1000);
  if (now >= startTime && now < endTime) {
    currentSection = schedule[i];
    nextTime = endTime;
    nextSection = i + 1 < schedule.length ? schedule[i + 1] : null;
    break;
  } else if (now >= endTime && schedule[i].label === 'Z' && !schedule[i].notes.startsWith('Z')) {
    document.body.className = `${colorMap[schedule[i].color].class} timer-active`;
    container.style.color = colorMap[schedule[i].color].text;
    logoImage.src = colorMap[schedule[i].color].text === 'white' ? 'whitelogo.png' : 'blacklogo.png';
    statusText.style.display = 'none';
    countdownText.className = 'message';
    countdownText.textContent = 'Pencils down. Prepare tests for collection.';
    notesDisplay.textContent = notesMap[schedule[i].notes] || '';
    if (!hasPlayedSound[schedule[i].id]) {
      playEndSound();
      hasPlayedSound[schedule[i].id] = true;
    }
    clearInterval(timer);
    return;
  }
}

if (currentSection) {
  if (currentSection.label === 'Z' && !currentSection.notes.startsWith('Z')) {
    document.body.className = `${colorMap[currentSection.color].class} timer-active`;
    container.style.color = colorMap[currentSection.color].text;
    logoImage.src = colorMap[currentSection.color].text === 'white' ? 'whitelogo.png' : 'blacklogo.png';
    statusText.style.display = 'none';
    countdownText.className = 'message';
    countdownText.textContent = 'Pencils down. Prepare tests for collection.';
    notesDisplay.textContent = notesMap[currentSection.notes] || '';
    if (!hasPlayedSound[currentSection.id]) {
      playEndSound();
      hasPlayedSound[currentSection.id] = true;
    }
    clearInterval(timer);
    return;
  }

  const timeLeft = nextTime - now;
  const secondsLeft = Math.floor(timeLeft / 1000);

  if (secondsLeft <= 0 && !hasPlayedSound[currentSection.id]) {
    playEndSound();
    hasPlayedSound[currentSection.id] = true;
    if (nextSection) {
      document.body.className = `${colorMap[nextSection.color].class} timer-active`;
      container.style.color = colorMap[nextSection.color].text;
      logoImage.src = colorMap[nextSection.color].text === 'white' ? 'whitelogo.png' : 'blacklogo.png';
      statusText.textContent = labelMap[nextSection.label] || notesMap[nextSection.notes] || 'Custom Section';
      notesDisplay.textContent = notesMap[nextSection.notes] || '';
      milestoneSounds[nextSection.id] = { '15min': false, '10min': false, '5min': false, '1min': false };
      updateTimerDisplay(timeLeft, countdownText);
    }
    return;
  }

  document.body.className = `${colorMap[currentSection.color].class} timer-active`;
  container.style.color = colorMap[currentSection.color].text;
  logoImage.src = colorMap[currentSection.color].text === 'white' ? 'whitelogo.png' : 'blacklogo.png';
  statusText.textContent = labelMap[currentSection.label] || notesMap[currentSection.notes] || 'Custom Section';
  notesDisplay.textContent = notesMap[currentSection.notes] || '';

  if (secondsLeft <= 15 * 60 && secondsLeft > 14 * 60 + 59 && !milestoneSounds[currentSection.id]['15min']) {
    playMilestoneBeep();
    milestoneSounds[currentSection.id]['15min'] = true;
  } else if (secondsLeft <= 10 * 60 && secondsLeft > 9 * 60 + 59 && !milestoneSounds[currentSection.id]['10min']) {
    playMilestoneBeep();
    milestoneSounds[currentSection.id]['10min'] = true;
  } else if (secondsLeft <= 5 * 60 && secondsLeft > 4 * 60 + 59 && !milestoneSounds[currentSection.id]['5min']) {
    playMilestoneBeep();
    milestoneSounds[currentSection.id]['5min'] = true;
  } else if (secondsLeft <= 1 * 60 && secondsLeft > 59 && !milestoneSounds[currentSection.id]['1min']) {
    playMilestoneBeep();
    milestoneSounds[currentSection.id]['1min'] = true;
  }

  updateTimerDisplay(timeLeft, countdownText);
} else {
  const lastSection = schedule[schedule.length - 1];
  const lastTime = new Date(`${currentDate}T${lastSection.time}:00`);
  if (now >= lastTime && lastSection.label === 'Z' && !lastSection.notes.startsWith('Z')) {
    document.body.className = `${colorMap[lastSection.color].class} timer-active`;
    container.style.color = colorMap[lastSection.color].text;
    logoImage.src = colorMap[lastSection.color].text === 'white' ? 'whitelogo.png' : 'blacklogo.png';
    statusText.style.display = 'none';
    countdownText.className = 'message';
    countdownText.textContent = 'Pencils down. Prepare tests for collection.';
    notesDisplay.textContent = notesMap[lastSection.notes] || '';
    if (!hasPlayedSound[lastSection.id]) {
      playEndSound();
      hasPlayedSound[lastSection.id] = true;
    }
    clearInterval(timer);
  } else {
    document.body.className = 'gray-gradient timer-active';
    container.style.color = 'black';
    logoImage.src = 'blacklogo.png';
    statusText.style.display = 'none';
    countdownText.className = 'message';
    countdownText.textContent = 'Waiting for exam to start...';
    notesDisplay.textContent = '';
    clearInterval(timer);
  }
}
}

function updateTimerDisplay(timeLeft, element) {
if (timeLeft <= 0) {
  element.textContent = '00:00';
  return;
}
const minutes = Math.floor(timeLeft / 1000 / 60);
const seconds = Math.floor((timeLeft / 1000) % 60);
element.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}