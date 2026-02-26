const fs = require('fs');
const file = 'C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/BookViewer.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace(/\.ebv-page-frame \{[\s\S]*?\}/, `.ebv-page-frame {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}`);

css = css.replace(/\.ebv-page-img \{[\s\S]*?\}/, `.ebv-page-img {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 120px);
  width: auto;
  height: auto;
  object-fit: contain;
}`);

css = css.replace(/\.ebv-page-frame::after \{[\s\S]*?\}/, `/* 装飾を削除 */`);

css = css.replace(/\.ebv-cover-img \{[\s\S]*?\}/, `.ebv-cover-img {
  max-width: 90%;
  max-height: 60vh;
  object-fit: contain;
}`);

css = css.replace(/@media \(max-width: 600px\) \{[\s\S]*?\}/, `@media (max-width: 600px) {
  .ebv-nav-arrow { width: 44px; height: 44px; font-size: 1.4rem; }
  .ebv-click-prev, .ebv-click-next { width: 15%; padding: 0 0.5rem; }
  .ebv-page-frame { padding: 0 0.5rem; }
  .ebv-page-img { max-height: calc(100vh - 100px); }
  .ebv-topbar { padding: 0.4rem 0.6rem; }
  .ebv-topbar-title { font-size: 0.9rem; }
  .ebv-thumb { width: 40px; height: 32px; }
  .ebv-cover-img { max-width: 95%; max-height: 55vh; }
  .ebv-cover-title { font-size: 1.8rem; }
}`);

fs.writeFileSync(file, css);