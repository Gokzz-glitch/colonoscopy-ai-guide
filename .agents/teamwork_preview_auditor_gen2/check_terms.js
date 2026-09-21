const fs = require('fs');

['pages/04-architectures.html', 'pages/10-future.html'].forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/data-term=["'](gcn|sam)["']/i.test(l)) {
      console.log(f, i + 1, l.trim());
    }
  });
});
