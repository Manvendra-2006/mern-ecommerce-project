import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";
import Signup from "./Pages/Signup";
import React from 'react'
import EditProduct from "./Admin/EditProduct";
import AddProduct from "./Admin/AddProduct";
import ProductList from "./Admin/ProductList";
import Navbar from "./Components/Header";
import Cart from "./Components/Cart";
import CheckOutAddress from "./Pages/CheckOutAddress";
import CheckOut from "./Pages/CheckOut";
import OrderSuccess from "./Pages/OrderSuccess";
function Layout(){
  return(
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/user/cart" element={<Cart/>}/>
          <Route path="/checkout-address" element={<CheckOutAddress/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/order-success/:id" element={<OrderSuccess/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
