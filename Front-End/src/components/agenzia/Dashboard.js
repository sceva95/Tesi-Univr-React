
import Riepilogo from './component/Riepilogo'
import Account from './component/Account'
import stile from '../../style/azienda/Dashboard.module.css'


function Dashboard ({agenziaLoggata, comune, lavoratoriImpegnati, totaleLavoratori, nuoveOfferte, totaleOfferte, nuoveAziende, totaleAziende, updateAgenzia}) {


    return(
        <div className ={stile.container}>
        <div>
            <Riepilogo lavoratoriImpegnati={lavoratoriImpegnati} totaleLavoratori={totaleLavoratori} nuoveOfferte={nuoveOfferte} totaleOfferte={totaleOfferte} nuoveAziende={nuoveAziende} totaleAziende={totaleAziende} />
        </div>
        <div >
            <Account 
            id={agenziaLoggata.id}
                ragioneSociale={agenziaLoggata.ragionesociale}
                indirizzo= {agenziaLoggata.indirizzo}
                comune={comune.denominazione}
                provincia={comune.sigla}
                cap={agenziaLoggata.cap}
                telefono={agenziaLoggata.telefono}
                email={agenziaLoggata.email}
                urlsito={agenziaLoggata.urlsito}
                username={agenziaLoggata.username}
                updateAgenzia={updateAgenzia}
            />
        </div>
    </div>
            
    )
}

export default Dashboard;