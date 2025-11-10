import Home from './pages/Home'
import MainLayout from './layout/MainLayout'
import Product from './pages/Product'
import { Route, Routes } from 'react-router'
import Products from './pages/Products'

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
      </Route>
    </Routes>
  )
}

export default App
