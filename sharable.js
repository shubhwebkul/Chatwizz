// Error Handler for promises
withErrorHandler = (fn) => fn.catch((error) => console.log("Error: ", error));

exports.withErrorHandler = withErrorHandler;