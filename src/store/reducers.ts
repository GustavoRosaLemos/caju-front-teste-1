import { combineReducers } from 'redux';
import loadingReducer from './loading/loadingReducer';
import registrationReducer from './registration/registrationReducer';
import modalReducer from './modal/modalReducer';


const reducers = combineReducers({
  loadingState: loadingReducer,
  registrationState: registrationReducer,
  modalState: modalReducer
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;