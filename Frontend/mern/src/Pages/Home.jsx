import React, { useState, useEffect } from 'react'
import api from '../axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const [products, setproducts] = useState([])
  const [search, setsearch] = useState('')
  const [category, setcategory] = useState('')
  async function loadProducts() {
    const response = await api.get(`/products?search=${search}&category=${category}`)
    setproducts(response.data)
  }    
  useEffect(() => {
    loadProducts()
  }, [search, category])
  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.info("Please log in to add items to your cart")
      return;
    }

    await api.post('/cart/add', { userId, productId })
    const res1 = await api.get(`/cart/${userId}`)

    const total = res1.data.items.reduce((sum, item) => sum + item.quantity, 0)
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event('cartUpdated'))
    toast.success("Added to cart")
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder='Search Products'
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            flex: '1'
          }}
        />
        <select
          value={category}
          onChange={(e) => setcategory(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">All</option>
          <option value="Mobile">Mobile</option>
          <option value="cosmetics">Cosmetics</option>
        </select>
      </div>
   
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>

        {products.map((item) => (
          <div key={item._id} style={{
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>

            <Link to={`/products/${item._id}`}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </Link>

            <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{item.title}</h3>

            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>₹ {item.prices}</p>

            <button
              onClick={() => addToCart(item._id)}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Home