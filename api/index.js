import axios from 'axios';

export const popularMoviesURl = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/movie/popular?api_key=41a535c46cd527d140a5e78bc0045b09',
});

export const latestURL = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/movie/latest?api_key=41a535c46cd527d140a5e78bc0045b09',
});
