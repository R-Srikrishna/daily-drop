
import React, { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import { FaShoppingCart } from "react-icons/fa";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [countdown, setCountdown] = useState({ h: "00", m: "00", s: "00" });
  const [toast, setToast] = useState({ show: false, msg: "" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;

      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

      setCountdown({ h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);

      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    showToast(`🛒 ${product.name} added to cart!`);
  };

  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((i) => i._id !== _id));
  };

  const changeQty = (_id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === _id ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const navCategories = ["All", "Tech", "Home", "Fashion", "Food", "Fitness"];

  return (
    <div className="app-root">

      {/* NAVBAR */}

      <nav className="navbar">
        <div className="nav-logo">
          Daily<span className="accent">Drop</span>
          <sup className="logo-sup">™</sup>
        </div>

        <div className="nav-pills">
          {navCategories.map((c) => (
            <button
              key={c}
              className={`nav-pill ${
                activeCategory === c.toLowerCase() ? "active" : ""
              }`}
              onClick={() => setActiveCategory(c.toLowerCase())}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="discount">Best Discount</option>
          </select>

          <button
            className="cart-btn"
            onClick={() => setShowCart(!showCart)}
          >
            <FaShoppingCart size={16} /> Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}

      <section className="hero">
        <div className="hero-glow" />
        <div className="live-tag">
          <span className="live-dot" />
          Live deals — refreshes every 24h
        </div>

        <h1 className="hero-title">
          Today's <em>Hottest</em>
          <br />
          Daily Drops 🔥
        </h1>

        <p className="hero-sub">
          Exclusive deals. Limited stock. New drops at midnight.
        </p>

        <div className="countdown">
          <div className="cd-unit">
            <span className="cd-num">{countdown.h}</span>
            <span className="cd-label">Hours</span>
          </div>

          <span className="cd-sep">:</span>

          <div className="cd-unit">
            <span className="cd-num">{countdown.m}</span>
            <span className="cd-label">Mins</span>
          </div>

          <span className="cd-sep">:</span>

          <div className="cd-unit">
            <span className="cd-num">{countdown.s}</span>
            <span className="cd-label">Secs</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}

      <ProductList
        addToCart={addToCart}
        activeCategory={activeCategory}
        sortBy={sortBy}
        cartIds={cart.map((c) => c._id)}
      />

      {/* CART */}

      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        />
      )}

      <div className={`cart-drawer ${showCart ? "open" : ""}`}>
        <div className="drawer-head">
          <h3>Your Cart 🛒</h3>

          <button
            className="close-btn"
            onClick={() => setShowCart(false)}
          >
            ✕
          </button>
        </div>

        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          changeQty={changeQty}
          onClose={() => setShowCart(false)}
          showToast={showToast}
          setCart={setCart}
        />
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>
        {toast.msg}
      </div>
    </div>
  );
}

export default App;
