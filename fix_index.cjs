const fs = require('fs');
const lines = [
  '<!doctype html>',
  '<html lang="ja">',
  '  <head>',
  '    <meta charset="UTF-8" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '    <link rel="icon" type="image/svg+xml" href="/vite.svg" />',
  '    <title>\u3048\u307b\u3093\u306e\u68ee</title>',
  '    <meta name="description" content="\u3048\u307b\u3093\u306e\u68ee - \u307f\u3093\u306a\u3067\u697d\u3057\u3080\u7d75\u672c\u306e\u305b\u304b\u3044" />',
  '    <meta property="og:title" content="\u3048\u307b\u3093\u306e\u68ee" />',
  '    <meta property="og:description" content="\u307f\u3093\u306a\u3067\u697d\u3057\u3080\u7d75\u672c\u306e\u305b\u304b\u3044" />',
  '    <meta property="og:type" content="website" />',
  '    <meta property="og:url" content="https://picture-book-site.vercel.app/" />',
  '    <meta property="og:locale" content="ja_JP" />',
  '    <meta name="twitter:card" content="summary" />',
  '    <meta name="twitter:title" content="\u3048\u307b\u3093\u306e\u68ee" />',
  '    <meta name="twitter:description" content="\u307f\u3093\u306a\u3067\u697d\u3057\u3080\u7d75\u672c\u306e\u305b\u304b\u3044" />',
  '  </head>',
  '  <body>',
  '    <div id="root"></div>',
  '    <script type="module" src="/src/main.jsx"></script>',
  '  </body>',
  '</html>',
  ''
];
fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
console.log('done');
