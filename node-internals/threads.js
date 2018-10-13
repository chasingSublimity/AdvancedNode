const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1: ', Date.now() - start, ' milliseconds');
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2: ', Date.now() - start, ' milliseconds');
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3: ', Date.now() - start, ' milliseconds');
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4: ', Date.now() - start, ' milliseconds');
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5: ', Date.now() - start, ' milliseconds');
});


// ➜  node-internals git:(master) ✗  node threads.js
// 3:  1043  milliseconds
// 2:  1048  milliseconds
// 4:  1053  milliseconds
// 1:  1056  milliseconds
// 5:  1959  milliseconds // has to wait until a thread is available