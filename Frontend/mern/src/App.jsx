import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";
import Signup from "./Pages/Signup";
import React from 'react'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/productdetails" element={<ProductDetails/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App