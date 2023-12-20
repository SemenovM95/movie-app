import type { MovieData } from 'src/services/moviedbService.d'


interface Movie extends MovieData {
  posterPath: MovieData['poster_path']
  releaseDate: MovieData['release_date']
  voteAverage: MovieData['vote_average']
  genreIds: number[]
  userRating: number | undefined
}

interface MovieCardProps {
  movie: Movie
  onUpdateRating: () => void
}

export { MovieCardProps }