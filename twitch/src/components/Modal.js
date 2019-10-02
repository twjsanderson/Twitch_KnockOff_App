import React from 'react';
import ReactDOM from 'react-dom';  // because this is a portal that will connect directly to the body element 
// import history from '../history'; // used below when user clicks on div outside of modal

// The .stopPropagation() function stops the onClick from the parent from affecting the modal
// This way when you click in the modal you are not redirected, only when you click the div outside are you redirected

// create div with id "modal" and reference it below using createPortal
const Modal = props => {
    return ReactDOM.createPortal(
        // <div onClick={() => history.push('/')} className="ui dimmer modals visible active">  Using a portal to move between pages
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">
                    {props.title}
                </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;