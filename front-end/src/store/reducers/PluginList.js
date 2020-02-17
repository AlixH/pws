import {SET_PLUGIN_LIST} from "../actions/PluginList";

const defaultState = {pluginsList:[]};

const pluginListReducer = (state = defaultState, action) => {
    if (action.type === SET_PLUGIN_LIST) {
        return {...state, pluginsList:action.pluginsList};
    } else {
        return state;
    }
};
export default pluginListReducer;
