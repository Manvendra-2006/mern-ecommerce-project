import { useEffect, useState } from "react"
import api from "../Axios";
import {  useNavigate } from "react-router";
export default function Cart() {
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()
    const [cart, setcart] = useState(null)
    async function loadCart() {
        if (!userId) return;
        const res = await api.get(`/cart/${userId}`)
        setcart(res.data)
    }
    useEffect(() => {
        loadCart()
    }, [])
    const removeItem = async (productId) => {
        await api.delete(`/cart/remove`, {
            data: { userId, productId }
        })
        await loadCart()
        window.dispatchEvent(new Event("cartUpdated"));
    }
    const updateItem = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId)
            return;
        }
        const res = await api.put(`/cart/update`, { userId, productId, quantity })
        await loadCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }
    function checkout(){
        navigate("/checkout-address")
    }
    if (!cart) {
        return <div>....Loading</div>
    }
    const total = cart.items.reduce((sum, item) => sum + item.productId.prices * item.quantity, 0) // Here 0 is a initial value of sum

    return (
        <div>
            <h1>Your Cart</h1>
            {
                cart.items.length === 0 ? (
                    <div>Your Cart is empty</div>
                ) :
                    (
                        <div>
                            {
                                cart.items.map((item) => {
                                    return (
                                        <div>
                                            <h1>{item.productId._id}</h1>
                                            <img src={item.productId.image} />
                                            <div>
                                                <h2>{item.productId.title}</h2>
                                                <p>{item.productId.prices}</p>
                                            </div>
                                            <div>
                                                <button onClick={() => updateItem(item.productId._id, item.quantity - 1)}> - </button>
                                                <button onClick={() => updateItem(item.productId._id, item.quantity + 1)}> + </button>
                                            </div>
                                            <div>
                                                <p>{(item.productId.prices * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <button onClick={() => removeItem(item.productId._id)}>Remove Item</button>

                                        </div>

                                    )
                                })
                            }
                            <div>
                                Total : {total.toFixed(2)}
                            </div>
                            <button onClick={(event)=>checkout(event)}>Proceed to CheckOut</button>
                        </div>
                    )
            }
        </div>
    )
} // here .toFixed(2) is a method which convert number upto two decimal place and convert it into string





// When any user is doing add to cart then always not a new document is not formed in carts usi ke andar add to cart hoga 