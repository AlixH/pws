import {UPLOAD} from "../actions/Upload";

const defaultState = {};

const uploadReducer = (state = defaultState, action) => {
    if (action.type === UPLOAD) {
        return {...state, upload:action.upload};
    } else {
        return state;
    }
};
export default uploadReducer;
