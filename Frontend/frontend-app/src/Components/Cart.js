import React from "react";

function Cart({ cart = [], removeFromCart, changeQty, onClose, showToast, setCart }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = cart.reduce((s, i) => s + (i.original - i.price) * i.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCart([]);
    onClose();
    showToast(`🎉 Order placed! ₹${subtotal.toLocaleString()} — Thank you!`);
  };

  return (
    <div className="cart-inner">
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛍️</div>
            <p>Your cart is empty.<br />Add today's drops!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="ci-img">{item.emoji || "📦"}</div>
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                <div className="ci-price">₹{(item.price * item.qty).toLocaleString()}</div>
                <div className="ci-controls">
                  <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="subtotal-row">
            <span className="sub-label">Subtotal</span>
            <span className="sub-val">₹{subtotal.toLocaleString()}</span>
          </div>
          {savings > 0 && (
            <div className="savings-note">🎉 You're saving ₹{savings.toLocaleString()} today!</div>
          )}
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
