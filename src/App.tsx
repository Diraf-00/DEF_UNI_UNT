import React, { useState, useEffect } from 'react';
import { User } from './types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/public/Home';
import { BaseLegal } from './components/public/BaseLegal';
import { Formularios } from './components/public/Formularios';
import { IngresoCaso } from './components/public/IngresoCaso';
import { SeguimientoCaso } from './components/public/SeguimientoCaso';
import { Dashboard } from './components/private/Dashboard';
import { GestionExpedientes } from './components/private/GestionExpedientes';
import { DetalleExpediente } from './components/private/DetalleExpediente';
import { Reportes } from './components/private/Reportes';
import { PerfilUsuario } from './components/private/PerfilUsuario';
import { Login } from './components/auth/Login';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in (in real app, this would check token/session)
    const savedUser = localStorage.getItem('defensoriaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('defensoriaUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('defensoriaUser');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-grow">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/base-legal" element={<BaseLegal />} />
            <Route path="/formularios" element={<Formularios />} />
            <Route path="/ingreso-caso" element={<IngresoCaso />} />
            <Route path="/seguimiento" element={<SeguimientoCaso />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            
            {/* Rutas Privadas */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/expedientes" 
              element={
                isAuthenticated ? 
                <GestionExpedientes /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/expediente/:id" 
              element={
                isAuthenticated ? 
                <DetalleExpediente /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/reportes" 
              element={
                isAuthenticated ? 
                <Reportes /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/perfil" 
              element={
                isAuthenticated ? 
                <PerfilUsuario user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;