import { Progress } from 'antd'

import type { RatingCircleProps, RatingCircleColor } from './RatingCircle.d'
import style from './RatingCircle.module.scss'

const getRatingColor = (voteAverage: number): RatingCircleColor => {
  if (voteAverage > 7) return '#66E900'
  if (voteAverage > 5) return '#E9D100'
  if (voteAverage > 3) return '#E97E00'
  return '#E90000'
}
// eslint-disable-next-line react/prefer-stateless-function
export default function RatingCircle(props: RatingCircleProps) {
  const { voteAverage } = props

  return (
    <div className={style.ratingCircle}>
      <span className={style.ratingCircleValue}>{voteAverage.toFixed(1)}</span>
      <Progress
        size={30}
        type="circle"
        strokeColor={getRatingColor(voteAverage)}
        strokeLinecap="butt"
        showInfo={false}
        percent={100}
      />
    </div>
  )
}
