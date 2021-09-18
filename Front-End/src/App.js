
import './App.css';
import {Route, Switch} from 'react-router-dom'


//components
import Footer from './components/Footer';



//pages
import Home from './pages/Home';
import Azienda from './pages/Azienda'
import Agenzia from './pages/Agenzia'
import PasswordDimenticata from './pages/PasswordDimenticata'
import Registrazione from './pages/Registrazione'



function App() {
  
  return (
    <div className="App">

      
      
      <Switch>
        <Route exact path="/" component= {Home} />
        <Route exact path="/azienda/:id" component={Azienda} />
        <Route exact path="/agenzia/:id" component={Agenzia} />
        
        <Route exact path="/recupero-password" component={PasswordDimenticata}/>
        <Route exact path="/registrazione" component={Registrazione}/>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
