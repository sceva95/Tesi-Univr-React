import stile from "../style/Azienda.module.css";

import Dashboard from "../components/azienda/Dashboard";
import InserisciOfferta from "../components/azienda/InserisciOfferta";
import SideMenu from "../components/azienda/components/SideMenu";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { database } from "../Axios";
import { Redirect } from "react-router-dom";
import Richieste from "../components/azienda/Richieste";
import Unautenticated from "../components/Unautenticated";


function Azienda(props) {
  const [componentLoad, setComponentLoad] = useState("Dashboard");
  const [isLogged, setIsLogged] = useState(false);
  const [comune, setComune] = useState({ sigla: "", denominazione: "" });
  const [settoreAttivita, setSettoreAttivita] = useState("");
  const [richieste, setRichieste] = useState([]);
  const [aziendaLoggata, setAziendaLoggata] = useState();
  const [redirect, setRedirect] = useState(false);

  //FUNZIONI

  //se l'utente è registrato faccio il render del componente
  //altrimenti render di loggarsi
  useEffect(async () => {
    try {
      if (props.location.state.aziendaLoggata != null) {
        await setAziendaLoggata(props.location.state.aziendaLoggata);
        await setIsLogged(true);
        fetchData();
        fetchRichieste();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //funzione per ottenere comune e settore attivita dal database
  const fetchData = () => {
    //Ottengo il comune

    database
      .get(`/comune/read/${props.location.state.aziendaLoggata.comuneid}`)
      .then((response) => {
        const data = response.data;
        setComune({
          sigla: data.sigla_automobilistica,
          denominazione: data.denominazione_italiana_e_straniera,
        });
      })
      .catch((error) => console.log("Azienda-fetchdata-comune-error", error));

    //ottengo settore attivita
    database
      .get(
        `/settoreattivita/read/${props.location.state.aziendaLoggata.settoreattivitaid}`
      )
      .then((response) => {
        const data = response.data;
        setSettoreAttivita(data.descrizione);
      })
      .catch((error) =>
        console.log("Azienda-Fetchdata-settoreattivita-error", error)
      );
  };

  const fetchRichieste = () => {
    //ottengo tutte le richieste dell'azienda loggata

    database
      .get(
        `/richiesta/read/all/completa/azienda/${props.location.state.aziendaLoggata.id}`
      )
      .then((response) => {
        setRichieste(response.data);
      })
      .catch((error) => {
        console.log("Azienda-FetchRichieste", error);
      });
  };

  const handleChange = (componentToLoad) => {
    setComponentLoad(componentToLoad);
    fetchRichieste();
    changeComponent();
  };

  const handleLogout = () => {
    props.location.state = null;
    setTimeout(() => { setRedirect(true) }, 500);
  }


  const RichiesteModificabili = () => {
    const result = [];
    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Creata" &&
        richieste[value].deletedat === null
      ) {
        result.push(richieste[value]);
      }
    }

    return result;
  };

  const RichiesteEliminate = () => {
    const result = [];
    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Cancellata" &&
        richieste[value].deletedat != null
      ) {
        result.push(richieste[value]);
      }
    }

    return result;
  };

  const RichiesteInAttesa = () => {
    const result = [];
    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Presa in carico" &&
        richieste[value].deletedat === null
      )
        result.push(richieste[value]);
    }
    return result;
  };

  const ProposteRIcevute = () => {
    const result = [];
    const today = new Date();

    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Profili inviati" &&
        richieste[value].deletedat === null && new Date(richieste[value].dataInizio) > today

      ) {
        result.push(richieste[value]);

      }
    }

    return result;
  };

  const RichiesteScadute = () => {
    const result = [];
    for (let value in richieste) {
      if (
        (richieste[value].statoiter === "Archiviata" ||
          richieste[value].statoiter === "Scaduta" ||
          richieste[value].datafine < new Date()) &&
        richieste[value].deletedat != null
      )
        result.push(richieste[value]);
    }
    return result;
  };

  //contatori
  const richiesteModificabiliCount = () => {
    let result = 0;
    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Creata" &&
        richieste[value].deletedat === null
      ) {
        result = result + 1;
      }
    }

    return result;
  };

  const richiesteInAttesaCount = () => {
    let result = 0;
    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Presa in carico" &&
        richieste[value].deletedat === null
      )
        result = result + 1;
    }
    return result;
  };

  const proposteRicevuteCount = () => {
    let result = 0;
    for (let value in richieste) {
      if (
        (richieste[value].statoiter === "Profili inviati" || richieste[value].statoiter === "Presa in carico") &&
        richieste[value].deletedat === null
      ) {
        result = result + 1;
      }
    }

    return result;
  };

  const richiesteScaduteCount = () => {
    let result = 0;
    let today = new Date();
    for (let value in richieste) {
      if (
        richieste[value].datafine <= today &&
        richieste[value].deletedat != null
      ) {
        result = result + 1;
      }
    }

    return result;
  };

  const richiesteEliminateCount = () => {
    let result = 0;
    for (let value in richieste) {
      if (
        richieste[value].statoiter === "Cancellata" &&
        richieste[value].deletedat != null
      ) {
        result = result + 1;
      }
    }

    return result;
  };

  const updateAzienda = () => {
    database.get(`/azienda/read/${aziendaLoggata.id}`)
      .then((response) => {
        setAziendaLoggata(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }


  //cambia component in base al bottone premuto del menu
  const changeComponent = () => {
    if (componentLoad === "Dashboard") {
      return (
        <Dashboard
          aziendaLoggata={aziendaLoggata}
          comune={comune}
          settoreAttivita={settoreAttivita}
          richiesteAperte={richieste.length}
          richiesteInAttesa={richiesteInAttesaCount()}
          updateAzienda={updateAzienda}
        />
      );
    } else if (componentLoad === "Richieste") {
      return (
        <Richieste

          richieste={richieste}

          updateRichieste={fetchRichieste}

        />
      );

    } else if (componentLoad === "Inserisci") {
      return (
        <InserisciOfferta
          aziendaLoggata={aziendaLoggata}
          updateRichieste={fetchRichieste}
        />
      );
    }
  };

  return (
    <div>
      <div className={stile.bg}></div>
      {redirect ? <Redirect to="/" /> : isLogged ? (
        <div>
          {" "}
          <div>
            <Header handleLogout={handleLogout} />
          </div>
          <div className={stile.container}>
            <div className={stile.sidemenu}>
              <SideMenu
                changeComponents={handleChange}
                richiesteModificabili={richiesteModificabiliCount()}
                richiesteInAttesa={richiesteInAttesaCount()}
                proposteRicevute={proposteRicevuteCount()}
                richiesteScadute={richiesteScaduteCount()}
                richiesteEliminate={richiesteEliminateCount()}
              />
            </div>
            <div className={stile.maincomponent}>{changeComponent()}</div>
          </div>{" "}
        </div>
      ) : (
        <Unautenticated />
      )}
    </div>
  );
}

export default Azienda;
