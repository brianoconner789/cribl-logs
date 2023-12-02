const fs = require('fs');
const path = require('path');
const { getLogs } = require('../logService');

const testLogDirectory = '/var/log';
const testLogFile = path.join(testLogDirectory, 'test.log');

// Create a larger test log file in chunks
beforeAll(() => {
  if (!fs.existsSync(testLogFile)) {
    console.log(`Creating directory: ${testLogDirectory}`);
    fs.writeFileSync(testLogFile, '');
  }

  const chunkSize = 1024 * 1024; // 1MB chunk size
  const iterations = 1024; // Number of iterations to reach 1GB
  
  for (let i = 0; i < iterations; i++) {
    const logEntry = `Test log entry\n`;
    fs.writeFileSync(testLogFile, logEntry.repeat(chunkSize / logEntry.length), { encoding: 'utf-8', flag: 'a' });
  }
});

// Remove the test log file after all tests are done
afterAll(() => {
  fs.unlinkSync(testLogFile);
});

describe('getLogs', () => {
  it('should fetch logs from a 1gb test.log file that we just created with a specified limit and filter', async () => {
    const filter = 'Test log entry';
    const limit = 150;
    try {
      const logs = await getLogs('test.log', filter, limit);
      expect(logs.length).toBe(Math.min(limit, 1000));
      expect(logs.every((log) => log.includes(filter))).toBe(true);
    } catch (error) {
      console.error('Error in test:', error);
    }
  });


  it('should fetch logs from a 1gb test.log file with a specified limit', async () => {
    const limit = 500;
    const logs = await getLogs('test.log', null, limit);
    expect(logs.length).toBe(limit);
  });

  it('should fetch logs from a 1gb test.log file with a specified filter', async () => {
    const filter = 'Test log entry';
    const logs = await getLogs('test.log', filter);
    expect(logs.every((log) => log.includes(filter))).toBe(true);
  });

  it('should handle a non-existent log file gracefully', async () => {
    const nonExistentFile = 'nonexistent.log';
    try {
      const logs = await getLogs(nonExistentFile);
      expect(logs.length).toBe(0);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
