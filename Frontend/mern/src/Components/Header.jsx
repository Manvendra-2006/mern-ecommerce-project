import { useEffect, useState } from "react";
import api from "../axios";
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
    return () => window.removeEventListener("cartUpdated", loadCart);
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
        padding: "12px 24px",
        background: "linear-gradient(135deg, #10b981, #059669)",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backdropFilter: "blur(6px)"
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#fff",
          fontSize: "22px",
          fontWeight: "700",
          letterSpacing: "0.5px"
        }}
      >
        🛍 Mohit Store
      </Link>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>

        {/* Cart */}
        <Link
          to="/user/cart"
          style={{
            position: "relative",
            textDecoration: "none",
            color: "#fff",
            fontSize: "17px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                backgroundColor: "#ef4444",
                color: "#fff",
                borderRadius: "50%",
                padding: "2px 7px",
                fontSize: "11px",
                fontWeight: "bold",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
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
                fontSize: "15px",
                padding: "6px 14px",
                border: "1px solid #fff",
                borderRadius: "20px",
                transition: "0.3s"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#059669",
                backgroundColor: "#fff",
                fontSize: "15px",
                padding: "6px 14px",
                borderRadius: "20px",
                fontWeight: "600",
                transition: "0.3s"
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.85")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
              transition: "0.3s"
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
