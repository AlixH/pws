import { combineReducers } from 'redux';
import loginErrorReducer from "./LoginError";
import loginPendingReducer from "./LoginPending";
import loginSuccessReducer from "./LoginSuccess";
import pluginUploadPendingReducer from "./PluginUploadReducers/PluginUploadPending";
import pluginUploadSuccessReducer from "./PluginUploadReducers/PluginUploadSuccess";
import pluginUploadErrorReducer from "./PluginUploadReducers/PluginUploadError";


const reducers = combineReducers({
    loginErrorReducer,
    loginPendingReducer,
    loginSuccessReducer,
    pluginUploadErrorReducer,
    pluginUploadPendingReducer,
    pluginUploadSuccessReducer,
});

export default reducers;
