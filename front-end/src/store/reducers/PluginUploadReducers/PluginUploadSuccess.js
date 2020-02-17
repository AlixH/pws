import {SET_PLUGINUPLOAD_SUCCESS} from "../../actions/PluginUploadActions/PluginUploadSuccess";

const defaultState = {};

const pluginUploadSuccessReducer = (state = defaultState, action) => {
    if (action.type === SET_PLUGINUPLOAD_SUCCESS) {
        return {pluginUpladSuccess : action.pluginUploadSuccess};
    } else {
        return state;
    }
};
export default pluginUploadSuccessReducer;
