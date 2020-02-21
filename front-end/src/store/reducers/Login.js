import {LOG_IN} from "../actions/LogIn";

const defaultState = {};

const logInReducer = (state = defaultState, action) => {
    if (action.type === LOG_IN) {
        return {...state, login:action.login};
    } else {
        return state;
    }
};
export default logInReducer;
