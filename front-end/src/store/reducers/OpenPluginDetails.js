import {OPEN_PLUGIN_DETAILS} from "../actions/OpenPluginDetails";

const defaultState = {plugin:null};

const openPluginReducer = (state = defaultState, action) => {
    if (action.type === OPEN_PLUGIN_DETAILS) {
        return {...state, plugin:action.plugin};
    } else {
        return state;
    }
};
export default openPluginReducer;
