import { combineReducers } from 'redux';
import loginErrorReducer from "./LoginError";
import loginPendingReducer from "./LoginPending";
import loginSuccessReducer from "./LoginSuccess";

import pluginUploadPendingReducer from "./PluginUploadReducers/PluginUploadPending";
import pluginUploadSuccessReducer from "./PluginUploadReducers/PluginUploadSuccess";
import pluginUploadErrorReducer from "./PluginUploadReducers/PluginUploadError";

import pluginListReducer from "./PluginList";
import openPluginReducer from "./OpenPluginDetails";
import logInReducer from "./Login";
import uploadReducer from "./upload";

const reducers = combineReducers({
    loginErrorReducer,
    loginPendingReducer,
    loginSuccessReducer,
    pluginUploadErrorReducer,
    pluginUploadPendingReducer,
    pluginUploadSuccessReducer,
    pluginListReducer,
    openPluginReducer,
    logInReducer,
    uploadReducer

});

export default reducers;
