import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductList from '../components/main/product/ProductList'
import ProductAdd from '../components/main/product/ProductAdd'
import ProductDetail from '../components/main/product/ProductDetail'
import ProductEdit from '../components/main/product/ProductEdit'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductList />}/>
            <Route path="/products/add" element={<ProductAdd />}/>
            <Route path="/products/:id" element={<ProductDetail />}/>
            <Route path="/products/:id/edit" element={<ProductEdit />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes