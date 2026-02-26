const fs = require('fs');
const file = 'C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/BookViewer.css';
let css = fs.readFileSync(file, 'utf8');

const regex = /\.ebv-page-frame \{\s*position: relative;\s*width: 100%;\s*height: 100%;\s*padding: 0 1rem;[\s\S]*?\}/;
const replacement = `.ebv-page-frame {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}`;
css = css.replace(regex, replacement);

const regex2 = /\.ebv-page-img \{\s*display: block;\s*max-width: 100%;\s*max-height: calc\(100vh - 120px\);[\s\S]*?\}/;
const replacement2 = `.ebv-page-img {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 100px);
  width: auto;
  height: auto;
  object-fit: contain;
}`;
css = css.replace(regex2, replacement2);

fs.writeFileSync(file, css);