import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminScreen from './components/AdminScreen';
import UserScreen from './components/UserScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1>Quản Lý Cửa Hàng</h1>
            <div className="nav-links">
              <Link to="/">Giao Diện Người Dùng</Link>
              <Link to="/admin">Giao Diện Quản Trị</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<UserScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;