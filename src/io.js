"use strict"

const socket = require('socket.io');

class IOSocket
{
    constructor(server) {
        this.response = "something went wrong";
        this.io = socket(server);

        this.io.on('connection', (socket) => {
            console.log('a user connected');

            var self = this;
            socket.on("chat", (data) => {
                console.log("user sent:", data);
                self.io.sockets.emit("chat", data);
            })

            socket.on("typing", (data) => {
                socket.broadcast.emit("typing", data);
            })
        });
    }
}
console.log('sds');

module.exports = IOSocket;