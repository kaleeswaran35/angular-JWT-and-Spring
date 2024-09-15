const express = require('express');
const winston = require('winston');
const { Client } = require('@elastic/elasticsearch');
const ElasticsearchTransport = require('winston-elasticsearch').ElasticsearchTransport;

// Create an Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

// Define the Elasticsearch transport
const esTransport = new ElasticsearchTransport({
  level: 'info',
  client: client,
  index: 'logs',
  transformer: (logData) => ({
    '@timestamp': logData.timestamp || new Date().toISOString(),
    message: logData.message || '',
    level: logData.level || 'info',
    ...(logData.meta ? { meta: logData.meta } : {}),
  })
});

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    esTransport,
    new winston.transports.Console()
  ],
});

// Create an Express server
const app = express();

app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
