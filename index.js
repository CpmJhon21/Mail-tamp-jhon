import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('./'));

// API Key
const TEMP_EMAIL_API_KEY = '43b81f9dad8efe2f59cbbc73189672d0';

// Generate Temporary Email
app.get('/generate-email', async (req, res) => {
  try {
    const response = await fetch(`https://my.sonjj.com/api/v1/email`, {
      headers: {
        Authorization: `Bearer ${TEMP_EMAIL_API_KEY}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json({ error: 'Failed to generate email', details: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check Email Inbox
app.get('/check-inbox/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const response = await fetch(`https://my.sonjj.com/api/v1/email/${email}`, {
      headers: {
        Authorization: `Bearer ${TEMP_EMAIL_API_KEY}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json({ error: 'Failed to fetch inbox', details: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
