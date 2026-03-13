import React from 'react'
import { useState } from 'react'
import api from '../Axios'
import { useNavigate } from 'react-router'
const AddProduct = () => {
    const [title,settitle] = useState('')
    const [description,setdescription] = useState('')
    const [stock,setstock] = useState(0)
    const [prices,setprices] = useState(0)
    const [category,setcategory] = useState('')
    const navigate = useNavigate()
   async  function addproducts(event){
        event.preventDefault()
        const productsData = {
            title,
            description,
            stock,
            prices,
            category,
        }
     await   api.post("/products/add",productsData)
        .then((res)=>{
            alert("Product is added")
            navigate("/admin/products")
        })
        .catch((err)=>{
            alert("NO")
        })
    }   
  return (
    <div>
        <form action="" onSubmit={(event)=>addproducts(event)}>
            <input type="text" placeholder='Enter Title' name="title" value={title} onChange={(event)=>settitle(event.target.value)} />
            <br/>
            <br/>
            <input type="text" placeholder='Enter Description' name='description' value={description}  onChange={(event)=>setdescription(event.target.value)}/>
            <br/>
            <br/>
            <input type="number" placeholder='Enter Prices ' name="prices" value={prices} onChange={(event)=>setprices(event.target.value)} />
            <br/>
            <br/>
            <input type="text" placeholder='Enter Category' name="category" value={category} onChange={(event)=>setcategory(event.target.value)} />
            <br/>
            <br/>
            <input type="number" placeholder='Enter Stock' name="stock" value={stock} onChange={(event)=>setstock(event.target.value)}/>
            <br/>
            <br/>
            <button type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct