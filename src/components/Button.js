import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/pages-css/GamePage.css';

class Button extends Component {
  render() {
    const { dataTestId, name, onClick, disabled, classe, id } = this.props;

    return (
      <button
        className={ classe }
        data-testid={ dataTestId }
        disabled={ disabled }
        id={ id }
        onClick={ onClick }
        type="button"
      >
        { name }
      </button>
    );
  }
}

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
}.isRequired;

export default Button;
