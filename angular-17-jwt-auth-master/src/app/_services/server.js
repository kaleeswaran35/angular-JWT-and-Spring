// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Log file path
const logFilePath = path.join(__dirname, 'app.log');
const logFileStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Log endpoint
app.post('/log', (req, res) => {
  const { level, message } = req.body;
  if (!level || !message) {
    return res.status(400).send('Invalid log message');
  }
  const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}\n`;
  logFileStream.write(logMessage);
  res.status(200).send(logMessage);
});

// Retrieve logs endpoint
app.get('/logs', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return res.status(500).send('Error reading log file');
    }
    res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
