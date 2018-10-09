"use strict"

var port = 7000;
// Error Handler for promises
var withErrorHandler = (fn) => fn.catch((error) => console.log("Error: ", error));

module.exports = {
    withErrorHandler: withErrorHandler,
    port: port,
}