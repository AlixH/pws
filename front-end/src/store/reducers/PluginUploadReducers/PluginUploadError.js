import {SET_PLUGINUPLOAD_ERROR} from "../../actions/PluginUploadActions/PluginUploadError";

const defaultState = {};

const pluginUploadErrorReducer = (state = defaultState, action) => {
    if (action.type === SET_PLUGINUPLOAD_ERROR) {
        return {pluginUpladError : action.pluginUploadError};
    } else {
        return state;
    }
};
export default pluginUploadErrorReducer;
