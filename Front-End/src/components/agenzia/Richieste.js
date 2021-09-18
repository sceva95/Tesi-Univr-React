import SwipeableViews from "react-swipeable-views";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';

import PageviewIcon from "@material-ui/icons/Pageview";
import CercaMatch from './CarcaMatch'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Modal,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RichiestaInfoAgenzia from "./component/RichiestaInfoAgenzia";

import { database } from "../../Axios";

function Richieste({ richieste, updateRichieste}) {
  //modal
  const [richiestaModal, setRichiestaModal] = useState();
  const [openRichiesta, setOpenRichiesta] = useState(false);
  const [openCercaMatch, setOpenCercaMatch] = useState(false);
  

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '40vw',
      marginTop: '40vh',
      overflow:'scroll'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes= useStyles
  const handleCloseRichiesta = () => {
    setOpenRichiesta(false);
    setOpenCercaMatch(false);
  };

  const modal = () => {
    return (
      <div>
        <Modal
          open={openRichiesta}
          onClose={handleCloseRichiesta}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
          <RichiestaInfoAgenzia richiestaid={richiestaModal} handleClose={handleCloseRichiesta} />
        </Modal>
        <Modal
          open={openCercaMatch}
          onClose={handleCloseRichiesta}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
          <CercaMatch richiestaid={richiestaModal} handleClose={handleCloseRichiesta} handleProponi={setOpenProponi} />
        </Modal>
      </div>
    );
  };

  //dialog
  const [openApprova, setOpenApprova] = useState(false);
  const [openElimina, setOpenElimina] = useState(false);
  const [proposta, setProposta] = useState();
  const [eliminataText, setEliminataText] = useState("");
  const prova = useRef()

  const handleClose = () => {
    setOpenApprova(false);
    setOpenElimina(false);
  };

  const accettaDatabase = () => {
    setLoading(true);
      database
        .post(`/richiesta/update/stato/notifica/${proposta}`, {
          updatedat: new Date(),
          statoiterid: 2,
        })
        .then(async (response) => {
          setLoading(false);
          await setOpenAccettata(true);

          updateRichieste();
        })
        .catch((error) => {
          setLoading(false);
                  });
    
  };

  const eliminaDatabase = (testo) => {
          setLoading(true)
    database
      .post(`/richiesta/deletedat/agenzia/${proposta}`, {
        descrizione: testo,
        updatedat: new Date(),
        deletedat: new Date(),
      })
      .then((response) => {
        setLoading(false)
        setOpenEliminata(true);
        
        updateRichieste();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  
};
  

  const dialog = () => {
    const handleAccetta = () => {
      accettaDatabase();
      setOpenApprova(false);
    };

    let testo = "";
    

    const handleElimina =  () => {
     
      eliminaDatabase(testo)
      setOpenElimina(false);
      testo="";
    };
    return (
      <div>
        <Dialog
          open={openApprova}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler accettare la richiesta?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annulla
            </Button>
            <Button onClick={handleAccetta} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openElimina}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler eliminare la richiesta?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField ref={prova}  onChange={(e) => {testo = e.target.value}} id="testorichiesta" placeholder="Spiega il motivo all'azienda" multiline/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annulla
            </Button>
            <Button onClick={handleElimina} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  //snackbar
  const [openAccettata, setOpenAccettata] = useState(false);
  const [openEliminata, setOpenEliminata] = useState(false);
  const [openPresaInCarico, setOpenPresaInCarico] = useState(false);
  const [openProponi, setOpenProponi] = useState(false);
  const [loading, setLoading] = useState(false);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAccettata(false);
    setOpenEliminata(false);
    setOpenPresaInCarico(false);
    setOpenProponi(false);
  };
  const snackBar = () => {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openAccettata}
          autoHideDuration={4000}
          onClose={closeSnackBar}
          message="Accettata"
        >
          <Alert onClose={closeSnackBar} severity="success">
            Richiesta Accettata!
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openEliminata}
          autoHideDuration={4000}
          onClose={closeSnackBar}
          message="Eliminata"
        >
          <Alert onClose={closeSnackBar} severity="success">
            Richiesta Eliminata!
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openPresaInCarico}
          autoHideDuration={4000}
          onClose={closeSnackBar}
          message="Presa in carico"
        >
          <Alert onClose={closeSnackBar} severity="warning">
            Richiesta presa in carico!
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={loading}
          message="Accettata"
        >
          <Alert onClose={closeSnackBar} severity="info">
            Stiamo inoltrando la richiesta...
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openProponi}
          autoHideDuration={4000}
          onClose={closeSnackBar}
          message="Proposto"
        >
          <Alert onClose={closeSnackBar} severity="info">
            Lavoratore Proposto!
          </Alert>
        </Snackbar>
      </div>
    );
  };

  //colonne tabella
  const [value, setValue] = React.useState(0);
  const colonneDaApprovare = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400, disableColumnMenu:"true" },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 160,
      disableClickEventBubbling: true,
      renderCell: (params) => {


        const approva = () => {
          setOpenApprova(true);
          setProposta(params.row.id)
          
        };

        

        const eliminaFunc = () => {
          setOpenElimina(true);
          setProposta(params.row.id)
        };

        

        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        return (
          <div>
          <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Approva">
              <IconButton onClick={approva}>
                <CheckCircleIcon style={{ fill: "green" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Elimina">
              <IconButton onClick={eliminaFunc}>
                <BlockIcon style={{ fill: "red" }} />
              </IconButton>
            </Tooltip>
            
          </div>
        );
      },
    },
  ];

  const colonneApprovate = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400 },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        const cercaMatch = () => {
          database
            .post(`/richiesta/update/stato/${params.row.id}`, {
              updatedat: new Date(),
              statoiterid: 3,
            })
            .then((response) => {
              setOpenPresaInCarico(true);
              updateRichieste();
              setRichiestaModal(params.row.id);
              setOpenCercaMatch(true);
            });
        };

        const eliminaFunc = () => {
          setProposta(params.row.id)
          setOpenElimina(true);
        }

        

        return (
          <div>
          <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cerca Match">
              <IconButton onClick={cercaMatch}>
                <PageviewIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Elimina">
              <IconButton onClick={eliminaFunc}>
                <BlockIcon style={{ fill: "red" }} />
              </IconButton>
            </Tooltip>
            
            <div></div>
          </div>
        );
      },
    },
  ];

  const colonnePreseInCarico = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400 },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {

        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        const cercaMatch = () => {
          setRichiestaModal(params.row.id);
          setOpenCercaMatch(true);
        };

        return (
          <div>
          <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cerca Match">
              <IconButton onClick={cercaMatch}>
                <PageviewIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const colonneAccetate = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400 },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const cercaMatch = () => {
          setRichiestaModal(params.row.id);
          setOpenCercaMatch(true);
        };

        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        return (
          <div>
           <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            
          </div>
        );
      },
    },
  ];

  const colonneScadute = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400 },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        

        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        return (
          <div>
             <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const colonneArchiviate = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400 },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        

        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        return (
          <div>
             <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const colonneEliminate = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "titolo", headerName: "TITOLO", width: 200 },
    { field: "descrizione", headerName: "DESCRIZIONE", width: 400 },

    {
      field: "comune",
      headerName: "COMUNE",
      width: 180,
    },

    {
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "datainizio",
      headerName: "DATA INIZIO",
      width: 180,
    },
    {
      field: "datafine",
      headerName: "SCADENZA",
      width: 180,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        
        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiesta(true);
        };

        return (
          <div>
             <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  //Funzioni

  //da approvare
  const richiesteDaApprovare = () => {
    let result = [];
    let today = new Date();
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        richieste[value].statoiter === "Creata" &&
        new Date(richieste[value].dataInizio) > today
      ) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  //approvate
  const richiesteApprovate = () => {
    let result = [];
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        richieste[value].statoiter === "Presa in carico" &&
        new Date(richieste[value].dataInizio) > new Date()
      ) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  //profili inviati / in contrattazione
  const richiestePreseInCarico = () => {
    let result = [];
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        richieste[value].statoiter === "Profili inviati" &&
        new Date(richieste[value].dataInizio) > new Date() &&
        richieste[value].lavoratoriaccettati <=
          richieste[value].numeroPosizioniRichieste
      ) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  //accettata
  const richiesteAccettate = () => {
    let result = [];
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        richieste[value].statoiter !== "Archiviata" && richieste[value].statoiter !== "Cancellata" && richieste[value].statoiter !== "Scaduta" &&
        new Date(richieste[value].dataInizio) > new Date() &&
        richieste[value].lavoratoriaccettati >=
          richieste[value].numeroPosizioniRichieste
      ) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  const richiesteScadute = () => {
    let result = [];
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        new Date(richieste[value].dataInizio) <= new Date() &&
        richieste[value].lavoratoriaccettati <
          richieste[value].numeroPosizioniRichieste
      ) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  const richiesteArchiviate = () => {
    let result = [];
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        new Date(richieste[value].dataInizio) <= new Date() &&
        richieste[value].numeroPosizioniRichieste ===
          richieste[value].lavoratoriaccettati
      ) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  const richiesteEliminate = () => {
    let result = [];
    for (let value in richieste) {
      if (richieste[value].deletedat !== null) {
        result.push(richieste[value]);
      }
    }
    return result.map((value) => {
      let createdat =
        new Date(value.createdat).getDate() +
        "-" +
        (new Date(value.createdat).getMonth() + 1) +
        "-" +
        new Date(value.createdat).getFullYear();
      let datafine =
        new Date(value.dataFine).getDate() +
        "-" +
        (new Date(value.dataFine).getMonth() + 1) +
        "-" +
        new Date(value.dataFine).getFullYear();
      let datainizio =
        new Date(value.dataInizio).getDate() +
        "-" +
        (new Date(value.dataInizio).getMonth() + 1) +
        "-" +
        new Date(value.dataInizio).getFullYear();
      return {
        id: value.id,
        titolo: value.titolo,
        descrizione: value.descrizione,
        comune: value.comune + " " + value.sigla_automobilistica,
        createdat: createdat,
        datainizio: datainizio,
        datafine: datafine,
      };
    });
  };

  const righeDaApprovare = richiesteDaApprovare();
  const righeApprovate = richiesteApprovate();
  const righePreseInCarico = richiestePreseInCarico();
  const righeAccettate = richiesteAccettate();
  const righeScadute = richiesteScadute();
  const righeArchiviate = richiesteArchiviate();
  const righeEliminate = richiesteEliminate();

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    updateRichieste();
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Da approvare" {...a11yProps(0)} />
          <Tab label="Approvate" {...a11yProps(1)} />
          <Tab label="Prese in carico" {...a11yProps(2)} />
          <Tab label="Accettate" {...a11yProps(3)} />
          <Tab label="Scadute" {...a11yProps(4)} />
          <Tab label="Archiviate" {...a11yProps(5)} />
          <Tab label="Eliminate" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {" "}
          {/**Da approvare isRicevuta=true, isModificabile=false, isAgenzia=true, updaterichieste*/}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeDaApprovare}
              columns={colonneDaApprovare}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {" "}
          {/**Approvate isRicevuta=true, isModificabile=false, isAgenzia=true, handlerichiesta*/}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeApprovate}
              columns={colonneApprovate}
              pageSize={40}
            />
          </div>{" "}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          {" "}
          {/**Prese in carico */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righePreseInCarico}
              columns={colonnePreseInCarico}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {" "}
          {/**Accettate */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeAccettate}
              columns={colonneAccetate}
              pageSize={40}
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={4} dir={theme.direction}>
          {" "}
          {/**Scadute */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeScadute}
              columns={colonneScadute}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          {" "}
          {/**Archiviate */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeArchiviate}
              columns={colonneArchiviate}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          {" "}
          {/**Eliminate */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeEliminate}
              columns={colonneEliminate}
              pageSize={40}
            />
          </div>
        </TabPanel>
      </SwipeableViews>
      {modal()}
      {dialog()}
      {snackBar()}
    </div>
  );
}

export default Richieste;
