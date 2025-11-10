import { Link, useNavigate } from 'react-router'
import { Card, Input } from 'antd'
import { navItems, navItemsData } from '../constants/navItems'
import TopBar from './TopBar'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCategories } from '../context/categoriesContext'
import type { CategoryType } from '../types'
import type { GetProps } from 'antd'
import { useProducts } from '../context/productsContext'
import Ratings from './ui/Ratings'
type SearchProps = GetProps<typeof Input.Search>
const Header = () => {
  const { Search } = Input
  const { categoriesList, quickAccess } = navItemsData
  const { products } = useProducts()
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const { categories, setCategories } = useCategories()
  const navigate = useNavigate()
  const onSearch: SearchProps['onSearch'] = (value) => {
    setIsSearch(false)
    setSearchValue('')
    navigate(`/products?search=${value}`)
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          'https://dummyjson.com/products/category-list'
        )
        const categoriesNames: string[] = data

        // Step 2: Fetch first product thumbnail for each category
        const categoryData: CategoryType[] = await Promise.all(
          categoriesNames?.map(async (name: string, i: number) => {
            const { data } = await axios.get(
              `https://dummyjson.com/products/category/${name}`
            )
            const thumbnail = data.products?.[0]?.thumbnail || ''
            const brand = data.products?.[0]?.brand || ''
            return { id: i + 1, name, url: thumbnail, brand }
          })
        )
        setCategories(categoryData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [setCategories])

  useEffect(() => {
    console.log('searchValue', searchValue)
    if (searchValue !== '') {
      const searchedProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredProducts(searchedProducts)
    }
  }, [searchValue])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
      }}>
      <TopBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '2rem',
          backgroundColor: '#ffffffff',
          padding: '5px 50px',
          position: 'relative',
        }}>
        {/* ---------- Left Side ---------- */}
        <div className='flex-align-center  justify-between   w-[25%] '>
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.15rem',
            }}>
            <div
              style={{
                width: '50px',
                height: '50px',
              }}>
              <img
                src='/images/logo.png'
                alt=''
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <h2
              style={{ fontSize: '1.3rem' }}
              className='font-semibold text-secondary'>
              Shopcart
            </h2>
          </div>
          <div className=' no-border-select'>
            {/* Categories  */}
            <Select
              defaultValue='categories'
              style={{ width: 110, border: '0px' }}
              options={categoriesList}
            />
          </div>
        </div>
        {/* ---------- Right Side ---------- */}
        <div className='w-[75%] flex-align-center  justify-between'>
          {/* Nav Items  and Search Bar  */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              justifyContent: 'space-around',
              width: '73%',
              position: 'relative',
            }}>
            {/* Navitems  */}
            <nav style={{ display: 'flex', gap: '2.2rem' }}>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  style={{
                    color: 'black',
                    fontSize: '1rem',
                    textDecoration: 'none',
                  }}>
                  {item.name}
                </Link>
              ))}
            </nav>
            {/* Search Bar  */}
            <Search
              placeholder='Search product'
              allowClear
              className='search-bar'
              style={{
                width: '100%',
                borderRadius: '60px ',
                transition: 'position 400ms ease-out',
                ...(isSearch && {
                  position: 'absolute',
                  top: '0px',
                  zIndex: 1000,
                  backgroundColor: 'rgba(243, 243, 243)',
                }),
              }}
              onFocus={() => setIsSearch(true)}
              onBlur={() => setIsSearch(false)}
              value={searchValue}
              onSearch={onSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
            />
            {/* Categories Suggestion Box  */}
            <div
              style={{
                position: 'absolute',
                top: '200%',
                transition: 'all 200ms ease-out',
                opacity: 0,
                visibility: 'hidden',
                width: '100%',
                ...(searchValue !== ''
                  ? {
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }
                  : { height: 'max-content' }),
                backgroundColor: '#fff',
                // overflowY: 'auto',
                padding: '1.5rem',
                borderRadius: '10px',
                zIndex: 200,
                ...(isSearch && {
                  visibility: 'visible',
                  top: '180%',
                  transition: 'all 400ms ease-in',
                  opacity: 1,
                }),
              }}>
              {searchValue !== '' && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card
                    className='filtered-product-card'
                    key={product.id}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setIsSearch(false)
                      setSearchValue('')
                      navigate(`/product/${product.id}`)
                    }}>
                    <div className='w-[15%] h-[50px]'>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className='w-full h-full'
                      />
                    </div>
                    <h3 className='font-medium capitalize w-[35%]'>
                      {product.title}
                    </h3>
                    <div className='w-[35%] whitespace-nowrap overflow-hidden text-ellipsis'>
                      <Ratings rating={product.rating} />
                    </div>
                    <p className='w-[15%]'>{product.price}</p>
                  </Card>
                ))
              ) : (
                <>
                  <h2 className='pb-4 font-semibold '>Popular Categories</h2>
                  <Card style={{ width: '100%' }}>
                    <div className='grid grid-cols-2 gap-2 w-full'>
                      {categories.slice(0, 6).map((e) => (
                        <Card
                          key={e.id}
                          style={{
                            backgroundColor: 'rgba(243, 243, 243)',
                          }}>
                          {/* Image  */}
                          <div className='w-[30%]'>
                            <div key={e.id} className='w-full h-[70px]'>
                              <img
                                src={e.url}
                                alt={e?.name}
                                className='w-full h-full'
                              />
                            </div>
                          </div>
                          {/* Description  */}
                          <div className='w-[70%]'>
                            <h3 className='font-medium capitalize'>
                              {e?.name}
                            </h3>
                            <p>{e?.brand}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
          {/* Quick Access  */}
          <div className='flex-align-center  w-[23%] '>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {quickAccess.map((e) => (
                <Link
                  key={e.name}
                  to={e.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    textDecoration: 'none',
                    gap: '0.4rem',
                  }}
                  className='font-normal'>
                  <span>{<e.icon />}</span>
                  <span>{e.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
