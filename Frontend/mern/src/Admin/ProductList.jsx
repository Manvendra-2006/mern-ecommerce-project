import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../Axios'

const ProductList = () => {
    const [products, setproducts] = useState([])

    async function loadProducts() {
        const response = await api.get("/products")
        setproducts(response.data)
    }

    async function deletedProducts(id) {
        try {
            await api.delete(`/products/delete/${id}`)
            alert("Product deleted Successfully")
            loadProducts()
        }
        catch (error) {            
            alert("Error in deleting")
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f3f4f6',
            minHeight: '100vh'
        }}>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h2>Product List</h2>

                <Link to="/admin/products/add" style={{
                    padding: '10px 15px',
                    backgroundColor: '#16a34a',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none'
                }}>
                    + Add Product
                </Link>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '20px'
            }}>

                {products && products.map((item) => (
                    <div key={item._id} style={{
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>

                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />

                        <h3 style={{ margin: '10px 0' }}>{item.title}</h3>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>

                            <Link
                                to={`/admin/products/edit/${item._id}`}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#2563eb',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    textDecoration: 'none'
                                }}
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => deletedProducts(item._id)}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#dc2626',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default ProductList