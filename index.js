"use strict"

const IO = require('./io.js');
const shared = require('./sharable.js');
const subscriber = require('./subscriber.js');

const express = require('express');
const app = express();

const server = require('http').Server(app);
new IO(server);

app.set('view-engine', 'jade');

app.get(['/summer', '/winter', '/database', '/sendmail', '/chatwizz'], (req, res) => {
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
