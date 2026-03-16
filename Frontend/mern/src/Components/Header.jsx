import { useEffect } from "react";
import { useState } from "react";
import api from "../Axios";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar(){
    const navigate = useNavigate()
    const [cartCount,setcartCount] = useState(0)
    const userId = localStorage.getItem("userId")
        useEffect(()=>{
            async function loadCart(){
                if(!userId) return setcartCount(0);
                const res = await api.get(`/cart/${userId}`)
                const total = res.data.items.reduce(
                    (sum,item) => sum + item.quantity , 0
                )
                setcartCount(total)
            }
            loadCart()
            window.addEventListener("cartUpdated",loadCart) // Jab hi cartUpdated event trigger hota hain toh loadCart update ho jata hain
            return ()=>{
                window.removeEventListener("cartUpdated",loadCart)
            }
        },[userId])
    const logout = () =>{
        localStorage.clear()
        setcartCount(0);
        navigate("/login")
    }

    return(
        <nav>
            <Link to="/">Mohit Store</Link>
            <div>
                <Link to="/user/cart">Cart Symbol{
                    cartCount>0 && (
                        <span>
                            {cartCount}
                        </span>
                    )
                }
                </Link>
                {
                    !userId ? (
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                        </>
                    ):(
                        <button onClick={logout}>LogOut</button>
                    )
                }
            </div>
        </nav>
    )
}