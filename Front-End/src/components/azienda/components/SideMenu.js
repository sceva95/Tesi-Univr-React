import style from "../../../style/SideMenu.module.css";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import { useEffect, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';



function SideMenu({ changeComponents, richiesteModificabili, richiesteInAttesa, proposteRicevute, richiesteScadute, richiesteEliminate  }) {


  
  const [isProposte, setIsProposte] = useState(false);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -12,
      background:'orange',
      
      padding: '0 4px',
    },
  }))(Badge);

  const change = (component) => {
    switch (component) {
      case "Dashboard":
        changeComponents("Dashboard");
        break;
      case "Richieste":
        changeComponents("Richieste");
        break;
      
      case "Inserisci":
        changeComponents("Inserisci");
        break;
     
      default:
        changeComponents("Dashboard");
        break;
    }
  };

  useEffect(() => checkProposte, []);

  const checkProposte = () => {
    if (proposteRicevute !== 0) {
      setIsProposte(true)
    }
  };

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => change("Dashboard")}
        >
         <span className="material-icons">account_circle</span> Dashboard
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => change("Richieste")}
        >
          <StyledBadge badgeContent={proposteRicevute} ><AssignmentIcon/></StyledBadge> Richieste
          
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => change("Inserisci")}
        >
          <span className="material-icons">add_circle</span> Inserisci Richiesta
        </Button>
      </div>
    </div>
  );
}

export default SideMenu;
