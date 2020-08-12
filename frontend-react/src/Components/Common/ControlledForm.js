import React, { Component } from "react";
import { LabeledInput } from "./LabeledInput";

class ControlledForm extends Component {
  constructor (props) {
    super(props);

    this.state = {};
    props.inputFields.map(({id}) => ({[id]: ''})).forEach(input =>
      this.state = {...this.state, ...input}
    );
  }

  handleInputChange = e => {
    const {id, value} = e.target;
    this.setState({[id]: value});
  };

  render () {
    const {
      inputFields,
      buttonName,
      onChange,
      onSubmit,
      action,
      httpMethod
    } = this.props;

    return (
      <form className='form' onSubmit={onSubmit} action={action} method={httpMethod}>
        {inputFields.map(({value, title, type, id, placeholder}) =>
          <LabeledInput key={id}
                        value={value}
                        title={title}
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        onChange={this.handleInputChange}/>
        )}
        <button type="submit">{buttonName}</button>
      </form>
    );
  }
}