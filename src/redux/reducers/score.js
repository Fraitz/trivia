import { SCORE } from '../actions';

const initialState = {
  score: 0,
};

function score(state = initialState, action) {
  switch (action.type) {
  case SCORE:
    return { ...state, score: action.score };

  default:
    return state;
  }
}

export default score;
