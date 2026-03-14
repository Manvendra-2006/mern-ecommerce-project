import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../Axios'
const EditProduct = () => {
    const { id } = useParams()
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [stock, setstock] = useState(0)
    const [prices, setprices] = useState(0)
    const [category, setcategory] = useState('')
    const [image,setimage] = useState('')
    async function loadProducts() {
        const response = await api.get("/products")
        const Data = response.data.find((item) => item._id == id)
        console.log(Data)
        if (Data) {
            settitle(Data.title)
            setdescription(Data.description)
            setcategory(Data.category)
            setprices(Data.prices)
            setstock(Data.stock)
            setimage(Data.image)
        }

    }
    useEffect(() => {
        loadProducts()
    }, [])
    async function editproducts(event) {
        event.preventDefault()
        try {
            await api.put(`/products/update/${id}`, {
                title,
                description,
                stock,
                prices,
                category,
                image
            })
            alert("Product is updated")
        }
        catch (error) {
            console.log("Products is not updated")
        }
    }
    return (
        <div>
            <form action="" onSubmit={(event) => editproducts(event)}>
                <input type="text" placeholder='Enter Title' name="title" value={title} onChange={(event) => settitle(event.target.value)} />
                <br />
                <br />
                <input type="text" placeholder='Enter Description' name='description' value={description} onChange={(event) => setdescription(event.target.value)} />
                <br />
                <br />
                <input type="number" placeholder='Enter Prices ' name="prices" value={prices} onChange={(event) => setprices(event.target.value)} />
                <br />
                <br />
                <input type="text" placeholder='Enter Category' name="category" value={category} onChange={(event) => setcategory(event.target.value)} />
                <br />
                <br />
                <input type="number" placeholder='Enter Stock' name="stock" value={stock} onChange={(event) => setstock(event.target.value)} />
                <br />
                <br />
                 <input type="text" placeholder='Enter image' name='image' value={image} onChange={(event)=>setimage(event.target.value)}/>
                <button type="submit">Edit Product</button>
            </form>
        </div>
    )
}

export default EditProduct