import {SET_LOGIN_ERROR} from "../actions/LoginError";

const defaultState = {};

const loginErrorReducer = (state = defaultState, action) => {
    if (action.type === SET_LOGIN_ERROR) {
        return {loginError : action.loginError};
    } else {
        return state;
    }
};
export default loginErrorReducer;
