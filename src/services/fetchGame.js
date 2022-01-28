import fetchTriviaAPI from './triviaAPI';

const fetchQuestions = async (token, configs) => {
  const EXPIRED_CODE = 3; // Se for um token inválido é retornado código 3 na resposta
  const { category, difficulty, type } = configs;
  const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`;
  const fetchQuestion = await fetch(END_POINT);
  const response = await fetchQuestion.json();
  const { results } = response;

  if (response.response_code === EXPIRED_CODE) return 'token failure';

  results.forEach((question) => {
    question.category = window.atob(question.category);
    question.type = window.atob(question.type);
    question.difficulty = window.atob(question.difficulty);
    question.question = window.atob(question.question);
    question.correct_answer = window.atob(question.correct_answer);
    question.incorrect_answers[0] = window.atob(question.incorrect_answers[0]);
    if (question.incorrect_answers.length > 1) {
      question.incorrect_answers[1] = window.atob(question.incorrect_answers[1]);
      question.incorrect_answers[2] = window.atob(question.incorrect_answers[2]);
    }
  });

  return results; // retorna um array com as questões, cada elemento do array é um objeto
};

const mountQuestions = async (configs) => {
  let token = localStorage.getItem('token');

  if (!token) {
    await fetchTriviaAPI();
    token = localStorage.getItem('token');
  }

  let mountedQuestions = await fetchQuestions(token, configs);

  if (mountedQuestions === 'token failure') {
    await fetchTriviaAPI();
    token = localStorage.getItem('token');
    mountedQuestions = await fetchQuestions(token, configs);
  }

  return mountedQuestions;
};

export default mountQuestions;
