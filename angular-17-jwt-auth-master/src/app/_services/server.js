const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const port = 3000;
const cors = require('cors');
const nodemailer = require('nodemailer');

// Create an Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

const transporter = nodemailer.createTransport({
  service: 'yahoo', // Use your email service provider
  auth: {
    user: '', // Change to your email ID
    pass: '' // Change your email id password
  },
  tls: {
    rejectUnauthorized: false // Ignore SSL certificate errors (development only)
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to receive logs
app.post('/api/logs', async (req, res) => {
  const log = req.body;

  try {
    await client.index({
      index: 'angular-logs',
      body: {
        '@timestamp': new Date().toISOString(),
        level: log.level,
        message: log.message,
        meta: log.meta || {}
      }
    });
    res.status(200).send('Log added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding log');
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: '', // Sender address (can be the same as your email)
    to: `${email}`, // email address where you want to receive messages
    subject: `Contact Form Submission from ${name}`,
    text: `Message from ${name} : ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
