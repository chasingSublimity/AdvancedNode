// fake code emulating event loop

// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];


// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // check one: any pending steTimeout, setInterval, setImmediate?
  // check two: any pending OS tasks? (example: http server listening to some port)
  // check three: any pending long running operations? (like fs operations)
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;

}

// enter event loop

// Entire body executes in one 'tick'
while(shouldContinue() ) {
  // 1) Node looks at pendingTimers and sees if any functions
  // are ready to be called. (setTimeout, setInterval)

  // 2) Node looks at pendingOSTasks and pendingOperations
  // and calls any relevant callbacks

  // 3) Node pauses execution temporarily and waits for new events:
  //  - a new pendingOSTask is done
  //  - a new pendingOperation is done
  //  - a timer is about to complete

  // 4) Node again looks at pendingTimers, 
  // call any setImmediate

  // 5) Handle any 'close' events 

}


// exit back to terminal