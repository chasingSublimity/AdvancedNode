process.env.UV_THREADPOOL_SIZE = 1; // child process have only one thread
const cluster = require('cluster');

if (cluster.isMaster) {
  // execute index.js again in child mode
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {  
  // child process, just a server
  const express = require('express');
  const app = express();
  const crypto = require('crypto');
  
  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast!');
  });
  
  app.listen(3000);
}