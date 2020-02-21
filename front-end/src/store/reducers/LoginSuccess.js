import {SET_LOGIN_SUCCESS} from "../actions/LoginSuccess";

const defaultState = {};

const loginSuccessReducer = (state = defaultState, action) => {
    if (action.type === SET_LOGIN_SUCCESS) {
        return {...state, isLoginSuccess: action.isLoginSuccess};
    } else {
        return state;
    }
};
export default loginSuccessReducer;
