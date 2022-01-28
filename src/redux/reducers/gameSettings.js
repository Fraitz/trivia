import { GAME_SETTINGS } from '../actions';

const initialState = {
  category: '',
  difficulty: '',
  type: '',
};

function gameSettings(state = initialState, action) {
  switch (action.type) {
  case GAME_SETTINGS:
    return {
      ...state,
      category: action.thisConfig.category,
      difficulty: action.thisConfig.difficulty,
      type: action.thisConfig.type,
    };

  default:
    return state;
  }
}

export default gameSettings;
