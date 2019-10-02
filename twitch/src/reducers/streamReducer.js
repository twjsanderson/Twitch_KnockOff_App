import _ from 'lodash';
import { CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM } from '../actions/types';

    const INITIAL_STATE = {};

    export default (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case FETCH_STREAM:
                return { ...state, [action.payload.id]: action.payload };
            case FETCH_STREAMS:
                return {...state, ..._.mapKeys(action.payload, 'id') }; // use loadash that will create a new object from an array with keys === id ex. {3: {id: 3, title: 'fdklsdf', text: 'fndsklf' } };
            case CREATE_STREAM:
                return { ...state, [action.payload.id]: action.payload };
            case DELETE_STREAM:
                return _.omit( state, action.payload ); // we are only passing an id as the payload to DELETE_STREAM
            case EDIT_STREAM:
                // const newState = { ...state }; // Creates new object identitcal to state 
                // newState[action.payload.id] = action.payload; // Creates a key/value pair in the new object with key = id and value = payload from action creator 
                // return newState;
                return { ...state, [action.payload.id]: action.payload };  // same as above different syntax, using key interpolation for assigning the key
            default:
                return state;
        }
    };  