import type { RatingsProps } from '../../types'
import { Star, StarBorder, StarHalf } from '@mui/icons-material'
// Ratings with stars
const Ratings = ({ rating }: RatingsProps) => {
  const totalStars: number = 5
  const fullStars = Math.floor(rating)
  const decimalPart: number = rating - fullStars
  const halfStars: boolean = decimalPart >= 0.5
  const emptyStars: number = totalStars - fullStars - Number(halfStars)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <div>
        {fullStars &&
          [...Array(fullStars)].map((_, i) => (
            <Star className='star-style' key={i} sx={{ fontSize: '1.09rem' }} />
          ))}
        {halfStars && (
          <StarHalf className='star-style' sx={{ fontSize: '1.09rem' }} />
        )}
        {emptyStars > 0 &&
          [...Array(emptyStars)].map((_, i) => (
            <StarBorder
              className='star-style'
              key={i}
              sx={{ fontSize: '1.09rem' }}
            />
          ))}
      </div>
      <span className='text-[0.8rem]'>({rating})</span>
    </div>
  )
}

export default Ratings
