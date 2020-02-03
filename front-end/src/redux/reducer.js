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
          console.log("No error callback !");
        dispatch(setLoginSuccess(true));
      } else {
        console.log("error callback !");
        dispatch(setLoginError(error));
      }
    });
  }
}

/**
 * action to indicate that the login request has been sent
 * @param {*} isLoginSuccess 
 */
function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

/**
 * action to indicate that the login request has succeed
 * @param {*} isLoginSuccess 
 */
function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

/**
 * action to indicate that the login request has failed
 * @param {*} loginError 
 */
function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

/**
 * This method handles the login
 * TODO : It is supposed to fetch the login point using a service
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
function callLoginApi(email, password, callback) {
    console.log(`dans le callApi {${email}, ${password}}`);
  if (email == "soufiane@gmail.com" && password == 'pwd') {
      console.log("Authentication succeed !");
      return callback(null);
  }
  else {
      console.log("Authentication failed !");
      return callback(new Error('Invalid email and password'));
  }
}


/**
 * Reducer to catch dispatched actions
 * @param {*} state 
 * @param {*} action 
 */
export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
        console.log(`Reducer catching SET_LOGIN_PENDING`);
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
        console.log(`Reducer catching SET_LOGIN_SUCCESS`);
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
        console.log(`Reducer catching SET_LOGIN_ERROR`);
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}