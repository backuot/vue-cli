import axios from 'axios';
import { Movie } from '@/interfaces/types';

axios.defaults.baseURL = 'http://react-cdp-api.herokuapp.com';

function getMovies(params: any): Promise<Movie[]> {
  return axios.get('/movies', { params }).then(({ data }) => data.data);
}

export default {
  getMovies,
};
