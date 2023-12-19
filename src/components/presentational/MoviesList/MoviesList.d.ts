import type { MoviesResponseData } from 'src/services/moviedbService.d'
import MoviesList from "components/presentational/MoviesList/MoviesList.tsx";

interface MoviesListState {
  movies: Movie[]
  genres: Genre[]
  rated: Movie[]
  userSearch: string,
  currPage: number
  loading: boolean
  error: false | Error
  activeTab: 'search' | 'rated'
  totalResults: number
}

interface MoviesListProps {
  guestSessionId: string
}

export { MoviesListState }