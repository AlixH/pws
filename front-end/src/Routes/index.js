
import React from 'react';

// Import routing components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';
import { createBrowserHistory } from "history";
import Home from '../Components/Home';
import PluginUploadForm from '../Components/PluginUploadForm/PluginUploadForm';


const history = createBrowserHistory();

export default class Routes extends React.Component{    
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={LoginForm}/>
                    <Route path="/plugin-upload" exact component={PluginUploadForm}/>
                    <Route path="/*" exact render={()=> <div>No page found</div>}> </Route>
                </Switch>
            </Router>
        )
    }
}