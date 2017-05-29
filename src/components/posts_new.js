import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
class PostsNew extends Component {
  renderField(field) {
      const {meta: {touched, error}} = field;
      const className = `form-group ${touched && error ? 'has-danger' : ''}`;
      return(
        <div className={className}>
          <label>{field.label}</label>
          <input {...field.input}  className="form-control" type="text" />
          {/*
            Three possible states for a form field:
            pristine is when it first appears on teh screen.
            touched me user focused on input and then focused out.
            invalid means an error */}
          <div className="text-help">
            {touched ? error : ''}
          </div>
        </div>
      )
  }

  onSubmit(values) {
      this.props.createPost(values, ()=>{
        this.props.history.push('/');
      });
  }
  render() {
    //handleSubmit is a redux form property that is passed to the form.
    //handles state and validation of our form.  It takes a function you define.
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/' className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};

  //if errors is  empty the form is fine to submit.
  //if errors has *any* props, redux form assumes form is invlaid.
  if( !values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content please';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost }) (PostsNew)
);
