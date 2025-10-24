import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  // implemnent validation later
  const isLoggedIn = false; // Placeholder

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Final Project</Link>
      </div>
      <ul className="navbar-links">
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/summary">Summary</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><button className="logout-button">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;