module.exports = function formatBrief(entries) {
  const text = entries.join('\n');
  const html = `
    <html>
      <body style="font-family: sans-serif; line-height: 1.4;">
        ${entries.map(e => `<div>${e}</div>`).join('')}
      </body>
    </html>
  `;
  return { text, html };
};
