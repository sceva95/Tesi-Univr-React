import style from '../../../style/azienda/Riepilogo.module.css'

function Riepilogo({ aperte, attesa }) {
  return (
    <div className={style.container}>
      <div>
        <h2>Richieste Aperte</h2> 
        <h3>{aperte}</h3>
      </div>

      <div>
        <h2>Richieste in Attesa</h2>
        <h3>{attesa}</h3>
      </div>
    </div>
  );
}

export default Riepilogo;
