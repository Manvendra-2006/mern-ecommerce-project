import React from 'react'
import api from '../Axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  const [products,setproducts] = useState([])
  const [search,setsearch] = useState('')
  const [category,setcategory] = useState('')
  async function loadProducts(){
    const response = await api.get(`/products?search=${search}&category=${category}`)
    setproducts(response.data)
  }
  useEffect(()=>{
    console.log(products)
  },[products])
  useEffect(()=>{
    loadProducts()    
  },[search,category])
  return (
    <div>
      <input type="text" placeholder='Search Products' value={search} onChange={(event)=>setsearch(event.target.value)}/>
      <select value={category} onChange={(event)=>setcategory(event.target.value)}>
      <option value="">All </option>
      <option value="Mobile">Mobile</option>
      <option value="cosmetics">Cosmetics</option>
      </select>
      {
        products.map((item)=>{
          return(
            <div>
              <Link to={`/products/${item._id}`} >
              <img 
              src={item.image}
              alt={item.title}
              />
              </Link>
              </div>
          )
        })
      }
       
    </div>
  )
}

export default Home