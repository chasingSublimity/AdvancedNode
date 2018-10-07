const cluster = require('cluster');

if (cluster.isMaster) {
  // execute index.js again in child mode
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {  
  // child process, just a server
  const express = require('express');
  const app = express();
  
  function doWork(duration) {
    const start = Date.now();
    while(Date.now() - start < duration) {}
  }
  
  app.get('/', (req, res) => {
    doWork(5000); // event loop blocked
    res.send('Hi there');
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast!');
  });
  
  app.listen(3000);
}