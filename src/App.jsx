import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebaseConfig';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="app-loading">Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home currentUser={currentUser} />} />
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      <Route path="/nuevo-proyecto" element={<NewProject />} />
      <Route path="/editar/:id" element={<EditProject />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;