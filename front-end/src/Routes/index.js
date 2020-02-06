
import React from 'react';

// Import routing components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';
import Home from '../Components/Home';
import { createBrowserHistory } from "history";


const history = createBrowserHistory();

export default class Routes extends React.Component{    
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/target" exact component={Home}/>
                    <Route path="/" exact component={LoginForm}/>
                </Switch>
            </Router>
        )
    }
}