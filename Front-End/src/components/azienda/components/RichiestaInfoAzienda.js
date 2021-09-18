import { useEffect, useState } from "react";
import style from "../../../style/RichiestaInfo.module.css";
import Lavoratore from "../../Lavoratore";
import ModificaRichiesta from "./ModificaRichiesta";
import { database } from "../../../Axios";
import { Button, Typography, IconButton, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, Chip } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function RichiestaInfo({
  isModificabile,
  updateRichieste,
  handleClose,
  richiestaid,
}) {
  const [modifica, setModifica] = useState(false);
  const [lavoratoriAccettati, setLavoratoriAccettati] = useState([]);
  const [lavoratoriProposti, setLavoratoriProposti] = useState([]);
  const [lingue, setLingue] = useState([]);
  const [patenti, setPatenti] = useState([]);
  const [competenze, setCompetenze] = useState([]);
  const [showAccettati, setShowAccettati] = useState(false);
  const [richiesta, setRichiesta] = useState();
  const [contattiAzienda, setContattiAzienda] = useState({});
  const [loading, setLoading] = useState(true);
  const [showProposti, setShowProposti] = useState(false);
  const [showRifiutati, setShowRifiutati] = useState(false);
  const [lavoratoriRifiutati, setLavoratoriRifiutati] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRichiesta();
    Lingua();
    Patente();
    Competenze();
    fetchLavoratori();
    
  }, []);

  const fetch = () => {
    fetchRichiesta();
    Lingua();
    Patente();
    Competenze();
  }

  const fetchRichiesta = async () => {
    await database
      .get(`/richiesta/read/completa/${richiestaid}`)
      .then((response) => {
        const data = response.data;
        setRichiesta(data);
        setLoading(false);

        fetchContattiAzienda(data.agenziaid);
      })
      .catch((error) => console.log(error));
  };
  const fetchContattiAzienda = (aziendaid) => {
    database
      .get(`/agenzia/read/${aziendaid}`)
      .then(async (response) => {
        await setContattiAzienda(response.data);
      })
      .catch((error) => console.log(error));
  };

  

  //prendo la lista delle lingue tramite linguaRichiesta con Richiestaid
  const Lingua = async () => {
    await database
      .get(`/linguarichiesta/read/completa/${richiestaid}`)
      .then((response) => {
        setLingue(response.data);
      })
      .catch((error) => console.log(error));
  };

  //prendo la lista delle patenti richieste
  const Patente = async () => {
    await database
      .get(`/patenterichiesta/read/all/${richiestaid}`)
      .then((response) => {
        let result = [];
        response.data.map((value) => result.push({siglaPatente: value.id.patente, id: value.id.patente}))
        setPatenti(result);
      })
      .catch((error) => console.log(error));
  };

  //prendo la lista delle competenze richieste
  const Competenze = async () => {
    await database
      .get(`/richiestacompetenza/read/completa/${richiestaid}`)
      .then((response) => {
        setCompetenze(response.data);
        
      })
      .catch((error) => console.log(error));
  };

  //prendo lavoratori
  const fetchLavoratori =  () => {
     database
      .get(`/lavoratore/read/lavoratoreproposto/${richiestaid}`)
      .then((response) => {
        const accettati = [];
        const proposti = [];
        const rifiutati = [];
        
        response.data.map((value) => {
          
          if (value.statoid === 3) {
            proposti.push(value);
            setShowProposti(true);
          } else if (value.statoid === 2) {
            setShowAccettati(true);
            accettati.push(value);
          } else if (value.statoid === 1) {
            setShowRifiutati(true);
            rifiutati.push(value);
          }
        });
        setLavoratoriAccettati(accettati);
        setLavoratoriProposti(proposti);
        setLavoratoriRifiutati(rifiutati);
        
      })
      .catch((error) => console.log(error));
  };

  const mapLavoratori = (lavoratoriList) => {

    if(richiesta.lavoratoriaccettati !== richiesta.numeroPosizioniRichieste)
      return lavoratoriList.map((value) => (
      <Lavoratore
        id={value.id}
        nome={value.nome}
        cognome={value.cognome}
        sesso={value.sesso}
        datadinascita={value.datadinascita}
        nazionalita={value.nazionalita}
        statoid={value.statoid}
        email={value.email}
        telefono={value.telefono}
        isAgenzia={false}
        richiestaid={richiestaid}
        handleButtons={fetchLavoratori}
        updateRichiesta={fetch}
      />
    ));
    else{
      return lavoratoriList.map((value) => (
        <Lavoratore
          id={value.id}
          nome={value.nome}
          cognome={value.cognome}
          sesso={value.sesso}
          datadinascita={value.datadinascita}
          nazionalita={value.nazionalita}
          statoid={value.statoid}
          email={value.email}
          telefono={value.telefono}
          isAgenzia={false}
          richiestaid={richiestaid}
          handleButtons={fetchLavoratori}
          updateRichiesta={fetch}
          vediBottoni={false}
        />));
    }
  };

  const Modifica = (value) => {
    setModifica(value);
  };

  return (
    <div>
      {loading ? (
        <h2>Caricamento</h2>
      ) : (
        <div>
          {modifica ? (
            <ModificaRichiesta
              modifica={Modifica}
              updateRichieste={updateRichieste}
              agenziaRagioneSociale={richiesta.agenziaRagioneSociale}
              agenziaid={richiesta.agenziaid}
              alloggio={richiesta.alloggio}
              aziendaRagioneSociale={richiesta.aziendaRagioneSociale}
              aziendaid={richiesta.aziendaid}
              compenso={richiesta.compenso}
              comune={richiesta.comune}
              comuneid={richiesta.comuneid}
              provincia={richiesta.provincia}
              sigla_automobilistica={richiesta.sigla_automobilistica}
              createdat={richiesta.createdat}
              datafine={richiesta.dataFine}
              datainizio={richiesta.dataInizio}
              deletedat={richiesta.deletedat}
              descrizione={richiesta.descrizione}
              id={richiesta.id}
              note={richiesta.note}
              numeroposizionirichieste={richiesta.numeroPosizioniRichieste}
              statoiter={richiesta.statoiter}
              tipocontratto={richiesta.tipocontratto}
              tipocontrattoid={richiesta.tipoContrattoId}
              titolo={richiesta.titolo}
              trasporto={richiesta.trasporto}
              updatedat={richiesta.updatedat}
              vitto={richiesta.vitto}
              lingueRichiesta={lingue}
              patentiRichiesta={patenti}
              competenzeRichiesta={competenze}
              updateRichiesta={fetch}
            />
          ) : (
            <div className={style.main}>
              <div className={style.titolo}>
                <IconButton
                  size="large"
                  className={style.bottone}
                  onClick={handleClose}
                >
                  <HighlightOffIcon />
                </IconButton>

                <Typography variant="h3" component="div">
                  <Box fontWeight="fontWeightBold" m={1} fontFamily="Kreon">
                    {richiesta.titolo}
                  </Box>
                </Typography>
              </div>

              <div className={style.container}>
                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    Agenzia: {richiesta.agenziaRagioneSociale}
                  </Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    Telefono: {contattiAzienda.telefono}
                  </Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    Email: {contattiAzienda.email}
                  </Typography>
                </div>

                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    Descrizione {richiesta.descrizione}
                  </Typography>
                </div>

                

                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    {" "}
                    LINGUE RICHIESTE{" "}
                  </Typography>
                  <div className={style.array}>
                    {lingue.map((value, index) => {
                      return (
                        <Chip
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                          label={
                            value.descrizione.toUpperCase() +
                            " " +
                            value.livelloLinguistico
                          }
                          key={index}
                          color="primary"
                          variant="outlined"
                        ></Chip>
                      );
                    })}
                  </div>
                </div>
                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    PATENTI RICHIESTE{" "}
                  </Typography>
                  <div className={style.array}>
                    {patenti.map((value, index) => {

                      return (
                        <Chip
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                          label={value.siglaPatente}
                          color="primary"
                          variant="outlined"
                          key={index}
                        ></Chip>
                      );
                    })}
                  </div>
                </div>

                <div className={style.box}>
                  <Typography variant="h5" component="div">
                    COMPETENZE RICHIESTE{" "}
                  </Typography>
                  <div className={style.array}>
                    {competenze.map((value, index) => {
                      return (
                        <Chip
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                          label={value.descrizione}
                          color="primary"
                          variant="outlined"
                          key={index}
                        ></Chip>
                      );
                    })}
                  </div>
                </div>

                <div className={style.box}>
                  <Typography variant="h5">Data Inizio </Typography>
                  <Typography variant="h6">
                    {new Date(richiesta.dataInizio).getDate()}/
                    {new Date(richiesta.dataInizio).getMonth() + 1}/
                    {new Date(richiesta.dataInizio).getFullYear()}
                  </Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5">Data fine</Typography>
                  <Typography variant="h6">
                    {" "}
                    {new Date(richiesta.dataFine).getDate()}/
                    {new Date(richiesta.dataFine).getMonth() + 1}/
                    {new Date(richiesta.dataFine).getFullYear()}
                  </Typography>
                </div>

                
                <div className={style.box}>
                  <Typography variant="h5">
                    Tipologia di contratto: {richiesta.tipocontratto}
                  </Typography>
                </div>

                <div className={style.box}>
                  <Typography variant="h5">Vitto: {richiesta.vitto}</Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5">
                    Alloggio: {richiesta.alloggio}
                  </Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5">
                    Trasporto: {richiesta.trasporto}
                  </Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5">
                    Compenso: {richiesta.compenso}
                  </Typography>
                </div>
                <div className={style.box}>
                  <Typography variant="h5">
                    Numero posizioni richieste:{" "}
                    {richiesta.numeroPosizioniRichieste}
                  </Typography>
                </div>

                <div className={style.box}>
                  <Typography variant="h5">
                    Numero lavoratori accettati:{" "}
                    {richiesta.lavoratoriaccettati}
                  </Typography>
                </div>

                <div className={style.box}>
                  <Typography variant="h5">Note: {richiesta.note}</Typography>
                </div>

                {showAccettati ? (
                  <div>
                  <Typography variant="h5">Lavoratori Accettati:</Typography>
                    <div className={style.lavoratori}>
                      {mapLavoratori(lavoratoriAccettati)}
                    </div>
                  </div>
                ) : null}

                {showProposti ? (
                  <div>
                  <Typography variant="h5">Lavoratori Proposti:</Typography>
                    <div className={style.lavoratori}>
                      {mapLavoratori(lavoratoriProposti)}
                    </div>
                  </div>
                ) : null}

                {showRifiutati ? (
                  <div>
                  <Typography variant="h5">Lavoratori Rifiutati:</Typography>
                    <div className={style.lavoratori}>
                      {mapLavoratori(lavoratoriRifiutati)}
                    </div>
                  </div>
                ) : null}

                <div className={style.box}>
                  <Typography variant="h5">
                    Stato Richiesta: {richiesta.statoiter}
                  </Typography>
                </div>
                {isModificabile ? (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                    onClick={() => setModifica(true)}
                  >
                    Modifica
                  </Button>
                ) : null}
              </div>
            </div>
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default RichiestaInfo;
