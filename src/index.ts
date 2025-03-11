import express from 'express';
import config from './utils/config';

const app = express();

app.get('/', (_req, res) => {
  res.json({
    message: 'Express API Starter Kit is running',
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
