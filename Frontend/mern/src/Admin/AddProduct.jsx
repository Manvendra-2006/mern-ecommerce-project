import React, { useState } from 'react'
import api from '../Axios'
import { useNavigate } from 'react-router'

const AddProduct = () => {
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [stock, setstock] = useState(0)
    const [prices, setprices] = useState(0)
    const [category, setcategory] = useState('')
    const [image, setimage] = useState('')
    const navigate = useNavigate()

    async function addproducts(event) {
        event.preventDefault()
        const productsData = {
            title,
            description,
            stock,
            prices,
            category,
            image
        }
        try {
            await api.post("/products/add", productsData)
            alert("Product is added")
            navigate("/admin/products")
        }
        catch (error) {
            console.log("Product is not added")
        }
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            fontFamily: "Arial, sans-serif"
        }}>

            <form onSubmit={addproducts}
                style={{
                    background: "#fff",
                    padding: "40px",
                    width: "400px",
                    borderRadius: "12px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}>

                <h2 style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    color: "#333"
                }}>Add New Product</h2>

                <input type="text" placeholder='Enter Title'
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    style={inputStyle}
                />

                <input type="text" placeholder='Enter Description'
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    style={inputStyle}
                />

                <input type="number" placeholder='Enter Prices'
                    value={prices}
                    onChange={(e) => setprices(e.target.value)}
                    style={inputStyle}
                />

                <input type="text" placeholder='Enter Category'
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    style={inputStyle}
                />

                <input type="number" placeholder='Enter Stock'
                    value={stock}
                    onChange={(e) => setstock(e.target.value)}
                    style={inputStyle}
                />

                <input type="text" placeholder='Enter Image URL'
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                    style={inputStyle}
                />

                <button type="submit"
                    style={{
                        padding: "12px",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}>
                    Add Product
                </button>

            </form>
        </div>
    )
}

const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none"
}

export default AddProduct