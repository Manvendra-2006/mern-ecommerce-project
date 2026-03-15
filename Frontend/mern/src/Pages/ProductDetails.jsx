import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../Axios'
const ProductDetails = () => {
  const { id } = useParams()
  const [products, setproducts] = useState('')
  async function loadProducts() {
    const response = await api.get("/products")
    const Data = response.data.find((item) => item._id == id)
    setproducts(Data)
  }
  useEffect(() => {
    console.log(products)
  }, [products])
  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div>
      <h1>{products._id}</h1>
      <h1>{products.title}</h1>
      <h1>{products.description}</h1>
      <h1>{products.stock}</h1>
      <h1>{products.prices}</h1>
      <img src={products.image} />
      <h1>{products.category}</h1>
<button>Add To Cart</button>

    </div>
  )
}

export default ProductDetails