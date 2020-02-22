// eslint-disable-file no-unused-vars
import React from 'react';
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {SET_LOGIN_SUCCESS} from "../../store/actions/LoginSuccess";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import {Link } from 'react-router-dom'


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

    // let plugin = new PluginModel(...properties.plugin);
    return (
        <div className={"nav-bar"}>

            <Link to={"/home"}><h1 id={"site_title"}>Gallerie de plugins</h1></Link>
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
