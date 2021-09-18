import Riepilogo from './components/Riepilogo'
import Account from './components/Account'

import stile from '../../style/azienda/Dashboard.module.css'



function Dashboard({aziendaLoggata, comune, settoreAttivita, richiesteAperte, richiesteInAttesa, updateAzienda}) {

    

    return(
        <div className ={stile.container}>
            
            <Account 
                id={aziendaLoggata.id}
                    ragioneSociale={aziendaLoggata.ragionesociale}
                    partitaIva= {aziendaLoggata.partitaiva}
                    indirizzo= {aziendaLoggata.indirizzo}
                    comune= {comune.denominazione}
                    provincia={comune.sigla}
                    cap= {aziendaLoggata.cap}
                    telefono= {aziendaLoggata.telefono}
                    email= {aziendaLoggata.email}
                    urlsito= {aziendaLoggata.urlsito}
                    settoreAttivita= {settoreAttivita}
                    approved={aziendaLoggata.approved}
                    createdat={aziendaLoggata.createdat}
                    username= {aziendaLoggata.username}
                    updateAgenzia={updateAzienda}
                /> 
           
        </div>
    )
}

export default Dashboard;