import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const KEY = '24399696-8e36fcdd9504681aa333f9a82';

const searchApi = ({ artName = '', page = 1 }) => {
  return axios
    .get(
      `${BASE_URL}?q=${artName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(({ data }) => data.hits);
};

export default searchApi;
