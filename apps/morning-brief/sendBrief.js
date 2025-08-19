const fs = require('fs');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

// === CONFIG ===
// Set these in your .env file
const EMAIL_TO = process.env.BRIEF_EMAIL_TO; // e.g. you@example.com
const EMAIL_FROM = process.env.BRIEF_EMAIL_FROM; // e.g. briefbot@example.com
const EMAIL_PASS = process.env.BRIEF_EMAIL_PASS; // app password, not your main email password
const SMTP_HOST = process.env.BRIEF_SMTP_HOST;   // e.g. smtp.gmail.com
const SMTP_PORT = process.env.BRIEF_SMTP_PORT || 465;

const SLACK_WEBHOOK_URL = process.env.BRIEF_SLACK_WEBHOOK || null;
// =================

const briefText = fs.readFileSync('.cache/morning-brief.txt', 'utf8');

(async () => {
  try {
    // Send via Email
    if (EMAIL_TO && EMAIL_FROM && EMAIL_PASS && SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: { user: EMAIL_FROM, pass: EMAIL_PASS }
      });

      await transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Morning Brief — ${new Date().toLocaleDateString()}`,
        text: briefText
      });
      console.log('✅ Email sent');
    } else {
      console.log('⚠ Email config missing — skipping email send');
    }

    // Send via Slack
    if (SLACK_WEBHOOK_URL) {
      await axios.post(SLACK_WEBHOOK_URL, { text: `*Morning Brief*\n${briefText}` });
      console.log('✅ Slack message sent');
    } else {
      console.log('⚠ Slack webhook not set — skipping Slack send');
    }
  } catch (err) {
    console.error('❌ Error sending brief:', err.message);
  }
})();
