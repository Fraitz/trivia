import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { labelName, id, value, name, options, onChange, classe } = this.props;

    return (
      <label htmlFor={ id }>
        { labelName }
        <select
          id={ id }
          className={ classe }
          value={ value }
          name={ name }
          onChange={ onChange }
        >
          <option value="">Qualquer</option>
          {options}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  labelName: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.element,
  onChange: PropTypes.func,
  classe: PropTypes.string,
}.isRequired;

export default Select;
