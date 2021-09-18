import { database } from "../../../Axios";
import { useEffect, useState } from "react";
import style from '../../../style/azienda/ModificaRichiesta.module.css'
import {TextField,IconButton, Typography, Box, InputLabel,TextareaAutosize, Button, Dialog, DialogTitle, DialogActions, Chip} from '@material-ui/core'
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";

function ModificaRichiesta({
  modifica,
  updateRichieste,

  agenziaRagioneSociale,
  agenziaid,
  alloggio,
  aziendaRagioneSociale,
  aziendaid,
  compenso,
  comune,
  comuneid,
  provincia,
  sigla_automobilistica,
  createdat,
  datafine,
  datainizio,
  deletedat,
  descrizione,
  id,
  note,
  numeroposizionirichieste,
  statoiter,
  tipocontratto,
  tipocontrattoid,
  titolo,
  trasporto,
  updatedat,
  vitto,
  lingueRichiesta,
  patentiRichiesta,
  competenzeRichiesta,
  updateRichiesta
}) {
  const [titoloState, setTitolo] = useState(titolo);
  const [descrizioneState, setDescrizione] = useState(descrizione);
  const [dataInizioState, setDataInizio] = useState(datainizio);
  const [dataFineState, setDataFine] = useState(datafine);
  const [compensoState, setCompenso] = useState(compenso);
  const [numeroPosizioniRichiesteState, setNumeroPosizioniRichieste] = useState(
    numeroposizionirichieste
  );
  const [noteState, setNote] = useState(note);
  const [offreVitto, setOffreVitto] = useState(vitto);
  const [offreAlloggio, setOffreAllogggio] = useState(alloggio);
  const [offreTrasporto, setOffreTrasporto] = useState(trasporto);
  const [comuneidState, setComuneId] = useState(comuneid);

  const [tipoContattoIdState, setTipoContrattoId] = useState(tipocontrattoid);
  const [lingua, setLingua]= useState({});
  const [patente, setPatente]  = useState({});
  const [competenza, setCompetenza] = useState({});
  const [lingue, setLingue] = useState([]);
  const [patenti, setPatenti] = useState([]);
  const [competenze, setCompetenze] = useState([])
  const [lingueSelezionate, setLingueSelezionate] = useState(lingueRichiesta);
  const [patentiSelezionate, setPatentiSelezionate] = useState(patentiRichiesta);
  const [competenzeSelezionate, setCompetenzeSelezionate] = useState(competenzeRichiesta);
  const [comuniState, setComuni] = useState([]);
  const [provincie, setProvincie] = useState([]);
  const [contratti, setContratti] = useState([]);

  const [openSalva, setOpenSalva] = useState(false);
  const [openAnnulla, setOpenAnnulla] = useState(false);
  const [openError, setOpenError] = useState(false)

  const handleOpenSalva = () => {
    setOpenSalva(false)
  }

  const handleOpenAnnulla = () => {
    setOpenAnnulla(false)
  }

  const handleOpenErro = () => {
    setOpenError(false)
  }



  useEffect(() => {
    fetchLingue();
    fetchPatenti();
    fetchCompetenze();
    fetchProvincie();
    fetchComuni(provincia);
    fetchContratto();
  }, []);

  const fetchContratto = async () => {
    await database
      .get(`/contratto/read/all`)
      .then((response) => {
        const data = response.data;
        const result = [];
        data.map((value) => result.push({id: value.id, descrizione: value.descrizione}));
        setContratti(result);
      })
      .catch((error) => console.log(error));
  };

  const dialog = () => {
    return (
      <div>
        <div>
          <Dialog
            open={openError}
            onClose={handleOpenErro}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Errore!"}</DialogTitle>
          </Dialog>
        </div>

        <div className={style.dialog}>
          <Dialog
            open={openAnnulla}
            onClose={handleOpenAnnulla}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Annullato!"}
            </DialogTitle>
          </Dialog>
        </div>

        <div className={style.dialog}>
          <Dialog
            open={openSalva}
            onClose={handleOpenSalva}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Richiesta Salvata!"}
            </DialogTitle>
          </Dialog>
        </div>
      </div>
    );
  };

  const salva = async (e) => {
    e.preventDefault();
    await database
      .post("/richiesta/update_returning_id", {
        titolo: titoloState,
        descrizione: descrizioneState,
        dataInizio: dataInizioState,
        dataFine: dataFineState,
        compenso: compensoState,
        numeroPosizioniRichieste: numeroPosizioniRichiesteState,
        note: noteState,
        vitto: offreVitto,
        trasporto: offreTrasporto,
        alloggio: offreAlloggio,
        updatedat: new Date(),
        tipocontrattoid: tipoContattoIdState,
        comuneid: comuneidState,
        id: id,
        
      })
      .then((response) => {

        postCompetenze(response.data)
        updateRichiesta();
        setOpenSalva(true);
        
        setTimeout(() => {  updateRichieste() }, 1500); ;
      })
      .catch((error) => {
        console.log("errore", error);
        setOpenError(true)
      });

   setTimeout(() => { modifica(false)}, 1500);
  };

  const annulla = () => {
   
    modifica(false)
  };

  const postCompetenze = async (id) => {

    await database.get(`/richiestacompetenza/delete/${id}`)
      .then( async(response) =>  {
        await competenzeSelezionate.map((value) => {

        database
          .post("/richiestacompetenza/create-update", {
            id: { competenzaid: value.id, richiestaid: id },
            priorita: value.priorita,
          })
          .then((response) => {
  
          })
          .catch((error) => console.log(error));
      });
    }).catch((error) => console.log(error))

    
    await postLingua(id);
  }

  const postLingua = async (id) => {
    await database.get(`/linguarichiesta/delete/${id}`)
      .then(async(response) => {
        await lingueSelezionate.map((value) => {
        database
          .post("/linguarichiesta/create-update", {
            id: { linguaid: value.id, richiestaid: id },
            livelloLinguisticoRichiesto: value.livelloLinguistico,
          })
          .then((response) => {
  
          })
          .catch((error) => console.log(error));
      });})
    
    await postPatente(id);
  };

  const postPatente = async (id) => {
    await database.get(`/patenterichiesta/delete/${id}`)
    .then(async (response) => await patentiSelezionate.map((value) => {
      
      database
        .post("/patenterichiesta/create-update", {
          id: { patente: value.siglaPatente, richiestaId: id },
        })

        .catch((error) => console.log(error));
    }))
    
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

  const provinciaSelected = (provincia) => {

    fetchComuni(provincia);
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

  const setProvincieComponent = () => {
    return provincie.map((value) => {
      if (value.provincia === provincia) {
        return (
          <option value={value.provincia} selected={true}>
            {value.provincia} {value.sigla_automobilistica}
          </option>
        );
      } else
        return (
          <option value={value.provincia}>
            {value.provincia} {value.sigla_automobilistica}
          </option>
        );
    });
  };

  const setComuniComponent = () => {
    return comuniState.map((value) => {
      if (value.codice_comune_formato_numerico === comuneid) {
        return (
          <option value={value.codice_comune_formato_numerico} selected={true}>
            {value.denominazione_italiana_e_straniera}{" "}
            {value.sigla_automobilistica}
          </option>
        );
      } else
        return (
          <option value={value.codice_comune_formato_numerico}>
            {value.denominazione_italiana_e_straniera}{" "}
            {value.sigla_automobilistica}
          </option>
        );
    });
  };

  const setContrattiComponent = () => {
    return contratti.map((value) => {
      if (value.descrizione === tipocontratto) {
        
        return (
          <option value={value.id} selected={true}>
            {value.descrizione}
          </option>
        );
      } else return <option value={value.id}>{value.descrizione}</option>;
    });
  };

  const setVittoComponent = () => {
    switch (offreVitto) {
      case "Si":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Si"}
              checked={true}
            />
            <label htmlFor="vitto">Si</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"No"}
            />
            <label htmlFor="vitto">No</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="vitto">Su richiesta</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="vitto">Se disponibile</label>
          </div>
        );
      case "No":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="vitto">Si</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"No"}
              checked={true}
            />
            <label htmlFor="vitto">No</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="vitto">Su richiesta</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="vitto">Se disponibile</label>
          </div>
        );
      case "Su richiesta":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="vitto">Si</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"No"}
            />
            <label htmlFor="vitto">No</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value="Su richiesta"
              checked={true}
            />
            <label htmlFor="vitto">Su richiesta</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="vitto">Se disponibile</label>
          </div>
        );
      case "Se disponibile":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="vitto">Si</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"No"}
            />
            <label htmlFor="vitto">No</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="vitto">Su richiesta</label>
            <input
              type="radio"
              name="vitto"
              onChange={(e) => setOffreVitto(e.target.value)}
              value={"Se disponibile"}
              checked={true}
            />
            <label htmlFor="vitto">Se disponibile</label>
          </div>
        );
    }
  };

  const setAlloggioComponent = () => {
    switch (offreAlloggio) {
      case "Si":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Si"}
              checked={true}
            />
            <label htmlFor="alloggio">Si</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"No"}
            />
            <label htmlFor="alloggio">No</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="alloggio">Su richiesta</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="alloggio">Se disponibile</label>
          </div>
        );
      case "No":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="alloggio">Si</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"No"}
              checked={true}
            />
            <label htmlFor="alloggio">No</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="alloggio">Su richiesta</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="alloggio">Se disponibile</label>
          </div>
        );
      case "Su richiesta":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="alloggio">Si</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"No"}
            />
            <label htmlFor="alloggio">No</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value="Su richiesta"
              checked={true}
            />
            <label htmlFor="alloggio">Su richiesta</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="alloggio">Se disponibile</label>
          </div>
        );
      case "Se disponibile":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="alloggio">Si</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"No"}
            />
            <label htmlFor="alloggio">No</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="alloggio">Su richiesta</label>
            <input
              type="radio"
              name="alloggio"
              onChange={(e) => setOffreAllogggio(e.target.value)}
              value={"Se disponibile"}
              checked={true}
            />
            <label htmlFor="alloggio">Se disponibile</label>
          </div>
        );
    }
  };

  const setTrasportoComponent = () => {
    switch (offreTrasporto) {
      case "Si":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Si"}
              checked={true}
            />
            <label htmlFor="trasporto">Si</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"No"}
            />
            <label htmlFor="trasporto">No</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="trasporto">Su richiesta</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="trasporto">Se disponibile</label>
          </div>
        );
      case "No":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="trasporto">Si</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"No"}
              checked={true}
            />
            <label htmlFor="trasporto">No</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="trasporto">Su richiesta</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="trasporto">Se disponibile</label>
          </div>
        );
      case "Su richiesta":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="trasporto">Si</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"No"}
            />
            <label htmlFor="trasporto">No</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value="Su richiesta"
              checked={true}
            />
            <label htmlFor="trasporto">Su richiesta</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Se disponibile"}
            />
            <label htmlFor="trasporto">Se disponibile</label>
          </div>
        );
      case "Se disponibile":
        return (
          <div className={style.radio}>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Si"}
            />
            <label htmlFor="trasporto">Si</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"No"}
            />
            <label htmlFor="trasporto">No</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value="Su richiesta"
            />
            <label htmlFor="trasporto">Su richiesta</label>
            <input
              type="radio"
              name="trasporto"
              onChange={(e) => setOffreTrasporto(e.target.value)}
              value={"Se disponibile"}
              checked={true}
            />
            <label htmlFor="trasporto">Se disponibile</label>
          </div>
        );
    }
  };

  const getLivelloLinguistico = (value) => {
    let valore = 0;

    livelliLinguistici.forEach(test => {

      if(test.label === value.livelloLinguistico )
        valore = test.value;
    })

    return valore;
  }

  return (
    <div className={style.main}>
    {dialog()}
    <div className={style.titolo}>
    <Typography variant="h3" component="div">
              <Box fontWeight="fontWeightBold" m={1} fontFamily="Kreon">
              {titoloState.toUpperCase()}
              </Box>
            </Typography>
    </div>
    <div className={style.container}>
      <div className={style.box}>
        <InputLabel htmlFor="titolo">Titolo</InputLabel>
        <TextField
          id="titolo"
          onChange={(e) => setTitolo(e.target.value)}
          type="text"
          value={titoloState}
          fullWidth
        />
        
      </div>

      <div className={style.box}>
      <InputLabel htmlFor="provincia">Provincia</InputLabel>
        <select
          name=""
          id="provincia"
          onChange={(e) => provinciaSelected(e.target.value)}
          fullWidth
        >
          {setProvincieComponent()}
        </select>
      </div>

      <div className={style.box}>
        <InputLabel htmlFor="comune">Comune </InputLabel>

        <select
          name=""
          id="comune"
          onChange={(e) => setComuneId(e.target.value)}
          fullWidth
        >
          {setComuniComponent()}
        </select>
      </div>

<div className={style.box}>
  <InputLabel htmlFor="descrizione">Descrizione:</InputLabel>
      <TextareaAutosize

        id="descrizione"
        onChange={(e) => setDescrizione(e.target.value)}
        type="text"
        rowsMin={4}
        rowsMax={10}
        defaultValue={descrizioneState}
        fullWidth
        
      />
</div>
      

      <div className={style.box}>
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
                          variant="body1"
                          id="discrete-slider-small-steps"
                          gutterBottom
                        >
                          Priorità
                        </Typography>
                        <Slider
                          onChange={(e, val) => handleChangePriorita(val, value)}
                          defaultValue={value.priorita}
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

            <div className={style.box}>
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
                {lingueSelezionate.map((value, index) => {
                  return (
                    <div className={style.chip}>
                      <div>
                        <Chip
                          key={index}
                          label={value.descrizione}
                          variant="outlined"
                          color="primary"
                          onDelete={() => handleDeleteChipLingue(value)}
                        />
                      </div>

                      <div className={style.slider}>
                        <Typography
                          variant="body1"
                          id="discrete-slider-small-steps"
                          gutterBottom
                        >
                          Livello Linguistico
                        </Typography>
                        <Slider
                          onChange={(e, val) => handleChangeLivelloLinguistico(val, value)}
                          defaultValue={getLivelloLinguistico(value)}
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

            <div className={style.box}>
              <InputLabel htmlFor="patenti">Patenti Richieste</InputLabel>
              <div className={style.row}>
              <select
                name=""
                id="patenti"
                
                onChangeCapture={(e) =>{ try{
                  setPatente({
                      id : patenti[e.target.value-1].siglaPatente, 
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
                        .indexOf(patente.id);
                      if (index === -1 && patente.id !== "") {
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

      

      
          <div className={style.box}>
          <InputLabel htmlFor="datainizio">Data Inizio</InputLabel>
        <TextField
          id="datainizio"
          onChange={(e) => setDataInizio(e.target.value)}
          type="date"
          defaultValue={dataInizioState}
          fullWidth
        />
          </div>

          <div className={style.box}>
          <InputLabel htmlFor="datafine">Data Fine</InputLabel>
        <TextField
          id="datafine"
          onChange={(e) => setDataFine(e.target.value)}
          type="date"
          defaultValue={dataFineState}
          fullWidth
        />
          </div>
        
        
      

      
        <div className={style.box}>
        <InputLabel htmlFor="contratto">Tipologia di contratto</InputLabel>
        <select
          name=""
          id="contratto"
          fullWidth
          onChange={(e) => {
            setTipoContrattoId(e.target.value);
          }}
        >
          {setContrattiComponent()}
        </select>
        </div>
       
      

        <div className={style.box}>
        <InputLabel > Vitto </InputLabel> {setVittoComponent()}
        </div>
        <div className={style.box}>
        <InputLabel > Alloggio </InputLabel> {setAlloggioComponent()}
        </div>
        <div className={style.box}>
        <InputLabel > Trasporto </InputLabel> {setTrasportoComponent()}
        </div>
      
        <div className={style.box}>
       <InputLabel htmlFor="compenso">Compenso Mensile</InputLabel> 
        <TextField
          id="compenso"
          onChange={(e) => setCompenso(e.target.value)}
          type="number"
          defaultValue={compensoState}
          fullWidth
        />
        </div>
      <div className={style.box}>
        <InputLabel htmlFor="numeroposizionirichieste">Numero posizioni richieste</InputLabel>
        <TextField
          id="numeroposizionirichieste"
          onChange={(e) => setNumeroPosizioniRichieste(e.target.value)}
          type="number"
          defaultValue={numeroPosizioniRichiesteState}
          fullWidth
        />
        </div>
        <div className={style.box}>
        <InputLabel htmlFor={note}>Note </InputLabel>
        <TextareaAutosize
          rowsMin={4}
          id="note"
          onChange={(e) => setNote(e.target.value)}
          type="text"
          defaultValue={noteState}
          fullWidth
        />
      </div>

      <div className={style.bottoni}>
        <Button variant="contained" color="primary" onClick={(e) => salva(e)}>Salva</Button>
        <Button variant="contained" style={{backgroundColor:"red", marginLeft:"5px", color:"white"}} onClick={(e) => annulla(e)}>Annulla</Button>
      </div>
      </div>
    </div>
  );
}

export default ModificaRichiesta;
