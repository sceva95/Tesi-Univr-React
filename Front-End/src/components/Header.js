import style from "../style/Header.module.css";
import { Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button'
import Logo from '../img/favicon.ico'

//font-Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignOutAlt,
  faTractor,
} from "@fortawesome/free-solid-svg-icons";

function Header({handleLogout}) {




  return (
    <div className={style.container}>
      <div className={style.icona}>
      <img src={Logo} alt="My logo" />
      </div>
      <div className={style.menu}>
        <ul>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <li>
              {" "}
              <FontAwesomeIcon icon={faHome} /> Home
            </li>
          </Link>

          
           
        

          <li >
            
            <Button onClick={() => handleLogout()}><FontAwesomeIcon icon={faSignOutAlt} /> Log out</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
