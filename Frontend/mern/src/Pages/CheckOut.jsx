import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../Axios'
const CheckOut = () => {
    const userId =localStorage.getItem("userId")
    const [address,setaddress] = useState([])
    const [cart,setcart] = useState(null)
    useEffect(()=>{
        api.get(`/cart/${userId}`)
        .then((res)=>{
            setcart(res.data)
        })
        api.get(`/address/${userId}`).then((res)=> setaddress(res.data))
    },[])
    if(!cart){
        return  <div>...loading</div>
    }
    const total = cart.items.reduce((sum,i)=> sum+i.quantity * i.productId.prices ,0)
  return (
    <div>
        <h1>CheckOut</h1>
        <h1>Select Address</h1>
        {
            address.map((item)=>{
                return (
                    <div>
                        <p>{item.fullName}</p>
                        <p>{item.phone}</p>
                        <p>{item.addressLine}</p>
                        <p>{item.city}</p>
                    </div>
                )
            })
        }
        <h2>Order Summary</h2>
        <p>Total Amount : {total}</p>
        <button>Place Order (COD)</button>
    </div>
  )
}

export default CheckOut