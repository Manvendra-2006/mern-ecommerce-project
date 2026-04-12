import React, { useState } from 'react'
import api from '../axios'
import { useNavigate } from 'react-router'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  function handlelogin(event) {
    event.preventDefault()
    const userData = { email, password }

    api.post("/auth/login", userData)
      .then((res) => {       
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.user.id)
        alert("Login Successfully")
        navigate("/")
      })
      .catch(() => {   
        alert("Login Not Valid")
      })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6'
    }}>

      <form onSubmit={handlelogin} style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '350px'
      }}>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        <input
          type="text"
          placeholder='Enter Email'
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <input
          type="password"
          placeholder='Enter Password'
          name='password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <button
          type='submit'
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
          Login
        </button>

      </form>

    </div>
  )
}

export default Login

// Note: action attribute use nahi kiya kyunki React SPA me page reload avoid karte hain.
// handlelogin function manually API call karta hai aur smooth navigation deta hai.