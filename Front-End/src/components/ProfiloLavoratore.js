import { database } from "../Axios";
import { useEffect, useState } from "react";
import style from "../style/Profilolavoratore.module.css";
import { Chip, Typography, Box, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function ProfiloLavoratore({ lavoratoreid, handleClose }) {
  const [lavoratore, setLavoratore] = useState();
  const [loading, setLoading] = useState(false);
  const [competenze, setCompetenze] = useState([]);
  const [lingue, setLingue] = useState([]);
  const [patenti, setPatenti] = useState([]);

  useEffect(() => {
    fetchLavoratore();
    fetchCompetenze();
    fetchLingue();
    fetchPatenti();
  }, []);

  const fetchLavoratore = async () => {
    await database
      .get(`/lavoratore/read/completo/${lavoratoreid}`)
      .then((response) => {

        setLavoratore(response.data[0]);
        setLoading(true);
      })
      .catch((error) => console.log(error));
  };

  const fetchPatenti = () => {
    database
      .get(`/patentelavoratore/read/all/patenti/${lavoratoreid}`)
      .then((response) => {
        setPatenti(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchLingue = () => {
    database
      .get(`/lingualavoratore/read/all/lingue/${lavoratoreid}`)
      .then((response) => {
        setLingue(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchCompetenze = () => {
    database
      .get(`/lavoratorecompetenza/read/all/competenze/${lavoratoreid}`)
      .then((response) => {
        setCompetenze(response.data);
      })
      .catch((error) => console.log(error));
  };

  const stato = () => {
    if (!lavoratore.statoid) return "Da Allocare";
    else
      switch (lavoratore.statoid) {
        case 1:
          return "Da Allocare";
        case 2:
          return "Allocato";
        case 3:
          return "In trattativa";
      }
  };

  return (
    <div>
      {loading ? (
        <div className={style.main}>
          <div className={style.titolo}>
            <IconButton
              size="medium"
              className={style.bottone}
              onClick={handleClose}
            >
              <HighlightOffIcon />
            </IconButton>
            <Typography variant="h3" component="div">
              <Box fontWeight="fontWeightBold" m={1} fontFamily="Kreon">
                PROFILO: {lavoratoreid}
              </Box>
            </Typography>
          </div>

          <div className={style.container}>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Nome: {lavoratore.nome} {lavoratore.cognome}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Sesso: {lavoratore.sesso}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Indirizzo: {lavoratore.indirizzo} {lavoratore.comune}{" "}
                {lavoratore.siglaautomobilistica}{" "}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Data di Nascita: {new Date(lavoratore.datadinascita).getDate()}-{new Date(lavoratore.datadinascita).getMonth() + 1}-{new Date(lavoratore.datadinascita).getFullYear()}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Nazionalità: {lavoratore.nazionalita}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Status Giuridico: {lavoratore.statusgiuridico}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Codice Fiscale: {lavoratore.codicefiscale}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Stato: {stato()}
              </Typography>
            </div>
            <div className={style.box}>
              <Typography variant="h5" component="div">
                Competenze
              </Typography>

              {competenze.map((value) => (
                <Chip
                  style={{ marginRight: "5px", marginBottom: "5px" }}
                  label={value}
                  color="primary"
                  variant="outlined"
                ></Chip>
              ))}
</div>
              <div className={style.box}>
                <Typography variant="h5" component="div">
                  Lingue
                </Typography>

                {lingue.map((value) => (
                  <Chip
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                    label={
                      value.descrizione.toUpperCase() +
                      " " +
                      value.livelloLinguistico
                    }
                    color="primary"
                    variant="outlined"
                  >
                    {" "}
                  </Chip>
                ))}
              </div>

              <div className={style.box}>
                <Typography variant="h5" component="div">
                  Patenti
                </Typography>

                {patenti.map((value) => (
                  <Chip
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                    label={value}
                    color="primary"
                    variant="outlined"
                  ></Chip>
                ))}
              </div>

              <div className={style.box}>
                <Typography variant="h5" component="div">
                  Email: {lavoratore.email}
                </Typography>
              </div>
              <div className={style.box}>
                <Typography variant="h5" component="div">
                  Telefono: {lavoratore.telefono}
                </Typography>
              </div>
              </div>
            </div>
          
        
      ) : null}
    </div>
  );
}

export default ProfiloLavoratore;
