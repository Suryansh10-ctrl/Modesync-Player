import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import '../style/navbar.scss';

const Navbar = () => {
  const { user, loading, handleLogout } = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    await handleLogout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        MoodSync Player
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <span className="user-chip">Hi, {user.username || user.email}</span>
            <button className="nav-btn" onClick={onLogout} disabled={loading}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
