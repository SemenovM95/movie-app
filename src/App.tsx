import { Component } from 'react'

import MoviesList from 'components/presentational/MoviesList/MoviesList.tsx'
import MDBService from 'src/services/moviedbService.ts'

import type { AppState } from './App.d'
import style from './App.module.scss'

export default class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      guestSessionId: '',
    }
  }

  componentDidMount() {
    this.createGuestSession()
  }

  createGuestSession = async () => {
    return MDBService.createGuestSession()
      .then((data) => this.setState({ guestSessionId: data.guest_session_id }))
      .catch((err) => {
        throw new Error(err)
      })
  }

  render() {
    const {
      state: { guestSessionId },
    } = this
    return (
      <main className={style.page}>
        <div className={style.layout}>
          <MoviesList guestSessionId={guestSessionId} />
        </div>
      </main>
    )
  }
}
