interface MovieDBResponseData {
  page: number,
  results: MovieData[],
  total_pages: number,
  total_results: number
}

interface SearchResults {
  results: MovieData[]
  totalResults: number
}

interface MovieData {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface GenresResponseData {
  genres: GenresData[]
}

interface GenresData {
  id: number
  name: string
}

interface GuestSessionResponseData {
  success: boolean
  guest_session_id: string
  expires_at: string
}

export { MovieDBResponseData, MovieData, GenresResponseData, GenresData, SearchResults, GuestSessionResponseData }