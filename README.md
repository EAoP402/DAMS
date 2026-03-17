# DAMS White Paper Repository

This repository contains a GitHub-ready package for the **Digital Accelerator Metrics System (DAMS)** white paper.

## Contents

- `docs/DAMS_White_Paper.md` — Full white paper in Markdown
- `site/index.html` — Simple web version for GitHub Pages or local viewing
- `site/styles.css` — Styling for the web version
- `site/architecture.mmd` — Mermaid diagram source for DAMS core architecture
- `site/accelerators.mmd` — Mermaid diagram source for accelerator mapping
- `site/dams_index_engine.mmd` — Mermaid diagram source for the DAMS Index Engine
- `LICENSE` — MIT license

## Quick Start

### View locally
Open `site/index.html` in a browser.

### Use with GitHub Pages
1. Create a new GitHub repository.
2. Upload the contents of this ZIP.
3. In GitHub, go to **Settings → Pages**.
4. Set the source to the root or `/site` folder depending on your preferred structure.
5. Publish the site.

### Use the white paper
- Copy `docs/DAMS_White_Paper.md` into a document editor
- Convert it to PDF if needed
- Reuse the Mermaid files for diagrams in Markdown-based docs or GitHub wiki pages

## Repository Structure

```
dams_github_repo/
├── README.md
├── LICENSE
├── docs/
│   └── DAMS_White_Paper.md
├── assets/
└── site/
    ├── index.html
    ├── styles.css
    ├── architecture.mmd
    ├── accelerators.mmd
    └── dams_index_engine.mmd
```
