export const SCORE = 'ADD_USER';
export const GAME_SETTINGS = 'GAME_SETTINGS';

// Criando action creator changeSettings
// Com o type igual a const e com parâmetro thisConfig
export const changeSettings = (thisConfig) => ({
  type: GAME_SETTINGS,
  thisConfig,
});

export const getScore = (score) => ({
  type: SCORE,
  score,
});
