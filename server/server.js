const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public")
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("A new user just connected");


    socket.emit('newMessage', {
        from: "Admin",
        text: "welcome to chat app",
        createdAt: new Date().getTime()
    })

    // 
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "new user join",
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log("createMessage", message);
        // event trigger by admin
        io.emit('newMassage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log("user was disconnected");
    });



});

server.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});