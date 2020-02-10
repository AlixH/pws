import {SET_LOGIN_PENDING} from "../actions/LoginPending";

const defaultState = {};

const loginPendingReducer = (state = defaultState, action) => {
    if (action.type === SET_LOGIN_PENDING) {
        return {loginError : action.isLoginPending};
    } else {
        return state;
    }
};
export default loginPendingReducer;
