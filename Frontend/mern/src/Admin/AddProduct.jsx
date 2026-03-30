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
            background: "linear-gradient(135deg, #4f46e5, #9333ea)"
        }}>

            <form onSubmit={addproducts}
                style={{
                    background: "#fff",
                    padding: "35px",
                    width: "420px",
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                }}>

                <h2 style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    color: "#111",
                    fontWeight: "600"
                }}>Add New Product</h2>

                <Input label="Title" value={title} set={settitle} />
                <Input label="Description" value={description} set={setdescription} />
                <Input label="Price" type="number" value={prices} set={setprices} />
                <Input label="Category" value={category} set={setcategory} />
                <Input label="Stock" type="number" value={stock} set={setstock} />
                <Input label="Image URL" value={image} set={setimage} />

                <button type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "12px",
                        background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                        border: "none",
                        borderRadius: "10px",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onMouseOver={(e) => e.target.style.opacity = "0.9"}
                    onMouseOut={(e) => e.target.style.opacity = "1"}
                >
                    Add Product
                </button>

            </form>
        </div>
    )
}

const Input = ({ label, value, set, type = "text" }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label style={{ fontSize: "13px", color: "#555" }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => set(e.target.value)}
            placeholder={`Enter ${label}`}
            style={{
                padding: "11px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                outline: "none"
            }}
        />
    </div>
)

export default AddProduct