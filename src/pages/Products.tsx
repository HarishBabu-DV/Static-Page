import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { productsBannerData } from '../constants/productsBannerData'
import { Button } from 'antd'
import type { ProductType } from '../types'
import notFound from '../assets/images/notFound.jpg'
import ProductCard from '../components/ui/ProductCard'
const Products = () => {
  const [searchParams] = useSearchParams()
  const [matchedProducts, setMatchedProducts] = useState<ProductType[]>([])
  const searchQuery = searchParams.get('search')
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${searchQuery}&limit=25`
      )
      const { products } = data
      setMatchedProducts(products)
    }
    getProducts()
  }, [searchQuery])
  console.log(matchedProducts)
  return (
    <div>
      {matchedProducts.length > 0 ? (
        <>
          <div className='products-banner-container pl-4'>
            <h1 className='text-3xl w-[400px] font-semibold capitalize text-secondary'>
              {productsBannerData.content} {searchQuery}
            </h1>
            <Button
              style={{
                backgroundColor: '#0a3c0cff',
                color: 'white',
                borderRadius: '40px',
                width: '120px',
                padding: '20px 10px',
              }}>
              {productsBannerData.btnText}
            </Button>
          </div>
          {/* List of Products  */}
          <div className='product-container  px-16 py-5'>
            <h3 className='text-xl font-medium capitalize'>
              {searchQuery} For you
            </h3>
            {matchedProducts?.map((prod) => (
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
        </>
      ) : (
        <div className=' no-products-found-container'></div>
      )}
    </div>
  )
}
export default Products
