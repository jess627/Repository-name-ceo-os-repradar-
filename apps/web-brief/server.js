const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  try {
    // Regenerate brief (silent run)
    execSync('npm run morning-brief', { stdio: 'inherit' });

    const filePath = path.join(process.cwd(), '.cache', 'morning-brief.html');
    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, 'utf8');
      res.send(html);
    } else {
      res.status(404).send('<h1>No Morning Brief found</h1><p>Run `npm run morning-brief` to generate one.</p>');
    }
  } catch (err) {
    res.status(500).send(`<h1>Error generating Morning Brief</h1><pre>${err.message}</pre>`);
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Morning Brief available at http://localhost:${PORT}`);
});
