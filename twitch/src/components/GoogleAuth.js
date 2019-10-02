import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    // state = { isSignedIn: null } // starts as null because we dont know if user is signed in or not // removed for redux use

    componentDidMount() {                                                                              // initiates the library, with callback
        window.gapi.load('client:auth2', () => {                                                    // window. variable tells React to look for the variable gapi in the window scope, async                                       
            window.gapi.client.init({                                                                   // when client:auth2 loads, init the client from gapi with creds (returns a promise)
                clientId: '1053553738011-bntio9vnmqt1ugjodau4ogm8e215oqu7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() }); // removed for redux
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        }); 
    };       

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button 
                    onClick={this.onSignOutClick}
                    className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick} 
                    className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>   
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);