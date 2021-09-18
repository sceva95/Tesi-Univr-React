import { useEffect, useState } from "react";
import style from "../../../style/RichiestaInfo.module.css";
import Lavoratore from "../../Lavoratore";
import { database } from "../../../Axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Chip,
  Typography,
  Card,
  Paper,
  IconButton, Box
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { gridSelectionStateSelector } from "@material-ui/data-grid";

function RichiestaInfo({ richiestaid, handleClose }) {
  const [contattiAzienda, setContattiAzienda] = useState({});
  const [loading, setLoading] = useState(false);
  const [richiesta, setRichiesta] = useState({});
  const [showAccettati, setShowAccettati] = useState(false);
  const [showProposti, setShowProposti] = useState(false);
  const [showRifiutati, setShowRifiutati] = useState(false);
  const [lavoratoriAccettati, setLavoratoriAccettati] = useState([]);
  const [lavoratoriProposti, setLavoratoriProposti] = useState([]);
  const [lavoratoriRifiutati, setLavoratoriRifiutati] = useState([]);
  const [lingue, setLingue] = useState([]);
  const [patenti, setPatenti] = useState([]);
  const [competenze, setCompetenze] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRichiesta();
    Lingua();
    Patente();
    Competenze();

    fetchLavoratori();
    setLoading(false);
  }, []);

  const fetchRichiesta = async () => {
    await database
      .get(`/richiesta/read/completa/${richiestaid}`)
      .then((response) => {
       
        const data = response.data;
        setRichiesta(data);

        fetchContattiAzienda(data.aziendaid);
      })
      .catch((error) => console.log(error));
  };

  //prendo la lista delle lingue tramite linguaRichiesta con Richiestaid
  const Lingua = async () => {
    await database
      .get(`linguarichiesta/read/completa/${richiestaid}`)
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
        const result = [];
        response.data.map((value) => result.push(value.id.patente));
        setPatenti(result);
      })
      .catch((error) => console.log(error));
  };

  //prendo la lista delle competenze richieste
  const Competenze = async () => {
    await database
      .get(
        `/richiestacompetenza/read/completa/${richiestaid}`
      )
      .then((response) => {
        setCompetenze(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchLavoratori = async () => {
    await database
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
        isAgenzia={true}
      />
    ));
  };

  const fetchContattiAzienda = (aziendaid) => {
    database
      .get(`/azienda/read/${aziendaid}`)
      .then(async (response) => {
        await setContattiAzienda(response.data);
        
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {loading ? null : (
        <div className={style.main}>

        <div className={style.titolo}>
        <IconButton
            size="large"
            className={style.bottone}
            onClick={handleClose}
          >
            <HighlightOffIcon />
          </IconButton>
          <Typography variant="h3" component="div" >
          <Box fontWeight="fontWeightBold" m={1} fontFamily="Kreon">
              {richiesta.titolo}
              </Box>
            </Typography>
        </div>
          

         
        <div className={style.container}>
          
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Azienda: {richiesta.aziendaRagioneSociale}
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
        
            <div className={style.box}>
              <Typography variant="h5" component="div">
                PATENTI RICHIESTE{" "}
              </Typography>
              
                {patenti.map((value, index) => {
                  return (
                    <Chip
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                      label={value}
                      color="primary"
                      variant="outlined"
                      key={index}
                    ></Chip>
                  );
                })}
            
            </div>

            <div className={style.box}>
              <Typography variant="h5" component="div">
                COMPETENZE RICHIESTE{" "}
              </Typography>
           
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
                Compenso: {richiesta.compenso}
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
              Numero posizioni richieste: {richiesta.numeroPosizioniRichieste}
            </Typography>
          </div>

          <div className={style.box}>
                  <Typography variant="h5">
                    Numero lavoratori accettati:{" "}
                    {richiesta.lavoratoriaccettati}
                  </Typography>
                </div>
          
            <div className={style.box}>
              <Typography variant="h5">Note: {richiesta.note} </Typography>
            </div>
          
         

          {showAccettati ? (
            <div>
              <h3>Lavoratori Accettati:</h3>
              <div className={style.lavoratori}>
                {mapLavoratori(lavoratoriAccettati)}
              </div>
            </div>
          ) : null}

          {showProposti ? (
            <div>
              <h3>Lavoratori Proposti:</h3>
              <div className={style.lavoratori}>
                {mapLavoratori(lavoratoriProposti)}
              </div>
            </div>
          ) : null}

          {showRifiutati ? (
            <div>
              <h3>Lavoratori Rifiutati:</h3>
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
        </div>
        <div className={style.footer}></div>
        </div>
        
      )}
      
    </div>
  );
}

export default RichiestaInfo;
