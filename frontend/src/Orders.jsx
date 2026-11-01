import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, PackageCheck, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import "./App.css";

const API = "http://localhost:8080/api";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let active = true;
    axios
      .get(`${API}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (active) {
          setOrders(response.data);
        }
      })
      .catch((error) => {
        if (active) {
          setErrorMessage(
            error.response?.data?.message || "Unable to load your orders."
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
  }, [navigate]);

  return (
    <main className="cart-page">
      <header className="cart-page-header">
        <Link to="/" className="logo">
          <ShoppingBag size={25} />
          <span>Shop<span className="logo-highlight">Ease</span></span>
        </Link>
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Continue shopping
        </Link>
      </header>

      <section className="cart-content">
        <div className="cart-title">
          <div>
            <p className="section-tag">YOUR SHOPPING ACTIVITY</p>
            <h1>Order History</h1>
          </div>
          <span>{orders.length} {orders.length === 1 ? "order" : "orders"}</span>
        </div>

        {errorMessage && <p className="cart-error" role="alert">{errorMessage}</p>}

        {loading ? (
          <p className="message">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-cart">
            <PackageCheck size={48} />
            <h2>No orders yet</h2>
            <p>Your completed checkouts will appear here.</p>
            <Link to="/" className="primary-link">Browse products</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <header className="order-card-header">
                  <div>
                    <span className="order-label">Order</span>
                    <strong>#{order.id}</strong>
                  </div>
                  <span className="order-status">{order.status}</span>
                </header>
                <div className="order-meta">
                  <span>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : "Date unavailable"}
                  </span>
                  <span>
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item" key={item.productId}>
                      <ProductImage
                        src={item.imageUrl}
                        alt={item.productName}
                        className="order-item-image"
                      />
                      <div className="order-item-name">
                        <strong>{item.productName}</strong>
                        <span>Qty {item.quantity}</span>
                      </div>
                      <strong>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  ))}
                </div>
                <footer className="order-card-footer">
                  <span>Ship to: {order.shippingAddress}</span>
                  <strong>
                    Total: ₹{order.totalAmount.toLocaleString("en-IN")}
                  </strong>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Orders;
