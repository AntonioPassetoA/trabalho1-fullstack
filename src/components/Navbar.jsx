import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // ajuste o caminho se necessário
import './Navbar.css';

function Navbar() {
  const { user, login, logout } = useUser();

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/meus-posts">Meus Posts</Link></li>

      </ul>

      <div className="user-info">
        {user ? (
          <>
            <span>Bem-vindo, {user.name}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => login('Gabriel')}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
