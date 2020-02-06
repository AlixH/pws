import {SET_LOGIN_SUCCESS} from "../actions/LoginSuccess";

const defaultState = {};

const loginErrorReducer = (state = defaultState, action) => {
    if (action.type === SET_LOGIN_SUCCESS) {
        return {loginError : action.isLoginSuccess};
    } else {
        return state;
    }
};
export default loginErrorReducer;
