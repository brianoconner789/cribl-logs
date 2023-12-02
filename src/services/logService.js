const fs = require('fs');
const path = require('path');

async function getLogs(filename, filter, limit) {
  const logFilePath = path.join('/var/log', filename || 'syslog');
  const readStream = fs.createReadStream(logFilePath, { encoding: 'utf-8' });

  return new Promise((resolve, reject) => {
    let partialLine = '';
    let logs = '';

    readStream.on('data', (chunk) => {
      logs = partialLine + chunk;

      const logLines = logs.split('\n');

      // Store the last element (potentially incomplete) for the next iteration
      partialLine = logLines.pop() || '';

      // Apply text filtering
      let filteredLogs = logLines;
      if (filter) {
        filteredLogs = logLines.filter((line) => line.includes(filter));
      }
      
      let reversedLogs = filteredLogs.reverse();
      
      // Limit the number of entries
      if (limit) {
        reversedLogs = reversedLogs.slice(0, limit);
      }  
      
      resolve(reversedLogs);
    });

    readStream.on('error', (error) => {
      reject(error);
    });

    readStream.once('close', () => {
      // Process any remaining partial line at the end of the file
      if (partialLine && partialLine.includes(filter)) {
        resolve([partialLine]);
      } else {
        resolve([]);
      }
    });
  })
  .finally(() => {
    readStream.close();
  });
}

module.exports = { getLogs };
