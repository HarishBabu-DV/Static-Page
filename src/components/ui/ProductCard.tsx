import type {
  FavoriteButtonProps,
  ProductCardProps,
  RatingsProps,
} from '../../types'
import { useEffect, useState } from 'react'
import {
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  StarHalf,
} from '@mui/icons-material'
import Ratings from './Ratings'
import AddToCartButton from './AddToCartButton'

// Favorite Button
const FavoriteButton = ({ id }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    const favoriteProducts = localStorage.getItem('favoriteProducts')
    //  Add or remove item
    if (favoriteProducts) {
      let favoriteProductsArr = JSON.parse(favoriteProducts) as number[]

      if (!favoriteProductsArr.includes(id)) {
        favoriteProductsArr.push(id)
      } else {
        favoriteProductsArr = favoriteProductsArr.filter(
          (item: number) => Number(item) !== Number(id)
        )
      }
      localStorage.setItem(
        'favoriteProducts',
        JSON.stringify(favoriteProductsArr)
      )
    } else {
      const favoriteProductsArr = [id]
      localStorage.setItem(
        'favoriteProducts',
        JSON.stringify(favoriteProductsArr)
      )
    }
    setIsFavorite(!isFavorite)
  }
  useEffect(() => {
    const favoriteProducts = localStorage.getItem('favoriteProducts')

    if (favoriteProducts) {
      const favoriteProductsArr = JSON.parse(favoriteProducts)
      if (favoriteProductsArr.includes(id)) {
        setIsFavorite(true)
      }
    }
  }, [id])
  return (
    <button
      type='button'
      style={{
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 20,
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '.3rem',
      }}
      onClick={handleFavorite}>
      {isFavorite ? (
        <Favorite style={{ color: 'red', fontSize: '1.35rem' }} />
      ) : (
        <FavoriteBorder style={{ color: 'gray', fontSize: '1.35rem' }} />
      )}
    </button>
  )
}

const ProductCard = ({
  prodId,
  width,
  height,
  imgSrc,
  imgAlt,
  title,
  description,
  price,
  rating,
}: ProductCardProps) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '5px',
      }}>
      {/* Card Media  */}
      <div style={{ width, height, position: 'relative' }}>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className='bg-gray-100'
        />
        <FavoriteButton id={prodId} />
      </div>
      {/* <Divider style={{ borderColor: "#afafafff", margin: 0 }} /> */}
      {/* Card Content  */}
      <div
        style={{
          paddingInline: '0.7rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          paddingBlock: '0.8rem',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <span className='product-heading'>{title}</span>
          <span style={{ fontSize: '1.2rem' }}>${price}</span>
        </div>
        <p className='product-description'>{description}</p>
        <Ratings rating={rating} />
        <AddToCartButton padding='0.4rem 0.85rem' fontSize='0.76rem' />
      </div>
    </div>
  )
}

export default ProductCard
