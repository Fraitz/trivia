const fetchTriviaAPI = async () => {
  const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetchAPI.json();
  const { token } = response;
  localStorage.setItem('token', token);
};

export default fetchTriviaAPI;
