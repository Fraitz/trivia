const fetchCategories = async () => {
  const searchCategories = await fetch('https://opentdb.com/api_category.php');
  const response = await searchCategories.json();

  return response.trivia_categories; // retorna o array com as categorias
};

export default fetchCategories;
