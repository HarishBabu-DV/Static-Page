import { useParams } from 'react-router'
import { useProducts } from '../context/productsContext'
import type { ProductType } from '../types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Breadcrumb, Button, ColorPicker } from 'antd'
import { capitalize } from '../utils/capitalize'
import Ratings from '../components/ui/Ratings'
import {
  InboxOutlined,
  MinusOutlined,
  PlusOutlined,
  TruckOutlined,
} from '@ant-design/icons'
import AddToCartButton from '../components/ui/AddToCartButton'

type BreadcrumbType = {
  title: string
}

// Quantity Selector Component
const QuantitySelector = () => {
  const [quantity, setQuantity] = useState<number>(1)
  return (
    <div className='bg-[#eeeeee]  rounded-3xl'>
      <MinusOutlined
        style={{
          padding: '.5rem .8rem',
          color: '#0a3c0cff',
          fontSize: '0.8rem',
        }}
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1)
          }
        }}
      />
      <button
        type='button'
        style={{
          padding: '.5rem .7rem',
          color: '#0a3c0cff',
          userSelect: 'none',
          fontSize: '0.8rem',
        }}>
        {quantity}
      </button>
      <PlusOutlined
        style={{
          padding: '.5rem .7rem',
          color: '#0a3c0cff',
          fontSize: '0.8rem',
        }}
        onClick={() => {
          if (quantity >= 1 && quantity < 10) {
            setQuantity(quantity + 1)
          }
        }}
      />
    </div>
  )
}

const ProductStock = ({ stock }: { stock: number }) => {
  if (stock > 20) {
    return <p className='text-xl text-green-600'>In Stock</p>
  } else if (stock > 10 && stock <= 20) {
    return (
      <div className='flex flex-col  rounded-full px-2 py-1 text-[0.75rem]'>
        <p>
          Only <span className='text-amber-400'>{stock} items</span> left
        </p>
        <span>Don't miss out</span>
      </div>
    )
  } else if (stock > 0 && stock <= 10) {
    return (
      <div className='flex flex-col  rounded-full px-2 py-1 text-[0.75rem]'>
        <p>
          Only <span className='text-red-600'>{stock} items</span> left
        </p>
        <span>Hurry Up!</span>
      </div>
    )
  } else {
    return <p className='text-xl text-red-600'>No Stock</p>
  }
}

const DeliveryDetails = ({ returnPolicy }: { returnPolicy: string }) => {
  if (returnPolicy === 'No return policy') {
    return (
      <div className='flex-align-center bg-gray-100 w-[400px]'>
        <TruckOutlined style={{ fontSize: '1.2rem', width: '20%' }} />
        <div>
          <h5>Free Delivery</h5>
          <p>Enter your postal code for delivey availability</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className='bg-gray-100 flex flex-col gap-4 w-[400px] p-2'>
        <div className='flex-align-center gap-2'>
          <TruckOutlined style={{ fontSize: '1.2rem', color: '#c9980e' }} />
          <div>
            <h5 className='text-[0.9rem] font-medium'>Free Delivery</h5>
            <p className='text-[0.8rem] underline'>
              Enter your postal code for delivey availability
            </p>
          </div>
        </div>
        <div className='flex-align-center gap-2'>
          <InboxOutlined style={{ fontSize: '1.2rem', color: '#c9980e' }} />
          <div>
            <h5 className='text-[0.9rem] font-medium'>Return Policy</h5>
            <p className='text-[0.8rem] underline'>
              Free {returnPolicy?.split(' ')?.[0]} days return policy
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const Product = () => {
  const [currentProduct, setCurrentProduct] = useState<ProductType>()
  const [activeImg, setActiveImg] = useState<string>('')
  const { id } = useParams()
  const { products } = useProducts()

  const handleImageClick = useCallback((e: string) => {
    setActiveImg(e)
  }, [])
  const breadcrumbs = useMemo(() => {
    const breadcrumbs: BreadcrumbType[] = []
    if (currentProduct) {
      breadcrumbs.push({ title: capitalize(currentProduct.category) })
      const tags = currentProduct.tags?.map((e) => {
        return { title: capitalize(e) }
      })
      breadcrumbs.push(...tags)
      breadcrumbs.push({ title: currentProduct.title })
      return breadcrumbs
    }
    return []
  }, [currentProduct])
  console.log('breadcrumbs', breadcrumbs)
  useEffect(() => {
    setCurrentProduct(products.find((e) => e.id === Number(id)))
  }, [products, id])
  return (
    <div>
      <section style={{ display: 'flex' }}>
        {/*------------- Product Image---------------- */}
        <div className='px-16 flex flex-col gap-4'>
          <Breadcrumb items={breadcrumbs} />
          {/* Main Image  */}
          <div style={{ width: '530px', height: '400px' }}>
            <img
              src={activeImg || currentProduct?.thumbnail}
              alt={currentProduct?.title}
              style={{ width: '100%', height: '100%' }}
              className='bg-gray-100'
            />
          </div>
          {/* Additional Images  */}
          <div style={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}>
            {currentProduct?.images.map((e) => (
              <button
                type='button'
                key={e}
                style={{ width: '100px', height: '80px' }}
                onClick={() => handleImageClick(e)}>
                <img
                  src={e}
                  alt={currentProduct?.title}
                  style={{ width: '100%', height: '100%' }}
                  className='bg-gray-100'
                />
              </button>
            ))}
          </div>
        </div>
        {/*-------------- Product Details---------------- */}
        <div className='flex flex-col gap-8 py-10'>
          {/* Description  */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>{currentProduct?.title}</h1>
            <p className='text-[0.75rem]'>{currentProduct?.description}</p>
            <Ratings rating={currentProduct?.rating} />
          </div>
          {/* Price Details  */}
          <div className='flex flex-col gap-0.5'>
            <h3 className='font-semibold text-xl'>
              $ {currentProduct?.price} or 9.99/month
            </h3>
            <p className='text-[0.75rem]'>
              {currentProduct?.shippingInformation}
            </p>
          </div>
          {/* Color Details  */}
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-[0.9rem]'>Choose a Color</p>
            <div></div>
            <ColorPicker
              defaultValue={'#ddd'}
              style={{ width: 'max-content' }}
            />
          </div>
          {/* Quantity Details  */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-8'>
              <QuantitySelector />
              <ProductStock stock={currentProduct?.stock} />
            </div>
            <div className='flex items-center gap-3'>
              <Button
                style={{
                  backgroundColor: '#0a3c0cff',
                  color: 'white',
                  borderRadius: '20px',
                  border: '1px solid #0a3c0cff',
                  padding: '1.05rem 2.5rem',
                }}>
                Buy Now
              </Button>
              <Button
                style={{
                  color: '#0a3c0cff',
                  backgroundColor: 'white',
                  border: '1px solid #0a3c0cff',
                  borderRadius: '20px',
                  padding: '1.05rem 2.5rem',
                }}>
                Add to Cart
              </Button>
            </div>
          </div>
          {/* Delivery Details  */}
          <DeliveryDetails returnPolicy={currentProduct?.returnPolicy} />
        </div>
      </section>
    </div>
  )
}

export default Product
