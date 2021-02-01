import React from 'react';
import './Input.css';




const Input = ({message , setMessage, sendMassage}) => (    
    
    <form className='form' >
        <input 
            className='input'
            type="text" 
            placeholder='Type a private message..'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? sendMassage(event) : null}        
        />
        <button className='sendButton' onClick={(event) => sendMassage(event)} >Send</button>
    </form>
    
)

export default Input;