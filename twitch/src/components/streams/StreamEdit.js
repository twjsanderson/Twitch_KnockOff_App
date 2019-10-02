import React from 'react';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import { connect } from 'react-redux';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm                                                             // we can use lodash _.pick (grabs the value of any key we choose ie. 'title')or the oldschool way of {{ title: this.props.stream.title, etc.....}}
                    initialValues={_.pick(this.props.stream, 'title', 'description')}   // the inital values property is part of redux froms and can take an object and pass down its contents
                    onSubmit={this.onSubmit} />                                         
            </div>
        );
    }
};

// the ownProps is 2nd argument available by redux, and it is a reference to the props object that shows up in our streamEdit component
// This allows us to get the id from params and use it to compare or find stuff in the state
const mapStateToProps = (state, ownProps) => { 
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);


// This component did break a rule of React Router beacause it doesnt fetch its own data, You must start at '/' where the component calls componentDidMount and loads data to state
// then when you navigate to the edit page you can see all relevant streams
// If you go straight to the edit page the reduc state is NOT updated and doesnt show anything

// React-Router rule - each component needs to be designed to work in isolation (fetch its own data!)

