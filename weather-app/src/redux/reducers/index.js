import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
    weatherState: weatherReducer,
});

export default rootReducer;