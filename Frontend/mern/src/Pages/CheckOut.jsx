import React, { useEffect, useState } from 'react'
import api from '../axios'
import { useNavigate } from 'react-router'

const CheckOut = () => {
  const userId = localStorage.getItem("userId")
  const [address, setaddress] = useState([])
  const [cart, setcart] = useState(null)
  const [selectAddress, setselectAddress] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/home")
      return;
    }
    api.get(`/cart/${userId}`)
      .then((res) => {
        setcart(res.data)
      })

    api.get(`/address/${userId}`).then((res) => {
      setaddress(res.data);
      setselectAddress(res.data[0]);
    })
  }, [])

  if (!cart) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px' }}>Loading...</div>
  }

  const total = cart.items.reduce((sum, i) => sum + i.quantity * i.productId.prices, 0)

  const placeOrder = async () => {
    if (!selectAddress) {
      alert("Please Select an Address");
      return;
    }
    const res = await api.post("/order/order-placed", { userId, address: selectAddress })
    navigate(`/order-success/${res.data.orderId}`)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px' }}>
      <div style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

      
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '22px', marginBottom: '15px' }}>Select Address</h1>

          {address.map((item, index) => (
            <div
              key={index}
              onClick={() => setselectAddress(item)}
              style={{
                border: selectAddress === item ? '2px solid green' : '1px solid gray',
                backgroundColor: selectAddress === item ? '#e6ffe6' : '#fff',
                padding: '12px',
                marginBottom: '10px',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="address"
                checked={selectAddress === item}
                onChange={() => setselectAddress(item)}
              />
              <p><b>{item.fullName}</b></p>
              <p>{item.phone}</p>
              <p>{item.addressLine}</p>
              <p>{item.city}, {item.state} - {item.pincode}</p>
            </div>
          ))}
        </div>

    
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Order Summary</h2>

          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {cart.items.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
                <span>{item.productId.title} × {item.quantity}</span>
                <span>₹ {item.quantity * item.productId.prices}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '15px', borderTop: '1px solid #ddd', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          <button
            onClick={placeOrder}
            style={{
              width: '100%',
              marginTop: '20px',
              backgroundColor: 'green',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Place Order (COD)
          </button>
        </div>

      </div>
    </div>
  )
}

export default CheckOut