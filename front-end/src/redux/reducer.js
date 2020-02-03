const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
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

/**
 * This method is a callback after calling the login method
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'admin') {
        console.log(`Dans call login APi callback : authentification réussie`);
      return callback(null);
    } else {
        console.log(`Dans call login APi callback : authentification échouée`);
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);
}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
        console.log(`Dans le reducer : ${SET_LOGIN_PENDING}`);
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
        console.log(`Dans le reducer : ${SET_LOGIN_SUCCESS}`);
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
        console.log(`Dans le reducer : ${SET_LOGIN_ERROR}`);
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}