"use strict"

const url = require('url');

var port = 7000;
// Error Handler for promises
var withErrorHandler = (fn) => fn.catch((error) => console.log("Error: ", error));

var getRequiredFieldsFromUrl = (request) => {
    // Get the url and parse it
    let parsedUrl = url.parse(request.url, true);
    
    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')
    
    let queryStringObject = parsedUrl.query;
    
    let requiredFields = {
        trimmedPath: trimmedPath,
        queryParams: queryStringObject,
    }
    
    return requiredFields;
}

module.exports = {
    port: port,
    withErrorHandler: withErrorHandler,
    getRequiredFieldsFromUrl: getRequiredFieldsFromUrl,
}