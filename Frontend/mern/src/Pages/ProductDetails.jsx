import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
    loadProducts()
  }, [])

  if (!products) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '30px',
      display: 'flex',
      justifyContent: 'center'
    }}>

      <div style={{
        display: 'flex',
        gap: '30px',
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        width: '100%',
        flexWrap: 'wrap'
      }}>

        <div style={{ flex: 1, minWidth: '250px' }}>
          <img
            src={products.image}
            alt={products.title}
            style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '250px' }}>
          <h2 style={{ marginBottom: '10px' }}>{products.title}</h2>

          <p style={{ color: '#555', marginBottom: '10px' }}>
            {products.description}
          </p>

          <p style={{ marginBottom: '8px' }}><b>Category:</b> {products.category}</p>
          <p style={{ marginBottom: '8px' }}><b>Stock:</b> {products.stock}</p>

          <h3 style={{ marginTop: '10px', marginBottom: '15px' }}>₹ {products.prices}</h3>

          <button style={{
            padding: '12px 20px',
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Add To Cart
          </button>
        </div>

      </div>

    </div>
  )
}

export default ProductDetails