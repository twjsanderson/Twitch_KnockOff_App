import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {    
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}
    

export default connect(null, { createStream })(StreamCreate); 



// Huge Refactor changed all code from below 

// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import { createStream } from '../../actions';

// class StreamCreate extends React.Component {

//     renderError({ error, touched }) {             // destructured from meta
//         if (touched && error) {                   // if the field has been touched and error exists                                             
//             return (
//                 <div className="ui error message">
//                     <div className="header">{error}</div>
//                 </div>
//             );
//         }

//     }

//     renderInput = (formProps) => {
//         const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`; // conditional styling
//         return (
//             <div className={className}>
//                 <label>{formProps.label}</label>
//                 <input 
//                     autoComplete="off"
//                     {...formProps.input} // new syntax, adds all key/value pairs and adds them in
//                     // onChange={formProps.input.onChange}
//                     // value={formProps.input.value} 
//                     // the onChange prop is found on formProps sent down from the Field
//                 />   
//                 {this.renderError(formProps.meta)}
//             </div>
//         );
//     }

//     // onSubmit(event) {               // redux forms uses handleSubmit(onSubmit) below 
//     //     event.preventDefault();
//     // };

//     onSubmit = (formValues) => {            // does the above automatically, formValues variable can be anything
//         this.props.createStream(formValues);
//     }

//     render() {
//         return (
//         // adding "error" to the material ui form className allows the error messages to actually show if activated
//         <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">    
//             {/* Field needs a component to actually show an input element, 
//             the connection between the validate function and the error is the title, 
//             it looks for a tite key and if it finds in in errors the it displays its value */}
//             <Field 
//                 name="title" 
//                 component={this.renderInput} 
//                 label="Enter Title" 
//             />  
//             <Field 
//                 name="description" 
//                 component={this.renderInput} 
//                 label="Enter Description" 
//             /> 
//             <button className="ui button primary">Submit</button>
//         </form>
//         );
//     }
// }

// const validate = (formValues) => {
//     const errors = {};                                   // redux-forms looks for key/value pair
    
//     if (!formValues.title) {
//         errors.title = 'You must enter a title';                
//     }

//     if (!formValues.description) {
//         errors.description = 'You must enter a description';
//     }
//     return errors;
// };


// const formWrapped = reduxForm({ 
//     form: 'streamCreate',
//     validate: validate
// })(StreamCreate);          

// export default connect(null, { createStream })(formWrapped); 