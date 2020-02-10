import React, { Component } from 'react';
import {connect, useDispatch} from 'react-redux';
import './LoginForm.css';
import {SET_LOGIN_PENDING} from "../../store/actions/LoginPending";
import {SET_LOGIN_SUCCESS} from "../../store/actions/LoginSuccess";
import {SET_LOGIN_ERROR} from "../../store/actions/LoginError";

class LoginForm extends Component {


  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div className="form-group-collection">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" onChange={e => this.setState({email: e.target.value})} value={email}/>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          </div>
        </div>

        <input type="submit" value="Login" />

        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <div>Authentication Succeed.</div> }
          { loginError && <div>Authentication failed.</div> }
        </div>
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password)
    this.setState({
      email: '',
      password: ''
    });
  }
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




const login = (email, password) => {
  return dispatch => {
    dispatch(setLoginPending(true));

    callLoginApi(email, password, error => {
      if (error) {
        dispatch(setLoginPending(false));
        dispatch(setLoginError(true));
      } else {
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess());
      }
    });
  }
};


/**
 * This method is a callback after calling the login method
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
    body: JSON.stringify({"email":email, "password":password})
  })

  await response.json()
      .then((data) => {
        if (data.user === undefined) {
          console.log("Data.user undefined !");
          callback(true);
        }
        else {
          localStorage.setItem('id', data.user._id)
          localStorage.setItem('token', data.user.tokens[0].token)
          //console.log(data.user.tokens[0].token)
          callback(false);
        }
      });
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => login(email, password)(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);