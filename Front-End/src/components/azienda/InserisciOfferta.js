import { database } from "../../Axios";
import { useEffect, useState } from "react";
import style from "../../style/azienda/InserisciOfferta.module.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  Typography,
  InputLabel,
  Button,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Chip,
} from "@material-ui/core/";

function InserisciOfferta({ aziendaLoggata, updateRichieste }) {
  //TODO

  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [dataInizio, setDataInizio] = useState();
  const [dataFine, setDataFine] = useState();
  const [compenso, setCompenso] = useState(0);
  const [numeroPosizioniRichieste, setNumeroPosizioniRichieste] = useState(0);
  const [note, setNote] = useState("");
  const [offreVitto, setOffreVitto] = useState("Si");
  const [offreAlloggio, setOffreAllogggio] = useState("Si");
  const [offreTrasporto, setOffreTrasporto] = useState("Si");
  const [comuneid, setComuneId] = useState();
  const [tipoContratto, setTipoContratto] = useState();
  
 
  
  const [contratti, setContratti] = useState([]);
  const [provincie, setProvincie] = useState([]);
  const [comuni, setComuni] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [lingua, setLingua] = useState({});
  const [lingue, setLingue] = useState([]);
 
  const [patente, setPatente] = useState({});
  const [patenti, setPatenti] = useState([]);
  const [patentiSelezionate, setPatentiSelezionate] = useState([]);
  const [competenza, setCompetenza] = useState();
  const [competenze, setCompetenze] = useState([]);
  const [competenzeSelezionate, setCompetenzeSelezionate] = useState([]);
  //error
  const [errorTitolo, setErrorTitolo] = useState(false);
  const [errorCompenso, setErrorCompenso] = useState(false);
  const [errorNumeroPosRichieste, setErrorNumeroPosRichieste] = useState(false);
  const [helperDataInizio, setHelperDataInizio] = useState("");
  const [errorDataFine, setErrorDataFine] = useState(false);
  const [errorDataInizio, setErrorDataInizio] = useState(false);
  const [helperDataFine, setHelperDataFine] = useState("");

 

 
  const [lingueSelezionate, setLingueSelezionate] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContratto();
    fetchCompetenze();
    fetchLingue();
    fetchPatenti();
    fetchProvincie();
  }, []);


  //dialog
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const dialog = () => {
    return (
      <div>
        <div>
          <Dialog
            open={openSuccess}
            onClose={handleCloseSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={style.dialog}
          >
            <DialogTitle id="alert-dialog-title" className={style.dialogText}>
              <Typography variant="h4">Complimenti!</Typography>
            </DialogTitle>
            <DialogContentText className={style.dialogText}>
              <Typography variant="h5">
                La tua richiesta è stata accettata
              </Typography>
              <Typography variant="h5">
                ed è stata inviata una notifica all'agenzia.
              </Typography>
              <Typography variant="h5">
                Puoi trovarla nelle tue richieste!
              </Typography>
            </DialogContentText>
          </Dialog>
        </div>

        <div className={style.dialog}>
          <Dialog
            open={openError}
            onClose={handleCloseError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Errore!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Controlla di aver inserito tutti i campi richiesti.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={loading}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={style.dialog}
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                className={style.dialogText}
              >
                <Typography variant="h5">
                  Stiamo inviando la tua richiesta
                </Typography>
                <CircularProgress />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };



  //Fetch dei dati
  const fetchContratto = async () => {
    await database
      .get(`/contratto/read/all`)
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) => result.push(value));
        setContratti(result);
      })
      .catch((error) => console.log(error));
  };

  const fetchCompetenze = async () => {
    await database
      .get(`/competenza/read/all`)
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) => result.push(value));

        setCompetenze(result);
      })
      .catch((error) => console.log(error));
  };

  const fetchLingue = async () => {
    await database
      .get("/lingua/read/all")
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) => result.push(value));
        setLingue(result);
      })
      .catch((error) => console.log(error));
  };

  const fetchPatenti = async () => {
    await database
      .get("/tipopatente/read/all")
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) => result.push(value));
        setPatenti(result);
      })
      .catch((error) => console.log(error));
  };

  const fetchProvincie = async () => {
    await database
      .get("/comune/read/provincia")
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) =>
          result.push({
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
            codice_comune_formato_numerico:
              value.codice_comune_formato_numerico,
            denominazione_italiana_e_straniera:
              value.denominazione_italiana_e_straniera,
          })
        );
        setComuni(result);
        
      })
      .catch((error) => console.log(error));
  };


  //Post della richiesta

  const inserimentoHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      await database
        .post("/richiesta/create_returning_id", {
          titolo: titolo,
          descrizione: descrizione,
          dataInizio: dataInizio,
          dataFine: dataFine,
          compenso: compenso,
          numeroPosizioniRichieste: numeroPosizioniRichieste,
          note: note,
          vitto: offreVitto,
          trasporto: offreTrasporto,
          alloggio: offreAlloggio,
          createdat: new Date(),
          updatedat: null,
          deletedat: null,
          tipocontrattoid: tipoContratto,
          comuneid: comuneid,
          agenziaid: aziendaLoggata.agenziaid,
          aziendaid: aziendaLoggata.id,
          statoiterid: 1,
        })
        .then((response) => {
          postCompetenza(response.data);
          setLoading(false);
          setOpenSuccess(true);
          updateRichieste();
        })
        .catch((error) => {
          console.log("errore", error);
          setOpenError(true);
          setLoading(false);
        });
    } else {
      setOpenError(true);
      setLoading(false);
      console.log("errore validate");
    }
  };

  const postCompetenza = async (id) => {
    await competenzeSelezionate.map((value) => {

      database
        .post("/richiestacompetenza/create", {
          id: { competenzaid: value.id, richiestaid: id },
          priorita: value.priorita,
        })
        .then((response) => {

        })
        .catch((error) => console.log(error));
    });
    await postLingua(id);
  };

  const postLingua = async (id) => {
    await lingueSelezionate.map((value) => {
      database
        .post("/linguarichiesta/create", {
          id: { linguaid: value.id, richiestaid: id },
          livelloLinguisticoRichiesto: value.livelloLinguistico,
        })
        .then((response) => {

        })
        .catch((error) => console.log(error));
    });
    await postPatente(id);
  };

  const postPatente = async (id) => {
    await patentiSelezionate.map((value) => {
      database
        .post("/patenterichiesta/create", {
          id: { patente: value.siglaPatente, richiestaId: id },
        })
        .then( )
        .catch((error) => console.log(error));
    });
  };

 
  

  const validate = () => {
    if (titolo === "") {
      setErrorTitolo(true);

      return false;
    } else if (descrizione === "") {

      return false;
    } else if (compenso <= 0) {
      
      setErrorCompenso(true);
      return false;
    } else if (numeroPosizioniRichieste <= 0) {

      setErrorNumeroPosRichieste(true);
      return false;
    } else if (dataInizio < new Date() || !dataInizio) {

      setErrorDataInizio(true);
      setHelperDataInizio(
        "La data di inizio non può \n essere inferiore alla data di oggi"
      );
      return false;
    } else if (dataFine < dataInizio || !dataFine) {

      setErrorDataFine(true);
      setHelperDataFine(
        "La data di fine non può \n essere minore della data di inizio"
      );
      return false;
    } else if (!comuneid) {

      return false;
    } else {
      return true;
    }
  };

 





  const competenzeMapper = () => {
    let result = [<option value={0}> </option>];

    competenze.map((value, index) =>
      result.push(<option value={index+1}>{value.descrizione}</option>)
    );

    return result;
  };
  const handleDeleteChip = (value) => {

    const newList = competenzeSelezionate.filter(
      (selezionato) => selezionato.descrizione !== value.descrizione
    );
    

    setCompetenzeSelezionate(newList);
  };

  const lingueMapper = () => {
    let result = [<option value={0}></option>];

    lingue.map((value, index) =>
      result.push(<option value={index+1}>{value.descrizione}</option>)
    );

    return result;
  }

  const handleDeleteChipLingue = (value) => {
    const newList = lingueSelezionate.filter(
      (selezionato) => selezionato.id !== value.id
    );


    setLingueSelezionate(newList);
  }

  const patentiMapper = () => {
    let result = [<option value={0}> </option>];

    patenti.map((value, index) =>
      result.push(<option value={index + 1}>{value.siglaPatente}</option>)
    );

    return result;
  }

  const handleDeleteChipPatenti = (value) => {
    const newList = patentiSelezionate.filter(
      (selezionato) => selezionato.siglaPatente !== value.siglaPatente
    );


    setPatentiSelezionate(newList);
  }


  const handleChangePriorita = (value, e) => {
    let result = competenzeSelezionate;
    for (let val in result) {
      if (result[val].id === e.id) {
        result[val].priorita = value;
      }
    }
    setCompetenzeSelezionate(result);
  };

  const handleChangeLivelloLinguistico = (value, e) => {
    let result = lingueSelezionate;

    
    for (let val in result) {
      if (result[val].id === e.id) {
        result[val].livelloLinguistico = livelliLinguistici[value-1].label;
      }
    }
    setLingueSelezionate(result);
  };

  const livelliLinguistici = [
    {
      value: 1,
      label: "A1"
    },
    {
      value: 2,
      label: "A2"
    },
    {
      value: 3,
      label: "B1"
    },
    {
      value: 4,
      label: "B2"
    },
    {
      value: 5,
      label: "C1"
    },
    {
      value: 6,
      label: "C2"
    }
  ]

  return (
    <div>
      {
        <div className={style.container}>
          <div className={style.bg}></div>
          <Typography variant="h2" component="div">
            Inserisci nuova richiesta
          </Typography>

          <div className={style.dati}>
            <div className={style.inputField}>
              <InputLabel htmlFor="titolo">Titolo</InputLabel>
              <TextField
                error={errorTitolo}
                type="text"
                id="titolo"
                onChange={(e) => setTitolo(e.target.value)}
                onClick={() => setErrorTitolo(false)}
                value={titolo}
              />
            </div>

            <div className={style.inputField}>
              <InputLabel htmlFor="descrizione">Descrizione:</InputLabel>
              <TextField
                multiline
                
                name=""
                id="descrizione"
                style={{ width: "30vw" }}
                onChange={(e) => setDescrizione(e.target.value)}
                value={descrizione}
              />
            </div>

            <div className={style.selectOption}>
              <InputLabel htmlFor="provincia">Provincia</InputLabel>
              <select
                name=""
                id="provincia"
                onClick={(e) => fetchComuni(e.target.value)}
              >
                {provincie.map((value) => (
                  <option value={value.provincia}>
                    {value.provincia} {value.sigla_automobilistica}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.selectOption}>
              <InputLabel htmlFor="comune">Comune</InputLabel>
              <select
                name=""
                id="comune"
                onChange={(e) => setComuneId(e.target.value)}
              >
                {comuni.map((value) => (
                  <option value={value.codice_comune_formato_numerico}>
                    {value.denominazione_italiana_e_straniera}{" "}
                    {value.sigla_automobilistica}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.date}>
              <div>
                <InputLabel htmlFor="datainizio">Data Inizio</InputLabel>
                <TextField
                  error={errorDataInizio}
                  type="date"
                  id="datainizio"
                  onChange={(e) => setDataInizio(e.target.value)}
                  onClick={() => {
                    setErrorDataInizio(false);
                    setHelperDataInizio("");
                  }}
                  helperText={helperDataInizio}
                />
              </div>

              <div>
                <InputLabel htmlFor="datafine">Data Fine</InputLabel>
                <TextField
                  error={errorDataFine}
                  type="date"
                  id="datafine"
                  onChange={(e) => setDataFine(e.target.value)}
                  onClick={() => {
                    setErrorDataFine(false);
                    setHelperDataFine("");
                  }}
                  helperText={helperDataFine}
                />
              </div>
            </div>

            <div className={style.selectOption}>
              <InputLabel htmlFor="contratto">Tipo di contratto</InputLabel>
              <select
                name=""
                id="contratto"
                onChange={(e) => setTipoContratto(e.target.value)}
              >
                <option value=""></option>
                {contratti.map((value) => (
                  <option value={value.id}>{value.descrizione}</option>
                ))}
              </select>
            </div>

            <div>
              <div className={style.radio}>
                <FormControl component="fieldset">
                  <label>Vitto </label>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="vitto"
                    value={offreVitto}
                    onChange={(e) => setOffreVitto(e.target.value)}
                  >
                    <FormControlLabel
                      value="Si"
                      control={<Radio color="primary" />}
                      label="Si"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="Su richiesta"
                      control={<Radio color="primary" />}
                      label="Su richiesta"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="Se disponibile"
                      control={<Radio color="primary" />}
                      label="Se disponibile"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={style.radio}>
                <FormControl component="fieldset">
                  <label>Alloggio </label>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="alloggio"
                    value={offreAlloggio}
                    onChange={(e) => setOffreAllogggio(e.target.value)}
                  >
                    <FormControlLabel
                      value="Si"
                      control={<Radio color="primary" />}
                      label="Si"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="Su richiesta"
                      control={<Radio color="primary" />}
                      label="Su richiesta"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="Se disponibile"
                      control={<Radio color="primary" />}
                      label="Se disponibile"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={style.radio}>
                <FormControl component="fieldset">
                  <label>Trasporto </label>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="trasporto"
                    value={offreTrasporto}
                    onChange={(e) => setOffreTrasporto(e.target.value)}
                  >
                    <FormControlLabel
                      value="Si"
                      control={<Radio color="primary" />}
                      label="Si"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="Su richiesta"
                      control={<Radio color="primary" />}
                      label="Su richiesta"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="Se disponibile"
                      control={<Radio color="primary" />}
                      label="Se disponibile"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className={style.selectOption}>
              <InputLabel htmlFor="competenze">Competenze richieste</InputLabel>
              <div className={style.row}>
                <select
                  id="competenze"
                  onChangeCapture={(e) => {
                   try{

                      setCompetenza({
                      id: competenze[e.target.value-1].id,
                      descrizione: e.target[e.target.value].text,
                      priorita: 1,
                    });
                   }catch(e){
                    console.log(e)
                   }
                  }}
                >
                  {competenzeMapper()}
                </select>
                <IconButton
                  size="small"
                  onClick={() => {
                    //controllo se effettivamente è stata selezionata una competenza che non era già stata aggiunta

                    if (competenza) {
                      let index = competenzeSelezionate
                        .map((value) => {
                          return value.descrizione;
                        })
                        .indexOf(competenza.descrizione);
                      if (index === -1 && competenza.descrizione !== "") {
                        setCompetenzeSelezionate((prev) => [
                          ...prev,
                          competenza,
                        ]);
                      }
                    }
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              <div className={style.chipArray}>
                {competenzeSelezionate.map((value) => {
                  return (
                    <div className={style.chip}>
                      <div>
                        <Chip
                          key={value.id}
                          label={value.descrizione}
                          variant="outlined"
                          color="primary"
                          onDelete={() => handleDeleteChip(value)}
                        />
                      </div>

                      <div className={style.slider}>
                        <Typography
                          variant="h5"
                          id="discrete-slider-small-steps"
                          gutterBottom
                        >
                          Priorità
                        </Typography>
                        <Slider
                          onChange={(e, val) => handleChangePriorita(val, value)}
                          defaultValue={3}
                          aria-labelledby="discrete-slider-small-steps"
                          step={1}
                          marks
                          min={1}
                          max={5}
                          valueLabelDisplay="auto"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.selectOption}>
              <InputLabel htmlFor="lingue">Lingue Richieste</InputLabel>
              <div className={style.row}>
              <select id="lingue"  onChangeCapture={(e) => {
        
                try{
                  setLingua({
                      id: lingue[e.target.value-1].id,
                      descrizione: e.target[e.target.value].text,
                      livelloLinguistico: "B1"
                    })}catch(e){
                      console.log(e)
                    }
                  }}>
                {lingueMapper()}
              </select>
              <IconButton
                  size="small"
                  onClick={() => {
                    //controllo se effettivamente è stata selezionata una competenza che non era già stata aggiunta

                    if (lingua) {
                      let index = lingueSelezionate
                        .map((value) => {
                          return value.descrizione;
                        })
                        .indexOf(lingua.descrizione);
                      if (index === -1 && lingua.descrizione !== "") {
                        setLingueSelezionate((prev) => [
                          ...prev,
                          lingua,
                        ]);
                      }
                    }
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              <div className={style.chipArray}>
                {lingueSelezionate.map((value) => {
                  return (
                    <div className={style.chip}>
                      <div>
                        <Chip
                          key={value.id}
                          label={value.descrizione}
                          variant="outlined"
                          color="primary"
                          onDelete={() => handleDeleteChipLingue(value)}
                        />
                      </div>

                      <div className={style.slider}>
                        <Typography
                          variant="h5"
                          id="discrete-slider-small-steps"
                          gutterBottom
                        >
                          Livello Linguistico
                        </Typography>
                        <Slider
                          onChange={(e, val) => handleChangeLivelloLinguistico(val, value)}
                          defaultValue={3}
                          aria-labelledby="discrete-slider-small-steps"
                          step={1}
                        
                          min={1}
                          max={6}
                          valueLabelDisplay="off"
                          marks={livelliLinguistici}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.selectOption}>
              <InputLabel htmlFor="patenti">Patenti Richieste</InputLabel>
              <div className={style.row}>
              <select
                name=""
                id="patenti"
                
                onChange={(e) =>{ try{
                  setPatente({
                      id: patenti[e.target.value-1].id,
                      siglaPatente: e.target[e.target.value].text
                      
                    })}catch(e){
                      console.log(e)
                    }
                  }}>
                {patentiMapper()}
              </select>
            
              <IconButton
                  size="small"
                  onClick={() => {
                    //controllo se effettivamente è stata selezionata una competenza che non era già stata aggiunta

                    if (patente) {
                      let index = patentiSelezionate
                        .map((value) => {
                          return value.siglaPatente;
                        })
                        .indexOf(patente.siglaPatente);
                      if (index === -1 && patente.siglaPatente !== "") {
                        setPatentiSelezionate((prev) => [
                          ...prev,
                          patente,
                        ]);
                      }
                    }
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>

              <div className={style.chipArrayPatenti}>
                {patentiSelezionate.map((value) => {
                  return (
                      <div className={style.patente}> 
                      <Chip
                          key={value.id}
                          label={value.siglaPatente}
                          variant="outlined"
                          color="primary"
                          onDelete={() => handleDeleteChipPatenti(value)}
                        />
                      </div>
                       
                      
                  );
                })}
              </div>
            </div>

            <div className={style.inputField}>
              <InputLabel htmlFor="compenso">Compenso Mensile (EE,cc)</InputLabel>
              <TextField
                error={errorCompenso}
                id="compenso"
                type="number"
                min="1"
                step="any"
                onChange={(e) => setCompenso(e.target.value)}
                onClick={() => setErrorCompenso(false)}
  
                value={compenso}
              />
            </div>

            <div className={style.inputField}>
              <InputLabel htmlFor="numeroposizionirichieste">
                Numero Posizioni Richieste
              </InputLabel>
              <TextField
                error={errorNumeroPosRichieste}
                id="numeroposizionirichieste"
                type="number"
                onChange={(e) => setNumeroPosizioniRichieste(e.target.value)}
                onClick={() => setErrorNumeroPosRichieste(false)}
                value={numeroPosizioniRichieste}
              />
            </div>

            <div className={style.inputField}>
              <InputLabel htmlFor="note">Note</InputLabel>
              <TextField
                name=""
                id="note"
                cols="30"
                rows="5"
                onChange={(e) => setNote(e.target.value)}
                value={note}
              />
            </div>

            <Button
              className={style.button}
              variant="contained"
              color="primary"
              size="large"
              onClick={(e) => inserimentoHandler(e)}
            >
              Salva
            </Button>
          </div>
          {dialog()}
        </div>
      }
    </div>
  );
}

export default InserisciOfferta;
