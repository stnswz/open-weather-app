import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    weatherState: weatherReducer,
    appState: appReducer,
});

export default rootReducer;