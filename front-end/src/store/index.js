// reducers
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import Reducers from './reducers';

//logger
const logger = createLogger({
    action: (getState, action) => action.type !== '',
});

//default state
const defaultState = {};

const store = createStore(Reducers, defaultState, applyMiddleware(logger));

// subscribe to action
store.subscribe(() => {
    console.log("action dispatched")}
);

export default store;
