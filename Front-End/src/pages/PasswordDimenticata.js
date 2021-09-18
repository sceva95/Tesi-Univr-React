import style from "../style/PasswordDimenticata.module.css";
import {Typography, IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress} from '@material-ui/core'
import { useState } from "react";
import { database } from "../Axios";
import DoneAllIcon from '@material-ui/icons/DoneAll';

function PasswordDimenticata() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickButton = () => {
    if(email !== "" && username !== ""){
      setLoading(true);
      database.post(`/recupero/password`, {
        username: username,
        password: email
      }).then((response) => {
        setLoading(false);
        setOpenSuccess(true);
      }).catch((error) => {
        setLoading(false);
        setOpenError(true)      })
    }
  }

  const dialog = () => {

    const handleClose = () => {
      setOpenSuccess(false);
      setOpenError(false);
    }
    return <div>
      <Dialog
          open={openSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Password Modificata!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">La password è stata modificata, controlla la casella email per vedere la nuova password.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleClose} color="primary">
              <DoneAllIcon/>
            </IconButton>
            
          </DialogActions>
        </Dialog>
        <Dialog
          open={openError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Errore!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">La password non è stata modificata, controlla di aver inserito correttamente email e username.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleClose} color="primary">
              <DoneAllIcon/>
            </IconButton>
            
          </DialogActions>
        </Dialog>
        <Dialog
          open={loading}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Attendi!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Stiamo prendendo in carico la tua richiesta, attendi... <CircularProgress size={20}/></DialogContentText>
          </DialogContent>
          
        </Dialog>
    </div>
  }

  return (
    <div className={style.container}>
    <div className={style.bg}></div>
    {dialog()}
      <Typography variant="h4">Recupero Password </Typography>
      <div className={style.form}>
      <Typography varaint="body2" htmlFor="email"> Inserisci la tua EMAIL </Typography>
       <TextField variant="outlined"  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
       <Typography varaint="body2" htmlFor="email"> Inserisci il tuo USERNAME </Typography>
       <TextField variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
       <Button onClick={() => onClickButton()} variant="contained" color="primary">Recupero Password</Button>
      </div>
    </div>
  );
}

export default PasswordDimenticata;
