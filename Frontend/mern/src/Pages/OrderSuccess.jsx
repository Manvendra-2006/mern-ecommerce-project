import React from 'react'
import { useParams } from 'react-router'

const OrderSuccess = () => {
    const {id} = useParams()
    function goHome(){
        window.location.href = "/"
    }
  return (
    <div>
        <h1>Order Placed Successfully</h1>
        <p>Your Order Id </p>
        <span>{id}</span>
        <button onClick={goHome}>Home Page</button>
    </div>
  )
}

export default OrderSuccess