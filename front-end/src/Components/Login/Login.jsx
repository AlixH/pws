
import React from 'react';

import { userActions } from '../../Actions/UserActions';
import { connect } from 'react-redux';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(`handle change on : {${name} , ${value}}`);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted");

        this.setState({ submitted: true });
        let { username, password } = this.state;

        console.log(`submitted state : username=${username}, password=${password}, submitted=${this.state.submitted}`);

        if (username && password) {
            //this.props.login(username, password);
            userActions.login(username, password);
        }
        else {
            console.log("username and password should not be empty");
        }
    }

    componentDidMount() {
        if (this.props.username === undefined) {
            console.log("username udefined");
        }
        else {
            console.log(`LoginForm did mount, username : ${this.props.username}`);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
        
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="form-control" value={username} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" value={password} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        
        );
    }
}


/*function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actions = {
    login: userActions.login,
};


const connectLogin = connect(mapState, actions)(LoginForm);
export { connectLogin as LoginForm };
*/

export default LoginForm;