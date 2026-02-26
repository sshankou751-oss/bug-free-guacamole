const fs = require('fs');
const file = 'C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/BookViewer.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace(/\.ebv-slide \{\s*position: absolute;\s*inset: 0;\s*display: flex;\s*align-items: center;\s*justify-content: center;\s*padding: 1rem;/, `.ebv-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;`); // Removed padding for max size

css = css.replace(/\.ebv-page-img \{\s*display: block;\s*max-width: 100%;\s*max-height: calc\(100vh - 100px\);\s*width: auto;\s*height: auto;\s*object-fit: contain;\s*\}/, `.ebv-page-img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}`); // Changed calc to 100%

css = css.replace(/\.ebv-cover \{\s*display: flex;\s*flex-direction: column;\s*align-items: center;\s*justify-content: center;\s*gap: 1\.5rem;\s*text-align: center;\s*padding: 2rem;\s*\}/, `.ebv-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  text-align: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}`); // Added height 100%

css = css.replace(/\.ebv-cover-img \{\s*max-width: 90%;\s*max-height: 60vh;\s*object-fit: contain;\s*\}/, `.ebv-cover-img {
  max-width: 90%;
  flex: 1 1 auto;
  min-height: 0;
  object-fit: contain;
}`); // Added flex shrink

const regex = /\/\* ---------- Mobile ---------- \*\/[\s\S]*$/;
const replacement = `/* ---------- Mobile ---------- */
@media (max-width: 600px) {
  .ebv-nav-arrow { width: 44px; height: 44px; font-size: 1.4rem; }
  .ebv-click-prev, .ebv-click-next { width: 15%; padding: 0 0.5rem; }
  .ebv-page-frame { padding: 0; }
  .ebv-page-img { max-height: 100%; }
  .ebv-topbar { padding: 0.4rem 0.6rem; }
  .ebv-topbar-title { font-size: 0.9rem; }
  .ebv-thumb { width: 40px; height: 32px; }
  .ebv-cover-img { max-width: 95%; }
  .ebv-cover-title { font-size: 1.5rem; }
  .ebv-cover { gap: 1rem; padding: 1rem 0.5rem; }
}
`;
css = css.replace(regex, replacement);

fs.writeFileSync(file, css);