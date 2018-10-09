"use strict"

const fs = require('fs');           // interact with other files
const url = require('url');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const IO = require('./io.js');
const shared = require('./sharable.js');
const subscriber = require('./subscriber.js');

const express = require('express');
const app = express();

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

app.set('view-engine', 'jade');

app.get(['/summer', '/winter', '/database', '/sendmail', '/chatwizz'], (req, res) => {
    let fields = getRequiredFieldsFromUrl(req);
    let trimmedPath = fields.trimmedPath;
    let queryParams = fields.queryParams;

    subscriber.emit(trimmedPath, queryParams);
    if(trimmedPath == 'chatwizz') res.sendFile(path.join(__dirname+'/index.html'));
    else res.send(subscriber.eventResponse);
})

var server = http.Server(app);
new IO(server);

// Start the HTTP server
server.listen(shared.port, () => {
    console.log('The server is listening on - localhost:' + shared.port);
})
