const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

let connectedUsers = 0;

// io.on('connection', (socket) => {
//     console.log("A new user connected")

//     socket.on('chat message', (msg) => {
//         console.log(`message: ${msg}`)
//     })

//     socket.on('disconnect', () => {
//         console.log("user got disconnected")
//     })

// })

let firstTime = true

io.on('connection', (socket) => {

    connectedUsers++;
    // if (firstTime) {
    //     socket.on('chat message', (msg) => {
    //         io.emit('chat message', msg + " just joined the chat!")
    //     })
    //     firstTime = false
    // }
    // io.emit('chat message', `Hi User ${connectedUsers}`)
    socket.on('chat message', (msg) => {
        console.log(msg)
        if (msg == "__init__") {
            io.emit('chat message', `__${(connectedUsers%2 == 0) ? "O" : "X" }`);
        } else {
            io.emit('chat message', msg);
        }
    });

    socket.on('disconnect', (socket) => {
        connectedUsers--;
        // socket.on('chat message', (msg) => {
        //     io.emit('chat message', "user disconnected!!");
        // });
    })
});



server.listen(80, () => {
    console.log("listning to port 80")
})