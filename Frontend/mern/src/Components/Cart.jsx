 // here .toFixed(2) is a method which convert number upto two decimal place and convert it into string
// // When any user is doing add to cart then always not a new document is not formed in carts usi ke andar add to cart hoga 

import { useEffect, useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [cart, setcart] = useState(null);

  async function loadCart() {
    if (!userId) return;
    const res = await api.get(`/cart/${userId}`);
    setcart(res.data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.delete(`/cart/remove`, { data: { userId, productId } });
    await loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateItem = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }
    await api.put(`/cart/update`, { userId, productId, quantity });
    await loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  function checkout() {
    navigate("/checkout-address");
  }

  if (!cart) {
    return <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>....Loading</div>;
  }

  const total = cart?.items?.reduce((sum, item) => sum + item.productId.prices * item.quantity, 0);

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Your Cart</h1>

      {cart.items.length === 0 ? (
        <div style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>Your Cart is empty</div>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={item.productId.image}
                alt={item.productId.title}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <h2 style={{ margin: "0 0 5px 0", color: "#222" }}>{item.productId.title}</h2>
                <p style={{ margin: "0", fontWeight: "bold", color: "#ff4c3b" }}>${item.productId.prices}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => updateItem(item.productId._id, item.quantity - 1)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "18px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: "16px" }}>{item.quantity}</span>
                <button
                  onClick={() => updateItem(item.productId._id, item.quantity + 1)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "18px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ width: "100px", textAlign: "right", fontWeight: "bold" }}>
                ${(item.productId.prices * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(item.productId._id)}
                style={{
                  marginLeft: "15px",
                  padding: "5px 10px",
                  backgroundColor: "#ff4c3b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              textAlign: "right",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "20px",
              color: "#222",
            }}
          >
            Total: ${total.toFixed(2)}
          </div>

          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <button
              onClick={checkout}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                backgroundColor: "#00b894",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Proceed to CheckOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
}