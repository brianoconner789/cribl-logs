# cribl-logs

# Log-API

The service provides a REST API endpoint that allows users to retrieve log lines from specified log files in the /var/log directory.

## Project Structure

- **Server.js:** Server implementation for the first problem to fetch logs.
- **LogController.js:** Controller for handling log requests.
- **LogService.js:** Service to read logs from files.
- **LogService.test.js:** Tests for the log service.
- **Frontend:** Contains frontend files (index.html, style.css, script.js).


## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:brianoconner789/cribl-logs.git
   cd cribl-logs
   node server.js
   ```
2. **Run the tests:**  
You may need to run using sudo and provide write access to **/var/log** in your computer. (We have a test case that creates a 1gb file and deletes it after testing is done to test against all the constraints expected.)

```bash
sudo npm run test
```

3. Open in Browser: 
```bash
localhost:3000
```
4. On the UI, given three inputs - Try using 'system.log' in the filename, then, optional filter as text search and last is limit.


## Using the Service (Through Postman)

### Retrieving Log Lines

- **Endpoint:** [http://localhost:3000/logs](http://localhost:3000/logs)
- **HTTP Method:** GET
- **Query Parameters:**
  - `filename`: Specify the log file name within `/var/log`.
  - `filter`: Filter results based on text/keyword matches.
  - `limit`: Specify the last `n` number of matching entries to retrieve.
