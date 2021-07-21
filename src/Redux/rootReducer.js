import { combineReducers } from 'redux';
import { GlobalReducer } from './Slices/newsSlice';

const rootReducer = combineReducers({
  GlobalReducer,
});
export default rootReducer