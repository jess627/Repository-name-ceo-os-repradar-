const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const filePath = path.join(process.cwd(), '.cache', 'morning-brief.html');
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    res.send(html);
  } else {
    res.status(404).send('<h1>No Morning Brief found</h1><p>Run `npm run morning-brief` to generate one.</p>');
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Morning Brief available at http://localhost:${PORT}`);
});
