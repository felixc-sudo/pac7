# CARBONCUT — Carbon Footprint Tracking & Reduction Services

Static web application built around **CSS Positioning** (`static`, `relative`, `absolute`, `fixed`, `sticky`, and `z-index`), featuring the 5-point positioned telemetry banner (`Top Left`, `Top Right`, `Centered`, `Bottom Left`, `Bottom Right`), an interactive Carbon Footprint Calculator, and a live JavaScript **CRUD** task checklist.

## Files Included
- `index.html` — Root HTML entry point for GitHub Pages and Vercel.
- `carboncut_position_layers.css` — Positioning layers, z-index stacking, and responsive theme styles.
- `carboncut_spatial_crud.js` — Footprint calculator and CRUD array operations (`addTask()`).
- `vercel.json` — Vercel static hosting configuration.

## GitHub & Vercel Deployment Steps
1. Unzip `carboncut_positioning_suite.zip` and open a terminal inside `carboncut_positioning_suite`.
2. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Add CARBONCUT CSS positioning website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/carboncut-positioning-suite.git
   git push -u origin main
   ```
3. Open [vercel.com](https://vercel.com), click **Add New → Project**, import `carboncut-positioning-suite`, keep Framework Preset as **Other**, and click **Deploy**.
