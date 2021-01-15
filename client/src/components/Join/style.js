import { makeStyles } from '@material-ui/core/styles';



export default makeStyles((theme) => ({

    bg:{
        backgroundColor:'#272C34',
        height: '100vh',
        padding: 0,
        margin: 0
    },

    paper:{
       display:'flex',
       flexDirection:'column',
       alignItems:'center'
    },
    
    submit:{
        margin: theme.spacing(3,0,2)
    },

    mTop:{
       margin: theme.spacing(10,0,2)
    }
    
}) )