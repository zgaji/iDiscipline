import express from 'express';
import sgMail from '@sendgrid/mail';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Email Service is Running!');
});

app.post('/send-password', async (req, res) => {
  const { toEmail, password } = req.body;

  const msg = {
    to: toEmail,
    from: 'zarinelle.c@gmail.com',
    subject: 'Your Account Password',
    text: `Hello, your account has been created successfully! Here is your password: ${password}`,
    html: `<p>Hello, your account has been created successfully! Here is your password: <strong>${password}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true, message: 'Password email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
