# cribl-logs

# Log-API

The service provides a REST API endpoint that allows users to retrieve log lines from specified log files in the /var/log directory.

## Project Structure

- **Server.js:** Server implementation for the first problem to fetch logs.
- **LogController.js:** Controller for handling log requests.
- **LogService.js:** Service to read logs from files.
- **LogService.test.js:** Tests for the log service.
- **Frontend:** Contains frontend files (index.html, style.css, script.js).
- **primary.js:** Contains primary server implementation to aggregated logs from secondary servers. 
- **secondary1.js:** Contains secondary server 1 that is internally using LogController.js 
- **secondary2.js:** Contains secondary server 2 that is internally using LogController.js



## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:brianoconner789/cribl-logs.git
   cd cribl-logs
   npm install
   npm start
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

5. Now to run primary-secondary server setup, we have created two secondary servers and one primary server that is aggregating logs from both the servers. (For simplicity, we are just fetching the same logs from both servers so it will look like logs getting retrieved are duplicated. But, its just both servers fetching the same log file.)

```bash
npm run primary-secondary
```
6. We have integrated the same UI to the primary server, so very similarly, you should be able to use the same user interface to fetch logs. 
```bash
localhost:3001
```

You should be able to input : 

Filename, Filter, limit values. (**system.log** should ideally work on 
linux or macs.)

You should be able to see the logs getting fetched and filtered but are duplicated since, we are using two secondary servers to fetch the same file. 

## Using the Service (Through Postman)

### Retrieving Log Lines

- **Endpoint:** [http://localhost:3000/logs](http://localhost:3000/logs)
- **HTTP Method:** GET
- **Query Parameters:**
  - `filename`: Specify the log file name within `/var/log`.
  - `filter`: Filter results based on text/keyword matches.
  - `limit`: Specify the last `n` number of matching entries to retrieve.


### Retrieving Aggregated Logs from Secondary Servers

- **Endpoint:** [http://localhost:3001/logs](http://localhost:3001/logs)
- **HTTP Method:** GET
- **Query Parameters:**
  - `filename`: Specify the log file name within `/var/log`.
  - `filter`: Filter results based on text/keyword matches.
  - `limit`: Specify the last `n` number of matching entries to retrieve.
