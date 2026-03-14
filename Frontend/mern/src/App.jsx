import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";
import Signup from "./Pages/Signup";
import React from 'react'
import EditProduct from "./Admin/EditProduct";
import AddProduct from "./Admin/AddProduct";
import ProductList from "./Admin/ProductList";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/productdetails" element={<ProductDetails/>}/>
     <Route path="/admin/products" element={<ProductList/>}/>
        <Route path="/admin/products/edit/:id" element={<EditProduct/>}/>
        <Route path="/admin/products/add" element={<AddProduct/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App