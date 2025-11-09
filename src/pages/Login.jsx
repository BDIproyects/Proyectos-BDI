import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const allowedEmails = [
      'prueba005@bdi.com.pe ',
      'ros19ed@gmail.com',
      'gab16leli@gmail.com'
    ];

    if (!allowedEmails.includes(email)) {
      alert('Acceso denegado. Solo usuarios autorizados.');
      return;
    }

    await signInWithEmailAndPassword(auth, email, password);
    navigate('/');
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <FaLock size={24} color="#4F46E5" />
          <h2>Iniciar Sesión</h2>
          <p>Solo para equipo autorizado de BDI</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo corporativo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ej: admin@bdi.com.pe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="login-hint">
            <strong>🔒 Acceso exclusivo:</strong> Solo miembros del equipo de BDI.
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;