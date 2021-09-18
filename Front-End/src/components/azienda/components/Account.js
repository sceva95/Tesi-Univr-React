import style from "../../../style/azienda/Account.module.css";
import { Button, Avatar, TextField, InputLabel } from "@material-ui/core";
import { useState } from "react";
import { database } from "../../../Axios";
function Account({
  id,
  ragioneSociale,
  partitaIva,
  indirizzo,
  comune,
  provincia,
  cap,
  telefono,
  email,
  urlsito,
  settoreAttivita,
  approved,
  createdat,
  username,
  updateAgenzia

}) {


  const [readOnly, setReadOnly] = useState(true);

  const [ragioneSocialeState, setRagioneSociale] = useState(ragioneSociale);
  const [partitaIvaState, setPartitaIva] = useState(partitaIva);
  const [emailState, setEmail] = useState(email);
  const [telefonoState, setTelefono] = useState(telefono);
  const [urlSitoState, setUrlSito] = useState(urlsito);

  const validate = () => {
    if (
      emailState === "" ||
      telefonoState === "" ||
      urlSitoState === ""
    )
      return false;
    else return true;
  };

  const salva = () => {
    if (validate()) {
      database
        .post(`/azienda/update/${id}`, {
         
          email: emailState,
          telefono: telefonoState,
          urlsito: urlSitoState,
          updatedat: new Date()
        })
        .then((response) => {
          console.log(response)
          updateAgenzia()
        })
        .catch((error) => console.log(error));
    }
    setReadOnly(true);
  };

  const annulla = () => {
    setEmail(email);
    setTelefono(telefono);
    setUrlSito(urlsito);
    setReadOnly(true);
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <Avatar className={style.avatar}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <h2>{username}</h2>
        <div className={style.settore}>
          <h2>Settore Attivita: </h2>
          <TextField
            value={settoreAttivita.toUpperCase()}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
        </div>

        <h3>
          {indirizzo}, {comune}, {provincia}
        </h3>
      </div>
      <div className={style.dati}>
        <div className={style.informazioni}>
          <h2>Ragione Sociale</h2>
          <TextField
            variant="outlined"
            value={ragioneSocialeState}
            onChange={(e) => setRagioneSociale(e.target.value)}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
        </div>

        <div className={style.informazioni}>
          <h2>Partita Iva</h2>
          <TextField
            variant="outlined"
            value={partitaIvaState}
            onChange={(e) => setPartitaIva(e.target.value)}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
        </div>

        <div className={style.informazioni}>
          <h2>Sito</h2>
          <TextField
            variant="outlined"
            value={urlSitoState}
            onChange={(e) => setUrlSito(e.target.value)}
            InputProps={{
              readOnly: readOnly,
            }}
          ></TextField>
        </div>

        <div className={style.informazioni}>
          <h2>Email</h2>
          <TextField
            variant="outlined"
            value={emailState}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            InputProps={{
              readOnly: readOnly,
            }}
          ></TextField>
        </div>

        <div className={style.informazioni}>
          <h2>Telefono</h2>
          <TextField
            variant="outlined"
            value={telefonoState}
            onChange={(e) => setTelefono(e.target.value)}
            InputProps={{
              readOnly: readOnly,
            }}
          ></TextField>
        </div>

        <div>
          {readOnly ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setReadOnly(false)}
            >
              Modifica
            </Button>
          ) : (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => salva()}
              >
                Salva
              </Button>
              <Button
                variant="contained"
                style={{ color: "white", backgroundColor: "red" }}
                onClick={() => annulla()}
              >
                Annulla
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
