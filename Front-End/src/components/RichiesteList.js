import Richiesta from "./Richiesta";
import style from "../style/RichiesteList.module.css";
import { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';

function RichiesteList({
  richieste,
  
  isAgenzia,
  profiloLavoratore,
  updateRichieste,
  handleRichiesta
}) {

  const IsRicevuta = (richiesta) => {
    if (richiesta.statoiter != "Creata") {
      return true;
    }
    return false;
  };

  const IsModificabile = (richiesta) => {
    if (richiesta.statoiter === "Creata" && !isAgenzia) return true;
    else return false;
  };

  const mappa = () => {
    return richieste.map((value) => {
      return (
        <div>
          <Richiesta
            isRicevuta={IsRicevuta(value)}
            key={value.id}
            isModificabile={IsModificabile(value)}
            isAgenzia={isAgenzia}
            handleRichiesta={handleRichiesta}
            profiloLavoratore={profiloLavoratore}
            updateRichieste={updateRichieste}
            agenziaRagioneSociale={value.agenziaRagioneSociale}
            agenziaid={value.agenziaid}
            alloggio={value.alloggio}
            aziendaRagioneSociale={value.aziendaRagioneSociale}
            aziendaid={value.aziendaid}
            compenso={value.compenso}
            comune={value.comune}
            comuneid={value.comuneid}
            provincia={value.provincia}
            sigla_automobilistica={value.sigla_automobilistica}
            createdat={value.createdat}
            datafine={value.dataFine}
            datainizio={value.dataInizio}
            deletedat={value.deletedat}
            descrizione={value.descrizione}
            id={value.id}
            note={value.note}
            numeroposizionirichieste={value.numeroPosizioniRichieste}
            statoiter={value.statoiter}
            tipocontratto={value.tipocontratto}
            tipocontrattoid={value.tipoContrattoId}
            titolo={value.titolo}
            trasporto={value.trasporto}
            updatedat={value.updatedat}
            vitto={value.vitto}
          />
        </div>
      );
    });
  };

  return (
    <div className={style.container}>
      

      <div className={style.richieste}>{mappa()}</div>
    </div>
  );
}

export default RichiesteList;
