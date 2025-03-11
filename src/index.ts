import express from 'express';
import config from './utils/config';
import logger from './utils/logger';

const app = express();

app.get('/', (_req, res) => {
  res.json({
    message: 'Express API Starter Kit is running',
  });
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

module.exports = app;
