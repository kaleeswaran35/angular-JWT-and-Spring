const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const port = 3000;
const cors = require('cors');

// Create an Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
