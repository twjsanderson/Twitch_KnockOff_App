import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import  reduxThunk from 'redux-thunk';  

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);




// react-router -- is the core library ( not needed )
// react-router-dom -- is used in dom based app ( we need this in react )
// react-router-native -- used for native apps
// react-router-redux -- used for binding between redux and router, not necessary

// bad to use <a> with href= navigation because the development server will reload the index.html
// and dump current react/redux state data