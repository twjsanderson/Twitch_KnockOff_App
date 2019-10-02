import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();       // this is calling the action creator whenever this componen mounts
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    {/* The link below allows us to navigate to a different page with the specific stream id when clicked */}
                    <Link 
                        to={`/streams/edit/${stream.id}`} 
                        className="ui button primary"
                    >    
                        Edit
                    </Link>
                    <Link 
                        className="ui button negative"
                        to={`/streams/delete/${stream.id}`}
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link
                            className="header"
                            to={`/streams/${stream.id}`}
                        >
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className=" ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
};

const mapStateToProps = (state) => {                    // Once mapStateToProps is hooked up to connect(), we can extract the state and then call it as props in the component above
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);


// Intentional Navigation: User clicking a link to navigate to another page
// Programmatic Navigation: Run code to forcibly navigate the user through our app, like after submitting a form