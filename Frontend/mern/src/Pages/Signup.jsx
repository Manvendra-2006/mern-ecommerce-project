import React from 'react'
import { useState } from 'react'
import api from '../Axios'
const Signup = () => {
  const [name,setname] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  function handleSignUp(event){
      event.preventDefault()
      const userData ={
        name,
        email,
        password,
      }
      api.post("/auth/signup",userData) // Ye axios ki post request hain jo isme body ke andar object store ho rha hain aur backend main req.body main reecive ho rha hain
      .then((response)=>{
        console.log("User SignUp successfully")
        alert("User Registered Successfully")
      })
      .catch((error)=>{
        console.log("User is not signup")
        alert("User is not registered successfully")
      })
  }
  return (
    <div>
      <form onSubmit={(event)=>handleSignUp(event)}>
        <input type="text" placeholder='Enter Name' name='name' value={name} onChange={(event)=>setname(event.target.value)}/>
        <br/>
        <br/>
        <input type = "text" placeholder='Enter Email' name="email" value={email} onChange={(event)=>setemail(event.target.value)}/>
        <br/>
        <br/>
        <input type = "text" placeholder='Enter Password' name="password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
        <br/>
        <br/>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup