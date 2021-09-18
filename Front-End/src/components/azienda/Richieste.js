import SwipeableViews from "react-swipeable-views";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
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
import RichiestaInfoAzienda from "./components/RichiestaInfoAzienda";
import Lavoratori from "./components/Lavoratori";

import { database } from "../../Axios";

function Richieste({ richieste, updateRichieste}) {


    const [showLavoratori, setShowLavoratori] = useState(false);
    const [richiesta, setRichiesta] = useState(false);


  //modal
  const [richiestaModal, setRichiestaModal] = useState();
  const [openRichiestaModificabile, setOpenRichiestamodificabile] = useState();
  const [openRichiesta, setOpenRichiesta] = useState(false);
  
  

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
    setOpenRichiestamodificabile(false);
    
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
          <RichiestaInfoAzienda richiestaid={richiestaModal} handleClose={handleCloseRichiesta} updateRichieste={updateRichieste} />
        </Modal>
        <Modal
          open={openRichiestaModificabile}
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
          <RichiestaInfoAzienda richiestaid={richiestaModal} handleClose={handleCloseRichiesta} isModificabile={true} updateRichieste={updateRichieste} />
        </Modal>
        
      </div>
    );
  };

  //dialog
  const [openApprova, setOpenApprova] = useState(false);
  const [openElimina, setOpenElimina] = useState(false);
  const [proposta, setProposta] = useState();

  const handleClose = () => {
    setOpenApprova(false);
    setOpenElimina(false);
  };

  const accettaDatabase = () => {
    
      database
        .post(`/richiesta/update/stato/${proposta}`, {
          updatedat: new Date(),
          statoiterid: 2,
        })
        .then(async (response) => {
          
          await setOpenAccettata(true);

          updateRichieste();
        })
        .catch((error) => {
          console.log(error);
        });
    
  };

  const eliminaDatabase = () => {
          
    database
      .post(`/richiesta/update/deletedat/${proposta}`, {
        updatedat: new Date(),
        deletedat: new Date()
        
      })
      .then((response) => {
        setOpenEliminata(true);

        updateRichieste();
      })
      .catch((error) => {
        console.log(error);
      });
  
};
  

  const dialog = () => {
    const handleAccetta = () => {
      accettaDatabase();
      setOpenApprova(false);
    };


    

    const handleElimina =  () => {
      eliminaDatabase()
      setOpenElimina(false);
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
            <DialogContentText id="alert-dialog-description"></DialogContentText>
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
  const [openLavoratoreAccettato, setOpenLavoratoreAccettato] = useState(false);
  const [openLavoratoreRifiutato, setOpenLavoratoreRifiutato] = useState(false);
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
    setOpenLavoratoreAccettato(false)
    setOpenLavoratoreRifiutato(false);
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
            Accettata!
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
          <Alert onClose={closeSnackBar} severity="error">
            Eliminata!
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
           open={openLavoratoreAccettato}
           autoHideDuration={4000}
           onClose={closeSnackBar}
           message="Accettato"
         >
           <Alert onClose={closeSnackBar} severity="success">
             Lavoratore Accettato!
           </Alert>
         </Snackbar>
         <Snackbar
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "left",
           }}
           open={openLavoratoreRifiutato}
           autoHideDuration={4000}
           onClose={closeSnackBar}
           message="Eliminata"
         >
           <Alert onClose={closeSnackBar} severity="error">
             Lavoratore Rifiutato!
           </Alert>
         </Snackbar>
      </div>
    );
  };

  //colonne tabella
  
  const colonneModificabili = [
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


             

        const eliminaFunc = () => {
          setOpenElimina(true);
          setProposta(params.row.id)
        };

        

        const vediRichiesta = () => {
          setRichiestaModal(params.row.id);
          setOpenRichiestamodificabile(true);
        };

        return (
          <div>
          <Tooltip title="Visualizza">
              <IconButton onClick={vediRichiesta}>
                <VisibilityIcon color="primary" />
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

  const colonneInAttesa = [
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

  //modificabili
  const richiesteDaApprovare = () => {
    let result = [];
    let today = new Date();
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        richieste[value].statoiter === "Creata" &&
        new Date(richieste[value].dataInizio) >= today
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

  //in attesa/proposte ricevute
  const richiesteApprovate = () => {
    let result = [];
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null && (
        richieste[value].statoiter === "Presa in carico" ||  richieste[value].statoiter === "Profili inviati" ) &&
        new Date(richieste[value].dataInizio) > new Date() && richieste[value].lavoratoriaccettati <
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

  const righeDaApprovare = richiesteDaApprovare(); //modificabili
  const righePreseInCarico = richiesteApprovate(); //in attesa/proposte ricevute
  const righeAccettate = richiesteAccettate();
  const righeScadute = richiesteScadute();
  const righeArchiviate = richiesteArchiviate();
  const righeEliminate = richiesteEliminate();


  const [value, setValue] = React.useState(0);

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    updateRichieste();
    setShowLavoratori(false);
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
          <Tab label="Modificabili" {...a11yProps(0)} />
          <Tab label="Proposte ricevute" {...a11yProps(1)} />
          <Tab label="Accettate" {...a11yProps(2)} />
          <Tab label="Scadute" {...a11yProps(3)} />
          <Tab label="Archiviate" {...a11yProps(4)} />
          <Tab label="Eliminate" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {" "}
          {/**Modificabili*/}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeDaApprovare}
              columns={colonneModificabili}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {" "}
          {/**Proposte ricevute*/}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righePreseInCarico}
              columns={colonneInAttesa}
              pageSize={40}
              onRowClick={(row) => {
                  setRichiesta(row.id)
                  setShowLavoratori(true)
                  } }
            />
            
          </div>{" "}
          {showLavoratori ? <div style={{marginTop:"20px"}}><Lavoratori richiestaid={richiesta} snackbarAccettato={setOpenLavoratoreAccettato} snackbarRifiutato={setOpenLavoratoreRifiutato} /></div> : null}
        </TabPanel>

        
        <TabPanel value={value} index={2} dir={theme.direction}>
          {" "}
          {/**Accettate */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righeAccettate}
              columns={colonneAccetate}
              pageSize={40}
              onRowClick={(row) => {
                  setRichiesta(row.id)
                  setShowLavoratori(true)
                  }}
            />
          </div>
          {showLavoratori ? <div style={{marginTop:"20px"}}><Lavoratori richiestaid={richiesta} showAction={false} /></div> : null}
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          {" "}
          {/**Scadute */}
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={righeScadute}
              columns={colonneScadute}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          {" "}
          {/**Archiviate */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righeArchiviate}
              columns={colonneArchiviate}
              pageSize={40}
              onRowClick={(row) => {
                  setRichiesta(row.id)
                  setShowLavoratori(true)
                  }}
            />
          </div>
          {showLavoratori ? <div style={{marginTop:"20px"}}><Lavoratori richiestaid={richiesta}  /></div> : null}
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          {" "}
          {/**Eliminate */}
          <div style={{ height: 500, width: "100%" }}>
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
