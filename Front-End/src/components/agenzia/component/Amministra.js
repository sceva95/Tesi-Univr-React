import { database } from "../../../Axios";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import {
  DataGrid,
  selectedGridRowsCountSelector,
} from "@material-ui/data-grid";
import {
  Tooltip,
  IconButton,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import VisibilityIcon from "@material-ui/icons/Visibility";
import style from "../../../style/agenzia/Amministra.module.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
function Amministra({ agenziaLoggata }) {
  const [competenze, setCompetenze] = useState([]);
  const [lingue, setLingue] = useState([]);
  const [patenti, setPatenti] = useState([]);
  const [setttoreAttivita, setSettoreAttivita] = useState([]);
  const [statiLavoratore, setStatiLavoratore] = useState([]);
  const [statiRichiesta, setStatiRichiesta] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchCompetenze();
    fetchLingue();
    fetchPatenti();
    fetchSettoreAttivita();
    fetchStatoLavoratore();
    fetchStatoRichiesta();
  }, []);

  const colonneMenu = [
    { field: "id", headerName: "ID", flex: 1, resizable: true },
    {
      field: "descrizione",
      headerName: "DESCRIZIONE",
      editable: true,
      flex: 1.5,
    },
  ];

  const colonneMenuStato = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "nome",
      headerName: "NOME",
      editable: true,
      flex: 1.5,
    },
    {
      field: "descrizione",
      headerName: "DESCRIZIONE",
      editable: true,
      flex: 6.5,
    },
  ];

  const fetchCompetenze = () => {
    database
      .get(`/competenza/read/all`)
      .then((response) => setCompetenze(response.data))
      .catch((error) => console.log(error));
  };

  const fetchLingue = () => {
    database
      .get(`/lingua/read/all`)
      .then((response) => setLingue(response.data))
      .catch((errror) => console.log(errror));
  };

  const fetchPatenti = () => {
    database
      .get(`/tipopatente/read/all`)
      .then((response) => setPatenti(response.data))
      .catch((errror) => console.log(errror));
  };

  const fetchSettoreAttivita = () => {
    database
      .get(`/settoreattivita/read/all`)
      .then((response) => setSettoreAttivita(response.data))
      .catch((errror) => console.log(errror));
  };

  const fetchStatoLavoratore = () => {
    database.get(`/statolavoratore/read/all`)
  .then((response) => setStatiLavoratore(response.data))
.catch((error) => console.log(error))  
}

const fetchStatoRichiesta = () => {
  database.get(`/statoiter/read/all`)
.then((response) => setStatiRichiesta(response.data))
.catch((error) => console.log(error))  
}

  const mapper = (lista) => {
    return lista.map((value) => {
      return {
        id: value.id,
        descrizione: value.descrizione,
      };
    });
  };

  const mapperStatoLavoratore = (lista) => {
    return lista.map((value, index) => {
      let obj = {};
      if(value.descrizione==="Allocato"){
        obj = {
        id: index,
        nome: value.descrizione,
        descrizione: "Lavoratore allocato per una richiesta che deve ancora terminare"
        };
      }else if(value.descrizione === "Da allocare"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Lavoratore ancora da allocare"
        };
      }else if(value.descrizione === "In trattativa"){
        obj= {
          id: index,
          nome: value.descrizione,
          descrizione: "Lavoratore proposto per una richiesta che deve ancora iniziare"
          };
        }else{
          obj= {
            id: index,
            nome: "",
            descrizione: ""
            };
        }
        return obj;
    });
  };

  const mapperStatoRichiesta= (lista) => {
    return lista.map((value,index) => {
      let obj={}
      if(value.descrizione==="Creata"){
        obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta appena creata e ancora modificabile dall'azienda"
      };
    }else if(value.descrizione==="Presa in carico"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta accettata e in attesa del cerca match"
      };
    }else if(value.descrizione==="Profili inviati"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta di cui si è fatto il cerca match"
      };
    }else if(value.descrizione==="Archiviata"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta di cui l'azienda ha accettato un numero di lavoratori pari a quelli richiesti e terminata"
      };
    }else if(value.descrizione==="Cancellata"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta eliminata"
      };
    }else if(value.descrizione==="Accettata"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta di cui l'azienda ha accettato un numero di lavoratori pari a quelli richiesti e non ancora iniziata"
      };
    }else if(value.descrizione==="Scaduta"){
      obj= {
        id: index,
        nome: value.descrizione,
        descrizione: "Richiesta di cui l'azienda non ha accettato un numero di lavoratori pari a quelli richiesti e terminata"
      };}else{
        obj= {
          id: index,
          nome: "",
          descrizione: ""
      }}
      return obj;
    });
  };

  const patentiMapper = () => {
    return patenti.map((value, index) => {
      return {
        id: index,
        descrizione: value.siglaPatente,
      };
    });
  };
  const righeCompetenze = mapper(competenze);
  const righeLingue = mapper(lingue);
  const righePatenti = patentiMapper();
  const righeSettoreAttivita = mapper(setttoreAttivita);
  const righeLavoratori = mapperStatoLavoratore(statiLavoratore)
  const righeRichieste = mapperStatoRichiesta(statiRichiesta);

  const handleChange = (event, newValue) => {
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

  const addCompetenza = () => {
    setOpenAddDescrizione(true);
  };

  const addLingua = () => {
    setOpenAddLingua(true);
  }

  const addPatente = () => {
      setOpenAddPatente(true);
  }

  const addSettoreAttivita = () => {
      setOpenSettoreAttivita(true);
  }

  const addStatoLavoratore = () => {
    setOpenStatoLavoratore(true);
}

const addStatoRichiesta = () => {
  setOpenStatoRichiesta(true);
}

  const [openAddDescrizione, setOpenAddDescrizione] = useState(false);
  const [openAddLingua, setOpenAddLingua] = useState(false)
  const [openAddPatente, setOpenAddPatente] = useState(false)
  const [openSettoreAttivita, setOpenSettoreAttivita] = useState(false);
  const [openStatolavoratore, setOpenStatoLavoratore] = useState(false);
  const [openStatoRichiesta,setOpenStatoRichiesta] = useState(false);
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState("");

  const handleClose = () => {
    setOpenAddDescrizione(false);
    setOpenAddLingua(false)
    setOpenAddPatente(false);
    setOpenSettoreAttivita(false)
    setOpenStatoLavoratore(false)
    setOpenStatoRichiesta(false);
  };

  const modal = () => {
    let descrizione = "";

    const salvaDescrizione = () => {
      if (descrizione !== "") {
        database
          .post(`/competenza/create`, {
            id: 1,
            descrizione: descrizione,
          })
          .then((response) => fetchCompetenze())
          .catch((errror) => console.log(errror));
        descrizione = "";
        setError(false);
        setHelper("");
        handleClose();
      } else {
        setError(true);
        setHelper("Non puoi inserire un campo vuoto");
      }
    };

    const salvaLingua = () => {
        if (descrizione !== "") {
          database
            .post(`/lingua/create`, {
              id: 1,
              descrizione: descrizione,
            })
            .then((response) => fetchLingue())
            .catch((errror) => console.log(errror));
          descrizione = "";
          setError(false);
          setHelper("");
          handleClose();
        } else {
          setError(true);
          setHelper("Non puoi inserire un campo vuoto");
        }
      };

      const salvaPatente = () => {
        if (descrizione !== "") {
          database
            .post(`/tipopatente/create`, {
              siglaPatente: descrizione,
              descrizione: null,
            })
            .then((response) => fetchPatenti())
            .catch((errror) => console.log(errror));
          descrizione = "";
          setError(false);
          setHelper("");
          handleClose();
        } else {
          setError(true);
          setHelper("Non puoi inserire un campo vuoto");
        }
      };

      const salvaSettoreAttivita = () => {
        if (descrizione !== "") {
          database
            .post(`/settoreattivita/create`, {
              id: 1,
              descrizione: descrizione,
            })
            .then((response) => fetchSettoreAttivita())
            .catch((errror) => console.log(errror));
          descrizione = "";
          setError(false);
          setHelper("");
          handleClose();
        } else {
          setError(true);
          setHelper("Non puoi inserire un campo vuoto");
        }
      };

      const salvaStatoLavoratore = () => {
        if (descrizione !== "") {
          database
            .post(`/statolavoratore/create`, {
              id: 1,
              descrizione: descrizione,
            })
            .then((response) => fetchStatoLavoratore())
            .catch((errror) => console.log(errror));
          descrizione = "";
          setError(false);
          setHelper("");
          handleClose();
        } else {
          setError(true);
          setHelper("Non puoi inserire un campo vuoto");
        }
      }

      const salvaStatoRichiesta = () => {
        if (descrizione !== "") {
          database
            .post(`/statoiter/create`, {
              id: 1,
              descrizione: descrizione,
            })
            .then((response) => fetchStatoRichiesta())
            .catch((errror) => console.log(errror));
          descrizione = "";
          setError(false);
          setHelper("");
          handleClose();
        } else {
          setError(true);
          setHelper("Non puoi inserire un campo vuoto");
        }
      }

    return (
      <div>
        <Modal
          open={openAddDescrizione}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={style.modal}>
            {" "}
            <Typography variant="h4">Competenza</Typography>
            <TextField
              error={error}
              helperText={helper}
              onChange={(e) => {
                descrizione = e.target.value;
                setError(false);
                setHelper("");
              }}
              placeholder="Competenza"
            />
            <Button variant="contained" style={{backgroundColor:"#a8ceb0", marginLeft:"10px"}} onClick={() => salvaDescrizione()}>Salva</Button>
          </div>
        </Modal>
        <Modal
          open={openAddLingua}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={style.modal}>
            {" "}
            <Typography variant="h4" className={style.titolo}>Lingua</Typography>
            <TextField
              error={error}
              helperText={helper}
              onChange={(e) => {
                descrizione = e.target.value;
                setError(false);
                setHelper("");
              }}
              placeholder="Lingua"
            />
            <Button variant="contained" style={{backgroundColor:"#a8ceb0", marginLeft:"10px"}} onClick={() => salvaLingua()}>Salva</Button>
          </div>
        </Modal>
        <Modal
          open={openAddPatente}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={style.modal}>
            {" "}
            <Typography variant="h4">Patente</Typography>
            <TextField
              error={error}
              helperText={helper}
              onChange={(e) => {
                descrizione = e.target.value;
                setError(false);
                setHelper("");
              }}
              placeholder="Patente"
            />
            <Button variant="contained" style={{backgroundColor:"#a8ceb0", marginLeft:"10px"}} onClick={() => salvaPatente()}>Salva</Button>
          </div>
        </Modal>
        <Modal
          open={openSettoreAttivita}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={style.modal}>
            {" "}
            <Typography variant="h4">Settore Attivita</Typography>
            <TextField
              error={error}
              helperText={helper}
              onChange={(e) => {
                descrizione = e.target.value;
                setError(false);
                setHelper("");
              }}
              placeholder="Settore attivita"
            />
            <Button variant="contained" style={{backgroundColor:"#a8ceb0", marginLeft:"10px"}} onClick={() => salvaSettoreAttivita()}>Salva</Button>
          </div>
        </Modal>
        <Modal
          open={openStatolavoratore}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={style.modal}>
            {" "}
            <Typography variant="h4">Stato Lavoratore</Typography>
            <TextField
              error={error}
              helperText={helper}
              onChange={(e) => {
                descrizione = e.target.value;
                setError(false);
                setHelper("");
              }}
              placeholder="Stato"
            />
            <Button variant="contained" style={{backgroundColor:"#a8ceb0", marginLeft:"10px"}} onClick={() => salvaStatoLavoratore()}>Salva</Button>
          </div>
        </Modal>
        <Modal
          open={openStatoRichiesta}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={style.modal}>
            {" "}
            <Typography variant="h4">Stato Richiesta</Typography>
            <TextField
              error={error}
              helperText={helper}
              onChange={(e) => {
                descrizione = e.target.value;
                setError(false);
                setHelper("");
              }}
              placeholder="Stato"
            />
            <Button variant="contained" style={{backgroundColor:"#a8ceb0", marginLeft:"10px"}} onClick={() => salvaStatoRichiesta()}>Salva</Button>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      {modal()}
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="varie" {...a11yProps(0)} />
          <Tab label="stati" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {" "}
          <div className={style.menu}>
            <div className={style.tableView}>
              <Typography variant="h4">Competenze</Typography>
              <div className={style.table}>
                <DataGrid
                  rows={righeCompetenze}
                  columns={colonneMenu}
                  pageSize={40}
                  isCellEditable={(params) => params.row.descrizione === ""}
                />
                <IconButton
                  className={style.bottone}
                  variant="contained"
                  onClick={() => addCompetenza()}
                >
                  <AddCircleIcon
                    style={{ fill: "green" }}
                   
                    fontSize="large"
                    className={style.icona}
                  />
                </IconButton>
              </div>
            </div>

            <div className={style.tableView}>
              <Typography variant="h4">Lingue</Typography>
              <div className={style.table}>
                <DataGrid
                  rows={righeLingue}
                  columns={colonneMenu}
                  pageSize={40}
                />
                <IconButton
                  className={style.bottone}
                  variant="contained"
                  onClick={() => addLingua()}
                >
                  <AddCircleIcon
                    style={{ fill: "green" }}
                   
                    fontSize="large"
                    className={style.icona}
                  />
                </IconButton>
              </div>
            </div>

            <div className={style.tableView}>
              <Typography variant="h4">Patenti</Typography>
              <div className={style.table}>
                <DataGrid
                  rows={righePatenti}
                  columns={colonneMenu}
                  pageSize={40}
                />
                
              </div>
            </div>

            <div className={style.tableView}>
              <Typography variant="h4">Settore Attivita</Typography>
              <div className={style.table}>
                <DataGrid
                  rows={righeSettoreAttivita}
                  columns={colonneMenu}
                  pageSize={40}
                />
                <IconButton
                  className={style.bottone}
                  variant="contained"
                  onClick={() => addSettoreAttivita()}
                >
                  <AddCircleIcon
                    style={{ fill: "green" }}
                  
                    fontSize="large"
                    className={style.icona}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div className={style.menu}>
            <div className={style.tableViewStato}>
              <Typography variant="h4">Stato lavoratore</Typography>
              <div className={style.table}>
                <DataGrid
                  rows={righeLavoratori}
                  columns={colonneMenuStato}
                  pageSize={40}
                  isCellEditable={(params) => params.row.descrizione === ""}
                />
               
              </div>
            </div>

            <div className={style.tableViewStato}>
              <Typography variant="h4">Stato richiesta</Typography>
              <div className={style.table}>
                <DataGrid
                  rows={righeRichieste}
                  columns={colonneMenuStato}
                  pageSize={40}
                />
                
              </div>
            </div>
            </div>
        </TabPanel>
      
      </SwipeableViews>
    </div>
  );
}

export default Amministra;
