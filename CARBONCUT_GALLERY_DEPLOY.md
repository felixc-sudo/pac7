# CARBONCUT — Responsive Image Gallery & Carbon Reduction Tracker

Static web application built around **CSS Grid** (`grid-template-columns: repeat(auto-fit, minmax(235px, 1fr))`) for a responsive 8-tile carbon reduction gallery (4x2 on desktop, 2x4 on mobile), paired with an interactive Carbon Footprint Estimator and a live JavaScript **CRUD** checklist.

## Files Included
- `index.html` — Root HTML entry point for GitHub Pages and Vercel.
- `carboncut_cssgrid_gallery.css` — CSS Grid responsive gallery and theme styles.
- `carboncut_gallery_crud.js` — Interactive project spotlight, carbon calculator, and CRUD task array (`addTask()`).
- `vercel.json` — Zero-config Vercel static deployment configuration.

## GitHub & Vercel Deployment Steps
1. Extract `carboncut_responsive_gallery.zip` and open a terminal inside `carboncut_responsive_gallery`.
2. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Add CARBONCUT CSS Grid responsive gallery website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/carboncut-responsive-gallery.git
   git push -u origin main
   ```
3. Open [vercel.com](https://vercel.com), click **Add New → Project**, import `carboncut-responsive-gallery`, keep Framework Preset as **Other**, and click **Deploy**.
