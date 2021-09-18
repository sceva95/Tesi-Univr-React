import { useEffect, useState } from "react";
import stile from "../style/Agenzia.module.css";
import { database } from "../Axios";
import Unautenticated from "../components/Unautenticated";
import Header from "../components/Header";
import Richieste from "../components/agenzia/Richieste";
import Aziende from "../components/agenzia/Aziende";
import Dashboard from "../components/agenzia/Dashboard";
import CercaMatch from "../components/agenzia/CarcaMatch";
import SideMenu from "../components/agenzia/component/SideMenu";
import { Redirect, Link } from "react-router-dom";
import Amministra from "../components/agenzia/component/Amministra";
import Lavoratori from "../components/agenzia/Lavoratori";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Agenzia(props) {
  const [componentLoad, setComponentLoad] = useState("Dashboard");

  const [richiesta, setRichiesta] = useState();
  const [richieste, setRichieste] = useState([]);
  const [agenziaLoggata, setAgenziaLoggata] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [comune, setComune] = useState({ sigla: "", denominazione: "" });
  const [lavoratori, setLavoratori] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [contatore, setContatore] = useState();

  const [aziende, setAziende] = useState([]);

  //FUNZIONI

  //se l'utente è registrato faccio il render del componente
  //altrimenti render di loggarsi
  useEffect(() => {
    try {
      if (props.location.state.agenziaLoggata != null) {

        setAgenziaLoggata(props.location.state.agenziaLoggata);
        fetchData();
        fetchRichiesteStart();
        fetchLavoratori();
        fetchAziende();
        setIsLogged(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateAgenzia = () => {
    database.get(`/agenzia/read/${agenziaLoggata.id}`)
      .then((response) => {
        setAgenziaLoggata(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }

  const handleLogout = () => {
    props.location.state = null;
    setTimeout(() => {
      setRedirect(true);
    }, 500);
  };

  const handleChange = (componentToLoad) => {
    setComponentLoad(componentToLoad);
    fetchRichieste();
    fetchLavoratori();
    fetchAziende();
    changeComponent();
  };

  //update delle tabelle
  const update = (richieste) => {
    let accettate = 0;
    let archiviate = 0;
    let scadute = 0;

    for (let value in richieste) {
      //se la richiesta ha datainizio >= oggi e numero lavoratori richiesti = numero lavoratori accettati ===> Accettata
      if (new Date(richieste[value].dataInizio) > new Date()) {
        if (
          richieste[value].lavoratoriaccettati >=
          richieste[value].numeroPosizioniRichieste
        ) {
          database
            .post(`/richiesta/update/stato/notifica/${richieste[value].id}`, {
              statoiterid: 7,
              updatedat: new Date(),
            })
            .then((response) => {
              accettate = accettate + 1;
            });
        }
      } else {
        //se la richiesta ha datainizio < oggi e numero lavoratori richiesti = numero lavoratori accettati ===> Archiviata
        if (
          richieste[value].lavoratoriaccettati >=
          richieste[value].numeroPosizioniRichieste
        ) {
          database
            .post(`/richiesta/update/stato/${richieste[value].id}`, {
              statoiterid: 4,
              updatedat: new Date(),
            })
            .then((response) => {
              archiviate = archiviate + 1;
            });
        } else if (
          richieste[value].lavoratoriaccettati <
          richieste[value].numeroPosizioniRichieste
        ) {
          //se la richiesta ha datainizio < oggi e numero lavoratori richiesti < numero lavoratori accettati ===> Scaduta
          database
            .post(`/richiesta/update/stato/${richieste[value].id}`, {
              statoiterid: 6,
              updatedat: new Date(),
            })
            .then((response) => {
              scadute = scadute + 1;
            });
        }
      }
    }
    let result = accettate + archiviate + scadute;
    if (result !== 0) {
      setContatore(result);
      setOpenScanckbar(true);
    }
  };

  const [openScanckbar, setOpenScanckbar] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenScanckbar(false);
  };
  const snackBar = () => {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openScanckbar}
          autoHideDuration={3000}
          onClose={closeSnackBar}
          message="Accettata"
        >
          <Alert onClose={closeSnackBar} severity="info">
            Aggiornate {contatore} richieste!
          </Alert>
        </Snackbar>
      </div>
    );
  };

  const fetchRichiesteStart = () => {
    //ottengo tutte le richieste dell'agenzia loggata

    database
      .get(
        `/richiesta/read/all/completa/agenzia/${props.location.state.agenziaLoggata.id}`
      )
      .then((response) => {
        setRichieste(response.data);
        update(response.data);
      })
      .catch((error) => {
        console.log("errore richieste", error);
      });
  };

  //database getter

  const fetchData = () => {
    //Ottengo il comune
    database
      .get(`/comune/read/${props.location.state.agenziaLoggata.comuneid}`)
      .then((response) => {
        const data = response.data;
        setComune({
          sigla: data.sigla_automobilistica,
          denominazione: data.denominazione_italiana_e_straniera,
        });
      })
      .catch((error) => console.log("Agenzia-fetchdata-comune-error", error));
  };

  const fetchRichieste = () => {
    //ottengo tutte le richieste dell'agenzia loggata

    database
      .get(
        `/richiesta/read/all/completa/agenzia/${props.location.state.agenziaLoggata.id}`
      )
      .then((response) => {
        setRichieste(response.data);
      })
      .catch((error) => {
        console.log("errore richieste", error);
      });
  };

  const fetchLavoratori = () => {
    //ottengo tutte le richieste dell'agenzia loggata

    database
      .get(`/lavoratore/read/all/${props.location.state.agenziaLoggata.id}`)
      .then((response) => {
        console.log(response.data)
        setLavoratori(response.data);
      })
      .catch((error) => {
        console.log("errore richieste", error);
      });
  };

  const fetchAziende = () => {
    database
      .get(`/azienda/read/all/${props.location.state.agenziaLoggata.id}`)
      .then((response) => {
        setAziende(response.data);
      })
      .catch((error) => {
        console.log("errore aziende", error);
      });
  };

  //component changer

  const handleRichiesta = (richiesta) => {
    setRichiesta(richiesta);
    setComponentLoad(4);
  };

  const changeComponent = () => {
    if (componentLoad === "Dashboard") {
      return (
        <Dashboard
          agenziaLoggata={agenziaLoggata}
          comune={comune}
          lavoratoriImpegnati={lavoratoriImpegnati()}
          totaleLavoratori={lavoratori.length}
          nuoveOfferte={nuoveRichieste()}
          totaleOfferte={richieste.length}
          nuoveAziende={nuoveAziende()}
          totaleAziende={aziende.length - nuoveAziende()}
          updateAgenzia={updateAgenzia}
        />
      );
    } else if (componentLoad === "Richieste") {
      return (
        <Richieste
          richieste={richieste}
          isRIcevuta={true}
          isModificabile={false}
          isAgenzia={true}
          handleRichiesta={handleRichiesta}
          updateRichieste={fetchRichieste}
        />
      );
    } else if (componentLoad === "Aziende") {
      return <Aziende aziende={aziende} updateAziende={fetchAziende} />;
    } else if (componentLoad === "Lavoratori") {
      return (
        <Lavoratori
          lavoratori={lavoratori}
          updateLavoratori={fetchLavoratori}
        />
      );
    } else if (componentLoad === "Amministra") {
      return <Amministra agenziaLoggata={agenziaLoggata} />;
    } else if (componentLoad === 4) {
      return <CercaMatch richiestaid={richiesta} />;
    }
  };

  //contatori
  const lavoratoriImpegnati = () => {
    let result = 0;
    for (let value in lavoratori) {
      if (lavoratori[value].statoid === 2) result = result + 1;
    }
    return result;
  };

  const nuoveRichieste = () => {
    let result = 0;
    for (let value in richieste) {
      if (
        richieste[value].deletedat === null &&
        richieste[value].statoiter === "Creata" &&
        new Date(richieste[value].dataInizio) > new Date()
      )
        result = result + 1;
    }
    return result;
  };

  const nuoveAziende = () => {
    let result = 0;
    for (let value in aziende) {
      if (aziende[value].approved === null && aziende[value].deletedat === null)
        result = result + 1;
    }
    return result;
  };

  return (
    <div>
      <div className={stile.bg}></div>
      {redirect ? (
        <Redirect to="/" />
      ) : isLogged ? (
        <div>
          <div>
            <Header handleLogout={handleLogout} />
          </div>
          <div className={stile.container}>
            <div className={stile.sidemenu}>
              <SideMenu
                changeComponents={handleChange}
                nuoveAziende={nuoveAziende()}
                nuoveRichieste={nuoveRichieste()}
                lavoratoriAllocati={lavoratoriImpegnati()}
              />
            </div>

            <div className={stile.maincomponent}>{changeComponent()}</div>
          </div>
          {snackBar()}
        </div>
      ) : (
        <Unautenticated />)}
    </div>
  );
}

export default Agenzia;
