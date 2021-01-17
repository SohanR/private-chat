import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const EP = 'http://localhost:5000/';

    useEffect(() =>{
        const {name , room} = queryString.parse(location.search);

        socket = io(EP,{
            withCredentials:true,
            extraHeaders:{
                "my-custom-header": "abcd"
            }
        });

        setName(name);
        setRoom(room);

        console.log(socket);
    },[EP, location.search])

    return(
        <h1>helloooooooooooooo {name} welcome to {room}</h1>
    )
}

export default Chat;