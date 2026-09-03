/**
 * Shared audition recorder core.
 * Instruments call AuditionRecorder.init(config)
 */
window.AuditionRecorder = (() => {
  "use strict";

  // ---------- State ----------
  let config = null;
  let currentTrack = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let recordedBlobs = {};
  let recordedUrls = {};
  let durations = {};
  let isRecording = false;
  let isPlaying = false;
  let currentAudio = null;
  let stream = null;
  let recordStartTime = 0;

  // Metronome
  let audioCtx = null;
  let metroTimeout = null;
  let nextClickTime = 0;
  let metroTempo = 120;
  let metroRunning = false;
  let metroStopAfter = null; // timestamp to auto-stop metro (for short intro)

  // DOM refs (filled in init)
  let panel, panelTitle, tempoRow, tempoLabel, tempoSlider, tempoVal;
  let btnStart, btnStop, btnPlay, statusLine, trackList;
  let btnDownloadAll, btnShare, micWarning, closePanelBtn, overlayBtns;
  let headerTitle, headerSub;

  // ---------- Helpers ----------
  function formatTime(sec) {
    if (sec == null || !isFinite(sec) || isNaN(sec) || sec < 0) return "—";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function updateOverlayState(trackId) {
    const btn = overlayBtns[trackId];
    if (!btn) return;
    btn.classList.remove("recording", "done", "idle");
    if (isRecording && currentTrack === +trackId) {
      btn.classList.add("recording");
      btn.innerHTML = ""; // solid red circle via CSS
    } else if (recordedBlobs[trackId]) {
      btn.classList.add("done");
      btn.innerHTML = "✓";
    } else {
      btn.classList.add("idle");
      btn.innerHTML = String(trackId);
    }
  }

  function updateAllOverlays() {
    Object.keys(overlayBtns).forEach((id) => updateOverlayState(id));
  }

  function setStatus(html) {
    statusLine.innerHTML = html;
  }

  // ---------- Metronome ----------
  function ensureAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function scheduleClick(time) {
    const ctx = ensureAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 1000;
    gain.gain.setValueAtTime(0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.start(time);
    osc.stop(time + 0.06);
  }

  function metroScheduler() {
    if (!metroRunning) return;
    const ctx = ensureAudioCtx();
    if (metroStopAfter && ctx.currentTime >= metroStopAfter) {
      stopMetronome();
      return;
    }
    while (nextClickTime < ctx.currentTime + 0.1) {
      if (metroStopAfter && nextClickTime >= metroStopAfter) break;
      scheduleClick(nextClickTime);
      nextClickTime += 60.0 / metroTempo;
    }
    metroTimeout = setTimeout(metroScheduler, 50);
  }

  function startMetronome(bpm, stopAfterBeats = null) {
    stopMetronome();
    metroTempo = bpm;
    ensureAudioCtx();
    nextClickTime = audioCtx.currentTime + 0.05;
    metroRunning = true;
    if (stopAfterBeats != null && stopAfterBeats > 0) {
      metroStopAfter = nextClickTime + (stopAfterBeats * 60) / bpm;
    } else {
      metroStopAfter = null;
    }
    metroScheduler();
  }

  function stopMetronome() {
    metroRunning = false;
    metroStopAfter = null;
    if (metroTimeout) {
      clearTimeout(metroTimeout);
      metroTimeout = null;
    }
  }

  // ---------- Recording ----------
  async function getMicStream() {
    if (stream) return stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      micWarning.style.display = "none";
      return stream;
    } catch (err) {
      micWarning.style.display = "block";
      setStatus("Microphone permission denied. Please allow access and reload.");
      throw err;
    }
  }

  // Convert any audio blob → MP3 using lamejs
  async function blobToMp3(blob) {
    const arrayBuf = await blob.arrayBuffer();
    const ctx = ensureAudioCtx();
    const audioBuf = await ctx.decodeAudioData(arrayBuf.slice(0));

    // Mix down to mono for smaller files / simpler encoding
    const samples = audioBuf.getChannelData(0);
    const sampleRate = audioBuf.sampleRate;

    // lamejs expects Int16 samples
    const int16 = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    const mp3enc = new lamejs.Mp3Encoder(1, sampleRate, 128); // mono, 128 kbps
    const blockSize = 1152;
    const mp3Data = [];
    for (let i = 0; i < int16.length; i += blockSize) {
      const chunk = int16.subarray(i, i + blockSize);
      const mp3buf = mp3enc.encodeBuffer(chunk);
      if (mp3buf.length > 0) mp3Data.push(mp3buf);
    }
    const end = mp3enc.flush();
    if (end.length > 0) mp3Data.push(end);

    return new Blob(mp3Data, { type: "audio/mpeg" });
  }

  async function startRecording(trackId) {
    if (isRecording) return;
    const t = config.tracks[trackId];
    if (!t) return;

    try {
      const mic = await getMicStream();
      audioChunks = [];

      let mime = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mime)) {
        mime = "audio/webm";
        if (!MediaRecorder.isTypeSupported(mime)) {
          mime = "audio/mp4";
          if (!MediaRecorder.isTypeSupported(mime)) mime = "";
        }
      }

      mediaRecorder = new MediaRecorder(mic, mime ? { mimeType: mime } : undefined);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunks.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const elapsed = (performance.now() - recordStartTime) / 1000;
        setStatus("Encoding MP3…");
        try {
          const rawBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm" });
          const mp3Blob = await blobToMp3(rawBlob);
          if (recordedUrls[trackId]) URL.revokeObjectURL(recordedUrls[trackId]);
          recordedBlobs[trackId] = mp3Blob;
          recordedUrls[trackId] = URL.createObjectURL(mp3Blob);
          durations[trackId] = elapsed;
          setStatus(`Recorded – ${formatTime(elapsed)}. You can re-record or play back.`);
        } catch (encErr) {
          console.error(encErr);
          // fallback: keep original blob if encoding fails
          const fallback = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm" });
          if (recordedUrls[trackId]) URL.revokeObjectURL(recordedUrls[trackId]);
          recordedBlobs[trackId] = fallback;
          recordedUrls[trackId] = URL.createObjectURL(fallback);
          durations[trackId] = elapsed;
          setStatus(`Recorded (fallback format) – ${formatTime(elapsed)}.`);
        }
        isRecording = false;
        updateOverlayState(trackId);
        updatePanelButtons();
        renderChecklist();
      };

      const bpm = getCurrentTempo();

      // ---- Metronome / count-in logic ----
      if (t.metronome) {
        // Metronome is meant to be heard ON the recording
        if (t.metroStopAfterBeats) {
          startMetronome(bpm, t.metroStopAfterBeats);
        } else {
          startMetronome(bpm);
        }
        await new Promise((r) => setTimeout(r, 60));
        // start recording immediately so clicks are captured
        recordStartTime = performance.now();
        mediaRecorder.start(200);
      } else {
        // No metronome on the recording → play a silent 4-beat count-in first
        setStatus("Count-in… (4 beats)");
        startMetronome(bpm); // will run freely
        const beatMs = (60 / bpm) * 1000;
        // wait for 4 full beats, then stop metro and start recording
        await new Promise((r) => setTimeout(r, beatMs * 3 + 40));
        stopMetronome();
        // tiny gap so the last click isn't clipped into the recording
        await new Promise((r) => setTimeout(r, 30));
        recordStartTime = performance.now();
        mediaRecorder.start(200);
      }

      isRecording = true;
      currentTrack = trackId;
      updateOverlayState(trackId);
      updatePanelButtons();
      setStatus(`<span class="rec-indicator"><span class="rec-dot"></span> Recording Track ${trackId}…</span>`);
    } catch (err) {
      stopMetronome();
      setStatus("Could not start recording: " + (err.message || err));
    }
  }

  function stopRecording() {
    if (!isRecording || !mediaRecorder) return;
    stopMetronome();
    mediaRecorder.stop();
  }

  // ---------- Playback ----------
  function playRecording(trackId) {
    if (isPlaying && currentTrack === trackId && currentAudio) {
      // toggle pause
      currentAudio.pause();
      isPlaying = false;
      updatePanelButtons();
      setStatus("Paused.");
      return;
    }
    stopPlayback();
    const url = recordedUrls[trackId];
    if (!url) return;
    currentAudio = new Audio(url);
    currentAudio.onended = () => {
      isPlaying = false;
      updatePanelButtons();
      updateOverlayState(trackId);
      setStatus("Playback finished.");
    };
    currentAudio.onerror = () => {
      isPlaying = false;
      setStatus("Playback error.");
    };
    currentAudio.play();
    isPlaying = true;
    currentTrack = trackId;
    updatePanelButtons();
    updateOverlayState(trackId);
    setStatus("Playing… (tap Pause to stop)");
  }

  function stopPlayback() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    isPlaying = false;
  }

  // ---------- Panel ----------
  function getCurrentTempo() {
    return parseInt(tempoSlider.value, 10);
  }

  function openPanel(trackId) {
    currentTrack = trackId;
    const t = config.tracks[trackId];
    panelTitle.textContent = t.title;

    const hasRange = t.tempoMin !== t.tempoMax;
    if (hasRange) {
      tempoRow.style.display = "flex";
      tempoLabel.textContent = t.tempoLabel || "♩ =";
      tempoSlider.min = t.tempoMin;
      tempoSlider.max = t.tempoMax;
      tempoSlider.value = t.defaultTempo || Math.round((t.tempoMin + t.tempoMax) / 2);
      tempoSlider.disabled = false;
      tempoVal.textContent = tempoSlider.value;
    } else {
      tempoRow.style.display = "none";
      // still set the value for internal use
      tempoSlider.value = t.tempoFixed != null ? t.tempoFixed : t.tempoMin;
    }

    updatePanelButtons();
    if (recordedBlobs[trackId]) {
      setStatus(`Ready – previous recording ${formatTime(durations[trackId])}. Re-record or play.`);
    } else {
      setStatus(t.note || "Ready to record.");
    }
    panel.classList.add("visible");
    updateOverlayState(trackId);
  }

  function closePanel() {
    if (isRecording) return;
    stopPlayback();
    panel.classList.remove("visible");
  }

  function updatePanelButtons() {
    const hasRec = currentTrack && recordedBlobs[currentTrack];
    btnStart.disabled = isRecording;
    btnStop.disabled = !isRecording;
    btnPlay.disabled = !hasRec || isRecording;
    if (isRecording) {
      btnStart.textContent = "● Recording…";
    } else {
      btnStart.textContent = "● Record";
    }
    if (isPlaying) {
      btnPlay.textContent = "❚❚ Pause";
    } else {
      btnPlay.textContent = "▶ Play";
    }
  }

  // ---------- Checklist ----------
  function renderChecklist() {
    trackList.innerHTML = "";
    const ids = Object.keys(config.tracks).map(Number).sort((a, b) => a - b);
    for (const id of ids) {
      const has = !!recordedBlobs[id];
      const card = document.createElement("div");
      card.className = "track-card";
      card.innerHTML = `
        <span class="label">Track ${id}</span>
        <span class="status ${has ? "ready" : ""}">${has ? "✓ Ready – " + formatTime(durations[id]) : "Not recorded"}</span>
        <div class="actions">
          ${has ? `<button data-play="${id}">${isPlaying && currentTrack === id ? "❚❚ Pause" : "▶ Play"}</button>` : ""}
          ${has ? `<button data-dl="${id}">⬇ Download</button>` : ""}
          <button data-rec="${id}">${has ? "Re-record" : "Record"}</button>
        </div>
      `;
      trackList.appendChild(card);
    }
    const any = Object.keys(recordedBlobs).length > 0;
    btnDownloadAll.disabled = !any;
    btnShare.disabled = !any;

    trackList.querySelectorAll("[data-play]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = +b.dataset.play;
        openPanel(id);
        playRecording(id);
        // refresh labels after toggle
        setTimeout(renderChecklist, 50);
      });
    });
    trackList.querySelectorAll("[data-dl]").forEach((b) => {
      b.addEventListener("click", () => downloadOne(+b.dataset.dl));
    });
    trackList.querySelectorAll("[data-rec]").forEach((b) => {
      b.addEventListener("click", () => openPanel(+b.dataset.rec));
    });
  }

  function downloadOne(trackId) {
    const blob = recordedBlobs[trackId];
    if (!blob) return;
    const ext = (blob.type || "").includes("mpeg") || (blob.type || "").includes("mp3")
      ? "mp3"
      : ((blob.type || "").includes("mp4") ? "m4a" : "webm");
    const a = document.createElement("a");
    a.href = recordedUrls[trackId];
    a.download = `${config.filePrefix}_Track${trackId}.${ext}`;
    a.click();
  }

  async function downloadAll() {
    const zip = new JSZip();
    const folder = zip.folder(config.zipName || "Audition_Recordings");
    for (const id of Object.keys(recordedBlobs)) {
      const t = recordedBlobs[id].type || "";
      const ext = t.includes("mpeg") || t.includes("mp3") ? "mp3" : (t.includes("mp4") ? "m4a" : "webm");
      folder.file(`Track${id}.${ext}`, recordedBlobs[id]);
    }
    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = (config.zipName || "Audition_Recordings") + ".zip";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function shareRecordings() {
    if (!navigator.share) {
      alert("Sharing is not supported on this device/browser. Please use Download All instead.");
      return;
    }
    const files = [];
    for (const id of Object.keys(recordedBlobs)) {
      const t = recordedBlobs[id].type || "";
      const ext = t.includes("mpeg") || t.includes("mp3") ? "mp3" : (t.includes("mp4") ? "m4a" : "webm");
      files.push(
        new File([recordedBlobs[id]], `Track${id}.${ext}`, {
          type: t || "audio/mpeg"
        })
      );
    }
    if (!files.length) return;
    const shareData = {
      files,
      title: config.shareTitle || "Audition Recordings",
      text: config.shareText || "My audition recordings"
    };
    try {
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        alert("This browser cannot share audio files directly. Use Download All, then share from Files.");
      }
    } catch (err) {
      if (err.name !== "AbortError") alert("Share failed: " + err.message);
    }
  }

  // ---------- Public init ----------
  function init(cfg) {
    config = cfg;

    // Build the page content from config
    headerTitle.textContent = cfg.headerTitle;
    headerSub.textContent = cfg.headerSub || "Tap a numbered circle next to each scale/excerpt to record.";

    // Clear previous pages
    const pagesRoot = document.getElementById("pages-root");
    pagesRoot.innerHTML = "";

    cfg.pages.forEach((page, pageIdx) => {
      const container = document.createElement("div");
      container.className = "page-container";
      container.id = `page${pageIdx + 1}`;
      const img = document.createElement("img");
      img.src = page.image;
      img.alt = page.alt || `Page ${pageIdx + 1}`;
      img.draggable = false;
      container.appendChild(img);

      // buttons for this page
      (page.buttons || []).forEach((b) => {
        const btn = document.createElement("button");
        btn.className = "overlay-btn idle";
        btn.id = `btn-track${b.track}`;
        btn.dataset.track = b.track;
        btn.style.top = b.top;
        btn.innerHTML = String(b.track);
        btn.title = `Record Track ${b.track}`;
        container.appendChild(btn);
      });
      pagesRoot.appendChild(container);
    });

    // re-collect overlay buttons
    overlayBtns = {};
    document.querySelectorAll(".overlay-btn").forEach((el) => {
      const id = el.dataset.track;
      overlayBtns[id] = el;
      el.addEventListener("click", () => openPanel(+id));
    });

    // reset state
    recordedBlobs = {};
    recordedUrls = {};
    durations = {};
    isRecording = false;
    isPlaying = false;
    currentTrack = null;
    stopMetronome();
    stopPlayback();

    renderChecklist();
    panel.classList.remove("visible");
  }

  // ---------- DOM ready wiring (once) ----------
  function bindUI() {
    panel = document.getElementById("control-panel");
    panelTitle = document.getElementById("panel-title");
    tempoRow = document.getElementById("tempo-row");
    tempoLabel = document.getElementById("tempo-label");
    tempoSlider = document.getElementById("tempo-slider");
    tempoVal = document.getElementById("tempo-val");
    btnStart = document.getElementById("btn-start-rec");
    btnStop = document.getElementById("btn-stop-rec");
    btnPlay = document.getElementById("btn-play");
    statusLine = document.getElementById("status-line");
    trackList = document.getElementById("track-list");
    btnDownloadAll = document.getElementById("btn-download-all");
    btnShare = document.getElementById("btn-share");
    micWarning = document.getElementById("mic-warning");
    closePanelBtn = document.getElementById("close-panel");
    headerTitle = document.getElementById("header-title");
    headerSub = document.getElementById("header-sub");
    overlayBtns = {};

    tempoSlider.addEventListener("input", () => {
      tempoVal.textContent = tempoSlider.value;
    });
    btnStart.addEventListener("click", () => {
      if (currentTrack) startRecording(currentTrack);
    });
    btnStop.addEventListener("click", stopRecording);
    btnPlay.addEventListener("click", () => {
      if (currentTrack && recordedUrls[currentTrack]) playRecording(currentTrack);
    });
    closePanelBtn.addEventListener("click", closePanel);
    btnDownloadAll.addEventListener("click", downloadAll);
    btnShare.addEventListener("click", shareRecordings);

    window.addEventListener("beforeunload", (e) => {
      if (isRecording) {
        e.preventDefault();
        e.returnValue = "";
      }
    });

    // warm mic
    document.body.addEventListener(
      "click",
      () => {
        getMicStream().catch(() => {});
      },
      { once: true }
    );
  }

  // auto-bind when script loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindUI);
  } else {
    bindUI();
  }

  return { init };
})();
