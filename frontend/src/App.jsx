
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Search, User, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import ProductImage from "./ProductImage";

const API = "http://localhost:8080/api";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${API}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Unable to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const loadCartCount = async () => {
      try {
        const response = await axios.get(`${API}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(
          response.data.items.reduce((count, item) => count + item.quantity, 0)
        );
      } catch (error) {
        console.error("Unable to load cart", error);
      }
    };

    loadCartCount();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartCount(
        response.data.items.reduce((count, item) => count + item.quantity, 0)
      );
      alert("Product added to cart!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="logo">
          <Store size={27} />
          <span>Shop<span className="logo-highlight">Ease</span></span>
        </Link>

        <div className="search-box">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          {localStorage.getItem("token") ? (
            <Link className="nav-button" to="/orders">
              <User size={20} />
              My Orders
            </Link>
          ) : (
            <Link className="nav-button" to="/login">
              <User size={20} />
              Login
            </Link>
          )}

          <button className="cart-button" onClick={() => navigate("/cart")}>
            <ShoppingCart size={21} />
            Cart
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO SHOPEASE</p>
          <h1>Everything you need,<br />all in one place.</h1>
          <p>Discover amazing products at prices you'll love.</p>
          <button onClick={() =>
            document.getElementById("products").scrollIntoView({ behavior: "smooth" })
          }>
            Shop Now
          </button>
        </div>
        <div className="hero-icon">
          <ShoppingCart size={130} strokeWidth={1} />
        </div>
      </section>

      <main className="products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="section-tag">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>
          <span>{filteredProducts.length} products</span>
        </div>

        {loading ? (
          <p className="message">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="message">No products found. Try another search.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <ProductImage src={product.imageUrl} alt={product.name} />

                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>

                  <div className="product-bottom">
                    <div>
                      <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                      <small>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</small>
                    </div>

                    <button
                      disabled={product.stock <= 0}
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <div className="logo">
          <Store size={22} />
          Shop<span className="logo-highlight">Ease</span>
        </div>
        <p>© 2026 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
