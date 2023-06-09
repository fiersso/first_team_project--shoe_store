import { Routes, Route, Navigate } from 'react-router-dom'

import Home from "./pages/Home/Home"
import Login from './pages/Registration&Login/Login'
import Registration from "./pages/Registration&Login/Registration"
import Catalog from "./pages/Catalog/Catalog"
import Layout from './pages/Layout'
import ItemPage from './pages/ItemPage/ItemPage'
import CartPage from './pages/CartPage/CartPage'

function App() {
  return (
    <>
    
      <Routes>
        
        <Route path='/*' element={<Layout />} > 
          
          <Route index element={<Home PageTitle='home page'/>} />

          <Route path='catalog' element={<Catalog PageTitle='catalog'/>}/>

          <Route path='item/*' element={<ItemPage />}/>

          <Route path='cart' element={<CartPage PageTitle='my cart' />}/>
          
        </Route>

        <Route path='login' element={<Login PageTitle='login'/>} />
        <Route path='registration' element={<Registration PageTitle='registration'/>} />

      </Routes>
    </>
  )
}

export default App
