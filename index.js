"use strict"

const path = require('path');
const IO = require('./io.js');
const { routes, getRequiredFieldsFromUrl, port } = require('./sharable.js');
const subscriber = require('./subscriber.js');

const express = require('express');
const app = express();

const server = require('http').Server(app);
new IO(server);

app.get(routes, (req, res) => {
    let fields = getRequiredFieldsFromUrl(req);
    let trimmedPath = fields.trimmedPath;
    let queryParams = fields.queryParams;

    subscriber.emit(trimmedPath, queryParams);
    if(trimmedPath) res.sendFile(path.join(__dirname+'/templates/' + trimmedPath + '.html'));
    else res.send(subscriber.eventResponse);
})

// Start the HTTP server
server.listen(port, () => {
    console.log('The server is listening on - localhost:' + port);
})
