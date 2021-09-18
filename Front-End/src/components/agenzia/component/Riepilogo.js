import style from "../../../style/azienda/Riepilogo.module.css";

function Riepilogo({
  lavoratoriImpegnati,
  totaleLavoratori,
  nuoveOfferte,
  totaleOfferte,
  nuoveAziende,
  totaleAziende
}) {
  return (
    <div className={style.container}>
      <div >
        <label> Nuove Offerte</label>
        <h3>{nuoveOfferte}</h3>
      </div>

      <div >
        <label>Totale Offerte</label>
        <h3>{totaleOfferte}</h3>
      </div>

      <div>
        <label>Totale Lavoratori</label>
        <h3>{totaleLavoratori}</h3>
      </div>

      <div >
        <label>Lavoratori Impegnati</label>
        <h3>{lavoratoriImpegnati}</h3>
      </div>

      <div >
        <label>Aziende da Approvare</label>
        <h3>{nuoveAziende}</h3>
      </div>

      <div >
        <label>Aziende Registrate</label>
        <h3>{totaleAziende}</h3>
      </div>
    </div>
  );
}

export default Riepilogo;
