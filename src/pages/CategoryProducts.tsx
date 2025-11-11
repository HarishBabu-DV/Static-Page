import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import type { ProductType } from '../types'
import ProductCard from '../components/ui/ProductCard'

const CategoryProducts = () => {
  const { productCategory } = useParams()
  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([])
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${productCategory}`
      )
      setCategoryProducts(data?.products)
    }
    getProducts()
  })

  return (
    <div>
      <h1 className='text-xl px-12 font-semibold capitalize'>
        {productCategory}
      </h1>
      <div className='product-container   py-5 px-12'>
        {categoryProducts.map((prod) => (
          <Link
            key={prod.id}
            to={`/product/${prod.id}`}
            style={{ textDecoration: 'none', color: 'black' }}>
            <ProductCard
              prodId={prod.id}
              width={'100%'}
              height={220}
              title={prod.title}
              imgSrc={prod.thumbnail}
              imgAlt={prod.title}
              description={prod.description}
              price={prod.price}
              rating={prod.rating}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryProducts
