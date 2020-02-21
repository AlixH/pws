// eslint-disable-file no-unused-vars
import React from 'react';
import "./NavBar.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {SET_LOGIN_SUCCESS} from "../../store/actions/LoginSuccess";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import {LOG_IN} from "../../store/actions/LogIn";



function NavBar(properties) {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);

    function logOut() {
        dispatch({
            type:SET_LOGIN_SUCCESS,
            isLoginSuccess:false
        })

    }

    function logIn() {
        dispatch({
            type:LOG_IN,
            login:true
        })

    }

    // let plugin = new PluginModel(...properties.plugin);
    return(
        <div className={"nav-bar"} >
            <h1 id={"site_title"}>Gallerie de plugins</h1>
            <div>
                {isLoggedIn ?
                    <Button onClick={() => logOut()}>Déconnexion</Button>
                    :  <Button onClick={() => logIn()}>Connexion</Button>
                }
            </div>
        </div>

    )
}

export default NavBar
