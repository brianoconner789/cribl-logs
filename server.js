const express = require('express');
const logController = require('./src/controllers/logController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/logs', logController.getLogs);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
