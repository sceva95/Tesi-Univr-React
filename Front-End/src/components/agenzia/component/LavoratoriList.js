import { useState } from 'react';
import style from '../../../style/RichiesteList.module.css'
import Lavoratore from '../../Lavoratore'





function Lavoratori ({lavoratori, title,  profiloLavoratore, isAgenzia}) {

  const [lavoratoriList, setLavoratoriList] = useState(lavoratori);
  const [lavoratoriListFilter, setLavoratoriListFilter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);


    const filtraPerSesso = (sesso) => {
      let result = [];
      if(sesso === "Tutti"){
        setIsFilter(false);
       
      }else{
        setIsFilter(true);
        
      for(let value in lavoratoriList){
        if(lavoratoriList[value].sesso === sesso )
          result.push(lavoratoriList[value])
      }
      setLavoratoriListFilter(result)
    }
    }

    const filtraPerStato = (stato) => {

      let result = [];
      if(stato === "0"){
        setIsFilter(false);
       
      }else{
        setIsFilter(true);
        
      for(let value in lavoratoriList){
        if(stato==="1" && (!lavoratoriList[value].statoid || lavoratoriList[value].statoid === parseInt(stato)))
          result.push(lavoratoriList[value])
        else if(lavoratoriList[value].statoid === parseInt(stato)  )
          result.push(lavoratoriList[value])
      }
      setLavoratoriListFilter(result)
    }
    } 

    const cercaPerNome = (nome) => {
      
      if(nome.length === 0)
        setIsFilter(false)
        else{
      let result = [];
        setIsFilter(true);
      for(let value in lavoratoriList){
        if(lavoratoriList[value].nome.toLowerCase() === nome.toLowerCase() )
          result.push(lavoratoriList[value])
      }
      setLavoratoriListFilter(result)
    }
    }


    const mappa = (list) => {

      return list.map((value) => {
        return (
        <div >
    <Lavoratore
          key={value.id}
          id={value.id}
          nome={value.nome}
          cognome={value.cognome}
          sesso={value.sesso}
          datadinascita={value.datadinascita}
          statusgiuridico={value.statusgiuridico}
          codicefiscale={value.codicefiscale}
          indirizzo={value.indirizzo}
          comuneid={value.comuneid}
          nazionalita={value.nazionalita}
          telefono={value.telefono}
          email={value.email}
          profiloLavoratore={profiloLavoratore}
          isAgenzia={isAgenzia}
          />
        </div>)
      });
    };

    
    return (
        <div className={style.container}>
        <h1>{title}</h1>
        <select name="" id="sesso" onChange={(e) => filtraPerSesso(e.target.value)}>
          <option value="Tutti">Tutti</option>
          <option value="Maschio">Maschio</option>
          <option value="Femmina">Femmina</option>
          
        </select>
        <select name="" id="stato" onChange={(e) => filtraPerStato(e.target.value)}>
        <option value="0">Tutti</option>  
          <option value="1">Da Allocare</option>
          <option value="2">Allocato</option>
          <option value="3">In trattativa</option>
        </select>
        Cerca per nome: <input type="text" onChange={((e) => cercaPerNome(e.target.value))}   />
            <div className={style.richieste}>
            {isFilter ? mappa(lavoratoriListFilter) : mappa(lavoratoriList)}
            </div>
         
        </div>
      )
}

export default Lavoratori;


