const fs = require('fs');

const title = '\u2728 \u3048\u307b\u3093\u306e\u68ee \u2728';
const desc = '\u304d\u3089\u304d\u3089\u304b\u308f\u3044\u3044\u7d75\u672c\u306e\u68ee\u3078\u3088\u3046\u3053\u305d\uff01\u304a\u304d\u306b\u3044\u308a\u306e\u304a\u306f\u306a\u3057\u3092\u307f\u3093\u306a\u3068\u30b7\u30a7\u30a2\u3057\u3088\u3046\ud83c\udf3f\u2728';

const html = [
  '<!doctype html>',
  '<html lang="ja">',
  '  <head>',
  '    <meta charset="UTF-8" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '    <link rel="icon" type="image/svg+xml" href="/vite.svg" />',
  '    <title>' + title + '</title>',
  '    <meta name="description" content="' + desc + '" />',
  '    <meta property="og:title" content="' + title + '" />',
  '    <meta property="og:description" content="' + desc + '" />',
  '    <meta property="og:type" content="website" />',
  '    <meta property="og:url" content="https://picture-book-site.vercel.app/" />',
  '    <meta property="og:locale" content="ja_JP" />',
  '    <meta name="twitter:card" content="summary" />',
  '    <meta name="twitter:title" content="' + title + '" />',
  '    <meta name="twitter:description" content="' + desc + '" />',
  '  </head>',
  '  <body>',
  '    <div id="root"></div>',
  '    <script type="module" src="/src/main.jsx"></script>',
  '  </body>',
  '</html>',
  ''
].join('\n');

fs.writeFileSync('index.html', html, 'utf8');
console.log('done');
