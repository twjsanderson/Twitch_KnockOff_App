import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'   // redux-form creates this reducer for us automatically

// Reducers
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,                         // must have key 'form' because of redux forms
    streams: streamReducer
}); 