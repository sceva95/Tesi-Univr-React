import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import { DataGrid } from "@material-ui/data-grid";
import {Tooltip, IconButton, Modal} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfiloLavoratore from "../ProfiloLavoratore";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import RichiestaInfoAgenzia from './component/RichiestaInfoAgenzia'
import VisibilityIcon from "@material-ui/icons/Visibility";




function Lavoratori({ lavoratori , updateLavoratori}) {

    const [lavoratore, setLavoratore] = useState();
  const [openProfilo, setOpenProfilo] = useState(false);
  const [richiesta, setRichiesta] = useState();
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

  const classes= useStyles;
  const handleCloseProfilo = () => {
    setOpenProfilo(false)
    setOpenRichiesta(false)
  };

  const modal = () => {
    return (
      <div>
        <Modal
          open={openProfilo}
          onClose={handleCloseProfilo}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
          <ProfiloLavoratore lavoratoreid={lavoratore} handleClose={handleCloseProfilo} />
        </Modal>
        <Modal
          open={openRichiesta}
          onClose={handleCloseProfilo}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
          <RichiestaInfoAgenzia richiestaid={richiesta} handleClose={handleCloseProfilo} />
        </Modal>
       
      </div>
    );
  };

  const colonne = [
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
        field: "nazionalita",
        headerName: "NAZIONALITA'",
        flex:1.5,
      },
      
      {field:"indirizzo",
    headerName:"INDIRIZZO",
    flex:1.5},
    {
      field: "comune",
      headerName: "COMUNE",
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
      flex:1,
      disableClickEventBubbling: true,
      renderCell: (params) => {

        

        const vediProfilo = () => {
          setLavoratore(params.row.id)
          setOpenProfilo(true)
          
        };
        return (
            <div>
            <Tooltip title="Profilo">
                <IconButton onClick={vediProfilo} >
                <AccountCircleIcon color="primary"/>
                </IconButton>
              </Tooltip>
              
              
            </div>
          );
        },
      },
    ];

    const colonneAllocate = [
      { field: "id", headerName: "ID", flex:1 },
      { field: "nome", headerName: "NOME", flex:1.2},
      { field: "cognome", headerName: "COGNOME", flex:1.2 },
      {field: "sesso", headerName:"SESSO", flex:1.5},
      {
          field:"eta",
          headerName:"ETA'",
          flex:1
      },
      {
          field: "nazionalita",
          headerName: "NAZIONALITA'",
          flex:1.5,
        },
        
        {field:"indirizzo",
      headerName:"INDIRIZZO",
      flex:1.5},
      {
        field: "comune",
        headerName: "COMUNE",
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
          flex:1.2,
          resize: "true"
        },
      
          {
            field: "richiesta",
            headerName: "RICHIESTA",
            flex: 1,
           
          },
        {
          
            field: "",
            headerName: "Azioni",
            sortable: false,
            flex:1.3,
          disableClickEventBubbling: true,
          renderCell: (params) => {
    
            
    
            const vediProfilo = () => {
              setLavoratore(params.row.id)
              setOpenProfilo(true)
            }; 

            const vediRichiesta= () => {
              setRichiesta(params.row.richiesta)
              setOpenRichiesta(true)
            };
              
           
            return (
                <div>
                <Tooltip title="Profilo">
                    <IconButton onClick={vediProfilo} >
                    <AccountCircleIcon color="primary"/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Vedi Richiesta">
                    <IconButton onClick={vediRichiesta} >
                    <VisibilityIcon color="primary"/>
                    </IconButton>
                  </Tooltip>
                  
                  
                </div>
              );
            },
          },
        ];
    

    const [value, setValue] = React.useState(0);
  const lavoratoriDaAllocare = () => {
    let result = [];
    for (let value in lavoratori) {
      if (lavoratori[value].statoid === 1 || lavoratori[value].statoid === 0) {
        result.push(lavoratori[value]);
      }
    }
    return result.map((value) => {
      const today = new Date().toJSON().slice(0, 4);
      const dataDiNascita = new Date(value.datadinascita).toJSON().slice(0, 4);
      let eta = today - dataDiNascita;

      return {
        key: value.id,
        id: value.id,
        nome: value.nome,
        cognome: value.cognome,
        sesso: value.sesso,
        eta:eta,
        nazionalita: value.nazionalita,
        indirizzo: value.indirizzo,
        comune: value.comune + " " + value.siglaautomobilistica,
        statusgiuridico: value.statusgiuridico,
        email: value.email,
        telefono: value.telefono,
      };
    });
  };

  const lavoratoriInTrattativa = () => {
    let result = [];
    for (let value in lavoratori) {
      if (lavoratori[value].statoid === 3) {
        result.push(lavoratori[value]);
      }
    }
    return result.map((value) => {
      const today = new Date().toJSON().slice(0, 4);
      const dataDiNascita = new Date(value.datadinascita).toJSON().slice(0, 4);
      let eta = today - dataDiNascita;

      return {
        id: value.id,
        nome: value.nome,
        cognome: value.cognome,
        sesso: value.sesso,
        eta: eta,
        nazionalita: value.nazionalita,
        indirizzo: value.indirizzo,
        comune: value.comune + " " + value.siglaautomobilistica,
        statusgiuridico: value.statusgiuridico,
        email: value.email,
        telefono: value.telefono,
      };
    });
  };

  const lavoratoriAllocati = () => {
    let result = [];

    for (let value in lavoratori) {
      if (lavoratori[value].statoid === 2) {
        result.push(lavoratori[value]);
      }
    }

    return result.map((value) => {
      const today = new Date().toJSON().slice(0, 4);
      const dataDiNascita = new Date(value.datadinascita).toJSON().slice(0, 4);
      let eta = today - dataDiNascita;

      return {
        key: value.id,
        id: value.id,
        nome: value.nome,
        cognome: value.cognome,
        sesso: value.sesso,
        eta: eta,
        nazionalita: value.nazionalita,
        indirizzo: value.indirizzo,
        comune: value.comune + " " + value.siglaautomobilistica,
        statusgiuridico: value.statusgiuridico,
        email: value.email,
        telefono: value.telefono,
        richiesta: value.richiesta
      };
    });
  };

  const righeDaAllocare = lavoratoriDaAllocare();
  const righeInTrattativa = lavoratoriInTrattativa();
  const righeAllocate = lavoratoriAllocati();

  const handleChange = (event, newValue) => {
    updateLavoratori();
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const theme = useTheme();

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
          <Tab label="Da allocare" {...a11yProps(0)} />
          <Tab label="In trattativa" {...a11yProps(1)} />
          <Tab label="Allocati" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {" "}
          {/**DA ALLOCARE */}
          <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={righeDaAllocare}
          columns={colonne}
          pageSize={40}
        />
       
      </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {" "}
          {/**in trattativa */}
          <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={righeInTrattativa}
          columns={colonne}
          pageSize={40}
        />
        
      </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {" "}
          {/**allocati */}
          <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={righeAllocate}
          columns={colonneAllocate}
          pageSize={40}
        />
       
      </div>        </TabPanel>
      </SwipeableViews>
      {modal()}
    </div>
  );
}

export default Lavoratori;
