import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

import './App.css'; 

function App() {
  // replace with authentication
  const isAuthenticated = false; 

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>

          <Route // main route, serve dashboard or login
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
          />

          <Route path="*" element={<div><h2>404 Not Found</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;