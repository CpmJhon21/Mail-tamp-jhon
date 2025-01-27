const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Ganti dengan API Key dari SonJJ
const TEMP_EMAIL_API_KEY = '43b81f9dad8efe2f59cbbc73189672d0';

app.use(express.static(path.join(__dirname)));

// Endpoint untuk generate email
app.get('/generate-email', async (req, res) => {
  try {
    const response = await fetch(`https://my.sonjj.com/api/v1/email`, {
      headers: {
        Authorization: `Bearer ${TEMP_EMAIL_API_KEY}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      res.json(data); // Berhasil generate email
    } else {
      res.status(400).json({ error: 'Failed to generate email', details: data });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
