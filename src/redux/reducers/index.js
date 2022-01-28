import { combineReducers } from 'redux';
import gameSettings from './gameSettings';
import score from './score';

const rootReducer = combineReducers({ gameSettings, score });

export default rootReducer;
