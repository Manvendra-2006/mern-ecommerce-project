import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../Axios'
import { useNavigate } from 'react-router'
const CheckOut = () => {
    const userId =localStorage.getItem("userId")
    const [address,setaddress] = useState([])
    const [selectAddress,setselectAddress] = useState(null);
    const [cart,setcart] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userId){
            navigate("/home")
            return;
        }
        api.get(`/cart/${userId}`)
        .then((res)=>{
            setcart(res.data)
        })
        api.get(`/address/${userId}`).then((res)=> {
            setaddress(res.data);
         setselectAddress(res.data[0]);
    })
    },[])
    if(!cart){
        return  <div>...loading</div>
    }
    const total = cart.items.reduce((sum,i)=> sum+i.quantity * i.productId.prices ,0)

    const placeOrder = async () =>{
        if(!selectAddress){
            alert("Please Select an Address");
            return ;
        }
        const res =  await api.post("/order/order-placed",{userId,address : selectAddress}) 
        navigate(`/order-success/${res.data.orderId}`)
     
    }
  return (
    <div>
        <h1>CheckOut</h1>
        <h1>Select Address</h1>
        {
  address.map((item, index) => (
    <div key={index} style={{
      border: selectAddress === item ? '2px solid green' : '1px solid gray',
      padding: '10px',
      marginBottom: '10px',
      cursor: 'pointer'
    }}
    onClick={() => setselectAddress(item)}
    >
      <input
        type="radio"
        name="address"
        checked={selectAddress === item}
        onChange={() => setselectAddress(item)}
      />
      <p>{item.fullName}</p>
      <p>{item.phone}</p>
      <p>{item.addressLine}</p>
      <p>{item.city}</p>
      <p>{item.state} - {item.pincode}</p>
    </div>
  ))
}
        <h2>Order Summary</h2>
        <p>Total Amount : {total}</p>
        <button onClick={placeOrder}>Place Order (COD)</button>
    </div>
  )
}

export default CheckOut