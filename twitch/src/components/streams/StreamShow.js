import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {
constructor(props) {
    super(props);

    this.videoRef = React.createRef();
}

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);                 // gets the stream 
        this.buildPlayer();                        // then builds the player
    }

    componentWillUnmount() {
        this.player.destroy(); 
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8001/live/${id}.flv` 
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    componentDidUpdate() {
        this.buildPlayer();                        // if buildPlayer is not initially successful, this will attempt to call it again
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );  
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);