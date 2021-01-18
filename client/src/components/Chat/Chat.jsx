import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';



const Chat = ({ location }) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const EP = 'http://localhost:5000/';
   
    useEffect(() =>{
        const {name , room} = queryString.parse(location.search);

        const socket = io.connect(EP , {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"],
            withCredentials:true,
                extraHeaders:{
                    "my-custom-header": "abcd"
                }
        });

        setName(name);
        setRoom(room);

        console.log(socket);

        socket.emit('join', {name,room},({error})=>{
            alert(error)
        })

        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }

    },[EP, location.search])

    return(
        <h1>helloooooooooooooo {name} welcome to {room}</h1>
    )
}

export default Chat;