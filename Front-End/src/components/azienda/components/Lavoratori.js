import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { database } from "../../../Axios";

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

function Lavoratori({ richiestaid, showAction=true, snackbarAccettato, snackbarRifiutato }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [lavoratoriAccettati, setLavoratoriAccettati] = useState([]);
  const [lavoratoriProposti, setLavoratoriProposti] = useState([]);
  const [lavoratoriRifiutati, setLavoratoriRifiutati] = useState([]);
  

  useEffect(() => {
      fetchLavoratori()
      
  }, [])

  const fetchLavoratori =  () => {
     
     database
      .get(`/lavoratore/read/lavoratoreproposto/${richiestaid}`)
      .then((response) => {
        let accettati = [];
        let proposti = [];
        let rifiutati = [];
        response.data.map((value) => {
            
          if (value.statoid === 3) {
            proposti.push(value);
          } else if (value.statoid === 2) {
            accettati.push(value);
          } else if (value.statoid === 1) {
            rifiutati.push(value);
          }
        });
        setLavoratoriAccettati(accettati);
        setLavoratoriProposti(proposti);
        setLavoratoriRifiutati(rifiutati);
      })
      .catch((error) => console.log(error));
  };

  const colonneProposti = [
      { field: "id", headerName: "ID", flex:1 },
  { field: "nome", headerName: "NOME", flex:1.5},
  { field: "cognome", headerName: "COGNOME", flex:1.5 },
  {field: "sesso", headerName:"SESSO", flex:1.5},
  {
      field:"eta",
      headerName:"ETA'",
      flex:1
  },
  {
      field: "statusgiuridico",
      headerName: "STATUS GIURIDICO'",
      flex:1.5,
    },
    
    
  
    {
      field: "email",
      headerName: "EMAIL",
      flex:1.8,
    },
    {
      field: "telefono",
      headerName: "TELEFONO",
      flex:1.5,
      resize: "true"
    },
  
     
    {
      
        field: "",
        headerName: "Azioni",
        sortable: false,
        flex:1.3,
      disableClickEventBubbling: true,
      renderCell: (params) => {

        

        const accetta = () => {
            setLavoratore(params.row.id)
            setOpenApprova(true);
        }

        const rifiuta = () => {
            setLavoratore(params.row.id)
            setOpenElimina(true);

        }

        
          
       
        return (
            <div>
            <Tooltip title="Accetta">
                <IconButton onClick={accetta} >
                
                </IconButton>
              </Tooltip>
              <Tooltip title="Rifiuta">
                <IconButton onClick={rifiuta} >
                <VisibilityIcon color="primary"/>
                </IconButton>
              </Tooltip>
              
              
            </div>
          );
        }}
      ];

  const colonneLavoratori = [
        { field: "id", headerName: "ID", flex:1 },
    { field: "nome", headerName: "NOME", flex:1.5},
    { field: "cognome", headerName: "COGNOME", flex:1.5 },
    {field: "sesso", headerName:"SESSO", flex:1.5},
    {
        field:"eta",
        headerName:"ETA'",
        flex:1
    },
    {
        field: "statusgiuridico",
        headerName: "STATUS GIURIDICO'",
        flex:1.5,
      },
      
      
    
      {
        field: "email",
        headerName: "EMAIL",
        flex:1.8,
      },
      {
        field: "telefono",
        headerName: "TELEFONO",
        flex:1.5,
        resize: "true"
      },
    
    
      
        ];

  const lavoratoriPropostiMapper = () => {
        const today = new Date().toJSON().slice(0, 4);
     return  lavoratoriProposti.map((value, index) => {
       
        const dataDiNascita = new Date(value.datadinascita).toJSON().slice(0, 4);
        let eta = today - dataDiNascita;
          return {
              id: value.id,
              nome: value.nome, 
              cognome: value.cognome,
              sesso: value.sesso,
              eta: eta,
              statusgiuridico: value.statusgiuridico,
              email: value.email, 
              telefono: value.telefono

          }
      })
  };

  const lavoratoriAccettatiMapper = () => {
    const today = new Date().toJSON().slice(0, 4);
    console.log(lavoratoriAccettati)
    return lavoratoriAccettati.map((value, index) => {
     
      const dataDiNascita = new Date(value.datadinascita).toJSON().slice(0, 4);
      let eta = today - dataDiNascita;
        return {
            id: value.id,
            nome: value.nome, 
            cognome: value.cognome,
            sesso: value.sesso,
            eta: eta,
            statusgiuridico: value.statusgiuridico,
            email: value.email, 
            telefono: value.telefono

        }
    })
  };

  const lavoratoriRifiutatiMapper = () => {
    const today = new Date().toJSON().slice(0, 4);
    return lavoratoriRifiutati.map((value, index) => {
     
      const dataDiNascita = new Date(value.datadinascita).toJSON().slice(0, 4);
      let eta = today - dataDiNascita;
        return {
            id: value.id,
            nome: value.nome, 
            cognome: value.cognome,
            sesso: value.sesso,
            eta: eta,
            statusgiuridico: value.statusgiuridico,
            email: value.email, 
            telefono: value.telefono

        }
    })
  };

  //righe
  const righeProposti = lavoratoriPropostiMapper();
  const righeAccettati = lavoratoriAccettatiMapper();
  const righeRifiutati = lavoratoriRifiutatiMapper();

  const [lavoratore, setLavoratore] = useState();

   //dialog
   const [openApprova, setOpenApprova] = useState(false);
   const [openElimina, setOpenElimina] = useState(false);

 
   const handleClose = () => {
     setOpenApprova(false);
     setOpenElimina(false);
   };
 
   const accetta =  () => {
 
     database
      .post(`/lavoratorerichiesta/update`, {
        id: {
          lavoratoreid: lavoratore,
          richiestaid: richiestaid,
          statoid: 2,
        },
        dataAggiornamento: new Date(),
      })
      .then((response) => {
        console.log(response)
        //openSnackbar accettato
        snackbarAccettato(true);
        fetchLavoratori();
      })
      .catch(( error) => {
        console.log("error", error);
      });
  };

  const rifiuta =  () => {

     database
      .post(`/lavoratorerichiesta/update`, {
        id: {
          lavoratoreid: lavoratore,
          richiestaid: richiestaid,
          statoid: 1,
        },
        dataaggiornamento: new Date(),
      })
      .then((response) => {
          console.log(response)
        //open snackbar rifiutato
        snackbarRifiutato(true);
        fetchLavoratori()
      })
      .catch((error) => {
        console.log(error);
      });
  };
   
 
   const dialog = () => {
     const handleAccetta = () => {
       accetta();
       setOpenApprova(false);
     };
 
 
     
 
     const handleElimina =  () => {
       rifiuta()
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
             {"Sei sicuro di voler accettare il lavoratore?"}
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
             {"Sei sicuro di voler rifiutare il lavoratore?"}
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
 
   

  
  const handleChange = (event, newValue) => {
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
          <Tab label="Lavoratori Proposti" {...a11yProps(0)} />
          <Tab label="Lavoratori Accettati" {...a11yProps(1)} />
          <Tab label="Lavoratori Rifiutati" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {" "}
          {/**Proposti*/}
         {showAction ? <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righeProposti}
              columns={colonneProposti}
              pageSize={10}
            />
          </div> : <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righeProposti}
              columns={colonneLavoratori}
              pageSize={10}
            />
          </div>} 
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {" "}
         
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righeAccettati}
              columns={colonneLavoratori}
              pageSize={40}
            />
          </div>{" "}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          {" "}
         
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={righeRifiutati}
              columns={colonneLavoratori}
              pageSize={40}
            />
          </div>
        </TabPanel>
        
      </SwipeableViews>
      {dialog()}

    </div>
  );
}

export default Lavoratori;


{/**
 */}