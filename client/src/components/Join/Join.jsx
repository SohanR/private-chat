import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useStyles from './style';




const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const classes = useStyles();


    return(
        <Container  component="main"  >

            <div  maxWidth="xs"  justifyContent="center" className={classes.paper}>
                <Typography color='initial' className={classes.mTop} component='h1' variant='h5' >Welcome to Private Chat Room</Typography>
                <form>
                    <TextField variant='outlined' margin='normal' required fullWidth label="Name" name='name' autoFocus type="text" onChange={(event) => setName(event.target.value)} >
                        Name
                    </TextField>

                    <TextField variant='outlined' margin='normal' required fullWidth label='Room' name='room' type="text" onChange={(event) =>setRoom(event.target.value)} >
                        Room
                    </TextField>
                </form>
            
                <Link to={`/chat?name=${name}&room=${room}`} onClick={e => (!name || !room) ? e.preventDefault() : null } >
                    <Button className={classes.submit} type='submit' fullWidth variant='contained' color='primary' >
                    Lets Chat
                    </Button>
                </Link>                
            </div>
        </Container>
    )
}

export default Join;