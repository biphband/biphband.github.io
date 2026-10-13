
/**
 * Shared audition recorder core.
 * Alice pages may set namePromptOnStop/shareNamedMp3 to require a student's
 * name when Stop is clicked and use that name in the exported MP3 filename.
 */
window.AuditionRecorder = (() => {
  "use strict";

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
  let mediaStream = null;
  let studentName = "";
  let nameModal = null;
  let nameInput = null;
  let nameError = null;
  let nameCallbacks = [];
  let recordingStartedAt = 0;

  const $ = (id) => document.getElementById(id);

  const safeFilenamePart = (value) => String(value || "")
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "_")
    .replace(/^\.+|\.+$/g, "")
    .replace(/_+/g, "_")
    .slice(0, 80);

  function setStatus(message) {
    const el = $("status-line");
    if (el) el.textContent = message;
  }

  function setButtonState(id, disabled) {
    const el = $(id);
    if (el) el.disabled = !!disabled;
  }

  function ensureNameModal() {
    if (nameModal) return;

    const style = document.createElement("style");
    style.id = "audition-name-modal-style";
    style.textContent = `
      .audition-name-backdrop {
        position:fixed;
        inset:0;
        z-index:100000;
        background:rgba(0,0,0,.58);
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px
      }
      .audition-name-backdrop[hidden] {
        display:none !important
      }
      .audition-name-dialog {
        width:min(440px,100%);
        background:#fff;
        color:#202124;
        border-radius:16px;
        padding:24px;
        box-shadow:0 18px 70px rgba(0,0,0,.32);
        font:16px/1.45 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif
      }
      .audition-name-dialog h2 {
        margin:0 0 8px;
        font-size:1.25rem;
        color:#1a4a8a
      }
      .audition-name-dialog p {
        margin:0 0 16px;
        color:#555
      }
      .audition-name-dialog label {
        display:block;
        margin-bottom:6px;
        font-weight:600;
        color:#333
      }
      .audition-name-dialog input {
        display:block;
        width:100%;
        box-sizing:border-box;
        border:1px solid #aab0b8;
        border-radius:8px;
        padding:12px;
        font:inherit;
        background:#fff;
        color:#111
      }
      .audition-name-error {
        min-height:1.3em;
        margin-top:7px;
        color:#b42318;
        font-size:.88rem
      }
      .audition-name-actions {
        display:flex;
        justify-content:flex-end;
        gap:10px;
        margin-top:16px
      }
      .audition-name-actions button {
        border:0;
        border-radius:8px;
        padding:11px 16px;
        font:600 15px system-ui;
        cursor:pointer
      }
      .audition-name-cancel {
        background:#eceff3;
        color:#222
      }
      .audition-name-save {
        background:#1a4a8a;
        color:#fff
      }
    `;
    document.head.appendChild(style);

    nameModal = document.createElement("div");
    nameModal.className = "audition-name-backdrop";
    nameModal.hidden = true;

    nameModal.innerHTML = `
      <section
        class="audition-name-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audition-name-title"
      >
        <h2 id="audition-name-title">What is your name?</h2>
        <p>
          Please enter your name. It will be included in the filename
          of your shared MP3 recording.
        </p>
        <form id="audition-name-form">
          <label for="audition-student-name">Student name</label>
          <input
            id="audition-student-name"
            name="studentName"
            type="text"
            autocomplete="name"
            maxlength="100"
            required
          >
          <div
            class="audition-name-error"
            id="audition-name-error"
            aria-live="polite"
          ></div>
          <div class="audition-name-actions">
            <button
              type="button"
              class="audition-name-cancel"
              id="audition-name-cancel"
            >Cancel</button>
            <button type="submit" class="audition-name-save">
              Continue
            </button>
          </div>
        </form>
      </section>
    `;

    document.body.appendChild(nameModal);

    nameInput = $("audition-student-name");
    nameError = $("audition-name-error");

    $("audition-name-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const entered = nameInput.value.trim();
      const safe = safeFilenamePart(entered);

      if (!entered || !safe) {
        nameError.textContent = "Please enter a valid name to continue.";
        nameInput.focus();
        return;
      }

      studentName = entered;
      nameModal.hidden = true;
      nameError.textContent = "";

      const callbacks = nameCallbacks.splice(0);
      callbacks.forEach((callback) => {
        try {
          callback(studentName);
        } catch (error) {
          console.error(error);
        }
      });
    });

    $("audition-name-cancel").addEventListener("click", () => {
      if (config && (config.namePromptOnStop || config.shareNamedMp3)) {
        nameError.textContent =
          "Your name is required. Please enter it to continue.";
        nameInput.focus();
        return;
      }

      nameModal.hidden = true;

      const callbacks = nameCallbacks.splice(0);
      callbacks.forEach((callback) => callback(null));
    });

    nameModal.addEventListener("click", (event) => {
      if (
        event.target === nameModal &&
        config &&
        (config.namePromptOnStop || config.shareNamedMp3)
      ) {
        nameInput.focus();
      }
    });
  }

  function requestStudentName(callback) {
    if (studentName && safeFilenamePart(studentName)) {
      if (callback) callback(studentName);
      return;
    }

    ensureNameModal();

    if (callback) nameCallbacks.push(callback);

    nameModal.hidden = false;
    nameError.textContent = "";
    nameInput.value = "";

    window.setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 0);
  }

  function getTrackIds() {
    return Object.keys((config && config.tracks) || {});
  }

  function renderPages() {
    const root = $("pages-root");
    if (!root) return;

    root.innerHTML = "";

    (config.pages || []).forEach((page, index) => {
      const wrap = document.createElement("div");
      wrap.className = "page-container";

      const img = document.createElement("img");
      img.src = page.image;
      img.alt = page.alt || `Page ${index + 1}`;
      img.loading = index > 0 ? "lazy" : "eager";
      wrap.appendChild(img);

      (page.buttons || []).forEach((button) => {
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "overlay-btn";
        trigger.id = `btn-track${button.track}`;
        trigger.textContent = "Open recording controls";
        trigger.addEventListener("click", () => openTrack(button.track));
        wrap.appendChild(trigger);
      });

      root.appendChild(wrap);
    });
  }

  function openTrack(trackId) {
    currentTrack = String(trackId);

    const track = config.tracks[currentTrack] || {};
    const title = $("panel-title");
    if (title) title.textContent = track.title || `Track ${currentTrack}`;

    const panel = $("control-panel");
    if (panel) panel.classList.add("visible");

    const tempoRow = $("tempo-row");

    if (tempoRow) {
      const hasTempo =
        Number.isFinite(Number(track.tempoFixed)) || track.metronome;

      tempoRow.style.display = hasTempo ? "flex" : "none";

      const slider = $("tempo-slider");
      const label = $("tempo-label");
      const value = $("tempo-val");

      if (slider) {
        slider.min = track.tempoMin || 120;
        slider.max = track.tempoMax || 120;
        slider.value = track.tempoFixed || track.defaultTempo || 120;
        slider.disabled = Number.isFinite(Number(track.tempoFixed));
      }

      if (label) label.textContent = track.tempoLabel || "♩ =";

      if (value) {
        value.textContent = track.tempoFixed || track.defaultTempo || 120;
      }
    }

    const note = track.note || "Ready to record.";

    setStatus(
      recordedBlobs[currentTrack]
        ? "Recording saved. You can record again or play it back."
        : note
    );

    setButtonState("btn-start-rec", false);
    setButtonState("btn-stop-rec", true);
    setButtonState("btn-play", !recordedBlobs[currentTrack]);
    setButtonState("btn-share", !Object.keys(recordedBlobs).length);
  }



  async function playCountIn(bpm = 120, beats = 4) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error("Metronome audio is not supported in this browser.");
    }

    const audioContext = new AudioContextClass();

    try {
      await audioContext.resume();

      const beatDuration = 60 / bpm;
      const startTime = audioContext.currentTime + 0.05;

      for (let beat = 0; beat < beats; beat++) {
        const time = startTime + beat * beatDuration;

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = beat === 0 ? 1200 : 880;

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.7, time + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(time);
        oscillator.stop(time + 0.08);
      }

      // Four beats at 120 BPM take two seconds.
      await new Promise(resolve =>
        window.setTimeout(resolve, beats * beatDuration * 1000)
      );
    } finally {
      await audioContext.close().catch(() => {});
    }
  }


  async function startRecording() {
    if (isRecording) return;

    if (!currentTrack) currentTrack = getTrackIds()[0] || "1";

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Microphone recording is not available in this browser. " +
          "Use HTTPS and allow microphone access."
        );
      }

      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      const options = {};

      if (window.MediaRecorder && MediaRecorder.isTypeSupported) {
        if (
          MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ) {
          options.mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          options.mimeType = "audio/mp4";
        }
      }

      mediaRecorder = new MediaRecorder(mediaStream, options);
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error", event.error || event);
        setStatus("Recording error. Please try again.");
      };

      mediaRecorder.onstop = async () => {
        const rawType =
          (audioChunks[0] && audioChunks[0].type) ||
          mediaRecorder.mimeType ||
          "audio/webm";

        const rawBlob = new Blob(audioChunks, { type: rawType });

        durations[currentTrack] = Math.max(
          0,
          (Date.now() - recordingStartedAt) / 1000
        );

        if (rawBlob.size) {
          setStatus("Preparing your recording…");

          try {
            recordedBlobs[currentTrack] = await blobToMp3(rawBlob);
          } catch (error) {
            console.warn(
              "MP3 conversion failed; keeping original recording",
              error
            );
            recordedBlobs[currentTrack] = rawBlob;
          }

          if (recordedUrls[currentTrack]) {
            URL.revokeObjectURL(recordedUrls[currentTrack]);
          }

          recordedUrls[currentTrack] = URL.createObjectURL(
            recordedBlobs[currentTrack]
          );
        }

        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }

        mediaStream = null;
        isRecording = false;

        setButtonState("btn-start-rec", false);
        setButtonState("btn-stop-rec", true);
        setButtonState("btn-play", !recordedBlobs[currentTrack]);
        setButtonState(
          "btn-share",
          !Object.keys(recordedBlobs).length
        );

        renderChecklist();

        setStatus(
          recordedBlobs[currentTrack]
            ? "Recording ready."
            : "No audio was captured. Please record again."
        );
      };

            // Play the count-in before recording begins.
      if (config.tracks[currentTrack]?.metronome) {
        const track = config.tracks[currentTrack];
        const bpm = track.tempoFixed || track.defaultTempo || 120;
        const beats = track.countInBeats || 4;

        setButtonState("btn-start-rec", true);
        setButtonState("btn-stop-rec", true);
        setStatus(`Count-in: ${beats} beats at ${bpm} BPM…`);

        await playCountIn(bpm, beats);
      }

      // Start recording after the count-in has finished.
      mediaRecorder.start(250);
      recordingStartedAt = Date.now();
      isRecording = true;

      setButtonState("btn-start-rec", true);
      setButtonState("btn-stop-rec", false);
      setButtonState("btn-play", true);

      setStatus("Recording… tap Stop when finished.");

      const warning = $("mic-warning");
      if (warning) warning.style.display = "none";
    } catch (error) {
      console.error(error);

      const warning = $("mic-warning");
      if (warning) warning.style.display = "block";

      setStatus(
        error.message ||
        "Could not start recording. Please allow microphone access."
      );

      alert(
        error.message ||
        "Could not start recording. Please allow microphone access."
      );
    }
  }


  
  function stopRecording() {
    if (
      !isRecording ||
      !mediaRecorder ||
      mediaRecorder.state === "inactive"
    ) {
      return;
    }

    // Prevent another Stop click while processing.
    isRecording = false;

    setButtonState("btn-start-rec", true);
    setButtonState("btn-stop-rec", true);
    setStatus("Stopping recording…");

    // Show the custom modal immediately.
    if (config && config.namePromptOnStop) {
      ensureNameModal();
      nameModal.hidden = false;
      nameError.textContent = "";
      nameInput.value = "";

      requestAnimationFrame(() => {
        nameInput.focus();
      });
    }

    try {
      mediaRecorder.stop();
    } catch (error) {
      console.error("Unable to stop recording:", error);
      setStatus("Could not stop recording. Please try again.");
    }
  }



  async function blobToMp3(blob) {
    const type = (blob.type || "").toLowerCase();

    if (type.includes("mpeg") || type.includes("mp3")) {
      return blob;
    }

    if (!window.lamejs || !window.lamejs.Mp3Encoder) {
      throw new Error("MP3 encoder library did not load.");
    }

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error("Audio decoding is not supported in this browser.");
    }

    const context = new AudioContextClass();

    try {
      const arrayBuffer = await blob.arrayBuffer();

      const audioBuffer = await context.decodeAudioData(
        arrayBuffer.slice(0)
      );

      const channels = Math.min(2, audioBuffer.numberOfChannels);
      const sampleRate = audioBuffer.sampleRate;

      const encoder = new window.lamejs.Mp3Encoder(
        channels,
        sampleRate,
        128
      );

      const left = audioBuffer.getChannelData(0);
      const right =
        channels > 1
          ? audioBuffer.getChannelData(1)
          : left;

      const blockSize = 1152;
      const mp3Chunks = [];

      for (let i = 0; i < left.length; i += blockSize) {
        const leftChunk = toInt16(
          left.subarray(i, i + blockSize)
        );

        let encoded;

        if (channels > 1) {
          const rightChunk = toInt16(
            right.subarray(i, i + blockSize)
          );

          encoded = encoder.encodeBuffer(leftChunk, rightChunk);
        } else {
          encoded = encoder.encodeBuffer(leftChunk);
        }

        if (encoded && encoded.length) {
          mp3Chunks.push(new Uint8Array(encoded));
        }
      }

      const finalChunk = encoder.flush();

      if (finalChunk && finalChunk.length) {
        mp3Chunks.push(new Uint8Array(finalChunk));
      }

      return new Blob(mp3Chunks, { type: "audio/mpeg" });
    } finally {
      if (context.close) {
        await context.close().catch(() => {});
      }
    }
  }

  function toInt16(floatData) {
    const output = new Int16Array(floatData.length);

    for (let i = 0; i < floatData.length; i++) {
      const sample = Math.max(-1, Math.min(1, floatData[i]));

      output[i] = sample < 0
        ? sample * 32768
        : sample * 32767;
    }

    return output;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  async function getNamedMp3(trackId) {
    let blob = recordedBlobs[trackId];

    if (!blob) {
      throw new Error("No recording was found. Please record first.");
    }

    const type = (blob.type || "").toLowerCase();

    if (!type.includes("mpeg") && !type.includes("mp3")) {
      blob = await blobToMp3(blob);

      const convertedType = (blob.type || "").toLowerCase();

      if (
        !convertedType.includes("mpeg") &&
        !convertedType.includes("mp3")
      ) {
        throw new Error(
          "This recording could not be converted to MP3. Please record again."
        );
      }

      recordedBlobs[trackId] = blob;

      if (recordedUrls[trackId]) {
        URL.revokeObjectURL(recordedUrls[trackId]);
      }

      recordedUrls[trackId] = URL.createObjectURL(blob);
    }

    const safeName = safeFilenamePart(studentName);

    if (!safeName) {
      throw new Error(
        "Please enter your name before sharing or downloading."
      );
    }

    const prefix = config.filePrefix || "Recording";

    return new File(
      [blob],
      `${prefix}_${safeName}.mp3`,
      { type: "audio/mpeg" }
    );
  }

  async function downloadOne(trackId) {
    if (config && config.shareNamedMp3 && !studentName) {
      requestStudentName(() => downloadOne(trackId));
      return;
    }

    try {
      if (config && config.shareNamedMp3) {
        const file = await getNamedMp3(trackId);
        downloadBlob(file, file.name);
      } else {
        const blob = recordedBlobs[trackId];
        if (!blob) return;

        const type = (blob.type || "").toLowerCase();

        const ext =
          type.includes("mpeg") || type.includes("mp3")
            ? "mp3"
            : type.includes("mp4")
              ? "m4a"
              : "webm";

        downloadBlob(
          blob,
          `${config.filePrefix || "Recording"}_Track${trackId}.${ext}`
        );
      }
    } catch (error) {
      alert(error.message || "Download failed.");
    }
  }

  async function downloadAll() {
    const ids = Object.keys(recordedBlobs);

    if (!ids.length) {
      alert("Please record something first.");
      return;
    }

    if (config && config.shareNamedMp3) {
      if (!studentName) {
        requestStudentName(() => downloadAll());
        return;
      }

      await downloadOne(ids[0]);
      return;
    }

    if (!window.JSZip) {
      await downloadOne(ids[0]);
      return;
    }

    try {
      const zip = new window.JSZip();
      const folder = zip.folder(
        config.zipName || "Audition_Recordings"
      );

      ids.forEach((id) => {
        const blob = recordedBlobs[id];
        const type = (blob.type || "").toLowerCase();

        const ext =
          type.includes("mpeg") || type.includes("mp3")
            ? "mp3"
            : type.includes("mp4")
              ? "m4a"
              : "webm";

        folder.file(`Track${id}.${ext}`, blob);
      });

      const content = await zip.generateAsync({ type: "blob" });

      downloadBlob(
        content,
        `${config.zipName || "Audition_Recordings"}.zip`
      );
    } catch (error) {
      alert("Download failed: " + error.message);
    }
  }

  async function shareRecordings() {
    const ids = Object.keys(recordedBlobs);

    if (!ids.length) {
      alert("Please record something before sharing.");
      return;
    }

    if (config && config.shareNamedMp3) {
      if (!studentName) {
        requestStudentName(() => shareRecordings());
        return;
      }

      try {
        const file = await getNamedMp3(ids[0]);

        const shareData = {
          files: [file],
          title: file.name,
          text: `Recording by ${studentName}`
        };

        if (
          !navigator.share ||
          !navigator.canShare ||
          !navigator.canShare({ files: [file] })
        ) {
          alert(
            "This browser cannot share MP3 files directly. " +
            "Please try a supported browser or device."
          );
          return;
        }

        await navigator.share(shareData);
      } catch (error) {
        if (error.name !== "AbortError") {
          alert("Share failed: " + (error.message || error));
        }
      }

      return;
    }

    const files = ids.map((id) => {
      const blob = recordedBlobs[id];
      const type = (blob.type || "").toLowerCase();

      const ext =
        type.includes("mpeg") || type.includes("mp3")
          ? "mp3"
          : type.includes("mp4")
            ? "m4a"
            : "webm";

      return new File(
        [blob],
        `${config.filePrefix || "Recording"}_Track${id}.${ext}`,
        { type: blob.type || "application/octet-stream" }
      );
    });

    try {
      const shareData = {
        files,
        title: config.shareTitle || "Audition Recording",
        text: config.shareText || "My recording"
      };

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files })
      ) {
        await navigator.share(shareData);
      } else {
        alert("This browser cannot share these recording files directly.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Share failed: " + (error.message || error));
      }
    }
  }

  function renderChecklist() {
    const list = $("track-list");
    if (!list) return;

    list.innerHTML = "";

    const ids = getTrackIds();

    ids.forEach((id) => {
      const track = config.tracks[id] || {};

      const card = document.createElement("div");
      card.className = "track-card";

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = track.title || `Track ${id}`;

      const status = document.createElement("div");
      status.className =
        "status" + (recordedBlobs[id] ? " ready" : "");

      status.textContent = recordedBlobs[id]
        ? `Ready${durations[id] ? ` · ${Math.round(durations[id])} sec` : ""}`
        : "Not recorded yet";

      const actions = document.createElement("div");
      actions.className = "actions";

      if (recordedBlobs[id]) {
        const play = document.createElement("button");
        play.type = "button";
        play.textContent = "▶ Play";
        play.addEventListener("click", () => playTrack(id));
        actions.appendChild(play);

        const download = document.createElement("button");
        download.type = "button";
        download.textContent = "⬇ Download";
        download.addEventListener("click", () => downloadOne(id));
        actions.appendChild(download);
      }

      card.append(label, status, actions);
      list.appendChild(card);
    });

    const globalActions = document.querySelector(".global-actions");

    if (globalActions) {
      globalActions.style.display =
        Object.keys(recordedBlobs).length ? "flex" : "none";
    }

    setButtonState(
      "btn-share",
      !Object.keys(recordedBlobs).length
    );

    setButtonState(
      "btn-download-all",
      !Object.keys(recordedBlobs).length
    );
  }

  function playTrack(trackId) {
    const url = recordedUrls[trackId];

    if (!url) {
      setStatus("No saved recording is available to play.");
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(url);
    isPlaying = true;

    currentAudio.onended = () => {
      isPlaying = false;
      setStatus("Playback finished.");
    };

    currentAudio.onerror = () => {
      isPlaying = false;
      setStatus("Could not play this recording.");
    };

    currentAudio.play()
      .then(() => setStatus("Playing recording…"))
      .catch((error) => {
        isPlaying = false;
        setStatus("Playback failed: " + error.message);
      });
  }

  function bindControls() {
    const start = $("btn-start-rec");
    const stop = $("btn-stop-rec");
    const play = $("btn-play");
    const share = $("btn-share");
    const download = $("btn-download-all");

    if (start) start.onclick = startRecording;
    if (stop) stop.onclick = stopRecording;
    if (play) play.onclick = () => currentTrack && playTrack(currentTrack);
    if (share) share.onclick = shareRecordings;
    if (download) download.onclick = downloadAll;

    const slider = $("tempo-slider");

    if (slider) {
      slider.addEventListener("input", () => {
        const value = $("tempo-val");
        if (value) value.textContent = slider.value;
      });
    }
  }

  function init(nextConfig) {
    config = nextConfig || {};

    currentTrack = null;
    audioChunks = [];
    recordedBlobs = {};
    recordedUrls = {};
    durations = {};
    isRecording = false;
    isPlaying = false;
    studentName = "";
    nameCallbacks = [];

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = null;
    }

    if (nameModal) {
      nameModal.remove();
      nameModal = null;
      nameInput = null;
      nameError = null;
    }

    renderPages();
    bindControls();
    renderChecklist();

    setButtonState("btn-start-rec", false);
    setButtonState("btn-stop-rec", true);
    setButtonState("btn-play", true);
    setButtonState("btn-share", true);

    setStatus("Ready");

    if (config.tracks) {
      const ids = getTrackIds();
      if (ids.length === 1) currentTrack = ids[0];
    }
  }

  return { init };
})();
