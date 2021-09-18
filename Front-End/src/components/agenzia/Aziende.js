import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import {
  DataGrid,

} from "@material-ui/data-grid";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";


import { database } from "../../Axios";

function Aziende({ aziende, updateAziende }) {
  //SNACKBAR
  const [openApprova, setOpenApprova] = useState(false);
  const [openElimina, setOpenElimina] = useState(false);
  const [openNotApprova, setOpenNotApprova] = useState(false)
  const [openRipristina, setOpenRipristina] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenRipristina(false);
    setOpenNotApprova(false);
    setOpenElimina(false);
    setOpenApprova(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  //DIALOG


  const [openDialogApprova, setOpenDialogApprova] = useState(false);
  const [openDialogElimina, setOpenDialogElimina] = useState(false);
  const [openDialogRipristina, setOpenDialogRipristina] = useState(false);
  const [openTogliApprovazione, setOpenTogliApprovazione] = useState(false);
  const [params, setParams] = useState({});
  const dialog = () => {
    const handleApprova = () => {
      approva();
      setOpenDialogApprova(false);
    };   

    const handleElimina =  () => {
      elimina()
      setOpenDialogElimina(false);
    };

    const handleRipristina= () => {
      ripristina()
      setOpenDialogRipristina(false);
    }

    const handleTogliApprovazione = () => {
      notapprova();
      setOpenTogliApprovazione(false);
    }

    const handleCloseDialog=() => {
      setOpenDialogApprova(false);
      setOpenDialogElimina(false);
      setOpenDialogRipristina(false);
      setOpenTogliApprovazione(false);

    }
    return (
      <div>
        <Dialog
          open={openDialogApprova}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler approvare l'azienda?"}
          </DialogTitle>
          
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleApprova} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogElimina}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler eliminare l'azienda?"}
          </DialogTitle>
          
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleElimina} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogRipristina}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler ripristinare l'azienda?"}
          </DialogTitle>
          
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleRipristina} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openTogliApprovazione}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sei sicuro di voler togliere l'approvazione?"}
          </DialogTitle>
          
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annulla
            </Button>
            <Button onClick={handleTogliApprovazione} color="primary" autoFocus>
              Accetta
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const approva = async () => {
    await database
      .post("/azienda/approva", {
        id: params.row.id,
        approved: new Date(),
      })
      .then((response) => {
        setOpenApprova(true);
        updateAziende();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const elimina = async () => {
    await database
      .post("/azienda/elimina", {
        id: params.row.id,
        deletedat: new Date(),
      })
      .then((response) => {
        setOpenElimina(true);
        updateAziende();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notapprova = async () => {
    await database.post("/azienda/approva", {
      id: params.row.id,
      approved: null

  }).then((response) => {
      setOpenNotApprova(true)
      updateAziende()
  }).catch((error) => {
      console.log(error)
  })
  };

  const ripristina = async () => {
    await database
      .post("/azienda/elimina", {
        id: params.row.id,
        deletedat: null,
      })
      .then((response) => {
        setOpenRipristina(true);
        updateAziende();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [value, setValue] = React.useState(0);
  const colonneApprova = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ragionesociale", headerName: "RAGIONE SOCIALE", width: 200 },
    { field: "partitaiva", headerName: "PARTITA IVA", width: 200 },
    {
      field: "indirizzo",
      headerName: "INDIRIZZO",
      type: "number",
      width: 150,
    },
    {
      field: "comune",
      headerName: "COMUNE",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 190,
    },
    {
      field: "telefono",
      headerName: "TELEFONO",
      width: 180,
    },
    {
      field: "settoreattivita",
      headerName: "SETTORE ATTIVITA",
      width: 180,
    },{
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        

        return (
          <div>
          <Tooltip title="Approva">
            <IconButton onClick={() => {
              setParams(params)
              setOpenDialogApprova(true)}}>
              <CheckCircleIcon style={{ fill: "green" }} />
            </IconButton>
            </Tooltip>
            <Tooltip title="Elimina">
            <IconButton onClick={()=> {
              setParams(params)
              setOpenDialogElimina(true)}}>
              <BlockIcon style={{ fill: "red" }} />
            </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const colonneRegistrate = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ragionesociale", headerName: "RAGIONE SOCIALE", width: 200 },
    { field: "partitaiva", headerName: "PARTITA IVA", width: 200 },
    {
      field: "indirizzo",
      headerName: "INDIRIZZO",
      type: "number",
      width: 150,
    },
    {
      field: "comune",
      headerName: "COMUNE",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 190,
    },
    {
      field: "telefono",
      headerName: "TELEFONO",
      width: 180,
    },
    {
      field: "settoreattivita",
      headerName: "SETTORE ATTIVITA",
      width: 180,
    },{
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        

        

        return (
          <div>
          <Tooltip title="Togli Approvazione" >
            <IconButton onClick={ () => {
              setParams(params);
              setOpenTogliApprovazione(true)}}>
              <CheckCircleIcon style={{ fill: "red" }} />
            </IconButton>
            </Tooltip>
            <Tooltip title="Elimina">
            <IconButton onClick={() => {
              setParams(params);
              setOpenDialogElimina(true);
            }}>
              <BlockIcon style={{ fill: "red" }} />
            </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const colonneEliminate = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ragionesociale", headerName: "RAGIONE SOCIALE", width: 200 },
    { field: "partitaiva", headerName: "PARTITA IVA", width: 200 },
    {
      field: "indirizzo",
      headerName: "INDIRIZZO",
      type: "number",
      width: 150,
    },
    {
      field: "comune",
      headerName: "COMUNE",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 190,
    },
    {
      field: "telefono",
      headerName: "TELEFONO",
      width: 180,
    },
    {
      field: "settoreattivita",
      headerName: "SETTORE ATTIVITA",
      width: 180,
    },{
      field: "createdat",
      headerName: "CREATA",
      width: 150,
    },
    {
      field: "",
      headerName: "Azioni",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        

        

        return (
          <div>
          <Tooltip title="Ripristina">
            <IconButton onClick={() => {
              setParams(params)
              setOpenDialogRipristina(true)}}>
              <RestoreIcon color="primary" />
            </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const aziendeDaApprovare = () => {
    const result = [];
    for (let value in aziende) {
      if (aziende[value].approved === null && aziende[value].deletedat === null)
        result.push(aziende[value]);
    }

    return result.map((value) => {
      let data = new Date(value.createdat).getDate() + "-" + (new Date(value.createdat).getMonth()+1) + "-" + new Date(value.createdat).getFullYear()
      return {
        id: value.id,
        ragionesociale: value.ragionesociale,
        partitaiva: value.partitaiva,
        indirizzo: value.indirizzo,
        comune: value.comune + " " + value.provincia,
        email: value.email,
        telefono: value.telefono,
        settoreattivita: value.settoreattivita,
        createdat: data     };
    });
  };

  const righeApprova = aziendeDaApprovare();

  const aziendeRegistrate = () => {
    const result = [];
    for (let value in aziende) {
      if (aziende[value].approved != null && aziende[value].deletedat === null)
        result.push(aziende[value]);
    }
    return result.map((value) => {
      let data = new Date(value.createdat).getDate() + "-" + (new Date(value.createdat).getMonth()+1) + "-" + new Date(value.createdat).getFullYear()

      return {
        id: value.id,
        ragionesociale: value.ragionesociale,
        partitaiva: value.partitaiva,
        indirizzo: value.indirizzo,
        comune: value.comune + " " + value.provincia,
        email: value.email,
        telefono: value.telefono,
        settoreattivita: value.settoreattivita,
        createdat:data
      };
    });
  };

  const righeRegistrate = aziendeRegistrate();

  const aziendeEliminate = () => {
    const result = [];
    for (let value in aziende) {
      if (aziende[value].deletedat !== null) result.push(aziende[value]);
    }
    return result.map((value) => {
      let data = new Date(value.createdat).getDate() + "-" + (new Date(value.createdat).getMonth()+1) + "-" + new Date(value.createdat).getFullYear()

      return {
        id: value.id,
        ragionesociale: value.ragionesociale,
        partitaiva: value.partitaiva,
        indirizzo: value.indirizzo,
        comune: value.comune + " " + value.provincia,
        email: value.email,
        telefono: value.telefono,
        settoreattivita: value.settoreattivita,
        createdat:data
      };
    });
  };

  const righeEliminate = aziendeEliminate();

  const theme = useTheme();

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
    {dialog()}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
          centered
        >
          <Tab label="Da approvare" {...a11yProps(0)} />
          <Tab label="Approvate" {...a11yProps(1)} />
          <Tab label="Eliminate" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {" "}
          {/**Da approvare */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeApprova}
              columns={colonneApprova}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {" "}
          {/**Approvate */}
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={righeRegistrate}
              columns={colonneRegistrate}
              pageSize={40}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openApprova}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Approvata"
      >
        <Alert onClose={handleClose} severity="success">
          Approvata!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openElimina}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Eliminata"
      >
        <Alert onClose={handleClose} severity="error">
          Eliminata!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openNotApprova}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Approvazione rimossa"
      >
        <Alert onClose={handleClose} severity="error">
        Approvazione rimossa!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openRipristina}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Ripristinata"
      >
        <Alert onClose={handleClose} severity="success">
        Ripristinata!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Aziende;
