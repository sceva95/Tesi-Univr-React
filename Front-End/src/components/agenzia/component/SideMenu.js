import style from "../../../style/SideMenu.module.css";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from "@material-ui/core";


function SideMenu ({changeComponents, nuoveRichieste, nuoveAziende, lavoratoriAllocati}) {

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -12,
      background:'orange',
      
      padding: '0 4px',
    },
  }))(Badge);
  


    const change = (component) => {
        switch(component){
            case "Dashboard":
                changeComponents("Dashboard");
                break;
            case "Richieste":
                changeComponents("Richieste");
                break;

            case "Aziende":
                changeComponents("Aziende");
                break;
            case "Lavoratori":
                changeComponents("Lavoratori")
                break;
                case "Amministra":
                changeComponents("Amministra");
                break;
            default:
                changeComponents("Dashboard");
                break;
        }
    }

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
          <StyledBadge badgeContent={nuoveRichieste} ><AssignmentIcon/></StyledBadge> Richieste
        </Button>
      
        <Button
          variant="outlined"
          color="primary"
          onClick={() => change("Aziende")}
        >
          
            <StyledBadge badgeContent={nuoveAziende} ><BusinessIcon/></StyledBadge>
         
            Aziende
        </Button>
       
        <Button
          variant="outlined"
          color="primary"
          onClick={() => change("Lavoratori")}
        >
          <Tooltip title="Lavoratori Allocati"><PeopleIcon/></Tooltip> Lavoratori 
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => change("Amministra")}
        >
          <DeveloperBoardIcon/> Amministra
        </Button>
      </div>

        </div>
    )
}

export default SideMenu;