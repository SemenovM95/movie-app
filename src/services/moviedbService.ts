import type {
  MovieDBResponseData,
  GenresData,
  GenresResponseData,
  SearchResults,
  GuestSessionResponseData,
} from './moviedbService.d'

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjY4MmMzMzdjMDljNDBjMWIzNTJlYTJlMjUwMzhkMyIsInN1YiI6IjY1NmY3N2M5ODg2MzQ4MDBlYTQ5MGZjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCCEXTOgQFJZ6AR2zds-YkIyS3Hf0N1DchIjLrqzSNw'
const baseURL = 'https://api.themoviedb.org/3'
const imageURL = 'https://image.tmdb.org/t/p/w300'

const defaultRequestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
}
const searchMovie = async (query: string, page: number): Promise<SearchResults> => {
  const requestURL = `${baseURL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
  return fetch(requestURL, defaultRequestOptions)
    .then((response): Promise<MovieDBResponseData> => response.json())
    .then((data) => ({ results: data.results, totalResults: data.total_results }))
    .catch((err) => {
      throw new Error(err)
    })
}

const createGuestSession = async (): Promise<GuestSessionResponseData> => {
  return fetch(`${baseURL}/authentication/guest_session/new`, defaultRequestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data
      return Promise.reject(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const getGenres = async (): Promise<GenresData[]> => {
  return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', defaultRequestOptions)
    .then((response): Promise<GenresResponseData> => response.json())
    .then((data): GenresData[] => data.genres)
    .catch((err) => {
      throw new Error(err)
    })
}

export default { baseURL, imageURL, searchMovie, getGenres, createGuestSession }
