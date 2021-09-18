import { useState, useEffect } from "react";

import style from "../style/Home.module.css";
import Login from "../components/Login";
import Typography from '@material-ui/core/Typography';




function Home({}) {


  return (
    <div className={style.container}>
    <div className={style.bg}></div>
    <div className={style.title}>
    <Typography variant="h1" component="div">Benvenuto</Typography>
    <Typography variant="subtitle1" component="div">Effettua il Login oppure Registrati se ancora non sei registrato</Typography>

    </div>
    

      <div >
        <Login />
      </div>

     

      <div></div>
    </div>
  );
}

export default Home;
