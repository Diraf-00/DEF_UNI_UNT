import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Shield, BookOpen, Clipboard, FileText } from 'lucide-react';
import logo from '../../../logo-unt.svg';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  const publicLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/funciones', label: 'Funciones', icon: Shield },
    { path: '/base-legal', label: 'Documentos', icon: BookOpen },
    { path: '/procedimiento', label: 'Procedimiento y Recursos', icon: Clipboard },
    { path: '/llenado-formularios', label: 'Documentos en Línea', icon: FileText },
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
          </div>
        )}
      </div>
    </nav>
  );
}