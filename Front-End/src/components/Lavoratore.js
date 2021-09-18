import { database } from "../Axios";
import Tooltip from "@material-ui/core/Tooltip";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";


import { useEffect, useState } from "react";
import style from "../style/azienda/Lavoratore.module.css";
import Button from "@material-ui/core/Button";
import { Modal, IconButton, Typography } from "@material-ui/core";
import ProfiloLavoratore from "./ProfiloLavoratore";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  
  
} from "@material-ui/core";

function Lavoratore({
  id,
  nome,
  cognome,
  sesso,
  datadinascita,
  nazionalita,
  statoid,
  email,
  telefono,
  richiestaid,
  handleButtons,
  isAgenzia = false,
  isCercaMatch = false,
  score,
  updateRichiesta, 
  vediBottoni=true,
  handleProponi
}) {
  const [showButtons, setShowButtons] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (statoid === 3 && !isAgenzia && vediBottoni) {
      setShowButtons(true);
    }
  }, []);

  const accetta = async () => {

    await database
      .post(`/lavoratorerichiesta/update`, {
        id: {
          lavoratoreid: id,
          richiestaid: richiestaid,
          statoid: 2,
        },
        dataAggiornamento: new Date(),
      })
      .then((response) => {
        

          handleButtons();
          updateRichiesta();
        setOpenAccettato(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rifiuta = async () => {
   
    await database
      .post(`/lavoratorerichiesta/update`, {
        id: {
          lavoratoreid: id,
          richiestaid: richiestaid,
          statoid: 1,
        },
        dataAggiornamento: new Date(),
      })
      .then((response) => {

          handleButtons();

        
        setOpenRifiutato(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEta = () => {
    const today = new Date().toJSON().slice(0, 4);
    const dataDiNascita = new Date(datadinascita).toJSON().slice(0, 4);
    var eta = today - dataDiNascita;

    return eta;
  };

  const proponi = async () => {
    await database
      .post(`lavoratorerichiesta/find`, {
        id: {
          lavoratoreid: id,
          richiestaid: richiestaid,
        },
      })
      .then((response) => {
        if (!response.data) {
          database
            .post(`lavoratorerichiesta/create`, {
              id: {
                lavoratoreid: id,
                richiestaid: richiestaid,
                statoid: 3,
              },
              dataAggiornamento: new Date(),
            })
            .then((response) =>{
              handleProponi(true)
               handleButtons()}
               );
        } else
          database.post(`/lavoratorerichiesta/update`, {
            id: {
              lavoratoreid: id,
              richiestaid: richiestaid,
              statoid: 3,
            },
            dataAggiornamento: new Date(),
          }).then((response) => {

            setOpenProposto(true)
            handleButtons()
          });
      }).catch((error) => console.log("primo if erro", error));
    return;
  };

  const [openProponi, setOpenProponi] = useState(false);
  const [openAccetta, setOpenAccetta] = useState(false);
  const [openRifiuta, setOpenRifiuta] = useState(false);

  const handleCloseDialog = () => {
    setOpenRifiuta(false);
    setOpenAccetta(false);
    setOpenProponi(false);
  };

  
  

  const dialog = () => {
    const handleProponi = () => {
      proponi()
      setOpenProponi(false);
    };

    const handleAccetta = () => {
      accetta();
      setOpenAccetta(false);
    }

    

    const handleRifiuta =  () => {
      rifiuta()
      setOpenRifiuta(false);
    };
    return (
      <div>
        <Dialog
          open={openProponi}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler proporre il lavoratore?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleProponi} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openAccetta}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler accettare il lavoratore?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleAccetta} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openRifiuta}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler rifiutare il lavoratore?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleRifiuta} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

   //snackbar
   const [openAccettato, setOpenAccettato] = useState(false);
   const [openRifiutato, setOpenRifiutato] = useState(false);
   const [openProposto, setOpenProposto] = useState(false);
   function Alert(props) {
     return <MuiAlert elevation={6} variant="filled" {...props} />;
   }
   const closeSnackBar = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
     setOpenAccettato(false);
     setOpenRifiutato(false);
     setOpenProposto(false);
   };
   const snackBar = () => {
     return (
       <div>
         <Snackbar
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "left",
           }}
           open={openAccettato}
           autoHideDuration={4000}
           onClose={closeSnackBar}
           message="Accettata"
         >
           <Alert onClose={closeSnackBar} severity="success">
             Accettato!
           </Alert>
         </Snackbar>
         <Snackbar
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "left",
           }}
           open={openRifiutato}
           autoHideDuration={4000}
           onClose={closeSnackBar}
           message="Eliminata"
         >
           <Alert onClose={closeSnackBar} severity="error">
             Rifiutato!
           </Alert>
         </Snackbar>
         <Snackbar
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "left",
           }}
           open={openProposto}
           autoHideDuration={4000}
           onClose={closeSnackBar}
           message="Presa in carico"
         >
           <Alert onClose={closeSnackBar} severity="success">
             Lavoratore proposto!
           </Alert>
         </Snackbar>
       </div>
     );
   };

  

  return (
    <div className={style.container}>
    {dialog()}
    {snackBar()}
      
        {isAgenzia ? (
          <IconButton
            className={style.user}
            variant="outlined"
            color="primary"
            onClick={(e) => setOpen(true)}
          >
            <span className="material-icons">account_box</span>
          </IconButton>
        ) : null}

        {isCercaMatch ? <div >
        <Typography variant="body3">Score</Typography>
        <div className={style.score}>
        <h5>{score} </h5> 
        </div>
          
        </div> : null}

        <div className={style.dati}>
          <Typography variant="body3"> {nome} </Typography> 
        
          <Typography variant="body3"> {cognome} </Typography> 
        </div>
        
          
        
     

      <div className={style.dati}>
      <Typography variant="body3">Sesso: {sesso} </Typography> 
      </div>
       
      <div className={style.dati}>
      <Typography variant="body3">Età: {getEta()} </Typography> 
      </div>
        
        {isCercaMatch ? null : <Typography variant="body2" className={style.dati}>Nazionalità: {nazionalita}</Typography>}
        <div>
      <Typography variant="body3" className={style.dati}>Email: {email} </Typography> 
      </div>
      <div>
      <Typography variant="body3" className={style.dati}> Telefono: {telefono} </Typography> 
      </div>

      

      {showButtons ? (
        <div className={style.bottoni}>
        <Tooltip title="Accetta">
              <IconButton onClick={() => setOpenAccetta(true)}>
                <CheckCircleIcon style={{ fill: "green" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Rifiuta">
              <IconButton onClick={() => setOpenRifiuta(true)}>
                <BlockIcon style={{ fill: "red" }} />
              </IconButton>
            </Tooltip>
        </div>
      ) : null}

      {isCercaMatch ? ( 
        <Button className={style.proponi} variant="contained" color="primary" onClick={(e) => setOpenProponi(true)}>
          Proponi
        </Button>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {<ProfiloLavoratore lavoratoreid={id} handleClose={handleClose}/>}
      </Modal>
    </div>
  );
}

export default Lavoratore;
