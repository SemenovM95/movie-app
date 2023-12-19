import { Component, createContext, SyntheticEvent } from 'react'
import { Input, Tabs, Spin, Pagination, Alert } from 'antd'
import _ from 'lodash'

import MovieCard from 'components/MovieCard/MovieCard.tsx'
import MDBService from 'src/services/moviedbService.ts'
import LS from 'src/helpers/localStorageHelper.ts'

import type { MoviesListState } from './MoviesList.d'
import style from './MoviesList.module.scss'

const { debounce } = _

const { Provider: MoviesListContextProvider, Consumer: MoviesListContextConsumer } = createContext<any[] | null>(null)
export { MoviesListContextConsumer }

export default class MoviesList extends Component<any, MoviesListState> {
  constructor(props: any) {
    super(props)
    this.state = {
      movies: [],
      genres: [],
      rated: [],
      userSearch: 'return',
      currPage: 1,
      error: false,
      loading: false,
      activeTab: 'search',
      totalResults: 0,
    }
  }

  componentDidMount() {
    this.getRated()
    this.getMovies('return', 1)
    this.getGenres()
  }

  componentDidUpdate(_prevProps: Readonly<any>, prevState: Readonly<MoviesListState>) {
    const { activeTab, userSearch } = this.state
    if (prevState.activeTab !== activeTab) {
      this.setState({ currPage: 1 })
      if (activeTab === 'search') {
        this.getMovies(userSearch, 1)
      }
    }
  }

  componentDidCatch(error: Error) {
    this.onError(error)
  }

  onError = (error: Error) => {
    this.setState({ error, loading: false })
  }

  getMovies = async (query: string, page: number) => {
    this.setState({ loading: true })
    try {
      const res = await MDBService.searchMovie(query, page)
      this.setState({ movies: res.results, totalResults: res.totalResults, loading: false, error: false })
    } catch (err) {
      this.onError(err as Error)
    }
  }

  getRated = () => {
    const rated = LS.getFromLocalStorage('userRated')
    this.setState({ rated })
  }

  getGenres = async () => {
    try {
      const genres = await MDBService.getGenres()
      this.setState({ genres })
    } catch (err) {
      this.onError(err as Error)
    }
  }

  getUserRating = (movieId: number) => {
    const {
      state: { rated },
    } = this
    const found = rated.find((movie) => movie.id === movieId)
    return found ? found.userRating : undefined
  }

  setPage = (page: number) => {
    this.setState({ currPage: page }, () => {
      const { userSearch, currPage } = this.state
      return this.getMovies(userSearch, currPage)
    })
  }

  setTab = (key: 'search' | 'rated') => {
    this.getRated()
    this.setState({ activeTab: key })
  }

  onUserSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    const {
      state: { activeTab },
      setState,
    } = this
    if (activeTab === 'rated') setState({ activeTab: 'search' })
    const { value } = e.target as HTMLInputElement
    this.setState({ userSearch: value, currPage: 1 }, () => this.getMovies(value, 1))
  }

  renderMoviesList = () => {
    const {
      setPage,
      getUserRating,
      state: { movies, rated, currPage, totalResults, activeTab },
    } = this
    const data = activeTab === 'search' ? movies : rated.slice((currPage - 1) * 10, currPage * 10)
    const totalItems = activeTab === 'search' ? totalResults : rated.length
    return (
      <>
        <ul className={style.moviesList}>
          {data ? (
            data.map((movie) => {
              const movieData = {
                ...movie,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
                voteAverage: movie.vote_average,
                genreIds: movie.genre_ids,
                userRating: activeTab === 'search' ? getUserRating(movie.id) : movie.userRating,
              }
              return <MovieCard key={movie.id} movie={movieData} />
            })
          ) : (
            <p>No movies found</p>
          )}
        </ul>
        <Pagination
          defaultCurrent={1}
          current={currPage}
          total={totalItems}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          onChange={setPage}
          style={{ marginTop: '36px' }}
          showSizeChanger={false}
          hideOnSinglePage
        />
      </>
    )
  }

  // eslint-disable-next-line class-methods-use-this
  renderError = (error: Error) => {
    return (
      <Alert
        message="Error"
        description={`Something went wrong (${error.message})`}
        type="error"
        showIcon
        style={{ marginTop: '36px' }}
      />
    )
  }

  render() {
    const {
      renderMoviesList,
      renderError,
      setTab,
      onUserSearch,
      state: { loading, error, genres },
    } = this
    return (
      <MoviesListContextProvider value={genres}>
        <section className={style.moviesSection}>
          <Tabs
            items={[
              { label: 'Search', key: 'search' },
              { label: 'Rated', key: 'rated' },
            ]}
            defaultActiveKey="1"
            centered
            onChange={(key: string) => setTab(key as 'rated' | 'search')}
          />
          <Input type="text" size="large" placeholder="Type to search..." onChange={debounce(onUserSearch, 700)} />
          {error && renderError(error)}
          {!error && !loading && renderMoviesList()}
          {loading && <Spin size="large" style={{ transform: 'translateY(100%)' }} />}
        </section>
      </MoviesListContextProvider>
    )
  }
}
