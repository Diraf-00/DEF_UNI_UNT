import React, { useState } from 'react';
import { User } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, Home, FileText, Download, PlusCircle, Search, BarChart3 } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

export function Navbar({ isAuthenticated, user, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const publicLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/base-legal', label: 'Base Legal', icon: FileText },
    { path: '/formularios', label: 'Formularios', icon: Download },
    { path: '/ingreso-caso', label: 'Nuevo Caso', icon: PlusCircle },
    { path: '/seguimiento', label: 'Seguimiento', icon: Search },
  ];

  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/expedientes', label: 'Expedientes', icon: FileText },
    { path: '/reportes', label: 'Reportes', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold">DU</span>
              </div>
              <span className="text-xl font-semibold">Defensoría Universitaria</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                {publicLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isActive(path)
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
                >
                  Acceso Privado
                </Link>
              </>
            ) : (
              <>
                {privateLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isActive(path)
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
                <div className="flex items-center space-x-2">
                  <Link
                    to="/perfil"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>{user?.nombre || 'Usuario'}</span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-blue-100 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Salir</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-100 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {!isAuthenticated ? (
              <>
                {publicLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      isActive(path)
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors mt-2"
                >
                  Acceso Privado
                </Link>
              </>
            ) : (
              <>
                {privateLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      isActive(path)
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
                <Link
                  to="/perfil"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Perfil - {user?.nombre || 'Usuario'}</span>
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-blue-100 hover:bg-red-600 hover:text-white transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}