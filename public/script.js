async function fetchLogs() {
    const filename = document.getElementById('filename').value;
    const filter = document.getElementById('filter').value;
    const limit = document.getElementById('limit').value;
  
    const queryParams = new URLSearchParams({
      filename: filename,
      filter: filter,
      limit: limit,
    });
  
    try {
      const response = await fetch(`/logs?${queryParams}`);
      const logs = await response.json();
      displayLogs(logs);
    } catch (error) {
      console.error('Error fetching logs:', error.message);
    }
  }
  
  function displayLogs(logs) {
    const logsContainer = document.getElementById('logs');
    logsContainer.innerHTML = 'Logs:\n' + JSON.stringify(logs, null, 2);
  }
