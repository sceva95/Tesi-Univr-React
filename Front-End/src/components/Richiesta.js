import { useState } from "react";
import style from "../style/Richiesta.module.css";
import RichiestaInfoAzienda from "./azienda/components/RichiestaInfoAzienda";
import RichiestaInfoAgenzia from "./agenzia/component/RichiestaInfoAgenzia";
import { Typography } from "@material-ui/core";
function Richiesta({
  isRicevuta,
  isModificabile,
  isAgenzia,
  profiloLavoratore,
  updateRichieste,
  handleRichiesta,

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
}) {
  const [show, setShow] = useState(false);

  const Extends = () => {
    setShow(!show);
  };

  const SetRagioneSociale = () => {
    if (isAgenzia) return aziendaRagioneSociale;
    else return agenziaRagioneSociale;
  };

  return (
    <div className={style.main}>
      <div onClick={() => Extends()}>
        <div className={style.container}>
          <div className={style.titolo}>
            <Typography variant="h3">{titolo.toUpperCase()}</Typography>
          </div>

          <div className={style.ragionesociale}>
            <Typography variant="h5">{SetRagioneSociale()}</Typography>
          </div>

          <div className={style.indirizzo}>
            <Typography variant="h6">
              Comune: {comune} {sigla_automobilistica}
            </Typography>
          </div>

          <div className={style.descrizioneText}>
            <Typography variant="h6">DESCRIZIONE</Typography>
            <div className={style.descrizione}>
              <Typography variant="p"> {descrizione}</Typography>
            </div>
          </div>

          <div className={style.dateVarie}>
            <div>
              <Typography variant="h6">
                Creata il : {new Date(createdat).getDate()}/
                {new Date(createdat).getMonth() + 1}/
                {new Date(createdat).getFullYear()}
              </Typography>
            </div>
         

          <Typography variant="h6">
            Scadenza: {new Date(datafine).getDate()}/
            {new Date(datafine).getMonth() + 1}/
            {new Date(datafine).getFullYear()}
          </Typography>
        </div>
        </div>
      </div>

      {show ? (
        isAgenzia ? (
          <RichiestaInfoAgenzia
            isRicevuta={isRicevuta}
            isModificabile={false}
            isAgenzia={true}
            profiloLavoratore={profiloLavoratore}
            updateRichieste={updateRichieste}
            handleRichiesta={handleRichiesta}
            agenziaRagioneSociale={agenziaRagioneSociale}
            agenziaid={agenziaid}
            alloggio={alloggio}
            aziendaRagioneSociale={aziendaRagioneSociale}
            aziendaid={aziendaid}
            compenso={compenso}
            comune={comune}
            createdat={createdat}
            datafine={datafine}
            datainizio={datainizio}
            deletedat={deletedat}
            descrizione={descrizione}
            id={id}
            note={note}
            numeroposizionirichieste={numeroposizionirichieste}
            statoiter={statoiter}
            tipocontratto={tipocontratto}
            titolo={titolo}
            trasporto={trasporto}
            updatedat={updatedat}
            vitto={vitto}
            sigla_automobilistica={sigla_automobilistica}
          />
        ) : (
          <RichiestaInfoAzienda
            isRicevuta={isRicevuta}
            isModificabile={isModificabile}
            isAgenzia={isAgenzia}
            updateRichieste={updateRichieste}
            agenziaRagioneSociale={agenziaRagioneSociale}
            agenziaid={agenziaid}
            alloggio={alloggio}
            aziendaRagioneSociale={aziendaRagioneSociale}
            aziendaid={aziendaid}
            compenso={compenso}
            comune={comune}
            comuneid={comuneid}
            provincia={provincia}
            sigla_automobilistica={sigla_automobilistica}
            createdat={createdat}
            datafine={datafine}
            datainizio={datainizio}
            deletedat={deletedat}
            descrizione={descrizione}
            id={id}
            note={note}
            numeroposizionirichieste={numeroposizionirichieste}
            statoiter={statoiter}
            tipocontratto={tipocontratto}
            tipocontrattoid={tipocontrattoid}
            titolo={titolo}
            trasporto={trasporto}
            updatedat={updatedat}
            vitto={vitto}
          />
        )
      ) : null}
    </div>
  );
}

export default Richiesta;
