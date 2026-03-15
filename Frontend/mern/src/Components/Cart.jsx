import { useEffect, useState } from "react"

export default function Cart(){
    const userId = localStorage.getItem("userId")
    const [cart,setcart] = useState(null)
    async function loadCart(){
        if(!userId) return ;
        const res = await api.get(`/cart/${userId}`)
        setcart(res.data)
    }
    useEffect(()=>{
        loadCart()
    },[])
    const removeItem = async (productId) =>{
        const res =await api.delete(`/cart/remove/`,{userId,productId})
        loadCart()
        window.dispatchEvent(new Event("cartUpdated"));
    }
    const updateItem = async (productId,quantity) =>{
        if(quantity === 0){
            await removeItem(productId)
            return;
        }
        const res = await api.put(`/cart/update`,{userId,productId,quantity})
        loadCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }
    if(!cart){
        return <div>....Loading</div>
    }
    const total = cart.items.reduce((sum,item)=> sum + item.productId.price*item.quantity , 0) // Here 0 is a initial value of sum
    return(
        <div>
         <h1>Your Cart</h1>
         {
            cart.items.length === 0 ? (
                <div>Your Cart is empty</div>
            ):
            (
                <div>
                    {
                        cart.items.map((item)=>{
                            return(
                                <div>
                                    <h1>{item.productId}</h1>
                                    <img src={item.productId.image}/>
                                    <div>
                                        <h2>{item.productId.title}</h2>
                                        <p>{item.productId.price}</p>
                                    </div>
                                    <div>
                                        <button onClick={()=>updateItem(item.productId,item.quantity)}>Update</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
            )
         }
        </div>
    )
}