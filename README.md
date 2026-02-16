# Halo Advo — Clone

Modern clone of [Halo Advo](https://haloadvo.carrd.co/) (Advokesma BEM FH UNDIP 2025) with an **UNNES-inspired color palette** and improved layout.

## Features

- **UNNES-style palette**: Deep green primary, cream/white background, gold accents (same composition as [unnes.ac.id](https://unnes.ac.id/beranda/))
- **Modern nav**: Sticky header with blur, hamburger menu on mobile, smooth scroll to sections
- **Content**: Card-based service sections, quick-access strip, clear hierarchy and hover states

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve -p 8080
```

Then visit `http://localhost:8080`.

## Files

- `index.html` — Structure and content (all Halo Advo services)
- `styles.css` — UNNES-inspired palette and layout
- `script.js` — Mobile menu toggle and header scroll state
