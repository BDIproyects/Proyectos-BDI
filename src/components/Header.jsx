import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { FaSuitcase, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <FaSuitcase size={24} color="#4F46E5" />
          <span>BDI Portfolio MYPE & PYME</span>
        </Link>
        <span className="tagline">Te ayudamos a impulsar tus ventas a través de páginas web</span>
      </div>

      <div className="header-right">
        {currentUser ? (
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Salir
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className="btn-login">
            Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;