const https = require('https');

const start = Date.now()

function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
  
      res.on('end', () => {
        console.log(Date.now() - start);
      });
  })
  .end();
}

// all calls are completed more or less simultaneously 
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();


// Neither libuv nor Node have any code handling the low level bits of network operations.
// Libuv instead delegates the request making to the underlying OS

// Libuv issues request, and waits for OS signal indicating that data has returned

// OS decides on thread use