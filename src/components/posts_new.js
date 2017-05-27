import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField(field) {
      return(
        <div className="form-group">
          <label>{field.label}</label>
          <input {...field.input}  className="form-control" type="text" />
          {field.meta.error}
        </div>
      )
  }

  onSubmit(values) {
    //this === component
    console.log(values);
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
})(PostsNew);
