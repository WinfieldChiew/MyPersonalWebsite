require('dotenv').config();
const express    = require('express');
const { Resend } = require('resend');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = 3001;

// Trust the single Nginx reverse proxy in front of this server
app.set('trust proxy', 1);

app.use(express.json());

// Only accept requests from your own domain
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === 'https://winfieldchiew.com' || origin === 'https://www.winfieldchiew.com') {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// 5 submissions per IP per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' }
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', limiter, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    await resend.emails.send({
      from: 'Winfield Chiew <hello@winfieldchiew.com>',
      to:   'winfieldchiewf@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Reject everything else
app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Contact API listening on 127.0.0.1:${PORT}`);
});
