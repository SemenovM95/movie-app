import { Tag, Rate } from 'antd'

import DateHelper from 'src/helpers/dateHelper.ts'
import MDBService from 'src/services/moviedbService.ts'
import LS from 'src/helpers/localStorageHelper.ts'
import formatText from 'src/helpers/textHelper.ts'
import RatingCircle from 'components/RatingCircle/RatingCircle.tsx'
import { MoviesListContextConsumer } from 'components/MoviesList/MoviesList.tsx'

import type { MovieCardProps } from './MovieCard.d'
import style from './MovieCard.module.scss'

export default function MovieCard(props: MovieCardProps) {
  const {
    movie: { posterPath, title, overview, releaseDate, genreIds, voteAverage, userRating },
  } = props

  const setUserRating = (rating: number) => {
    const { movie } = props
    LS.updateToLocalStorage('userRated', { ...movie, userRating: rating })
  }

  return (
    <MoviesListContextConsumer>
      {(genresData) => {
        return (
          <li className={style.movieCard}>
            <span className={style.movieCard__detailsOverallRating}>
              <RatingCircle voteAverage={voteAverage} />
            </span>
            <img
              className={style.movieCard__image}
              src={posterPath ? `${MDBService.imageURL}${posterPath}` : '/no-img-placeholder.svg'}
              alt={title || 'defaultTitle'}
            />
            <div className={style.movieCard__details}>
              <h5 className={style.movieCard__detailsHeading}>{title}</h5>
              <span className={style.movieCard__detailsReleaseDate}>
                {releaseDate ? DateHelper.formatDate(releaseDate) : 'N/A'}
              </span>
              {genresData && genresData.length && (
                <div className={style.movieCard__detailsGenres}>
                  {genreIds.length ? (
                    genreIds.map((genreId: number) => {
                      const found = genresData.find((genre) => genre.id === genreId)
                      return found ? <Tag key={found.id}>{found.name}</Tag> : null
                    })
                  ) : (
                    <p className={style.movieCard__detailsNoData}>No genre data available</p>
                  )}
                </div>
              )}
              <p className={style.movieCard__detailsDescription}>
                {formatText(overview) || 'No description available'}
              </p>
              <div className={style.movieCard__detailsUserRating}>
                <Rate
                  style={{ fontSize: '1.05rem' }}
                  count={10}
                  defaultValue={userRating || 0}
                  value={userRating}
                  allowHalf
                  onChange={setUserRating}
                />
              </div>
            </div>
          </li>
        )
      }}
    </MoviesListContextConsumer>
  )
}
