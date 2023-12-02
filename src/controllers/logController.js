const logService = require('../services/logService');

async function getLogs(req, res) {
  const { filename, filter, limit } = req.query;

  try {
    const logs = await logService.getLogs(filename, filter, limit);
    res.json(logs);
  } catch (error) {
    console.error('Error retrieving logs:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getLogs };
