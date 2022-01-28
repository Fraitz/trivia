const INITIAL_STATE = {
  optionSelected: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_SELECTED_OPTION:
    return {
      ...state,
      optionSelected: true,
    };
  case TURN_OFF_SELECTED_OPTION:
    return {
      ...state,
      optionSelected: false,
    };
  default:
    return state;
  }
};

export default questions;
