import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../Axios'
const ProductList = () => {
    const [products,setproducts] = useState([])
    async function loadProducts(){
       const response = await api.get("/products")
       setproducts(response.data)
    }
    async function deletedProducts(id){
        try{
            await api.delete(`/products/delete/${id}`)
            alert("Product deleted Successfully")
            loadProducts()
        }                 
        catch(error)   {
            console.log("error deleting",error)
        }
    }
    useEffect(()=>{
        loadProducts()
    },[])
  return (
    <div>
        {
            products && products.map((item)=>{
                return(
                    <div>
                        <h1>{item.title}</h1>
                        <img src={item.image}/>
                        <Link to={`/admin/products/edit/${item._id}`}  >Edit</Link>
                      <button onClick={()=>deletedProducts(item._id)}>Delete</button>
                        </div>
                )
            })
        }
            <Link to="/admin/products/add">Add New Products</Link>
    </div>
  )
}

export default ProductList