# 🌌 CHRONO TALES — Premium Cinematic 3D Branching Story Builder

> **"Every Choice Creates a Universe."**

A cinematic, interactive 3D choose-your-own-adventure story builder. Authors create branching scenes and connect choices; readers play the story and uncover multiple destinies.

---

## ✨ Features

- **Procedural 3D Floating Ice Palace (Three.js):**
  - Tall icy blue towers and crystal spires.
  - Huge luminous moon with atmospheric halo.
  - Massive inverted floating crystalline foundation hanging above the clouds.
  - Drifting particles, layered cloud banks, and rotating foreground crystal.
- **Signature 3-Phase Scroll Reveal:**
  - **Phase 1 (The Mystery):** Close dramatic view of upper spires veiled in mist.
  - **Phase 2 (The Ascent):** Camera glides backward and up, revealing mid-tier walls and battlements with parallax clouds.
  - **Phase 3 (The Full Reveal):** Wide cinematic perspective unveiling the full floating citadel and inverted base.
- **The Story Studio (Complete Authoring Environment):**
  - **Scene Navigator:** Create, edit, and filter scenes.
  - **Scene Editor:** Edit titles, story narrative, start scene toggles, and ending flags.
  - **Choice Builder:** Up to 4 choices per scene with destination dropdowns.
  - **Safe Deletion Engine:** Automatically cleans up incoming references to prevent broken links.
- **Live Visual Story Graph:**
  - Interactive SVG map color-coded by node type (Start = Cyan, Normal = Violet, Ending = Gold).
  - Bézier curves with arrows.
  - Click any node to select and edit immediately.
  - Pan and zoom controls.
- **BFS Story Diagnostics:**
  - Traversal algorithm verifies reachability from start scene.
  - Detects dead-ends and broken links with one-click fix buttons.
- **Interactive Reader (Play Mode):**
  - Editorial typography with comfortable reading layout.
  - Step counter, breadcrumb history chain, step undo (Back), and restart button.
  - Illuminated golden ending celebration screen with journey stats.
- **Preloaded Flagship Story:** *"The Lost Crown"* (9 interconnected scenes, 3 distinct endings).
- **In-Browser Persistence:** LocalStorage autosave with real-time status indicator.
- **JSON Portability:** Full schema validation for JSON export and import.

---

## 🚀 Getting Started

No build step or Node.js dependencies required!

### Option 1: Direct File Open
Double-click `index.html` to open directly in any modern browser.

### Option 2: Local HTTP Server
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000).

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Semantic markup, custom properties, glassmorphism, responsive grid & flexbox.
- **JavaScript (ES6+):** Pure client-side logic, BFS graph traversal, SVG manipulation, localStorage API.
- **Three.js (r128 via CDN):** WebGL procedural 3D modeling and lighting.
- **Typography:** *Cinzel Decorative*, *Cinzel*, and *Plus Jakarta Sans* via Google Fonts.

---

## 📜 License
MIT License. Built for the University Vibe-Coding Competition 2026.
