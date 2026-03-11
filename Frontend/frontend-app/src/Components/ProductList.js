import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ addToCart, activeCategory, sortBy, cartIds = [] }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PRODUCTS_API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  console.log(process.env.REACT_APP_PRODUCTS_API_URL);

  let filtered =
    activeCategory === "all"
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "discount")
    filtered.sort(
      (a, b) =>
        (b.original - b.price) / b.original -
        (a.original - a.price) / a.original
    );

  return (
    <div className="products-section">
      <div className="section-head">
        <h2>Today's Drops</h2>
        <div className="section-badge">🔥 Limited Time</div>
      </div>

      {filtered.length === 0 ? (
        <div className="no-products">
          No products in this category yet. Check back soon! 🚀
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map((product, i) => {
            const disc = Math.round(
              (1 - product.price / product.original) * 100
            );
            const stockPct = Math.round(
              (product.stock / product.maxStock) * 100
            );
            const inCart = cartIds.includes(product._id);

            return (
              <div
                className="product-card"
                key={product._id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="card-img-wrap">
                  {product.image ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${product.image}`}
                      alt={product.name}
                      className="card-img"
                    />
                  ) : null}

                  {!product.image && (
                    <div className="card-emoji-fallback">{product.emoji}</div>
                  )}

                  <div className="disc-badge">-{disc}%</div>
                  {product.hot && <div className="hot-badge">🔥 Hot</div>}
                </div>

                <div className="card-body">
                  <div className="card-cat">{product.category}</div>
                  <div className="card-title">{product.name}</div>
                  <div className="card-desc">{product.description}</div>

                  <div className="card-rating">
                    <span className="stars">
                      {"★".repeat(Math.round(product.rating))}
                      {"☆".repeat(5 - Math.round(product.rating))}
                    </span>
                    <span className="rating-count">
                      {product.rating} ({product.reviews?.toLocaleString()})
                    </span>
                  </div>

                  <div className="card-footer">
                    <div className="price-group">
                      <span className="price-now">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="price-old">
                        ₹{product.original.toLocaleString()}
                      </span>
                    </div>

                    <button
                      className={`add-btn ${inCart ? "added" : ""}`}
                      onClick={() => addToCart(product)}
                    >
                      {inCart ? "✓" : "+"}
                    </button>
                  </div>

                  <div className="stock-bar">
                    <div className="stock-labels">
                      <span>{product.stock} left</span>
                      <span>{100 - stockPct}% sold</span>
                    </div>
                    <div className="stock-track">
                      <div
                        className="stock-fill"
                        style={{ width: `${100 - stockPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;