import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import "./App.css";

const API = "http://localhost:8080/api";

const authorizationConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let active = true;
    axios
      .get(`${API}/cart`, authorizationConfig(token))
      .then((response) => {
        if (active) {
          setCart(response.data);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        if (active) {
          setErrorMessage(
            error.response?.data?.message || "Unable to load your cart."
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [navigate, token]);

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${API}/cart/update/${productId}`,
        { quantity },
        authorizationConfig(token)
      );
      setCart(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to update item quantity."
      );
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(
        `${API}/cart/remove/${productId}`,
        authorizationConfig(token)
      );
      setCart(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to remove this item."
      );
    }
  };

  const checkout = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      await axios.post(
        `${API}/orders/checkout`,
        { shippingAddress },
        authorizationConfig(token)
      );
      setCart((currentCart) => ({ ...currentCart, items: [] }));
      setShippingAddress("");
      window.alert("Your order has been placed.");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to place your order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const items = cart?.items ?? [];
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <header className="cart-page-header">
        <Link to="/" className="logo">
          <ShoppingCart size={25} />
          <span>Shop<span className="logo-highlight">Ease</span></span>
        </Link>
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Continue shopping
        </Link>
      </header>

      <section className="cart-content">
        <div className="cart-title">
          <div>
            <p className="section-tag">YOUR SHOPPING BAG</p>
            <h1>Your Cart</h1>
          </div>
          <span>{items.length} {items.length === 1 ? "item" : "items"}</span>
        </div>

        {errorMessage && <p className="cart-error" role="alert">{errorMessage}</p>}

        {loading ? (
          <p className="message">Loading your cart...</p>
        ) : items.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={48} />
            <h2>Your cart is empty</h2>
            <p>Find something you love in our collection.</p>
            <Link to="/" className="primary-link">Browse products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.productId}>
                  <ProductImage
                    src={item.imageUrl}
                    alt={item.productName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h2>{item.productName}</h2>
                    <p>₹{Number(item.price).toLocaleString("en-IN")} each</p>
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.productName} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <Minus size={15} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.productName} quantity`}
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>
                    <button
                      type="button"
                      className="remove-item"
                      aria-label={`Remove ${item.productName}`}
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <form className="order-summary" onSubmit={checkout}>
              <h2>Order summary</h2>
              <div className="summary-line">
                <span>Subtotal</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <strong>Free</strong>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <label htmlFor="shipping-address">Shipping address</label>
              <textarea
                id="shipping-address"
                value={shippingAddress}
                onChange={(event) => setShippingAddress(event.target.value)}
                maxLength={300}
                required
              />
              <button
                type="submit"
                className="checkout-button"
                disabled={submitting}
              >
                {submitting ? "Placing order..." : "Place order"}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
