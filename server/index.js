const express = require('express');
const socketio = require('socket.io');

const http = require('http');
const router = require('./router/router');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const options = {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
}
const io = socketio(server, options);




//socket.io

io.on('connection', socket => {
    console.log("we have a new user!!!!!!!!!");

    socket.on('disconnect', () =>{
        console.log('User had left!');
    })
})

app.use(cors())
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port:${PORT}`));