// eslint-disable-file no-unused-vars
import React from 'react';
import "./NavBar.css";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {SET_LOGIN_SUCCESS} from "../../store/actions/LoginSuccess";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import {Link} from 'react-router-dom'


function NavBar(properties) {

    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);

    function logOut() {
        dispatch({
            type: SET_LOGIN_SUCCESS,
            isLoginSuccess: false
        });

    }

    function logIn() {
        history.push('/login')

    }

    function openUploadForm() {
        history.push('/plugin-upload')


    }

    function goHome() {
        history.push('/home')
    }

    // let plugin = new PluginModel(...properties.plugin);
    return (
        <div className={"nav-bar"}>
            <h1 title={"Accueil"} onClick={() => goHome()} id={"site_title"}>AudiEffect</h1>


            {isLoggedIn ?
                <div id={"buttons"}>
                    {history.location.pathname === '/home' ?
                        <Button id={"upload_button"} size={"large"} onClick={() => openUploadForm()}>Upload un plugin</Button>
                        : null
                    }
                    <Button id={"logout_button"} size={"large"} onClick={() => logOut()}>Déconnexion</Button>

                </div>
                :
                <Button id={"login_button"} size={"large"} onClick={() => logIn()}>Connexion</Button>
            }
        </div>

    )
}

export default NavBar
