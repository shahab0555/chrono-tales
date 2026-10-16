/**
 * ===================================================================
 * CHRONO TALES — Master Application Script
 * 3D Procedural Floating Ice Palace • Real Branching Story Editor
 * LocalStorage Autosave • JSON I/O • SVG Graph • BFS Diagnostics
 * ===================================================================
 */

(function () {
  'use strict';

  /* ===================================================================
     1. PRELOADED FLAGSHIP STORY: "THE LOST CROWN" & TEMPLATES
     =================================================================== */
  const LOST_CROWN_STORY = {
    title: "The Lost Crown",
    startSceneId: "scene-palace-time",
    scenes: [
      {
        id: "scene-palace-time",
        title: "The Palace at the Edge of Time",
        text: "You awaken upon a terrace of frost-carved sapphire, suspended between a frozen sky and a sea of silver clouds. Before you stands a grand gateway of crystalline spires towering into the midnight blue. An ancient inscription glowing in cyan runes reads:\n\n'All time is a river of glass; one who walks backward may mend what was shattered.'\n\nIn your palm rests an antique silver chronometer, ticking softly against the silence of the cosmos. Three paths branch from the moonlit terrace.",
        isEnding: false,
        choices: [
          { text: "Step through the Arch of Starlight toward the gardens.", targetId: "scene-garden-stars" },
          { text: "Descend the spiraling crystal staircase into the whispering hall.", targetId: "scene-hall-echoes" },
          { text: "Follow the misty aqueduct where the water defies gravity.", targetId: "scene-river-backward" }
        ]
      },
      {
        id: "scene-garden-stars",
        title: "The Garden of Sleeping Stars",
        text: "Blossoms of spun diamond bow under the weight of dormant constellations. Each flower emits a soft chime, whispering memories of lives you never lived. The scent of ozone and crushed winter lilies fills the air.\n\nAt the garden's heart rests an illuminated marble pedestal supporting an immense open codex. Nearby, an iron gate leads down into a chilled subterranean crypt, its threshold covered in hoarfrost.",
        isEnding: false,
        choices: [
          { text: "Approach the pedestal and examine the Queen's illuminated pages.", targetId: "scene-unwritten-book" },
          { text: "Descend the cold stone steps into the mist-filled crypt.", targetId: "scene-flooded-crypt" },
          { text: "Return to the grand palace terrace to reconsider your path.", targetId: "scene-palace-time" }
        ]
      },
      {
        id: "scene-hall-echoes",
        title: "The Hall of Echoes",
        text: "Vaulted arches of violet quartz stretch into infinite darkness. Whispers ricochet from polished mirrors—voices of past monarchs pleading for forgiveness and warning of the Great Freeze.\n\nOne towering mirror reflects a rushing upside-down river; another reflects the glowing atrium of a celestial royal library. The floor beneath you vibrates with latent magical energy.",
        isEnding: false,
        choices: [
          { text: "Touch the mirror reflecting the inverted river.", targetId: "scene-river-backward" },
          { text: "Speak your true name into the silence to challenge the echoes.", targetId: "scene-unwritten-book" },
          { text: "Slip into the sunken passageway where stagnant water laps.", targetId: "scene-flooded-crypt" }
        ]
      },
      {
        id: "scene-river-backward",
        title: "Where the River Runs Backward",
        text: "Liquid luminescence flows uphill against the gravity of the heavens, cascading into a celestial reservoir that hovers directly above the palace spires. Droplets rise like inverted rain, sparkling with violet light.\n\nIn the shimmering current, you catch fleeting glimpses of Asterfall before the freeze: golden festivals, laughter in emerald courtyards, and the coronation of the Lost Sovereign.",
        isEnding: false,
        choices: [
          { text: "Drink from the inverted water to absorb its forgotten memories.", targetId: "scene-crown-remembering" },
          { text: "Follow the silver flume toward the ancient library high above.", targetId: "scene-unwritten-book" },
          { text: "Dive into the depths where the current spirals into the abyss.", targetId: "scene-flooded-crypt" }
        ]
      },
      {
        id: "scene-unwritten-book",
        title: "The Queen's Unwritten Book",
        text: "An immense tome floats above a pool of starlight, its blank vellum pages turning on their own in an unseen breeze. Inkwells of liquefied dusk and dawn stand ready upon a carved lectern.\n\nThe translucent spirit of the Queen of Asterfall materializes before you in shimmering starlight. 'Write our conclusion, traveler,' she whispers. 'Our realm has remained frozen in indecision for a thousand cycles. Only your hand can break the seal.'",
        isEnding: false,
        choices: [
          { text: "Pen an oath of eternal guardianship over Asterfall's frozen realm.", targetId: "scene-keeper-asterfall" },
          { text: "Inscribe words of release, letting all frozen time thaw into tomorrow.", targetId: "scene-first-morning" },
          { text: "Trace the forgotten runes of coronation upon the parchment.", targetId: "scene-crown-remembering" }
        ]
      },
      {
        id: "scene-flooded-crypt",
        title: "The Flooded Crypt",
        text: "Ankle-deep water mirrors the fractured ceiling where distant stars peer through cracked blue ice. Ancient sarcophagi of fallen sovereigns line the silent colonnade, each inscribed with forgotten constellations.\n\nAt the crypt's sunken altar, two relics glow with opposing light: a circlet forged of crystallized memory and a dormant sun-crystal waiting to be ignited. A staircase winds upward into the highest bell tower.",
        isEnding: false,
        choices: [
          { text: "Lift the Crown of Remembering and place it upon your brow.", targetId: "scene-crown-remembering" },
          { text: "Shatter the dormant sun-crystal upon the altar to banish the night.", targetId: "scene-first-morning" },
          { text: "Climb the moss-covered bell tower into the realm's apex.", targetId: "scene-keeper-asterfall" }
        ]
      },
      {
        id: "scene-crown-remembering",
        title: "A Crown Made of Remembering",
        text: "The crown settles upon your brow with a cold, electrifying certainty. Every forgotten life, every unmade vow, and every fallen star of Asterfall floods into your consciousness in an instant of brilliant clarity.\n\nYou do not reign over mortal subjects, but over the living memory of all that was lost. The floating palace blazes in radiant cyan splendor, an eternal archive preserved forever against the cold march of oblivion. You take your seat upon the sapphire throne, sovereign of eternity.",
        isEnding: true,
        choices: []
      },
      {
        id: "scene-first-morning",
        title: "The First Morning",
        text: "The eternal frost cracks with a sound like ringing crystal bells. Golden light—unseen for a thousand millennia—bursts over the horizon, bathing the palace towers in warm amber and rose.\n\nThe inverted river falls in sweet summer rain, nourishing green shoots in the awakening valleys far below the clouds. The curse of frozen time dissolves into morning mist. The loop is broken at last. The world begins anew, and you step forward into the dawn.",
        isEnding: true,
        choices: []
      },
      {
        id: "scene-keeper-asterfall",
        title: "The Keeper of Asterfall",
        text: "You take your eternal vigil at the throne of the highest spire, chronometer in hand, watching over the tides of time that swirl beneath the floating citadel.\n\nTravelers across the multiverse will look up and see your beacon shining among the constellations—a steadfast sentinel guarding the sacred gateway between yesterday and tomorrow. The palace endures, guided by your quiet, watchful soul.",
        isEnding: true,
        choices: []
      }
    ]
  };

  const TEMPLATE_VOID = {
    title: "Echoes of the Void",
    startSceneId: "scene-airlock",
    scenes: [
      {
        id: "scene-airlock",
        title: "Airlock Chamber 7",
        text: "Emergency lights flash amber inside Research Vessel Aethelgard. Decompression warnings whine through the comms. Outside the reinforced viewport, a dying binary star twists in radiant violet filaments.",
        isEnding: false,
        choices: [
          { text: "Override the bulkhead door to the Central Bridge.", targetId: "scene-bridge" },
          { text: "Access the auxiliary engineering crawlspace.", targetId: "scene-engine" }
        ]
      },
      {
        id: "scene-bridge",
        title: "The Observation Bridge",
        text: "The pilot seats are vacant. The navigational holographic console flickers with an SOS beacon received from a world that ceased existing three centuries ago.",
        isEnding: false,
        choices: [
          { text: "Transmit the salvation cipher into the star.", targetId: "scene-supernova" },
          { text: "Disengage warp stabilizers and drift into the nebula.", targetId: "scene-void-ending" }
        ]
      },
      {
        id: "scene-engine",
        title: "Sublight Engineering",
        text: "Cables hiss with plasma discharges. The fusion core is cooling rapidly. A lone maintenance drone blinks its optical sensor at you in rhythmic morse code.",
        isEnding: false,
        choices: [
          { text: "Manually restart the quantum core.", targetId: "scene-supernova" },
          { text: "Reroute power to the cryo-stasis pods.", targetId: "scene-void-ending" }
        ]
      },
      {
        id: "scene-supernova",
        title: "The Resonant Leap",
        text: "The engines ignite with blinding brilliance! The ship shoots through the gravitational well into unmapped spacetime, leaving the dying star behind forever.",
        isEnding: true,
        choices: []
      },
      {
        id: "scene-void-ending",
        title: "Silent Drifter",
        text: "You enter stasis as the ship glides gracefully through the violet auroras of deep space, asleep until another civilization catches your beacon.",
        isEnding: true,
        choices: []
      }
    ]
  };

  const TEMPLATE_CLOCKWORK = {
    title: "The Clockwork Labyrinth",
    startSceneId: "scene-gear-atrium",
    scenes: [
      {
        id: "scene-gear-atrium",
        title: "The Grand Gear Atrium",
        text: "Massive brass cogwheels interlock across the ceiling, ticking with mechanical majesty. Every sixty seconds, the brass corridors shift with a grinding metallic groan.",
        isEnding: false,
        choices: [
          { text: "Take the copper archway marked with the Sun Gear.", targetId: "scene-sun-shaft" },
          { text: "Climb through the lubricated iron pendulums.", targetId: "scene-pendulum-chasm" }
        ]
      },
      {
        id: "scene-sun-shaft",
        title: "The Sun Gear Shaft",
        text: "Beams of refracted daylight pierce through brass prisms. At the center stands the Master Chronometer, its winding key missing.",
        isEnding: false,
        choices: [
          { text: "Insert your brass compass into the escapement slot.", targetId: "scene-clock-master" },
          { text: "Leap across to the maintenance balcony.", targetId: "scene-free-skies" }
        ]
      },
      {
        id: "scene-pendulum-chasm",
        title: "The Pendulum Chasm",
        text: "Razor-sharp blades swing in hypnotic rhythm over an abyss of steam and churning gears. A narrow gantry leads to the outer mechanism.",
        isEnding: false,
        choices: [
          { text: "Time your dash through the center gap.", targetId: "scene-free-skies" },
          { text: "Pull the emergency steam release lever.", targetId: "scene-clock-master" }
        ]
      },
      {
        id: "scene-clock-master",
        title: "Master of the Great Clock",
        text: "The gears lock into a harmonious symphony! You grasp the master lever and become the eternal clockmaker of New Brassica.",
        isEnding: true,
        choices: []
      },
      {
        id: "scene-free-skies",
        title: "Escape to the Open Skies",
        text: "The outer doors swing wide! You step out onto the rooftop above the cloud layer, breathing crisp mountain air as the labyrinth ticks quietly beneath your feet.",
        isEnding: true,
        choices: []
      }
    ]
  };

  /* ===================================================================
     2. APPLICATION STATE & STORAGE
     =================================================================== */
  const STORAGE_KEY = 'chrono_tales_story_v1';

  let currentStory = null;
  let activeSceneId = null;
  let sceneToDelete = null;

  // Play Mode Runtime State
  const playState = {
    currentSceneId: null,
    history: [],
    stepsTaken: 0
  };

  // SVG Graph pan/zoom state
  const graphState = {
    zoom: 1,
    panX: 40,
    panY: 40,
    isPanning: false,
    startX: 0,
    startY: 0
  };

  /**
   * Clone object helper
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Load story from localStorage or fallback to default
   */
  function loadStory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (validateStoryStructure(parsed).isValid) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Could not load from localStorage:", err);
    }
    return deepClone(LOST_CROWN_STORY);
  }

  /**
   * Save story to localStorage with UI feedback
   */
  function saveStory(notify = true) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStory));
      updateSaveStatus("Saved in this browser");
      if (notify) {
        updateDiagnostics();
        renderSceneNavigator();
        renderStoryGraph();
      }
    } catch (err) {
      console.error("Autosave failed:", err);
      updateSaveStatus("Autosave failed (Storage full)", true);
    }
  }

  function updateSaveStatus(msg, isError = false) {
    const badgeText = document.getElementById("nav-save-text");
    const statusLabel = document.getElementById("save-status-label");
    const saveDot = document.querySelector(".save-dot");

    if (badgeText) badgeText.textContent = msg;
    if (statusLabel) statusLabel.textContent = msg;

    if (saveDot) {
      saveDot.style.background = isError ? "var(--danger-red)" : "#10B981";
      saveDot.style.boxShadow = isError ? "0 0 8px var(--danger-red)" : "0 0 8px #10B981";
    }
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ===================================================================
     3. DATA MODEL & VALIDATION LOGIC
     =================================================================== */
  function validateStoryStructure(story) {
    if (!story || typeof story !== 'object') {
      return { isValid: false, error: "Story data is not a valid JSON object." };
    }
    if (!story.title || typeof story.title !== 'string') {
      return { isValid: false, error: "Story title is missing or not text." };
    }
    if (!Array.isArray(story.scenes) || story.scenes.length === 0) {
      return { isValid: false, error: "Story must contain at least one scene." };
    }

    const sceneIds = new Set();
    for (const sc of story.scenes) {
      if (!sc.id || typeof sc.id !== 'string') {
        return { isValid: false, error: "A scene has an invalid or missing ID." };
      }
      if (sceneIds.has(sc.id)) {
        return { isValid: false, error: `Duplicate scene ID found: ${sc.id}` };
      }
      sceneIds.add(sc.id);

      if (typeof sc.title !== 'string') {
        return { isValid: false, error: `Scene ${sc.id} title is not valid text.` };
      }
      if (typeof sc.text !== 'string') {
        return { isValid: false, error: `Scene ${sc.id} text is not valid string.` };
      }
      if (!Array.isArray(sc.choices)) {
        return { isValid: false, error: `Scene ${sc.id} choices must be an array.` };
      }
      if (sc.choices.length > 4) {
        return { isValid: false, error: `Scene ${sc.id} exceeds the 4-choice limit.` };
      }
    }

    if (!story.startSceneId || !sceneIds.has(story.startSceneId)) {
      return { isValid: false, error: "The story start scene ID is missing or nonexistent." };
    }

    // Verify all choice targets
    for (const sc of story.scenes) {
      for (let i = 0; i < sc.choices.length; i++) {
        const ch = sc.choices[i];
        if (!ch.text || typeof ch.text !== 'string') {
          return { isValid: false, error: `Scene '${sc.title}' has a choice missing text.` };
        }
        if (!ch.targetId || !sceneIds.has(ch.targetId)) {
          return { isValid: false, error: `Choice in '${sc.title}' points to non-existent scene ID '${ch.targetId}'.` };
        }
      }
    }

    return { isValid: true, error: null };
  }

  function getSceneById(id) {
    if (!currentStory) return null;
    return currentStory.scenes.find(s => s.id === id) || null;
  }

  /* ===================================================================
     4. EDITOR ENGINE & SCENE MANAGEMENT
     =================================================================== */
  function initEditor() {
    currentStory = loadStory();

    // Default active scene is the start scene
    activeSceneId = currentStory.startSceneId || currentStory.scenes[0]?.id;

    // Attach Studio Header Event Listeners
    const titleInput = document.getElementById("story-title-input");
    if (titleInput) {
      titleInput.value = currentStory.title || "The Lost Crown";
      titleInput.addEventListener("input", (e) => {
        currentStory.title = e.target.value.trim() || "Untitled Story";
        saveStory(false);
      });
    }

    // Add Scene button
    const btnAddScene = document.getElementById("btn-add-scene");
    if (btnAddScene) {
      btnAddScene.addEventListener("click", addNewScene);
    }

    // Scene search input
    const searchInput = document.getElementById("scene-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderSceneNavigator(e.target.value.toLowerCase().trim());
      });
    }

    // Editor field listeners
    const sceneTitleInput = document.getElementById("scene-title-input");
    if (sceneTitleInput) {
      sceneTitleInput.addEventListener("input", (e) => {
        const sc = getSceneById(activeSceneId);
        if (sc) {
          sc.title = e.target.value;
          saveStory(false);
          renderSceneNavigator();
          renderStoryGraph();
          updateSceneWordCount();
        }
      });
    }

    const sceneTextInput = document.getElementById("scene-text-input");
    if (sceneTextInput) {
      sceneTextInput.addEventListener("input", (e) => {
        const sc = getSceneById(activeSceneId);
        if (sc) {
          sc.text = e.target.value;
          saveStory(false);
          renderSceneNavigator();
          updateSceneWordCount();
          renderMiniPreview();
        }
      });
    }

    // Start / Ending flag toggles
    const btnToggleStart = document.getElementById("btn-toggle-start");
    if (btnToggleStart) {
      btnToggleStart.addEventListener("click", toggleStartScene);
    }

    const btnToggleEnding = document.getElementById("btn-toggle-ending");
    if (btnToggleEnding) {
      btnToggleEnding.addEventListener("click", toggleEndingScene);
    }

    // Add Choice button
    const btnAddChoice = document.getElementById("btn-add-choice");
    if (btnAddChoice) {
      btnAddChoice.addEventListener("click", addChoiceToActiveScene);
    }

    // Delete Scene button
    const btnDeleteScene = document.getElementById("btn-delete-scene");
    if (btnDeleteScene) {
      btnDeleteScene.addEventListener("click", promptDeleteScene);
    }

    // Preview scene in player
    const btnPreviewScene = document.getElementById("btn-preview-scene");
    if (btnPreviewScene) {
      btnPreviewScene.addEventListener("click", () => {
        launchPlayMode(activeSceneId);
      });
    }

    // JSON Export / Import / Reset
    const btnExportJson = document.getElementById("btn-export-json");
    if (btnExportJson) btnExportJson.addEventListener("click", exportStoryJSON);

    const inputImportJson = document.getElementById("input-import-json");
    if (inputImportJson) inputImportJson.addEventListener("change", importStoryJSON);

    const btnResetDefault = document.getElementById("btn-reset-default");
    if (btnResetDefault) {
      btnResetDefault.addEventListener("click", () => {
        if (confirm("Reset current story to default 'The Lost Crown'? Any unsaved local edits will be replaced.")) {
          currentStory = deepClone(LOST_CROWN_STORY);
          activeSceneId = currentStory.startSceneId;
          saveStory(true);
          refreshAllUI();
          showToast("Restored 'The Lost Crown' default story.", "success");
        }
      });
    }

    // Play Story from Studio
    const btnStudioPlay = document.getElementById("studio-play-current-btn");
    if (btnStudioPlay) {
      btnStudioPlay.addEventListener("click", () => {
        launchPlayMode(currentStory.startSceneId);
      });
    }

    // Modal Delete Confirmation controls
    const btnConfirmDelete = document.getElementById("btn-confirm-delete");
    if (btnConfirmDelete) btnConfirmDelete.addEventListener("click", confirmDeleteScene);

    const btnCancelDelete = document.getElementById("btn-cancel-delete");
    if (btnCancelDelete) btnCancelDelete.addEventListener("click", closeDeleteModal);

    const btnCloseDeleteModal = document.getElementById("btn-close-delete-modal");
    if (btnCloseDeleteModal) btnCloseDeleteModal.addEventListener("click", closeDeleteModal);

    // Initial render
    refreshAllUI();
  }

  function refreshAllUI() {
    // Update title input
    const titleInput = document.getElementById("story-title-input");
    if (titleInput && currentStory) {
      titleInput.value = currentStory.title || "The Lost Crown";
    }

    // Scene counters
    updateSceneCounts();

    // Render Scene Navigator
    renderSceneNavigator();

    // Render Active Scene Editor
    renderActiveSceneEditor();

    // Render Graph
    renderStoryGraph();

    // Update Diagnostics
    updateDiagnostics();

    // Update Quick Reader Preview
    renderMiniPreview();
  }

  function updateSceneCounts() {
    const total = currentStory.scenes.length;
    const counterBadge = document.getElementById("scene-counter-num");
    const sidebarCount = document.getElementById("sidebar-count-text");
    const heroCount = document.getElementById("hero-scene-count-badge");

    if (counterBadge) counterBadge.textContent = total;
    if (sidebarCount) sidebarCount.textContent = `${total} total`;
    if (heroCount) heroCount.textContent = total;
  }

  function renderSceneNavigator(filterQuery = '') {
    const listContainer = document.getElementById("scene-list-container");
    if (!listContainer) return;

    listContainer.innerHTML = '';

    const scenes = currentStory.scenes.filter(sc => {
      if (!filterQuery) return true;
      return sc.title.toLowerCase().includes(filterQuery) ||
             sc.id.toLowerCase().includes(filterQuery) ||
             sc.text.toLowerCase().includes(filterQuery);
    });

    if (scenes.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--muted-blue-gray); font-size: 0.9rem;">
          No scenes match "${filterQuery}".
        </div>
      `;
      return;
    }

    scenes.forEach(sc => {
      const isSelected = sc.id === activeSceneId;
      const isStart = sc.id === currentStory.startSceneId;
      const card = document.createElement("div");
      card.className = `scene-item-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute("role", "option");
      card.setAttribute("aria-selected", isSelected ? "true" : "false");
      card.setAttribute("data-scene-id", sc.id);

      const snippet = sc.text ? sc.text.replace(/\n+/g, ' ').slice(0, 50) + '...' : '(Empty story text)';

      card.innerHTML = `
        <div class="scene-item-top">
          <span class="scene-item-title">${escapeHTML(sc.title || "Untitled Scene")}</span>
          <div class="scene-item-badges">
            ${isStart ? '<span class="badge-tag-start">START</span>' : ''}
            ${sc.isEnding ? '<span class="badge-tag-ending">ENDING</span>' : ''}
          </div>
        </div>
        <p class="scene-item-snippet">${escapeHTML(snippet)}</p>
        <div class="scene-item-meta">
          <span>${sc.choices ? sc.choices.length : 0} choice(s)</span>
          <span style="font-family: monospace;">#${sc.id.replace('scene-', '')}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        selectScene(sc.id);
      });

      listContainer.appendChild(card);
    });
  }

  function selectScene(sceneId) {
    if (!getSceneById(sceneId)) return;
    activeSceneId = sceneId;
    renderSceneNavigator();
    renderActiveSceneEditor();
    renderStoryGraph();
    renderMiniPreview();

    // Scroll active item into view inside sidebar
    const activeEl = document.querySelector(`.scene-item-card[data-scene-id="${sceneId}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderActiveSceneEditor() {
    const sc = getSceneById(activeSceneId);
    if (!sc) return;

    // Header ID
    const idBadge = document.getElementById("editor-scene-id");
    if (idBadge) idBadge.textContent = `ID: ${sc.id}`;

    // Start Scene Toggle
    const btnToggleStart = document.getElementById("btn-toggle-start");
    const isStart = sc.id === currentStory.startSceneId;
    if (btnToggleStart) {
      if (isStart) {
        btnToggleStart.classList.add("active-start");
        btnToggleStart.innerHTML = `<span class="flag-icon">★</span> <span class="flag-label">Start Scene</span>`;
      } else {
        btnToggleStart.classList.remove("active-start");
        btnToggleStart.innerHTML = `<span class="flag-icon">☆</span> <span class="flag-label">Set as Start</span>`;
      }
    }

    // Ending Toggle
    const btnToggleEnding = document.getElementById("btn-toggle-ending");
    const endingNotice = document.getElementById("ending-scene-notice");
    if (btnToggleEnding) {
      if (sc.isEnding) {
        btnToggleEnding.classList.add("active-ending");
        btnToggleEnding.innerHTML = `<span class="flag-icon">👑</span> <span class="flag-label">Story Ending</span>`;
        if (endingNotice) endingNotice.style.display = "flex";
      } else {
        btnToggleEnding.classList.remove("active-ending");
        btnToggleEnding.innerHTML = `<span class="flag-icon">🏁</span> <span class="flag-label">Mark as Ending</span>`;
        if (endingNotice) endingNotice.style.display = "none";
      }
    }

    // Title & Text Inputs
    const titleInput = document.getElementById("scene-title-input");
    if (titleInput) titleInput.value = sc.title || "";

    const textInput = document.getElementById("scene-text-input");
    if (textInput) textInput.value = sc.text || "";

    updateSceneWordCount();

    // Render Choices
    renderChoicesList(sc);
  }

  function updateSceneWordCount() {
    const textInput = document.getElementById("scene-text-input");
    const wordBadge = document.getElementById("scene-word-count");
    if (textInput && wordBadge) {
      const words = textInput.value.trim().split(/\s+/).filter(Boolean).length;
      wordBadge.textContent = `${words} words`;
    }
  }

  function renderChoicesList(sc) {
    const choicesList = document.getElementById("choices-list");
    const choicesCount = document.getElementById("choices-count-current");
    const btnAddChoice = document.getElementById("btn-add-choice");
    const btnAddCounter = document.getElementById("btn-add-choice-counter");
    const choiceLimitHint = document.getElementById("choice-limit-hint");

    if (!choicesList) return;
    choicesList.innerHTML = '';

    const currentCount = sc.choices ? sc.choices.length : 0;
    if (choicesCount) choicesCount.textContent = currentCount;
    if (btnAddCounter) btnAddCounter.textContent = `${currentCount}/4`;

    // 4 choices limit handling
    if (currentCount >= 4) {
      if (btnAddChoice) {
        btnAddChoice.disabled = true;
        btnAddChoice.classList.add("disabled");
        btnAddChoice.title = "Maximum 4 choices reached for this scene.";
      }
      if (choiceLimitHint) {
        choiceLimitHint.textContent = "Maximum 4 choices reached. Remove a choice to add another.";
        choiceLimitHint.style.color = "var(--pale-gold)";
      }
    } else {
      if (btnAddChoice) {
        btnAddChoice.disabled = false;
        btnAddChoice.classList.remove("disabled");
        btnAddChoice.title = "Add a new choice branch";
      }
      if (choiceLimitHint) {
        choiceLimitHint.textContent = "Maximum 4 choices per scene for optimal reader clarity.";
        choiceLimitHint.style.color = "var(--muted-blue-gray)";
      }
    }

    if (currentCount === 0) {
      choicesList.innerHTML = `
        <div style="padding: 1.25rem; text-align: center; color: var(--muted-blue-gray); font-size: 0.88rem; background: var(--surface-2); border-radius: var(--radius-sm); border: 1px dashed var(--surface-glass-border);">
          ${sc.isEnding ? "This scene is an ending and requires no choices." : "No choices added yet. Readers cannot navigate beyond this scene without at least one choice."}
        </div>
      `;
      return;
    }

    sc.choices.forEach((choice, index) => {
      const card = document.createElement("div");
      card.className = "choice-editor-card";

      // Build destination select options
      let optionsHtml = '';
      currentStory.scenes.forEach(otherSc => {
        const isSelected = otherSc.id === choice.targetId;
        optionsHtml += `<option value="${otherSc.id}" ${isSelected ? 'selected' : ''}>${escapeHTML(otherSc.title)} (${otherSc.id})</option>`;
      });

      card.innerHTML = `
        <div class="choice-editor-header">
          <span class="choice-index-label">CHOICE ${index + 1}</span>
          <button type="button" class="choice-remove-btn" data-choice-index="${index}" title="Remove this choice">
            ✕ Remove
          </button>
        </div>
        <div class="choice-inputs-grid">
          <div>
            <label class="sr-only">Choice Text</label>
            <input type="text" class="input-dark input-sm choice-text-input" data-choice-index="${index}" placeholder="Choice text shown to player..." value="${escapeHTML(choice.text)}">
          </div>
          <div>
            <label class="sr-only">Destination Scene</label>
            <select class="choice-dest-select" data-choice-index="${index}">
              ${optionsHtml}
            </select>
          </div>
        </div>
      `;

      // Text input listener
      const textInput = card.querySelector(".choice-text-input");
      textInput.addEventListener("input", (e) => {
        choice.text = e.target.value;
        saveStory(false);
        renderMiniPreview();
      });

      // Target select listener
      const destSelect = card.querySelector(".choice-dest-select");
      destSelect.addEventListener("change", (e) => {
        choice.targetId = e.target.value;
        saveStory(true);
      });

      // Remove button listener
      const removeBtn = card.querySelector(".choice-remove-btn");
      removeBtn.addEventListener("click", () => {
        sc.choices.splice(index, 1);
        saveStory(true);
        renderChoicesList(sc);
      });

      choicesList.appendChild(card);
    });
  }

  function addChoiceToActiveScene() {
    const sc = getSceneById(activeSceneId);
    if (!sc) return;

    if (!sc.choices) sc.choices = [];
    if (sc.choices.length >= 4) {
      showToast("Cannot add more than 4 choices per scene.", "error");
      return;
    }

    // Default destination is first other scene or self
    const defaultTarget = currentStory.scenes.find(s => s.id !== sc.id)?.id || sc.id;

    sc.choices.push({
      text: "Continue onward along the crystalline path...",
      targetId: defaultTarget
    });

    saveStory(true);
    renderChoicesList(sc);
  }

  function addNewScene() {
    const newId = `scene-${Date.now().toString(36)}`;
    const newTitle = `Scene ${currentStory.scenes.length + 1}`;

    const newScene = {
      id: newId,
      title: newTitle,
      text: "Describe the new chamber, path, or encounter awaiting the traveler...",
      isEnding: false,
      choices: []
    };

    currentStory.scenes.push(newScene);
    activeSceneId = newId;

    saveStory(true);
    refreshAllUI();
    showToast(`Created new scene "${newTitle}"`, "success");
  }

  function toggleStartScene() {
    const sc = getSceneById(activeSceneId);
    if (!sc) return;

    currentStory.startSceneId = sc.id;
    saveStory(true);
    renderActiveSceneEditor();
    renderSceneNavigator();
    renderStoryGraph();
    showToast(`"${sc.title}" set as Start Scene`, "success");
  }

  function toggleEndingScene() {
    const sc = getSceneById(activeSceneId);
    if (!sc) return;

    sc.isEnding = !sc.isEnding;
    saveStory(true);
    renderActiveSceneEditor();
    renderSceneNavigator();
    renderStoryGraph();
    showToast(sc.isEnding ? `"${sc.title}" marked as Ending` : `"${sc.title}" marked as Normal Scene`, "info");
  }

  function promptDeleteScene() {
    const sc = getSceneById(activeSceneId);
    if (!sc) return;

    if (currentStory.scenes.length <= 1) {
      showToast("Cannot delete the only remaining scene in the story.", "error");
      return;
    }

    sceneToDelete = sc;
    const modal = document.getElementById("modal-delete-confirm");
    const msg = document.getElementById("delete-modal-msg");
    if (msg) {
      msg.textContent = `Are you sure you want to delete "${sc.title}" (${sc.id})? All incoming choices in other scenes pointing to this scene will be automatically cleaned up.`;
    }
    if (modal) modal.style.display = "flex";
  }

  function closeDeleteModal() {
    const modal = document.getElementById("modal-delete-confirm");
    if (modal) modal.style.display = "none";
    sceneToDelete = null;
  }

  function confirmDeleteScene() {
    if (!sceneToDelete) return;
    const targetId = sceneToDelete.id;

    // 1. Remove from scenes list
    currentStory.scenes = currentStory.scenes.filter(s => s.id !== targetId);

    // 2. Safe Reference Cleanup: Remove all choices in other scenes pointing to deleted scene
    currentStory.scenes.forEach(sc => {
      if (sc.choices) {
        sc.choices = sc.choices.filter(ch => ch.targetId !== targetId);
      }
    });

    // 3. If it was startSceneId, reassign to first available scene
    if (currentStory.startSceneId === targetId) {
      currentStory.startSceneId = currentStory.scenes[0].id;
    }

    // 4. Select next available scene
    activeSceneId = currentStory.scenes[0].id;

    closeDeleteModal();
    saveStory(true);
    refreshAllUI();
    showToast("Scene deleted and references safely cleaned up.", "success");
  }

  /* ===================================================================
     5. JSON EXPORT & IMPORT
     =================================================================== */
  function exportStoryJSON() {
    if (!currentStory) return;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentStory, null, 2));
    const downloadAnchor = document.createElement("a");
    const safeTitle = (currentStory.title || "story").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `chrono-tales-${safeTitle}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("Story exported successfully as JSON file.", "success");
  }

  function importStoryJSON(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        const validation = validateStoryStructure(parsed);

        if (!validation.isValid) {
          alert(`Failed to import story:\n\n${validation.error}\n\nYour current story was kept safe.`);
          return;
        }

        // Apply imported story safely
        currentStory = parsed;
        activeSceneId = currentStory.startSceneId;
        saveStory(true);
        refreshAllUI();
        showToast(`Successfully imported "${currentStory.title}"!`, "success");
      } catch (err) {
        alert("JSON syntax error: File could not be parsed as valid JSON.");
      } finally {
        event.target.value = ''; // Reset file input
      }
    };
    reader.readAsText(file);
  }

  /* ===================================================================
     6. VISUAL STORY GRAPH (SVG TOPOLOGICAL ENGINE)
     =================================================================== */
  function renderStoryGraph() {
    const svgEdges = document.getElementById("graph-edges-g");
    const svgNodes = document.getElementById("graph-nodes-g");
    if (!svgEdges || !svgNodes || !currentStory) return;

    svgEdges.innerHTML = '';
    svgNodes.innerHTML = '';

    const scenes = currentStory.scenes;
    const nodeWidth = 170;
    const nodeHeight = 56;

    // Calculate node coordinates using layered BFS topological layout
    const coords = calculateGraphLayout(scenes, currentStory.startSceneId, nodeWidth, nodeHeight);

    // Render Edges (Bézier curves)
    scenes.forEach(sc => {
      const fromPos = coords[sc.id];
      if (!fromPos || !sc.choices) return;

      sc.choices.forEach(ch => {
        const toPos = coords[ch.targetId];
        if (!toPos) return;

        // Path from right of fromNode to left of toNode
        const startX = fromPos.x + nodeWidth;
        const startY = fromPos.y + nodeHeight / 2;
        const endX = toPos.x;
        const endY = toPos.y + nodeHeight / 2;

        const dx = Math.abs(endX - startX) * 0.5 + 20;
        const cp1x = startX + dx;
        const cp1y = startY;
        const cp2x = endX - dx;
        const cp2y = endY;

        let edgeClass = 'edge-violet';
        let markerUrl = 'url(#arrow-violet)';
        if (sc.id === currentStory.startSceneId) {
          edgeClass = 'edge-cyan';
          markerUrl = 'url(#arrow-cyan)';
        } else if (sc.isEnding) {
          edgeClass = 'edge-gold';
          markerUrl = 'url(#arrow-gold)';
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
        path.setAttribute("class", `graph-edge ${edgeClass}`);
        path.setAttribute("marker-end", markerUrl);

        svgEdges.appendChild(path);
      });
    });

    // Render Nodes
    scenes.forEach(sc => {
      const pos = coords[sc.id] || { x: 50, y: 50 };
      const isStart = sc.id === currentStory.startSceneId;
      const isSelected = sc.id === activeSceneId;

      let nodeType = 'node-normal';
      let badgeText = 'SCENE';
      if (isStart) {
        nodeType = 'node-start';
        badgeText = '★ START';
      } else if (sc.isEnding) {
        nodeType = 'node-ending';
        badgeText = '👑 ENDING';
      }

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `graph-node ${nodeType} ${isSelected ? 'selected' : ''}`);
      g.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", nodeWidth);
      rect.setAttribute("height", nodeHeight);

      // Title label (truncated)
      const textTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textTitle.setAttribute("class", "node-title");
      textTitle.setAttribute("x", "12");
      textTitle.setAttribute("y", "26");
      const cleanTitle = (sc.title || "Untitled").length > 18 ? sc.title.slice(0, 16) + '...' : sc.title;
      textTitle.textContent = cleanTitle;

      // Badge label
      const textBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textBadge.setAttribute("class", "node-badge");
      textBadge.setAttribute("x", "12");
      textBadge.setAttribute("y", "44");
      textBadge.setAttribute("fill", isStart ? "#43E6E8" : (sc.isEnding ? "#F5D061" : "#A78BFA"));
      textBadge.textContent = `${badgeText} • ${sc.choices ? sc.choices.length : 0} ch`;

      g.appendChild(rect);
      g.appendChild(textTitle);
      g.appendChild(textBadge);

      g.addEventListener("click", () => {
        selectScene(sc.id);
      });

      svgNodes.appendChild(g);
    });

    updateGraphTransform();
  }

  function calculateGraphLayout(scenes, startId, nodeWidth, nodeHeight) {
    const coords = {};
    const colSpacing = 240;
    const rowSpacing = 85;

    // Build adjacency and compute distance / layer from start scene
    const adj = {};
    scenes.forEach(s => { adj[s.id] = (s.choices || []).map(c => c.targetId); });

    const layers = {};
    const queue = [{ id: startId, layer: 0 }];
    const visited = new Set([startId]);
    layers[startId] = 0;

    while (queue.length > 0) {
      const { id, layer } = queue.shift();
      const neighbors = adj[id] || [];
      neighbors.forEach(nxt => {
        if (!visited.has(nxt)) {
          visited.add(nxt);
          layers[nxt] = layer + 1;
          queue.push({ id: nxt, layer: layer + 1 });
        }
      });
    }

    // Unreachable nodes placed in separate bottom layer
    let maxLayer = 0;
    Object.values(layers).forEach(l => { if (l > maxLayer) maxLayer = l; });

    scenes.forEach(s => {
      if (layers[s.id] === undefined) {
        layers[s.id] = maxLayer + 1;
      }
    });

    // Group scenes by layer
    const layerBuckets = {};
    scenes.forEach(s => {
      const l = layers[s.id];
      if (!layerBuckets[l]) layerBuckets[l] = [];
      layerBuckets[l].push(s.id);
    });

    // Assign positions
    Object.keys(layerBuckets).forEach(layerKey => {
      const l = parseInt(layerKey, 10);
      const bucket = layerBuckets[l];
      bucket.forEach((id, idx) => {
        coords[id] = {
          x: 40 + l * colSpacing,
          y: 40 + idx * rowSpacing
        };
      });
    });

    return coords;
  }

  function updateGraphTransform() {
    const viewportG = document.getElementById("graph-viewport-g");
    if (viewportG) {
      viewportG.setAttribute("transform", `translate(${graphState.panX}, ${graphState.panY}) scale(${graphState.zoom})`);
    }
  }

  function initGraphControls() {
    const svg = document.getElementById("story-graph-svg");
    const btnZoomIn = document.getElementById("btn-graph-zoom-in");
    const btnZoomOut = document.getElementById("btn-graph-zoom-out");
    const btnReset = document.getElementById("btn-graph-reset");

    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", () => {
        graphState.zoom = Math.min(2.5, graphState.zoom + 0.15);
        updateGraphTransform();
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", () => {
        graphState.zoom = Math.max(0.4, graphState.zoom - 0.15);
        updateGraphTransform();
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        graphState.zoom = 1;
        graphState.panX = 40;
        graphState.panY = 40;
        updateGraphTransform();
      });
    }

    // Pan via dragging
    if (svg) {
      svg.addEventListener("mousedown", (e) => {
        if (e.target.closest(".graph-node")) return;
        graphState.isPanning = true;
        graphState.startX = e.clientX - graphState.panX;
        graphState.startY = e.clientY - graphState.panY;
      });

      window.addEventListener("mousemove", (e) => {
        if (!graphState.isPanning) return;
        graphState.panX = e.clientX - graphState.startX;
        graphState.panY = e.clientY - graphState.startY;
        updateGraphTransform();
      });

      window.addEventListener("mouseup", () => {
        graphState.isPanning = false;
      });
    }
  }

  /* ===================================================================
     7. BFS STORY DIAGNOSTICS ENGINE
     =================================================================== */
  function updateDiagnostics() {
    if (!currentStory) return;

    const scenes = currentStory.scenes;
    const startId = currentStory.startSceneId;
    const issues = [];

    // 1. Check valid start scene
    const startExists = scenes.some(s => s.id === startId);
    if (!startExists) {
      issues.push({
        type: 'error',
        text: `Starting scene '${startId}' does not exist in story.`,
        sceneId: scenes[0]?.id
      });
    }

    // 2. BFS Reachability Check from Start Scene
    const reachable = new Set();
    const shortestPathToEnding = [];
    if (startExists) {
      const queue = [{ id: startId, path: [startId] }];
      reachable.add(startId);

      while (queue.length > 0) {
        const { id, path } = queue.shift();
        const sc = getSceneById(id);
        if (sc && sc.isEnding) {
          if (shortestPathToEnding.length === 0 || path.length < shortestPathToEnding.length) {
            shortestPathToEnding.length = 0;
            shortestPathToEnding.push(...path);
          }
        }
        if (sc && sc.choices) {
          sc.choices.forEach(ch => {
            if (!reachable.has(ch.targetId)) {
              reachable.add(ch.targetId);
              queue.push({ id: ch.targetId, path: [...path, ch.targetId] });
            }
          });
        }
      }
    }

    // Find unreachable scenes
    scenes.forEach(sc => {
      if (!reachable.has(sc.id)) {
        issues.push({
          type: 'warning',
          text: `Scene '${sc.title}' is unreachable from the start scene.`,
          sceneId: sc.id
        });
      }
    });

    // 3. Dead-end check: Non-ending scenes with 0 choices
    scenes.forEach(sc => {
      if (!sc.isEnding && (!sc.choices || sc.choices.length === 0)) {
        issues.push({
          type: 'warning',
          text: `Scene '${sc.title}' has no choices and is not marked as an ending.`,
          sceneId: sc.id
        });
      }
    });

    // 4. Broken choice links check
    const sceneIdSet = new Set(scenes.map(s => s.id));
    scenes.forEach(sc => {
      if (sc.choices) {
        sc.choices.forEach((ch, idx) => {
          if (!sceneIdSet.has(ch.targetId)) {
            issues.push({
              type: 'error',
              text: `Choice ${idx + 1} in '${sc.title}' points to nonexistent scene '${ch.targetId}'.`,
              sceneId: sc.id
            });
          }
        });
      }
    });

    // Calculate metrics
    const totalChoices = scenes.reduce((sum, s) => sum + (s.choices ? s.choices.length : 0), 0);
    const totalEndings = scenes.filter(s => s.isEnding).length;

    // Update UI elements
    const metricReachable = document.getElementById("diag-metric-reachable");
    const metricEndings = document.getElementById("diag-metric-endings");
    const metricChoices = document.getElementById("diag-metric-choices");
    const metricDepth = document.getElementById("diag-metric-max-depth");

    if (metricReachable) metricReachable.textContent = `${reachable.size}/${scenes.length}`;
    if (metricEndings) metricEndings.textContent = totalEndings;
    if (metricChoices) metricChoices.textContent = totalChoices;
    if (metricDepth) metricDepth.textContent = shortestPathToEnding.length > 0 ? `${shortestPathToEnding.length - 1} steps` : 'N/A';

    // Summary Card
    const summaryCard = document.getElementById("diagnostics-summary-card");
    const summaryIcon = document.getElementById("diag-summary-icon");
    const summaryTitle = document.getElementById("diag-summary-title");
    const summaryDesc = document.getElementById("diag-summary-desc");
    const badgeIssues = document.getElementById("badge-issues-count");

    if (badgeIssues) {
      badgeIssues.textContent = issues.length;
      if (issues.length > 0) {
        badgeIssues.classList.add("has-issues");
      } else {
        badgeIssues.classList.remove("has-issues");
      }
    }

    if (issues.length === 0) {
      if (summaryCard) summaryCard.className = "diagnostics-summary-card";
      if (summaryIcon) summaryIcon.textContent = "✓";
      if (summaryTitle) summaryTitle.textContent = "Story Graph Healthy";
      if (summaryDesc) summaryDesc.textContent = "All scenes are fully reachable and properly connected with valid endings.";
    } else {
      if (summaryCard) summaryCard.className = "diagnostics-summary-card has-errors";
      if (summaryIcon) summaryIcon.textContent = "!";
      if (summaryTitle) summaryTitle.textContent = `${issues.length} Issue(s) Detected`;
      if (summaryDesc) summaryDesc.textContent = "Review the actionable warnings below to polish your narrative flow.";
    }

    // Issues List
    const issuesContainer = document.getElementById("diagnostics-issues-list");
    if (issuesContainer) {
      issuesContainer.innerHTML = '';
      if (issues.length === 0) {
        issuesContainer.innerHTML = `
          <div class="issue-item issue-success">
            <span>✦ Zero dead-ends, no orphaned nodes, and all destination links are verified.</span>
          </div>
        `;
      } else {
        issues.forEach(iss => {
          const item = document.createElement("div");
          item.className = `issue-item issue-${iss.type}`;
          item.innerHTML = `
            <span>${escapeHTML(iss.text)}</span>
            ${iss.sceneId ? `<button type="button" class="issue-fix-btn" data-scene-id="${iss.sceneId}">Select Scene</button>` : ''}
          `;
          const fixBtn = item.querySelector(".issue-fix-btn");
          if (fixBtn) {
            fixBtn.addEventListener("click", () => {
              selectScene(iss.sceneId);
            });
          }
          issuesContainer.appendChild(item);
        });
      }
    }
  }

  /* ===================================================================
     8. MINI LIVE READER PREVIEW
     =================================================================== */
  function renderMiniPreview() {
    const sc = getSceneById(activeSceneId);
    if (!sc) return;

    const miniTitle = document.getElementById("mini-scene-title");
    const miniText = document.getElementById("mini-scene-text");
    const miniChoices = document.getElementById("mini-choices-container");

    if (miniTitle) miniTitle.textContent = sc.title || "Untitled Scene";
    if (miniText) miniText.textContent = sc.text || "(No narrative text provided)";

    if (miniChoices) {
      miniChoices.innerHTML = '';
      if (sc.isEnding) {
        miniChoices.innerHTML = `
          <div style="padding: 0.8rem; background: rgba(245, 208, 97, 0.15); border: 1px solid var(--pale-gold); border-radius: var(--radius-sm); text-align: center; color: var(--pale-gold); font-weight: bold; font-size: 0.88rem;">
            👑 Story Ending Reached
          </div>
        `;
      } else if (!sc.choices || sc.choices.length === 0) {
        miniChoices.innerHTML = `
          <div style="font-size: 0.82rem; color: var(--muted-blue-gray); text-align: center;">(No choices available)</div>
        `;
      } else {
        sc.choices.forEach(ch => {
          const pill = document.createElement("button");
          pill.className = "mini-choice-pill";
          pill.textContent = `→ ${ch.text}`;
          pill.addEventListener("click", () => {
            selectScene(ch.targetId);
          });
          miniChoices.appendChild(pill);
        });
      }
    }
  }

  /* ===================================================================
     9. PLAY MODE (IMMERSIVE INTERACTIVE STORY READER)
     =================================================================== */
  function initPlayMode() {
    const btnRestart = document.getElementById("btn-reader-restart");
    const btnBack = document.getElementById("btn-reader-back");
    const btnEndingRestart = document.getElementById("btn-ending-restart");

    if (btnRestart) {
      btnRestart.addEventListener("click", restartPlayMode);
    }
    if (btnEndingRestart) {
      btnEndingRestart.addEventListener("click", restartPlayMode);
    }
    if (btnBack) {
      btnBack.addEventListener("click", stepBackPlayMode);
    }

    // Keyboard navigation (1, 2, 3, 4) in Play Mode
    window.addEventListener("keydown", (e) => {
      const playSection = document.getElementById("play-mode-section");
      if (!playSection) return;

      // Only trigger if Play section is currently in viewport
      const rect = playSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 4) {
        const choiceBtns = document.querySelectorAll(".choice-play-btn");
        if (choiceBtns[keyNum - 1]) {
          choiceBtns[keyNum - 1].click();
        }
      }
    });
  }

  function launchPlayMode(sceneId = null) {
    if (!currentStory) return;

    playState.currentSceneId = sceneId || currentStory.startSceneId || currentStory.scenes[0]?.id;
    playState.history = [playState.currentSceneId];
    playState.stepsTaken = 0;

    renderPlayScene();

    // Scroll smoothly to Play Mode
    const playSection = document.getElementById("play-mode-section");
    if (playSection) {
      playSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function renderPlayScene() {
    const sc = getSceneById(playState.currentSceneId);
    if (!sc) return;

    // Story Title
    const titleEl = document.getElementById("reader-story-title");
    if (titleEl) titleEl.textContent = currentStory.title || "The Lost Crown";

    // Step counter
    const stepEl = document.getElementById("reader-step-counter");
    if (stepEl) stepEl.textContent = `Step ${playState.stepsTaken + 1}`;

    // History Chain Pills
    const historyChain = document.getElementById("reader-history-chain");
    if (historyChain) {
      historyChain.innerHTML = '';
      playState.history.forEach((hId, idx) => {
        const dot = document.createElement("span");
        dot.className = `history-crumb ${idx === playState.history.length - 1 ? 'current' : ''}`;
        dot.title = `Step ${idx + 1}: ${getSceneById(hId)?.title || hId}`;
        historyChain.appendChild(dot);
      });
    }

    // Back Button state
    const btnBack = document.getElementById("btn-reader-back");
    if (btnBack) {
      btnBack.disabled = playState.history.length <= 1;
    }

    // Scene number & Title
    const sceneNum = document.getElementById("reader-scene-number");
    const sceneTitle = document.getElementById("reader-scene-title");
    if (sceneNum) sceneNum.textContent = `SCENE ${toRoman(playState.history.length)}`;
    if (sceneTitle) sceneTitle.textContent = sc.title || "Untitled Scene";

    // Narrative text
    const narrativeText = document.getElementById("reader-narrative-text");
    if (narrativeText) narrativeText.textContent = sc.text || "";

    // Choice list vs Ending banner
    const choicesWrap = document.getElementById("reader-choices-wrap");
    const choicesGrid = document.getElementById("reader-choices-grid");
    const endingBanner = document.getElementById("reader-ending-banner");

    if (sc.isEnding) {
      if (choicesWrap) choicesWrap.style.display = "none";
      if (endingBanner) {
        endingBanner.style.display = "block";
        const endingTitle = document.getElementById("reader-ending-title");
        const endingSteps = document.getElementById("ending-steps-val");
        const endingScenes = document.getElementById("ending-total-scenes-val");

        if (endingTitle) endingTitle.textContent = sc.title;
        if (endingSteps) endingSteps.textContent = playState.stepsTaken;
        if (endingScenes) endingScenes.textContent = currentStory.scenes.length;
      }
    } else {
      if (endingBanner) endingBanner.style.display = "none";
      if (choicesWrap) choicesWrap.style.display = "block";

      if (choicesGrid) {
        choicesGrid.innerHTML = '';
        if (!sc.choices || sc.choices.length === 0) {
          choicesGrid.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; color: var(--muted-blue-gray);">
              This path has no further destinations. Return to previous scene or restart.
            </div>
          `;
        } else {
          sc.choices.forEach((ch, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "choice-play-btn";
            btn.innerHTML = `
              <span class="choice-btn-key">[${idx + 1}]</span>
              <span style="flex-grow: 1;">${escapeHTML(ch.text)}</span>
              <span class="choice-btn-arrow">→</span>
            `;
            btn.addEventListener("click", () => {
              choosePlayOption(ch.targetId);
            });
            choicesGrid.appendChild(btn);
          });
        }
      }
    }
  }

  function choosePlayOption(destId) {
    if (!getSceneById(destId)) return;

    playState.currentSceneId = destId;
    playState.history.push(destId);
    playState.stepsTaken += 1;

    renderPlayScene();

    // Subtle scroll to keep reader card centered
    const readerCard = document.getElementById("reader-card");
    if (readerCard) {
      readerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function stepBackPlayMode() {
    if (playState.history.length <= 1) return;

    playState.history.pop();
    playState.currentSceneId = playState.history[playState.history.length - 1];
    playState.stepsTaken = Math.max(0, playState.stepsTaken - 1);

    renderPlayScene();
  }

  function restartPlayMode() {
    launchPlayMode(currentStory.startSceneId);
    showToast("Story restarted from the beginning.", "info");
  }

  function toRoman(num) {
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
    return roman[num - 1] || `${num}`;
  }

  /* ===================================================================
     10. CINEMATIC 3D THREE.JS FLOATING ICE PALACE
     =================================================================== */
  function initThreeJSPalace() {
    const canvas = document.getElementById("palace-canvas");
    const container = document.getElementById("palace-3d-container");
    const fallback = document.getElementById("palace-fallback");

    if (!canvas || typeof THREE === 'undefined') {
      if (fallback) fallback.style.display = "block";
      return;
    }

    let renderer, scene, camera;
    let palaceGroup, foregroundCrystal, moonMesh, starPoints, cloudPlanes = [];
    let particleSystem;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Mouse parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    try {
      // 1. Scene setup
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x070B18, 0.0035);

      // 2. Camera setup
      camera = new THREE.PerspectiveCamera(52, windowWidth / windowHeight, 0.1, 1000);
      camera.position.set(0, 15, 45); // Start close (Phase 1 Mystery)

      // 3. Renderer setup
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(windowWidth, windowHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x070B18, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      // 4. Atmospheric Lights
      const ambientLight = new THREE.AmbientLight(0x0E1A38, 1.2);
      scene.add(ambientLight);

      const moonLight = new THREE.DirectionalLight(0xC2ECFF, 2.2);
      moonLight.position.set(40, 80, -70);
      scene.add(moonLight);

      const cyanPointLight = new THREE.PointLight(0x43E6E8, 3.5, 90);
      cyanPointLight.position.set(0, 18, 10);
      scene.add(cyanPointLight);

      const violetPointLight = new THREE.PointLight(0xA78BFA, 3.0, 80);
      violetPointLight.position.set(-15, 8, -5);
      scene.add(violetPointLight);

      // 5. Giant Glowing Moon in the background
      const moonGeo = new THREE.SphereGeometry(18, 32, 32);
      const moonMat = new THREE.MeshBasicMaterial({
        color: 0xE2EEFF,
        fog: false
      });
      moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(32, 45, -140);
      scene.add(moonMesh);

      // Moon atmospheric halo ring
      const haloGeo = new THREE.RingGeometry(18.5, 34, 48);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x7DDCFF,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
        fog: false
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(moonMesh.position);
      haloMesh.position.z += 1;
      scene.add(haloMesh);

      // 6. Starfield Points
      const starGeo = new THREE.BufferGeometry();
      const starCount = 650;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
        starPos[i] = (Math.random() - 0.5) * 600;
        starPos[i + 1] = Math.random() * 250 - 20;
        starPos[i + 2] = (Math.random() - 0.5) * 400 - 80;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xDCD6FF,
        size: 1.4,
        transparent: true,
        opacity: 0.85
      });
      starPoints = new THREE.Points(starGeo, starMat);
      scene.add(starPoints);

      // 7. BUILD THE PROCEDURAL FLOATING ICE PALACE
      palaceGroup = new THREE.Group();

      // Materials with Ice Blue and Violet sheens
      const iceTowerMat = new THREE.MeshStandardMaterial({
        color: 0x162A54,
        roughness: 0.25,
        metalness: 0.35,
        flatShading: true
      });

      const crystalSpireMat = new THREE.MeshStandardMaterial({
        color: 0x7DDCFF,
        emissive: 0x43E6E8,
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.7,
        flatShading: true
      });

      const islandRockMat = new THREE.MeshStandardMaterial({
        color: 0x091124,
        roughness: 0.85,
        metalness: 0.15,
        flatShading: true
      });

      const glowingWindowMat = new THREE.MeshBasicMaterial({
        color: 0x43E6E8
      });

      // A. Main Central Keep
      const centralKeepGeo = new THREE.CylinderGeometry(4.5, 6, 22, 8);
      const centralKeep = new THREE.Mesh(centralKeepGeo, iceTowerMat);
      centralKeep.position.y = 11;
      palaceGroup.add(centralKeep);

      // Main Crystal Spire
      const mainSpireGeo = new THREE.ConeGeometry(5, 24, 8);
      const mainSpire = new THREE.Mesh(mainSpireGeo, crystalSpireMat);
      mainSpire.position.y = 34;
      palaceGroup.add(mainSpire);

      // Upper Spire Needle
      const needleGeo = new THREE.ConeGeometry(1.6, 14, 6);
      const needle = new THREE.Mesh(needleGeo, crystalSpireMat);
      needle.position.y = 48;
      palaceGroup.add(needle);

      // Cyan Glowing Arched Windows on Keep
      for (let w = 0; w < 6; w++) {
        const angle = (w / 6) * Math.PI * 2;
        const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.2, 0.4), glowingWindowMat);
        windowMesh.position.set(Math.sin(angle) * 5.2, 14, Math.cos(angle) * 5.2);
        windowMesh.rotation.y = angle;
        palaceGroup.add(windowMesh);
      }

      // B. Flanking Spires & Towers (Surrounding Architecture)
      const towerOffsets = [
        { x: -11, z: 6, h: 16, s: 14, r: 3 },
        { x: 11, z: 6, h: 16, s: 14, r: 3 },
        { x: -9, z: -10, h: 20, s: 18, r: 3.4 },
        { x: 9, z: -10, h: 20, s: 18, r: 3.4 },
        { x: 0, z: 12, h: 12, s: 10, r: 2.5 }
      ];

      towerOffsets.forEach(t => {
        // Tower body
        const tGeo = new THREE.CylinderGeometry(t.r * 0.8, t.r, t.h, 6);
        const tMesh = new THREE.Mesh(tGeo, iceTowerMat);
        tMesh.position.set(t.x, t.h / 2, t.z);
        palaceGroup.add(tMesh);

        // Tower spire
        const sGeo = new THREE.ConeGeometry(t.r * 1.1, t.s, 6);
        const sMesh = new THREE.Mesh(sGeo, crystalSpireMat);
        sMesh.position.set(t.x, t.h + t.s / 2, t.z);
        palaceGroup.add(sMesh);

        // Connecting bridge to central keep
        const bridgeGeo = new THREE.BoxGeometry(1.4, 1.2, 12);
        const bridge = new THREE.Mesh(bridgeGeo, iceTowerMat);
        bridge.position.set(t.x * 0.5, 7, t.z * 0.5);
        bridge.lookAt(0, 7, 0);
        palaceGroup.add(bridge);
      });

      // C. Grand Palace Terrace Floor
      const terraceGeo = new THREE.CylinderGeometry(17, 16, 2.5, 12);
      const terrace = new THREE.Mesh(terraceGeo, iceTowerMat);
      terrace.position.y = 0;
      palaceGroup.add(terrace);

      // D. THE INVERTED FLOATING ISLAND BASE (Revealed on scroll!)
      // Tapering inverted crystalline rock beneath the palace
      const baseGeo = new THREE.ConeGeometry(17.5, 32, 10);
      const baseMesh = new THREE.Mesh(baseGeo, islandRockMat);
      baseMesh.rotation.x = Math.PI; // Invert upside down!
      baseMesh.position.y = -16;
      palaceGroup.add(baseMesh);

      // Jagged hanging stalactites beneath base
      const stalactiteData = [
        { x: -6, z: 4, h: 16, r: 2.2 },
        { x: 5, z: -5, h: 20, r: 2.6 },
        { x: -3, z: -6, h: 14, r: 1.8 },
        { x: 4, z: 6, h: 18, r: 2.4 },
        { x: 0, z: 0, h: 26, r: 3.0 } // Central deep inverted spike
      ];

      stalactiteData.forEach(st => {
        const cGeo = new THREE.ConeGeometry(st.r, st.h, 5);
        const cMesh = new THREE.Mesh(cGeo, crystalSpireMat);
        cMesh.rotation.x = Math.PI;
        cMesh.position.set(st.x, -22 - st.h / 2, st.z);
        palaceGroup.add(cMesh);
      });

      scene.add(palaceGroup);

      // 8. Rotating Foreground Crystal Gem
      const crystalGeo = new THREE.OctahedronGeometry(2.4, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x43E6E8,
        emissive: 0x7DDCFF,
        emissiveIntensity: 0.5,
        roughness: 0.1,
        metalness: 0.9,
        flatShading: true
      });
      foregroundCrystal = new THREE.Mesh(crystalGeo, crystalMat);
      foregroundCrystal.position.set(16, 12, 28);
      scene.add(foregroundCrystal);

      // 9. Layered Volumetric Cloud Banks & Mist
      const cloudGeo = new THREE.CylinderGeometry(35, 42, 6, 16, 1, true);
      const cloudMat = new THREE.MeshBasicMaterial({
        color: 0x18284F,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });

      for (let c = 0; c < 3; c++) {
        const cMesh = new THREE.Mesh(cloudGeo, cloudMat);
        cMesh.position.set(0, -6 - c * 5, 0);
        cMesh.scale.set(1 + c * 0.25, 1, 1 + c * 0.25);
        cloudPlanes.push(cMesh);
        scene.add(cMesh);
      }

      // Foreground clouds that mask the base during Phase 1
      const fgCloudGeo = new THREE.PlaneGeometry(80, 25);
      const fgCloudMat = new THREE.MeshBasicMaterial({
        color: 0x070B18,
        transparent: true,
        opacity: 0.85
      });
      const fgCloud = new THREE.Mesh(fgCloudGeo, fgCloudMat);
      fgCloud.position.set(0, -2, 25);
      scene.add(fgCloud);
      cloudPlanes.push(fgCloud);

      // 10. Magical Drifting Snow & Dust Particles
      const pCount = 380;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount * 3; p += 3) {
        pPos[p] = (Math.random() - 0.5) * 80;
        pPos[p + 1] = Math.random() * 60 - 20;
        pPos[p + 2] = (Math.random() - 0.5) * 60 + 10;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x7DDCFF,
        size: 0.8,
        transparent: true,
        opacity: 0.65
      });
      particleSystem = new THREE.Points(pGeo, pMat);
      scene.add(particleSystem);

      // Parallax mouse listeners
      window.addEventListener("mousemove", (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // Resize listener
      window.addEventListener("resize", () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        camera.aspect = windowWidth / windowHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(windowWidth, windowHeight);
      });

      // Render Loop
      let clock = new THREE.Clock();
      let scrollSmoothProgress = 0;

      function animate() {
        requestAnimationFrame(animate);

        // Pause animation when tab is inactive to save battery
        if (document.hidden) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse lerping
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Calculate Scroll Progress within the hero-scroll-track
        const heroTrack = document.getElementById("hero");
        let targetScrollProgress = 0;
        if (heroTrack) {
          const trackHeight = heroTrack.offsetHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          if (trackHeight > 0) {
            targetScrollProgress = Math.max(0, Math.min(1, currentScroll / trackHeight));
          }
        }

        // Smooth progress interpolation for buttery transitions
        scrollSmoothProgress += (targetScrollProgress - scrollSmoothProgress) * 0.09;

        // ==========================================================
        // CAMERA SCROLL ANIMATION: 3-PHASE CINEMATIC REVEAL
        // ==========================================================
        // Phase 1 (0.0): Camera close to upper spires (y: 22, z: 32), looking at upper palace
        // Phase 2 (0.5): Camera moves up and back (y: 30, z: 65)
        // Phase 3 (1.0): Wide reveal showing inverted floating base (y: 12, z: 88, tilt to see base)

        const startCamY = 22;
        const startCamZ = 32;
        const endCamY = 6;
        const endCamZ = 92;

        const camY = startCamY + (endCamY - startCamY) * scrollSmoothProgress + mouse.y * 2.5;
        const camZ = startCamZ + (endCamZ - startCamZ) * scrollSmoothProgress;
        const camX = mouse.x * 4.0;

        camera.position.set(camX, camY, camZ);

        // LookAt target adjusts to frame the full inverted base in Phase 3
        const targetLookY = 18 - scrollSmoothProgress * 22;
        camera.lookAt(0, targetLookY, 0);

        // Animate Palace rotation & gentle breathing
        if (palaceGroup) {
          palaceGroup.rotation.y = Math.sin(elapsedTime * 0.12) * 0.06;
          palaceGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.45; // Subtle floating bob
        }

        // Animate Foreground Crystal
        if (foregroundCrystal) {
          foregroundCrystal.rotation.x += 0.015;
          foregroundCrystal.rotation.y += 0.022;
          foregroundCrystal.position.y = 12 + Math.sin(elapsedTime * 1.5) * 0.8;
          // As user scrolls into Phase 2/3, crystal drifts down and glows brighter
          foregroundCrystal.position.x = 16 - scrollSmoothProgress * 25;
          foregroundCrystal.material.emissiveIntensity = 0.5 + scrollSmoothProgress * 0.6;
        }

        // Foreground cloud parallax moves down and fades away to reveal base
        if (fgCloud) {
          fgCloud.position.y = -2 - scrollSmoothProgress * 28;
          fgCloud.material.opacity = Math.max(0, 0.85 - scrollSmoothProgress * 1.8);
        }

        // Clouds rotation
        cloudPlanes.forEach((cp, idx) => {
          if (cp !== fgCloud) {
            cp.rotation.y += 0.001 * (idx + 1);
          }
        });

        // Drift particles
        if (particleSystem) {
          const positions = particleSystem.geometry.attributes.position.array;
          for (let p = 1; p < positions.length; p += 3) {
            positions[p] -= 0.06;
            if (positions[p] < -25) positions[p] = 40;
          }
          particleSystem.geometry.attributes.position.needsUpdate = true;
        }

        // Update UI scroll progress bar & HUD fill
        updateScrollUI(scrollSmoothProgress);

        renderer.render(scene, camera);
      }

      animate();

    } catch (err) {
      console.warn("WebGL initialization fallback triggered:", err);
      if (fallback) fallback.style.display = "block";
    }
  }

  function updateScrollUI(progress) {
    const pBar = document.getElementById("palace-scroll-progress-bar");
    const hudFill = document.getElementById("hud-scroll-fill");
    const phase1 = document.getElementById("hero-phase-1");
    const phase2 = document.getElementById("hero-phase-2");
    const phase3 = document.getElementById("hero-phase-3");
    const indicator = document.getElementById("hero-scroll-indicator");

    if (pBar) pBar.style.width = `${Math.min(100, progress * 100)}%`;
    if (hudFill) hudFill.style.width = `${Math.min(100, Math.max(10, progress * 100))}%`;

    // Phase threshold transitions
    if (progress < 0.28) {
      // Phase 1 active
      if (phase1) phase1.classList.add("active");
      if (phase2) phase2.classList.remove("active");
      if (phase3) phase3.classList.remove("active");
      if (indicator) indicator.style.opacity = "1";
    } else if (progress >= 0.28 && progress < 0.72) {
      // Phase 2 active
      if (phase1) phase1.classList.remove("active");
      if (phase2) phase2.classList.add("active");
      if (phase3) phase3.classList.remove("active");
      if (indicator) indicator.style.opacity = "0.7";
    } else {
      // Phase 3 active: Full Reveal!
      if (phase1) phase1.classList.remove("active");
      if (phase2) phase2.classList.remove("active");
      if (phase3) phase3.classList.add("active");
      if (indicator) indicator.style.opacity = "0";
    }
  }

  /* ===================================================================
     11. GALLERY TEMPLATE LOADERS & NAVIGATION LINKS
     =================================================================== */
  function initGalleryAndNav() {
    // Quick play buttons from navigation and hero
    const navPlayBtn = document.getElementById("nav-quick-play-btn");
    const heroPlayBtn = document.getElementById("hero-secondary-cta");
    const fullRevealPlayBtn = document.getElementById("full-reveal-play-cta");
    const galleryPlayBtn = document.getElementById("gallery-play-lost-crown");

    [navPlayBtn, heroPlayBtn, fullRevealPlayBtn, galleryPlayBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener("click", () => {
          launchPlayMode(currentStory.startSceneId);
        });
      }
    });

    // Gallery edit button
    const galleryEditBtn = document.getElementById("gallery-edit-lost-crown");
    if (galleryEditBtn) {
      galleryEditBtn.addEventListener("click", () => {
        selectScene(currentStory.startSceneId);
      });
    }

    // Template 2: Echoes of the Void loader
    const loadVoidBtn = document.getElementById("load-template-void");
    if (loadVoidBtn) {
      loadVoidBtn.addEventListener("click", () => {
        if (confirm("Load 'Echoes of the Void' template into Story Studio? This will replace your current workspace.")) {
          currentStory = deepClone(TEMPLATE_VOID);
          activeSceneId = currentStory.startSceneId;
          saveStory(true);
          refreshAllUI();
          document.getElementById("story-studio")?.scrollIntoView({ behavior: 'smooth' });
          showToast("Loaded 'Echoes of the Void' template!", "success");
        }
      });
    }

    // Template 3: The Clockwork Labyrinth loader
    const loadClockworkBtn = document.getElementById("load-template-clockwork");
    if (loadClockworkBtn) {
      loadClockworkBtn.addEventListener("click", () => {
        if (confirm("Load 'The Clockwork Labyrinth' template into Story Studio? This will replace your current workspace.")) {
          currentStory = deepClone(TEMPLATE_CLOCKWORK);
          activeSceneId = currentStory.startSceneId;
          saveStory(true);
          refreshAllUI();
          document.getElementById("story-studio")?.scrollIntoView({ behavior: 'smooth' });
          showToast("Loaded 'The Clockwork Labyrinth' template!", "success");
        }
      });
    }

    // Studio Column 3 Tabs Navigation
    const tabGraph = document.getElementById("tab-btn-graph");
    const tabDiag = document.getElementById("tab-btn-diagnostics");
    const tabPrev = document.getElementById("tab-btn-preview");

    const panelGraph = document.getElementById("tool-panel-graph");
    const panelDiag = document.getElementById("tool-panel-diagnostics");
    const panelPrev = document.getElementById("tool-panel-preview");

    function setTab(activeTab, activePanel) {
      [tabGraph, tabDiag, tabPrev].forEach(t => t?.classList.remove("active"));
      [panelGraph, panelDiag, panelPrev].forEach(p => { if (p) p.style.display = "none"; });

      activeTab?.classList.add("active");
      if (activePanel) activePanel.style.display = "flex";

      if (activeTab === tabGraph) {
        renderStoryGraph();
      }
    }

    if (tabGraph) tabGraph.addEventListener("click", () => setTab(tabGraph, panelGraph));
    if (tabDiag) tabDiag.addEventListener("click", () => setTab(tabDiag, panelDiag));
    if (tabPrev) tabPrev.addEventListener("click", () => setTab(tabPrev, panelPrev));

    const btnOpenFullPlayer = document.getElementById("btn-open-full-player");
    if (btnOpenFullPlayer) {
      btnOpenFullPlayer.addEventListener("click", () => {
        launchPlayMode(activeSceneId);
      });
    }
  }

  /* Utility: HTML escaping */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ===================================================================
     12. APPLICATION BOOTSTRAP
     =================================================================== */
  window.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Authoring Studio & Data
    initEditor();

    // 2. Initialize SVG Graph Controls
    initGraphControls();

    // 3. Initialize Interactive Play Mode Reader
    initPlayMode();

    // 4. Initialize Gallery & UI Tabs
    initGalleryAndNav();

    // 5. Initialize 3D Floating Ice Palace (Three.js WebGL)
    initThreeJSPalace();

    console.log("CHRONO TALES initialized successfully. Every Choice Creates a Universe.");
  });

})();
