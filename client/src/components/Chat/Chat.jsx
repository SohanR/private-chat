import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';


let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const EP = 'http://localhost:5000/';
   
    useEffect(() =>{
        const {name , room} = queryString.parse(location.search);

        socket = io(EP)

        setName(name);
        setRoom(room);

        console.log(socket);

        socket.emit('join', {name, room}, (error)=>{
        //     alert(error)
        })

        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }

    },[EP, location.search])


    useEffect(()=>{

        socket.on('message', (message)=>{
            setMessages([...messages,message])
        })
    },[messages]);

    

    //sending massages logic

    const sendMessage = (event)=>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage' , message, ()=> setMessage(""));
        }

        console.log(message, messages);
    }

    return(
       <div className="outerContainer">
           <div className="container" >
              <InfoBar room={room} /> 
              <Input message={message} setMessage={sendMessage} sendMessage={sendMessage} />
           </div>           
       </div>
    )
}

export default Chat;