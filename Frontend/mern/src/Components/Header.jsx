import { useEffect, useState } from "react";
import api from "../Axios";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function loadCart() {
      if (!userId) return setCartCount(0);
      const res = await api.get(`/cart/${userId}`);
      const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#00b894",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
        Mohit Store
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/user/cart"
          style={{ position: "relative", textDecoration: "none", color: "#fff", fontSize: "18px" }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                backgroundColor: "#ff4c3b",
                color: "#fff",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {!userId ? (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "16px",
                padding: "6px 12px",
                border: "1px solid #fff",
                borderRadius: "5px",
                transition: "0.3s",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#00b894",
                backgroundColor: "#fff",
                fontSize: "16px",
                padding: "6px 12px",
                borderRadius: "5px",
                transition: "0.3s",
              }}
            >
              SignUp
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              backgroundColor: "#ff4c3b",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s"
            }}
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  );
}