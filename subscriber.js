//Create an event handler:
var summerCall = () => console.log('Temp - 42c!');

//Assign the event handler to an event:
eventEmitter.on('scream', summerCall);