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
import {UPLOAD} from "../../store/actions/Upload";


function NavBar(properties) {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);

    function logOut() {
        dispatch({
            type: SET_LOGIN_SUCCESS,
            isLoginSuccess: false
        })

    }

    function logIn() {
        dispatch({
            type: LOG_IN,
            login: true
        })

    }

    function openUploadForm() {
        dispatch({
            type:UPLOAD,
            upload:true
        })
    }

    // let plugin = new PluginModel(...properties.plugin);
    return (
        <div className={"nav-bar"}>
            <h1 id={"site_title"}>Gallerie de plugins</h1>
            {isLoggedIn ?
                <div id={"buttons"}>
                    <Button id={"upload_button"} size={"large"}  onClick={() => openUploadForm()} >Upload un plugin</Button>
                    <Button id={"logout_button"} size={"large"}  onClick={() => logOut()}>Déconnexion</Button>

                </div>
                :
                <Button id={"login_button"} size={"large"} onClick={() => logIn()}>Connexion</Button>
            }
        </div>

    )
}

export default NavBar
