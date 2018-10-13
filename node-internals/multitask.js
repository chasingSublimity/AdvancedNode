const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
  
      res.on('end', () => {
        console.log('Request: ', Date.now() - start, ' milliseconds');
      });
  })
  .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash: ', Date.now() - start, ' milliseconds');
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS: ', Date.now() - start, ' milliseconds');
});

doHash();
doHash();
doHash();
doHash();


// ➜  node-internals git:(master) ✗ node multitask.js
// Request:  330  milliseconds => executed by OS (outside of thread pool)
// Hash:  1010  milliseconds => executed in-between the two HD access requests (inside of thread pool)
// FS:  1011  milliseconds => executed after second HD request and after thread from prev hash is freed up (inside of thread pool)
// Hash:  1026  milliseconds => inside of thread pool
// Hash:  1034  milliseconds => inside of thread pool
// Hash:  1049  milliseconds => inside of thread pool