import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../Axios';
const CheckOutAddress = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [form,setform] = useState({
         fullName:"" ,
    phone :"",
    addressLine :"",
    city:"",
    state:"",
    pincode:"" ,
    })
    const handleChange = (event) =>{
        setform({
            ...form,
            [event.target.name] : event.target.value,
        })
    }
    const saveAddress = async (e)=>{
        e.preventDefault()
            await api.post("/address/saveAddress",{ // The whole data is going to backend
                ...form, // This make copy of form 
                userId,
            })
            navigate("/checkout")
    }
  return (
    <div>
        <h1>Delivery Address</h1>
        {
            Object.keys(form).map((item)=>{
                return(
                    <div>
                        <input key={item} 
                        name ={item}
                        placeholder={item}
                        onChange={(event)=>handleChange(event)} // Here whole event object is passing
                        value={form[item]}
                        />
                        </div>
                )
            })
        }
    <button onClick={(e)=>saveAddress(e)}>Save Address</button>
    </div>
  )
}

export default CheckOutAddress