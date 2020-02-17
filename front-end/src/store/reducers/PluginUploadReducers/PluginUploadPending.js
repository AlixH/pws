import {SET_PLUGINUPLOAD_PENDING} from "../../actions/PluginUploadActions/PluginUploadPending";

const defaultState = {};

const pluginUploadPendingReducer = (state = defaultState, action) => {
    if (action.type === SET_PLUGINUPLOAD_PENDING) {
        return {pluginUpladPending : action.pluginUploadPending};
    } else {
        return state;
    }
};
export default pluginUploadPendingReducer;
