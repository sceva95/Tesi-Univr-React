import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import style from "../style/Login.module.css";
import { database } from "../Axios";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



function Login({}) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selezione, setSelezione] = useState(false);

  const [aziendaLoggata, setAziendaLoggata] = useState({
    id: null,
    ragionesociale: "",
    partitaiva: "",
    indirizzo: "",
    comuneid: null,
    cap: "",
    telefono: "",
    email: "",
    urlsito: "",
    settoreattivitaid: null,
    approved: null,
    createdat: null,
    updatedat: null,
    deletedat: null,
    username: "",
    password: "",
    agenziaid: null,
  });
  const [agenziaLoggata, setAgenziaLoggata] = useState({
    id: null,
    ragionesociale: "",
    indirizzo: "",
    comuneid: null,
    cap: "",
    telefono: "",
    email: "",
    urlsito: "",
    username: "",
    password: "",
    createdat: null,
    updatedat: null,
  });
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openEmailPasswordMismatch, setOpenEmailPasswordMismatch] = useState(false);
  const [openNotApproved, setOpenNotApproved] = useState(false);
  
 

  //FUNZIONI
  useEffect(() => {
    setAziendaLoggata(null);
    setAgenziaLoggata(null);
    setIsLogged(false);
  },[])

  //SUBMIT
  const submit =  (e) => {
    e.preventDefault();
   setLoading(true);


    switch (selezione) {
      //AZIENDA
      case true:
         database
          .post("/azienda/login", {
            username,
            password,
          })
          .then( (response) => {
            
            const data = response.data;
            if (data.approved > new Date() || data.approved === null) {
              setOpenNotApproved(true);
              return;
            }

            setAziendaLoggata({
              id: data.id,
              ragionesociale: data.ragioneSociale,
              partitaiva: data.partitaiva,
              indirizzo: data.indirizzo,
              comuneid: data.comuneId,
              cap: data.cap,
              telefono: data.telefono,
              email: data.email,
              urlsito: data.urlsito,
              settoreattivitaid: data.settoreAttivitaId,
              approved: data.approved,
              createdat: data.createdat,
              updatedat: data.updatedat,
              deletedat: data.deletedat,
              email: data.email,
              password: data.password,
              username: data.username,
              agenziaid: data.agenziaid,
            });
            

            setOpenSuccess(true);
            setIsLogged(true);
    
          })
          .catch((error) => {

            setOpenEmailPasswordMismatch(true)});

         setLoading(false);
        break;

      case false:
        //AGENZIA
         database
          .post("/agenzia/login", {
            username,
            password,
          })
          .then( (response) => {

            if(response.data!== ""){
            const data = response.data;

            setAgenziaLoggata({
              id: data.id,
              ragionesociale: data.ragioneSociale,

              indirizzo: data.indirizzo,
              comuneid: data.comuneId,
              cap: data.cap,
              telefono: data.telefono,
              email: data.email,
              urlsito: data.urlsito,

              createdat: data.createdat,
              updatedat: data.updatedat,
              deletedat: data.deletedat,
              email: data.email,
              password: data.password,
              username: data.username,
            });
            setOpenSuccess(true);
            setIsLogged(true);
          }
          else{
            setOpenEmailPasswordMismatch(true)
          }
          })
          .catch((error) => setOpenEmailPasswordMismatch(true));

         setLoading(false);

        break;
    }
  };

  const theme = createMuiTheme({
    palette: {
       // Purple and green play nicely together.
      secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
  });


  //Controllo checkbox
  const onChangeValue = (e) => {
    if (e.target.value === "azienda") setSelezione(true);
    else setSelezione(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false)
  }

  const handleCloseEmailPasswordMismatch = () => {
    setOpenEmailPasswordMismatch(false);
  }

  const handleCloseNotApproved = () => {
    setOpenNotApproved(false);
  }

  const dialog = () => {
    return <div>
<div >
          <Dialog
            open={openSuccess}
            onClose={handleCloseSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bentornato!"}
            </DialogTitle>
            
          </Dialog>
        </div>

        <div className={style.dialog}>
          <Dialog
            open={openEmailPasswordMismatch}
            onClose={handleCloseEmailPasswordMismatch}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Errore Login!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Username o Password errate.</DialogContentText>
            </DialogContent>
            
          </Dialog>
        </div>
        <div className={style.dialog}>
          <Dialog
            open={openNotApproved}
            onClose={handleCloseNotApproved}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Errore Login!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">L'agenzia non ha ancora approvato il tuo l'account, riprova più tardi.</DialogContentText>
            </DialogContent>
            
          </Dialog>
        </div>
    </div>
  }

  return (
    <div className={style.container}>
     <MuiThemeProvider theme={theme}>
      <FormControl component="fieldset" margin="dense" size="medium">
        <RadioGroup
          aria-label="selezione"
          name="selezione"
          row
          onChange={onChangeValue}
          
        >
          <FormControlLabel
            value="agenzia"
            control={<Radio />}
            color="secondary"
            label="Agenzia"
            
          />
          <FormControlLabel
            value="azienda"
            control={<Radio />}
            label="Azienda"
          />
        </RadioGroup>
       
        <TextField
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      </MuiThemeProvider>

      <div>
        {/**controllo dell'accesso */}

        {!loading ? (
          selezione ? (
            isLogged ? (
              <Redirect
                to={{
                  pathname: `/azienda/${aziendaLoggata.id}`,
                  state: { aziendaLoggata },
                }}
              />
            ) : null
          ) : isLogged ? (
            <Redirect
              to={{
                pathname: `/agenzia/${agenziaLoggata.id}`,
                state: { agenziaLoggata },
              }}
            />
          ) : null
        ) : (
          <h2>Caricamento...</h2>
        )}
        <MuiThemeProvider theme={theme}>
        <div className={style.bottoni}>
          <Button style={{marginTop: "5px"}}
            variant="contained"
            color="primary"
            onClick={(e) => submit(e)}
          >
            Sign in
          </Button>

          {/**Altri link per password dimenticata e registrazione */}
          <Link 
            to="recupero-password"
            style={{ textDecoration: "none", color: "#014450", marginTop: "5px" }}
          >
            <a>Password Dimenticata</a>
          </Link>
          <Link to="registrazione" style={{marginTop: "5px", textDecoration:"none"}}>
            <Button variant="contained" color="primary">
              Registrati
            </Button>
          </Link>
        </div>
        </MuiThemeProvider>
      </div>
      {dialog()}
    </div>
  );
}

export default Login;
