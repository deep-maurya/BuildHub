const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),

    new winston.transports.Console({
      format: winston.format.simple(),
    }),

    new winston.transports.MongoDB({
      db: process.env.DB_URL,
      collection: 'logs', // Name of the MongoDB collection
      level: 'info', // Log level for MongoDB transport
      options: {
        useUnifiedTopology: true // Ensure compatibility with new MongoDB driver
      }
    }),
  ],
});

module.exports = { logger };
