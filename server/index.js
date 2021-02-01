const express = require('express');
const socketio = require('socket.io');

const http = require('http');
const router = require('./router/router');
const cors = require('cors');

const {addUser, removeUser,getUser,getUsersInRoom} = require('./users.js');
const { use } = require('./router/router');



const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
// const options = {
//     cors: {
//         origin: "http://localhost:3000/",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//       }
// }
const io = socketio(server);




//socket.io

io.on('connect', socket => {
    console.log("we have a new user!!!!!!!!!");

  socket.on('join', ({name,room}, callback) =>{
      console.log(`name: ${name} room: ${room}`);  


    const { error , user } = addUser({id:socket.id, name, room});


    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});

    socket.broadcast.to(user.room).emit('message',{user:'admin',test:`${user.name}, has joined!`});

   

    callback()
  });

  socket.on('sendMessage',(message,callback)=>{
    const user = getUser(socket.id);

    io.to(user.room).emit('message',{user: user.name , text: message})

    callback()
  });

    socket.on('disconnect', () =>{
        console.log('User had left!');
    })
})

app.use(cors())
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port:${PORT}`));