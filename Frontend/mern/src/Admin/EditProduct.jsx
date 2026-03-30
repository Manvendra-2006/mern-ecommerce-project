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
    const [image, setimage] = useState('')

    async function loadProducts() {
        const response = await api.get("/products")
        const Data = response.data.find((item) => item._id == id)

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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #4f46e5, #9333ea)'
        }}>

            <form onSubmit={editproducts} style={{
                background: '#fff',
                padding: '35px',
                borderRadius: '16px',
                width: '420px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
            }}>

                <h2 style={{ textAlign: 'center' }}>Edit Product</h2>

                <Input label="Title" value={title} set={settitle} />
                <Input label="Description" value={description} set={setdescription} />
                <Input label="Price" type="number" value={prices} set={setprices} />
                <Input label="Category" value={category} set={setcategory} />
                <Input label="Stock" type="number" value={stock} set={setstock} />
                <Input label="Image URL" value={image} set={setimage} />

                {image && (
                    <img
                        src={image}
                        alt="preview"
                        style={{ width: '100%', borderRadius: '10px', marginTop: '5px' }}
                    />
                )}

                <button type="submit" style={{
                    marginTop: '10px',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>
                    Update Product
                </button>

            </form>

        </div>
    )
}

const Input = ({ label, value, set, type = 'text' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '13px', color: '#555' }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => set(e.target.value)}
            placeholder={`Enter ${label}`}
            style={{
                padding: '11px',
                borderRadius: '8px',
                border: '1px solid #ddd'
            }}
        />
    </div>
)

export default EditProduct