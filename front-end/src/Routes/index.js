
import React from 'react';

import Home from '../Components/Home';

// Import routing components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';

export default class Routes extends React.Component{

    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginForm}/>
                    <Route path="/*" exact render={()=> <div>No page found</div>}> </Route>
                </Switch>
            </Router>
        )
    }
}