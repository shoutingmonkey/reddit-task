import {combineReducers} from 'redux';
import stateReducer from './stateReducer';

const rootReducer = combineReducers({
  reducer: stateReducer,
});

export default rootReducer;
