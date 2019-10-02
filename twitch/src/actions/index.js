import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAM, 
    FETCH_STREAMS, 
    EDIT_STREAM, 
    DELETE_STREAM 
} from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};

export const createStream = formValues => async (dispatch, getState) => {       // getState allows us to reach into redux and grab other items 
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
    // Do programmatic navigation after response to get User back to root route
    history.push('/'); // After creating our own history object, we use push to navigate the user around
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// *** Common misconception about PUT requests, they replace all properties of a record! (save the id, usually), NOT ALWAYS USED IN PRACTICE
// *** PATCH request update SOME of a record, so we dont overwrite the other untouched properties 
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};  

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id }); // no response from API so just return id of deleted item
    history.push('/');
};