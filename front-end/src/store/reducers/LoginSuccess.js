import {SET_LOGIN_SUCCESS} from "../actions/LoginSuccess";

const defaultState = {};
const homePageURL = "http://localhost:3000/home";  // warning, the port is hardcoded here ! it may sucks if front-end port changes !

const loginSuccessReducer = (state = defaultState, action) => {
    if (action.type === SET_LOGIN_SUCCESS) {
        window.location.href=homePageURL;
        return {loginError : action.isLoginSuccess};
    } else {
        return state;
    }
};
export default loginSuccessReducer;
