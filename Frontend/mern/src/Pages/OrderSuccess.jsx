import React from 'react'
import { useParams } from 'react-router'

const OrderSuccess = () => {
  const { id } = useParams()

  function goHome() {
    window.location.href = "/"
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6'
    }}>

      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '350px'
      }}>

        <h1 style={{ color: '#16a34a', marginBottom: '10px' }}>Order Placed Successfully 🎉</h1>

        <p style={{ marginBottom: '10px', color: '#555' }}>Your Order ID:</p>

        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          {id}
        </div>

        <button
          onClick={goHome}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Go to Home
        </button>

      </div>

    </div>
  )
}

export default OrderSuccess