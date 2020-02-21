import React, {Component, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import './LoginForm.css';
import {SET_LOGIN_PENDING} from "../../store/actions/LoginPending";
import {SET_LOGIN_SUCCESS} from "../../store/actions/LoginSuccess";
import {SET_LOGIN_ERROR} from "../../store/actions/LoginError";

import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {LOG_IN} from "../../store/actions/LogIn";
import Button from "@material-ui/core/Button";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setEPassword] = useState("");
    const dispatch = useDispatch();

    function register() {
        console.log("Unavailable feature : Register new user ! It should arrive soon !")
    }

    /**
     * This action indicates that the login request has been sent : pending status
     * @param {*} isLoginPending
     */
    function setLoginPending(isLoginPending) {
        return {
            type: SET_LOGIN_PENDING,
            isLoginPending
        };
    }

    /**
     * This action indicates that the login request has succeed
     * @param {*} isLoginSuccess
     */
    function setLoginSuccess(isLoginSuccess) {
        return {
            type: SET_LOGIN_SUCCESS,
            isLoginSuccess
        };
    }

    /**
     * This action indicates that the login request has failed
     * @param {*} loginError
     */
    function setLoginError(loginError) {
        return {
            type: SET_LOGIN_ERROR,
            loginError
        }
    }


    function login() {
        console.log("loggin in");
        dispatch(setLoginPending(true));
        callLoginApi(email, password, error => {
            if (error) {
                dispatch(setLoginPending(false));
                dispatch(setLoginError(true));
            } else {
                dispatch(setLoginPending(false));
                dispatch({
                    type: LOG_IN,
                    login: false
                });
                dispatch({
                        type: SET_LOGIN_SUCCESS,
                        isLoginSuccess: true
                    }
                );
            }
        });
    }


    /**
     * @param {*} email
     * @param {*} password
     * @param {*} callback
     */
    async function callLoginApi(email, password, callback) {
        let loginUrl = `http://localhost:4000/users/authenticate`;
        let response = await fetch(loginUrl, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        });

        response.json().then((data) => {
            if (data.user === undefined) {
                console.log("Data.user undefined !");
                callback(true);
            } else {
                localStorage.setItem('id', data.user._id);
                localStorage.setItem('token', data.user.tokens[data.user.tokens.length - 1].token);
                callback(false);
            }
        });
    }

    return (
        <div className="rootDiv">
            <Card raised={"true"} className={"card"} color="primary">
                <CardContent>
                    <form id={"form"} name={"form"}>
                        <div className={"input"}>
                            <TextField
                                className={"field"}
                                required
                                placeholder={"Mail"}
                                type="email"
                                defaultValue=""
                                variant="outlined"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
                            />
                        </div>
                        <div className={"input"}>
                            <TextField
                                className={"field"}
                                required
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    setEPassword(e.target.value)
                                }}
                                value={password}
                                placeholder={"Mot de passe"}
                                variant="outlined"
                            />
                        </div>
                        <div id="login_buttons">
                            <div>
                                <Button disabled size={"large"} className="button" variant="contained" color="secondary"
                                        value="Login">
                                    Inscription
                                </Button>
                            </div>
                            <div>
                                <Button size={"large"} className="button" variant="contained" color="primary"
                                        value="Login" onClick={() => login()}>
                                    Connexion
                                </Button>
                            </div>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm;