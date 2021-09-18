import style from "../style/Registrazione.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faSitemap,
  faCaretSquareUp,
  faAddressCard,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { database } from "../Axios";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Redirect} from "react-router-dom"
import { CircularProgress } from "@material-ui/core";

function Registrazione() {
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [partitaIva, setPartitaIva] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [provincie, setProvincie] = useState([]);
  const [showComuni, setShowComuni] = useState(false);
  const [comuneid, setComuneId] = useState();
  const [comuni, setComuni] = useState([]);
  const [cap, setCap] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [urlSito, setUrslSito] = useState("");
  const [settoreAttivita, setSettoreAttivita] = useState([]);
  const [settoreAttivitaId, setSettoreAttivitaId] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [openSucces, setOpenSuccess] = useState(false);
  const [openError, setOpernError] = useState(false);
  const [redirect, setRedirect ] = useState(false); 
  const [loading, setLoading] = useState(false);
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpernError(false)
  }

  useEffect(() => {
    fetchProvincie();
    fetchSetttoreAttivita();
  }, []);

  

  const fetchProvincie = async () => {
    await database
      .get("/comune/read/provincia")
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) =>
          result.push({
            key:value.id,
            provincia: value.provincia,
            sigla_automobilistica: value.sigla_automobilistica,
          })
        );
        setProvincie(result);
      })
      .catch((error) => console.log(error));
  };

  const fetchComuni = async (provincia) => {
    await database
      .get(`/comune/read/all/fromProvincia/${provincia}`)
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) =>
          result.push({
            key:value.id,
            codice_comune_formato_numerico:
              value.codice_comune_formato_numerico,
            denominazione_italiana_e_straniera:
              value.denominazione_italiana_e_straniera,
          })
        );
        setComuni(result);
        setShowComuni(true);
      })
      .catch((error) => console.log(error));
  };

  const fetchSetttoreAttivita = async () => {
    await database
      .get("/settoreattivita/read/all")
      .then((response) => {
        setSettoreAttivita(response.data);
      })
      .catch((error) => console.log("Settore attivita fetch", error));
  };

  const validate = () => {
    if(ragioneSociale === "" || partitaIva==="" || indirizzo===""|| cap==="" || telefono ==="" || email==="" || username==="" || password ==="" || password !== passwordCheck || !comuneid){
      return false;
    }else 
      return true;

  }

  const registazioneHandler = async (e) => {
    
    e.preventDefault();
    if(validate()){
      setLoading(true);
      await database
      .post("/azienda/create", {
        ragioneSociale: ragioneSociale,
        partitaiva: partitaIva,
        indirizzo: indirizzo,
        comuneId: comuneid,
        cap: cap,
        telefono: telefono,
        email: email,
        urlsito: urlSito,
        settoreAttivitaId: settoreAttivitaId,
        approved: null,
        createdat: new Date(),
        updatedat: null,
        deletedat: null,
        username: username,
        password: password,
        agenziaid: 1,
      })
      .then((response) => {
        setLoading(false)
        setOpenSuccess(true);
        setTimeout(() => {  setRedirect(true) }, 4500); ;
       
      })
      .catch((error) => {
        setLoading(false);
        setOpernError(true);
      });
    }else {
      setOpernError(true);
    }
  };

  const settoreAttivitaMapper = () => {
    return settoreAttivita.map((value) => (
      <option key={value.id} value={value.id}>{value.descrizione}</option>
    ));
  };

  const dialog = () => {
    return <div>
<div >
          <Dialog
            open={openSucces}
            onClose={handleCloseSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Registrazione Avvenuta!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"> Registrazione avvenuta con successo, una notifica è stata inviata all'agenzia, dopo che ti avrà approvato potrai eseguire l'accesso.</DialogContentText>
            </DialogContent>
            
          </Dialog>
        </div>
        <div >
          <Dialog
            open={loading}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Controllo Dati!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"> <Typography>Controllando i dati inseriti...</Typography> <CircularProgress/></DialogContentText>
            </DialogContent>
            
          </Dialog>
        </div>

        <div className={style.dialog}>
          <Dialog
            open={openError}
            onClose={handleCloseError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Errore Registrazione!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Controlla di aver inserito tutti i campi corretti.</DialogContentText>
            </DialogContent>
            
          </Dialog>
        </div>
    </div>
  }


  const [errorEmail, setErrorEmail] = useState(false);
  const [helperEmail, setHelperEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [helperPassword, setHelperPassword] = useState("");
  const [errorNumero, setErrornumero] = useState(false);
  const [helperNumero, setHelpernumero] = useState(false);

  const controlloEmail= (value) => {
    //controllo l'email
    setEmail(value)
    if( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
      setHelperEmail("")
      setErrorEmail(false);
    }else{
      setErrorEmail(true)
      setHelperEmail("Formato Email non corretto.")
      
    }
  }

  const controlloPassword = (value) => {
    setPasswordCheck(value)

    if(password !== value){
      setErrorPassword(true);
      setHelperPassword("La password deve combaciare.")
    }else{
      setErrorPassword(false);
      setHelperPassword("");
    }
  }

  const controlloTelefono = (value) => {
    setTelefono(value)
    if(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)){
      setErrornumero(false)
      setHelpernumero("")
    }
      else{
        setErrornumero(true)
        setHelpernumero("Non puoi inserire dei caratteri.")
        
      }
    }
  

  const controlloCap= (value) => {
    setCap(value)
    if(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)){
      setErrornumero(false)
      setHelpernumero("")
    }
      else{
        setErrornumero(true)
        setHelpernumero("Non puoi inserire dei caratteri.")
        
      }
    }
  

  return (
    <div className={style.container}>
      <div className={style.bg}></div>
      <div>
        <h1>Registrati</h1>
      </div>

      <div>
    
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faEnvelope} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="email"
              placeholder="Email"
              error={errorEmail}
              helperText={helperEmail}
              onChange={(e) => controlloEmail(e.target.value)}
              value={email}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faUser} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Username"
            
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faLock} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="password"
              placeholder="Inserisci la password"
              error={errorPassword}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faLock} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="password"
              placeholder="Reinserisci la password"
              error={errorPassword}
              helperText={helperPassword}
              onChange={(e) => controlloPassword(e.target.value)}
              value={passwordCheck}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faCaretSquareUp} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Ragione sociale"
              onChange={(e) => setRagioneSociale(e.target.value)}
              value={ragioneSociale}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faCaretSquareUp} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Partita Iva"
              onChange={(e) => setPartitaIva(e.target.value)}
              value={partitaIva}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faAddressCard} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Indirizzo"
              onChange={(e) => setIndirizzo(e.target.value)}
              value={indirizzo}
            />
          </span>
        </div>
        <div className={style.selectOption}>
          <InputLabel htmlFor="provincia">Provincia</InputLabel>
          <select
            name="Provincia"
            id="provincia"
            onClick={(e) => fetchComuni(e.target.value)}
          >
            <option key={0} value=""></option>
            {provincie.map((value) => (
              <option key={value.id} value={value.provincia}>
                {value.provincia} {value.sigla_automobilistica}
              </option>
            ))}
          </select>

          {showComuni ? (
            <div className={style.comuni}>
              <label htmlFor="comune">Comune</label>
              <select
                name=""
                id="comune"
                onChange={(e) => setComuneId(e.target.value)}
              >
                <option key={0} value=""></option>
                {comuni.map((value, index) => (
                  <option key={index+1} value={value.codice_comune_formato_numerico}>
                    {value.denominazione_italiana_e_straniera}{" "}
                    {value.sigla_automobilistica}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faAddressCard} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Cap"
              error={errorNumero}
              helperText={helperNumero}
              onChange={(e) => controlloCap(e.target.value)}
              value={cap}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faPhoneSquare} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Telefono"
              error={errorNumero}
              helperText={helperNumero}
              onChange={(e) => controlloTelefono(e.target.value)}
              value={telefono}
            />
          </span>
        </div>
        <div className={style.inputField}>
          <span>
            <FontAwesomeIcon icon={faSitemap} className={style.icon} />
            <TextField
              style={{ minWidth: "300px" }}
              type="text"
              placeholder="Url sito"
              onChange={(e) => setUrslSito(e.target.value)}
              value={urlSito}
            />
          </span>
        </div>

        <div className={style.selectOption}>
          <InputLabel id="settoreattivitaid">Settore Attivita</InputLabel>
          <select
            id="settoreattivita"
            onClick={(e) => setSettoreAttivitaId(e.target.value)}
          >
            <option value=""></option>
            {settoreAttivitaMapper()}
          </select>
        </div>

        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={(e) => registazioneHandler(e)}
          >
            Registrati
          </Button>
        </div>
        {redirect ? <Redirect to="/"/> : null}
        {dialog()}
        
      </div>
    </div>
  );
}

export default Registrazione;
