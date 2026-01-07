import { useState } from 'react';
import { User } from '../../types';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, Home, Shield, BookOpen, Clipboard, FilePlus, Megaphone, FileText, BarChart3 } from 'lucide-react';
// Import SVG so it is bundled and can be referenced as a module (Vite will emit a URL)
import logo from '../../../logo-unt.svg';

interface NavbarProps {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

export function Navbar({ isAuthenticated, user, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  const publicLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/funciones', label: 'Funciones', icon: Shield },
    { path: '/base-legal', label: 'Documentos', icon: BookOpen },
    { path: '/procedimiento', label: 'Procedimiento y Recursos', icon: Clipboard },
    { path: '/llenado-formularios', label: 'Documentos en Línea', icon: FileText},
    //{ path: '/ingreso-caso', label: 'Formulario de Atención', icon: FilePlus },
    //{ path: '/noticias', label: 'Noticias y Difusión', icon: Megaphone },
  ];

  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/expedientes', label: 'Expedientes', icon: FileText },
    { path: '/reportes', label: 'Reportes', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="shadow-lg">
      {/* Top: logo row (light background) */}
      <div style={{ backgroundColor: '#F3F3F1' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo UNT" className="w-12 h-12 object-contain" />
              <div className="ml-3 leading-tight flex flex-col">
                <span className="text-base font-semibold" style={{ color: '#132746' }}>Defensoría Universitaria UNT</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom: navigation row (dark background) */}
      <div style={{ backgroundColor: '#193D73' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 relative">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-stretch space-x-0 h-full">
              {!isAuthenticated ? (
                <>
                  {publicLinks.map(({ path, label, icon: Icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center h-full space-x-2 px-4 rounded-none transition-colors text-white hover:bg-[#e6ad09]`}
                      onMouseEnter={() => setHoveredPath(path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      style={isActive(path) || hoveredPath === path ? { backgroundColor: '#e6ad09' } : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </NavLink>
                  ))}
                </>
              ) : (
                <>
                  {privateLinks.map(({ path, label, icon: Icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center h-full space-x-2 px-4 rounded-none transition-colors text-white hover:bg-[#e6ad09]`}
                      onMouseEnter={() => setHoveredPath(path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      style={isActive(path) || hoveredPath === path ? { backgroundColor: '#e6ad09' } : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </NavLink>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/perfil"
                      className="flex items-center h-full space-x-1 px-4 rounded-none text-white hover:bg-[#e6ad09] transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>{user?.nombre || 'Usuario'}</span>
                    </Link>
                    <button
                      onClick={onLogout}
                      className="flex items-center h-full space-x-1 px-4 rounded-none text-white hover:bg-[#e6ad09] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Salir</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button (positioned to the right) */}
            <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-[#e6ad09]"
                aria-label="Abrir menú"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (dropdown below the bottom bar) */}
        {isMenuOpen && (
          <div className="md:hidden pb-4" style={{ backgroundColor: '#193D73' }}>
            {!isAuthenticated ? (
              <>
                {publicLinks.map(({ path, label, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 transition-colors text-white hover:bg-[#e6ad09]`}
                    style={isActive(path) ? { backgroundColor: '#e6ad09' } : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </NavLink>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-[#e6ad09] text-white px-3 py-2 rounded-none transition-colors mt-2 font-semibold"
                >
                  Acceso Privado
                </Link>
              </>
            ) : (
              <>
                {privateLinks.map(({ path, label, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 transition-colors text-white hover:bg-[#e6ad09]`}
                    style={isActive(path) ? { backgroundColor: '#e6ad09' } : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </NavLink>
                ))}
                <Link
                  to="/perfil"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-[#e6ad09] transition-colors"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Perfil - {user?.nombre || 'Usuario'}</span>
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-[#e6ad09] transition-colors w-full text-left"
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