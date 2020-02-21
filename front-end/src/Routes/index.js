
import React from 'react';

// Import routing components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';
import { createBrowserHistory } from "history";
import Home from '../Components/Home';
import PluginUploadForm from '../Components/PluginUploadForm/PluginUploadForm';
import Redirect from "react-router-dom/es/Redirect";
import {useSelector} from "react-redux";
import shallowEqual from "react-redux/lib/utils/shallowEqual";


const history = createBrowserHistory();

function Routes (){

    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);
    console.log(isLoggedIn);
    
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/login" render={() => (
                        isLoggedIn ? <Redirect to={"/home"}/> : <LoginForm/>
                    )}/>
                    <Route path="/plugin-upload" render={() => (
                        isLoggedIn ? <PluginUploadForm/> : <Redirect to={"/login"}/>
                    )}/>
                    <Route path="/*" exact render={()=> <div>No page found</div>}> </Route>
                </Switch>
            </Router>
        )
}

export default Routes