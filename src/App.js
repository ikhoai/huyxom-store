import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import AdminScreen from './components/AdminScreen';
import UserScreen from './components/UserScreen';
import './App.css';

function NavTitle() {
  const location = useLocation();
  return (
    <h1>
      {location.pathname === '/admin' ? 'Quản Lý Cửa Hàng' : 'My Dream Closet by Tracy' }
    </h1>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <NavTitle />
            <div className="nav-links">
              <Link to="/">Người Dùng</Link>
              {/* <Link to="/admin">Giao Diện Quản Trị</Link> */}
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