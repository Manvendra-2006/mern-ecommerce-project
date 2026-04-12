import React, { useState } from 'react'
import api from '../Axios'

const Signup = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  function handleSignUp(event) {
    event.preventDefault()
    const userData = { name, email, password }

    api.post("/auth/signup", userData)
      .then(() => {       
        alert("User Registered Successfully")
      })
      .catch(() => {
        alert("User is not registered successfully")
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

      <form onSubmit={handleSignUp} style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '350px'
      }}>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>

        <input
          type="text"
          placeholder='Enter Name'
          name='name'
          value={name}
          onChange={(e) => setname(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

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
          name="password"
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
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sign Up
        </button>

      </form>

    </div>
  )
}

export default Signup