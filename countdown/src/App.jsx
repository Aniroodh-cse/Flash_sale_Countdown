import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Components for Login and Signup pages
const Login = () => {
  return (
    <div className="page-container">
      <h1>Login</h1>
      {/* Login form */}
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {/* Link to go back to Flash Sale Countdown page */}
      <Link to="/">
        <button className="back-to-sale-button">Go to Flash Sale</button>
      </Link>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="page-container">
      <h1>Sign Up</h1>
      {/* Sign up form */}
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      {/* Link to go back to Flash Sale Countdown page */}
      <Link to="/">
        <button className="back-to-sale-button">Go to Flash Sale</button>
      </Link>
    </div>
  );
};

const FlashSaleCountdown = () => {
  const [countdown, setCountdown] = useState(120); // seconds (2 minutes default)
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', available: true },
    { id: 2, name: 'Phone', available: true }, // Set all products to available initially
    { id: 3, name: 'I Pad', available: true },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAvailability = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, available: !product.available } : product
      )
    );
  };

  return (
    <div className="flash-sale-container">
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
      </div>
      <h1>Flash Sale Countdown</h1>
      <div className="countdown">
        {countdown > 0 ? `Time Left: ${formatTime(countdown)}` : 'Time is up!'}
      </div>
      <div className="products">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product ${product.available ? 'available' : 'unavailable'}`}
            onClick={() => toggleAvailability(product.id)}
          >
            <h2>{product.name}</h2>
            <p>{product.available ? 'Available' : 'Sold Out'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashSaleCountdown />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
