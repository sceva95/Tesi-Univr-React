import style from '../style/Unautenticated.module.css';
import {Typography, IconButton} from '@material-ui/core';
import {useState} from 'react';
import {Redirect} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';

function Unautenticated(){

    const [redirect, setRedirect] = useState(false)

    return (
        <div className={style.container}>
            {redirect? <Redirect /> :<div className={style.box}>
                <Typography variant ="h4">Non hai i permessi per accedere alla pagina.</Typography>
                <Typography variant ="h5">Effettua il login.</Typography>

                <IconButton color="primary" size="medium" onClick={() => setRedirect(true)}><HomeIcon></HomeIcon></IconButton>

            </div>}
        </div>
    )
}

export default Unautenticated;