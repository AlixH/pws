import { combineReducers } from 'redux';
import loginErrorReducer from "./LoginError";
import loginPendingReducer from "./LoginPending";
import loginSuccessReducer from "./LoginSuccess";
import pluginListReducer from "./PluginList";


const reducers = combineReducers({
    loginErrorReducer,
    loginPendingReducer,
    loginSuccessReducer,
    pluginListReducer,
});

export default reducers;
