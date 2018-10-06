"use strict"

const fs = require('fs');           // interact with other files
const co = require('co');
const url = require('url');
const http = require('http');
const mysql = require('mysql');
const socket = require('socket.io');
const subscriber = require('./subscriber.js');
// const subscriber = new Subscriber();

const util = require('util');
var readFileAsync = util.promisify(fs.readFile);

const port = 7000;
var responseCode = 200;
var content = "Hello World";

// Database Related
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "webkul"
    });

    var dbOperation = (action) => {
        con.connect(function(err) {
            if (err) throw err;
            let sqlCommand = action + " database node_test";
            console.log(sqlCommand);
            let msg = "Database " + action + "ed!";

            con.query(sqlCommand, function (err, result) {
                if (err) throw err;
                console.log(msg);
            });
        });
    }

    function *readIndex() {
        yield readFileAsync('index.html');
    };

// Instantiate the HTTP server
var httpServer = http.createServer((req, res) => {
    handleRequest(req, res)
});

// Start the HTTP server
httpServer.listen(port, () => {
    console.log('The server is listening on - localhost:' + port);
})

var io = socket(httpServer);

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    })

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    })
});

var handleRequest = async (req, res) => {
    // Get the url and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    if(trimmedPath != "favicon.ico") {
        res.writeHead(responseCode, {'Content-Type': 'text/html'});
        if(trimmedPath == "") {
            var gen = readIndex();
            var data = gen.next().value;

            if(data && data.then) {
                data.then((file_data) => {
                    res.write(file_data);
                    res.end();
                })
            }
        } else if(trimmedPath.includes("database")) {
            dbOperation(trimmedPath.substr("database".length + 1));
            res.write(content);
            res.end();
        } else {
            await subscriber.emit(trimmedPath);        //Fire the subscribed event event
            res.write((trimmedPath == "sendmail") ? ("mail would be successfully send! No guarantee") : (subscriber.eventResponse));
            res.end();
        }
    }
}
