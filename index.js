const url = require('url');
const http = require('http');
const mysql = require('mysql');
const events = require('events');
const socket = require('socket.io');
const nodemailer = require('nodemailer');

var eventEmitter = new events.EventEmitter();
const fileSystem = require('fs');           // interact with other files

const port = 4000;
var responseCode = 200;
var content = "Hello World";

// Event Related
    //Create an event handler:
    var summerCall = () => console.log('Temp - 42c!');
    //Assign the event handler to an event:
    eventEmitter.on('scream', summerCall);

// Email Related
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shubh0896m@gmail.com',
            pass: '143@Gmail'
        }
    });

    var mailOptions = {
        from: 'firoj.ahmad121@webkul.com',
        to: 'shubhammehrotra.symfony@webkul.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    var sendMail = (() => {
        console.log("called");
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

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

    // Read html file
    // readIndex = (() => {
    //     var counter = 0;
    //     console.log('call')
    //     return fileSystem.readFile('index.html', (error, data) => {
    //         console.log('callback: ', data);

    //         return 0;
    //     })
    // });

console.log("Your server is running on- localhost:" + port);
var server = http.createServer((req, res) => {
    if(req.url != "/favicon.ico") {
        res.writeHead(responseCode, {'Content-Type': 'text/html'});
        let q = url.parse(req.url, true)
        console.log(q.href);
        if(q.href == "/") {
            fileSystem.readFile('index.html', (error, data) => {
                if(error) throw error;
                res.write(data);
            })
        } else if(q.href == "/summer") {
            eventEmitter.emit('scream');        //Fire the 'scream' event:
        } else if(q.href == "/sendmail") {
            // send email
            sendMail();
        } else if(q.href.includes("database")) {
            dbOperation(q.href.substr("database".length + 2));
        }

        setTimeout(() => {
            res.end();
        }, 2000);
    }
}).listen(port);

var io = socket(server);

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    })

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    })
});

exports.server = server;
