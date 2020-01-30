
import React from 'react';

import Home from '../Components/Home';

// Import routing components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  LoginForm  from '../Components/Login/Login';
//import { LoginForm } from '../Components/Login/Login';

export default class Routes extends React.Component{

    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/Login" exact component={LoginForm}/>
                    <Route path="/*" exact render={()=> <div>No page found</div>}> </Route>
                </Switch>
            </Router>
        )
    }
}