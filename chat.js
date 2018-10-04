// Make Connection
na = (() => {
    var socket = io.connect("http://localhost:8080/");
    console.log(socket);
    console.log(io);
    console.log(io.connect);
})();