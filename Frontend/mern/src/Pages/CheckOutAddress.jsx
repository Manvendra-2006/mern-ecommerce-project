import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../Axios'

const CheckOutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setform] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  })

  const handleChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const saveAddress = async (e) => {
    e.preventDefault()
    await api.post("/address/saveAddress", {
      ...form,
      userId,
    })
    navigate("/checkout")
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '400px', backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>

        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Delivery Address</h1>

        {Object.keys(form).map((item) => (
          <div key={item} style={{ marginBottom: '12px' }}>
            <input
              name={item}
              placeholder={item}
              onChange={handleChange}
              value={form[item]}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                outline: 'none'
              }}
            />
          </div>
        ))}

        <button
          onClick={saveAddress}
          style={{
            width: '100%',
            marginTop: '15px',
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '12px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Save Address
        </button>

      </div>
    </div>
  )
}

export default CheckOutAddress
