import { useEffect, useState } from "react";
import { database } from "../../Axios";
import style from "../../style/agenzia/Cercamatch.module.css";
import {
  Button,
  Chip,
  CircularProgress,
  Icon,
  IconButton,
} from "@material-ui/core";
import Lavoratore from "../Lavoratore";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function CercaMatch({ richiestaid, handleClose, handleProponi }) {
  const [richiesta, setRichiesta] = useState({});
  const [lingue, setLingue] = useState([]);
  const [patenti, setPatenti] = useState([]);
  const [competenze, setCompetenze] = useState([]);
  const [lavoratori, setLavoratori] = useState([]);
  const [lavoratoriPerfetti, setLavoratoriPerfetti] = useState([]);
  const [lavoratoriRimanenti, setlavoratoriRimanenti] = useState([]);
  const [vediLavoratori, setVediLavoratori] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAccettati, setShowAccettati] = useState(false);
  const [showProposti, setShowProposti] = useState(false);
  const [showRifiutati, setShowRifiutati] = useState(false);
  const [lavoratoriAccettati, setLavoratoriAccettati] = useState([]);
  const [lavoratoriProposti, setLavoratoriProposti] = useState([]);
  const [lavoratoriRifiutati, setLavoratoriRifiutati] = useState([]);
  const [contattiAzienda, setContattiAzienda] = useState({});

  useEffect(() => {
    getRichiesta();
    Lingua();
    Patente();
    Competenze();
  }, []);

  const getRichiesta = async () => {
    await database
      .get(`/richiesta/read/completa/${richiestaid}`)
      .then((response) => {
        setRichiesta(response.data);
        fetchContattiAzienda(response.data.aziendaid);
        fetchLavoratori();
      });
  };

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
        const result = [];
        response.data.map((value) => result.push(value.id.patente));
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

  const fetchContattiAzienda = (aziendaid) => {
    database
      .get(`/azienda/read/${aziendaid}`)
      .then(async (response) => {
        await setContattiAzienda(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCerca = () => {
    cercaMatch();
    setVediLavoratori(!vediLavoratori);
  };

  const scoreRichiesta = () => {
    let score = 0;
    score = score + patenti.length;
    score = score + lingue.length;
    for (let competenza in competenze) {
      score = score + competenze[competenza].priorita * 0.2;
    }
    return score;
  };

  const cercaMatch = async () => {
    //prendo lista lavoratori non occupati
    setLoading(true);
    let lavoratori = [];
    let lavoratoriMigliori = [];
    let lavoratoriPeggiori = [];

    let scoreMax = scoreRichiesta();
    await database
      .get(`/lavoratore/read/non/occupati/${richiesta.agenziaid}`)
      .then((response) => response.data.map((value) => lavoratori.push(value)))
      .catch((error) => console.log(error));

    for (let lavoratore in lavoratori) {
      let patentiLavoratore = [];
      let lingueLavoratore = [];
      let competenzeLavoratore = [];
      if (scoreMax !== 0) {
        //prendo lista patenti, lingue e competenze per lavoratore
        await database
          .get(`/lingualavoratore/read/all/${lavoratori[lavoratore].id}`)
          .then((response) =>
            response.data.map((value) => lingueLavoratore.push(value))
          )
          .catch((error) => console.log(error));
        await database
          .get(`/patentelavoratore/read/all/${lavoratori[lavoratore].id}`)
          .then((response) =>
            response.data.map((value) => patentiLavoratore.push(value))
          )
          .catch((error) => console.log(error));
        await database
          .get(`lavoratorecompetenza/read/all/${lavoratori[lavoratore].id}`)
          .then((response) =>
            response.data.map((value) => competenzeLavoratore.push(value))
          )
          .catch((error) => console.log(error));

        let score = 0;
        //controllo con la richiesta e calcolo lo score

        //controllo patenti, assegno 1 punto per ogni patente richiesta che il lavoratore possiede
        for (let patente in patenti) {
          for (let patenteLavoratore in patentiLavoratore) {
            if (
              patentiLavoratore[patenteLavoratore].id.patente ===
              patenti[patente]
            )
              score = score + 1;
          }
        }

        //controllo competenze, assegno 0.2 punti per ogni competenza posseduta in base alla priorità
        for (let competenza in competenze) {
          for (let competenzaLavoratore in competenzeLavoratore) {
            if (
              competenzeLavoratore[competenzaLavoratore].lavoratoreCompetenzaId
                .competenzaid === competenze[competenza].id
            ) {
              score = score + competenze[competenza].priorita * 0.2;
            }
          }
        }

        //controllo lingue, assegno 1 punto per ogni lingua richiesta che il lavoratore possiede, considerando che un livello linguistico A1 ammette anche A2, B e C
        for (let lingua in lingue) {
          for (let linguaLavoratore in lingueLavoratore) {
            if (
              lingueLavoratore[linguaLavoratore].id.linguaid ===
                lingue[lingua].id &&
              lingueLavoratore[linguaLavoratore].livelloLinguisticoRichiesto >=
                lingue[lingua].livelloLinguistico
            ) {
              score = score + 1;
            }
          }
        }
        if (score !== 0) {
          score = Math.round((score * 10) / scoreRichiesta());
        } else {
          score = 0;
        }

        //aggiungo lo score per ogni lavoratore
        lavoratori[lavoratore].score = score;
        //aggiungo lingue
        lavoratori[lavoratore].lingue = lingueLavoratore;
        //aggiungo patenti
        lavoratori[lavoratore].patenti = patentiLavoratore;
        //aggiungo competenze
        lavoratori[lavoratore].competenze = competenzeLavoratore;
        if (score >= scoreMax / 2)
          lavoratoriMigliori.push(lavoratori[lavoratore]);
        else lavoratoriPeggiori.push(lavoratori[lavoratore]);
      } else {
        lavoratori[lavoratore].score = 0;

        lavoratoriMigliori.push(lavoratori[lavoratore]);
      }
    }

    //ordino la lista in base allo score dal più alto al più basso

    await lavoratoriMigliori.sort(function compare(a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });

    await lavoratoriPeggiori.sort(function compare(a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });

    setLavoratoriPerfetti(lavoratoriMigliori);
    setlavoratoriRimanenti(lavoratoriPeggiori);
    setLoading(false);
  };

  const [value, setValue] = React.useState(0);

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

  const mapLavoratoriMatch = (lavoratoriList) => {
    return lavoratoriList.map((value) => {
      if (!lavoratori.some((lavoratore) => lavoratore.id === value.id)) {
        return (
          <Lavoratore
            id={value.id}
            nome={value.nome}
            cognome={value.cognome}
            sesso={value.sesso}
            datadinascita={value.dataDiNascita}
            nazionalita={value.nazionalita}
            statoid={value.statoid}
            email={value.email}
            telefono={value.telefono}
            isAgenzia={true}
            richiestaid={richiestaid}
            isCercaMatch={true}
            score={value.score}
            handleButtons={fetchLavoratori}
            handleProponi={handleProponi}
          />
        );
      }
    });
  };

  const mapLavoratori = (lavoratoriList) => {
    return lavoratoriList.map((value) => {
      return (
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
          richiestaid={richiestaid}
          isCercaMatch={false}
          score={value.score}
        />
      );
    });
  };

  const fetchLavoratori = async () => {
    await database
      .get(`/lavoratore/read/lavoratoreproposto/${richiestaid}`)
      .then((response) => {
        const accettati = [];
        const proposti = [];
        const rifiutati = [];
        const lavoratori = [];
        response.data.map((value) => {
          lavoratori.push(value);
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
        setLavoratori(lavoratori);
      })
      .catch((error) => console.log(error));
  };

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
          <Typography variant="h5">Compenso: {richiesta.compenso}</Typography>
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
          <Typography variant="h5">Alloggio: {richiesta.alloggio}</Typography>
        </div>
        <div className={style.box}>
          <Typography variant="h5">Trasporto: {richiesta.trasporto}</Typography>
        </div>

        <div className={style.box}>
          <Typography variant="h5">
            Numero posizioni richieste: {richiesta.numeroPosizioniRichieste}
          </Typography>
        </div>

        <div className={style.box}>
          <Typography variant="h5">Note: {richiesta.note} </Typography>
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
      </div>

      <div className={style.bottoni}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCerca()}
        >
          Cerca Lavoratori
        </Button>
      </div>

      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : vediLavoratori ? (
        <div className={style.container} style={{ marginTop: "2px" }}>
          <Typography variant="h6">
            La lista seguente è stata valutata in base alle competenze, lingue e
            patenti della richiesta. I profili seguenti sono ordinati in base
            alla migliore scelta possibile.
          </Typography>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Lavoratori Consigliati" {...a11yProps(0)} />
              <Tab label="Lavoratori Rimanenti" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className={style.lavoratori}>
                {mapLavoratoriMatch(lavoratoriPerfetti)}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className={style.lavoratori}>
                {mapLavoratoriMatch(lavoratoriRimanenti)}
              </div>
            </TabPanel>
          </SwipeableViews>
        </div>
      ) : null}
    </div>
  );
}

export default CercaMatch;

/**/
