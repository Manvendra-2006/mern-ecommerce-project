
import React, { useState } from 'react'
import api from '../Axios'
import { useNavigate } from 'react-router'
const Login = () => {
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const navigate = useNavigate()
  function handlelogin(event){
    event.preventDefault()
    const userData = {
      email,
      password,
    }
    api.post("/auth/login",userData)
    .then((res)=>{
      console.log("Login Successfully")
      localStorage.setItem('token',res.data.token) // axios main backend se aaya hua data res.data main hota hain aur frontend se ackend main koi data jata hain toh backend main req.body main jaata hain
      alert("Login Successfully")
      navigate("/")
      
    })
    .catch(()=>{
      console.log("Login Failed")
      alert("Login Not Valid")
    })
  }
  return (
    <div>
      <form action="" onSubmit={(event)=>handlelogin(event)}>  
        <input type="text" placeholder='Enter Email....' name="email" onChange={(event)=>setemail(event.target.value)} value={email}/>
        <br/>
        <br/>
        <input type="password" placeholder='Enter Password....' name='password' onChange={(event)=>setpassword(event.target.value)} value={password}/>
        <br/>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login

// humne action ka use isliye nhi kiya kykoi jab hum krenge toh Browser /login url pe request bhejga aur reload ho jayega fir server response
