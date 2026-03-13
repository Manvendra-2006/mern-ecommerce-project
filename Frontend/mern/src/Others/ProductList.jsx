import React, { useEffect, useState } from 'react'

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
                        <Link to={`/products/edit/${products._id}`}>Edit</Link>
                      <button onClick={()=>deletedProducts(products._id)}>Delete</button>
                        </div>
                )
            })
        }
            <Link to="/admin/products/add">Add New Products</Link>
    </div>
  )
}

export default ProductList