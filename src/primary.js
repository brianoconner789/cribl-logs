const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const secondaryServers = [
  'http://localhost:3002/logs',
  'http://localhost:3003/logs',
  // Add more secondary servers as needed
];
app.use(express.static('public'));

app.use(express.json());

app.get('/logs', async (req, res) => {
  const { filename='system.log', filter, limit } = req.query;

  try {
    const secondaryPromises = secondaryServers.map(async (secondaryServer) => {
      try {
        const response = await axios.get(secondaryServer, {
          params: { filename, filter, limit },
        });
        return response.data;
      } catch (error) {
        return { status: 'rejected', reason: error.message };
      }
    });

    const secondaryResults = await Promise.allSettled(secondaryPromises);

    // Extract the logs from fulfilled promises
    const secondaryLogs = secondaryResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)
      .flat();

    res.json(secondaryLogs);
  } catch (error) {
    console.error('Error retrieving logs:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Aggregated log Server is running on http://localhost:${PORT}`);
});
