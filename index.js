"use strict"

const IO = require('./src/io.js');
const shared = require('./src/sharable.js');
const subscriber = require('./src/subscriber.js');

const express = require('express');
const app = express();

const server = require('http').Server(app);
new IO(server);

app.set('view-engine', 'jade');

app.get(shared.routes, (req, res) => {
    let fields = sharedgetRequiredFieldsFromUrl(req);
    let trimmedPath = fields.trimmedPath;
    let queryParams = fields.queryParams;

    subscriber.emit(trimmedPath, queryParams);
    if(trimmedPath == 'chatwizz') res.sendFile(path.join(__dirname+'/public/index.html'));
    else res.send(subscriber.eventResponse);
})

// Start the HTTP server
server.listen(shared.port, () => {
    console.log('The server is listening on - localhost:' + shared.port);
})
