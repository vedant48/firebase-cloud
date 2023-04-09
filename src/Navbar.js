import React, { useState } from 'react';
import './Navbar.css';
import './logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="logo">
        <img src={require('./logo.png')} />
      </div>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={handleMenuClick}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        
        <li>
          <button className="login-button" href="#">
            <Link to = '/signin'>Login</Link>
          </button>
        </li>
        <li>
          <button className="join-button" href="#">
          <Link to = '/signup'>Register</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
