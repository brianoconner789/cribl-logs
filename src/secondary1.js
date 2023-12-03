const express = require('express');
const logController = require('./controllers/logController');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/logs', logController.getLogs);

app.listen(PORT);
