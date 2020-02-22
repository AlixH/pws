
import React from 'react';

// Import routing components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';
import Home from '../Components/Home';
import PluginUploadForm from '../Components/PluginUploadForm/PluginUploadForm';
import Redirect from "react-router-dom/es/Redirect";
import {useSelector} from "react-redux";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import { createBrowserHistory } from "history";


function Routes (){

    const history = createBrowserHistory();
    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);
        return (
            <Router history={history}>
                <Switch>
                    <Route path={"/home"} render={() => (
                        <Home/>
                    )}/>
                    <Route path="/login" render={() => (
                        isLoggedIn ? <Redirect to={"/home"}/> : <LoginForm/>
                    )}/>
                    <Route path="/plugin-upload" render={() => (
                       isLoggedIn ? <PluginUploadForm/> : <Redirect to={"/login"}/>
                    )}/>
                    <Route path={"*"} render={() => (
                        <Redirect to={"/home"}/>
                    )}>
                    </Route>

                </Switch>
            </Router>
        )
}

export default Routes