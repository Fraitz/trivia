import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputLogin extends Component {
  render() {
    const { labelValue, maxlength,
      dataTestId, onChange, name, value, placeHolder } = this.props;

    return (
      <label htmlFor={ dataTestId }>
        { labelValue }
        <input
          maxLength={ maxlength }
          placeHolder={ placeHolder }
          type="text"
          data-testid={ dataTestId }
          id={ dataTestId }
          onChange={ onChange }
          name={ name }
          value={ value }
        />
      </label>
    );
  }
}

InputLogin.propTypes = {
  labelValue: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  maxlength: PropTypes.number.isRequired,
};

export default InputLogin;
