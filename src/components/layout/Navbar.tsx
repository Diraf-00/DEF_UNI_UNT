import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Shield, BookOpen, Clipboard, FileText } from 'lucide-react';
import logo from '../../../logo-unt.svg';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 176px es la altura aproximada del banner (h-44)
      // Cuando el scroll supera esa altura, el banner ya no se ve
      setBannerVisible(window.scrollY < 450);
    };

    window.addEventListener('scroll', handleScroll);
    // Llamamos una vez al inicio por si la página ya está scrolleada
    handleScroll();

    // Limpieza: cuando el componente se desmonte, dejamos de escuchar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/funciones', label: 'Funciones', icon: Shield },
    { path: '/base-legal', label: 'Documentos', icon: BookOpen },
    { path: '/procedimiento', label: 'Procedimiento\ny Recursos', icon: Clipboard },
    { path: '/llenado-formularios', label: 'Documentos\nen Línea', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="shadow-lg w-full z-50" style={{ backgroundColor: '#193D73' }}>
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between h-20 relative">
          {/* Logo + Título (izquierda): solo aparece cuando el banner ya no es visible */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: bannerVisible ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
              opacity: bannerVisible ? 0 : 1,
              transition: 'transform 0.4s ease, opacity 0.3s ease',
            }}
          >

            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={logo} alt="Logo UNT" className="w-13 h-12 object-contain" />
              <div className="ml-3 leading-tight flex flex-col whitespace-nowrap">
                <span className="text-xl md:text-1xl font-bold text-white tracking-wide">Defensoría Universitaria</span>
                <span className="text-xs md:text-sm font-medium text-blue-200">Universidad Nacional de Trujillo</span>
              </div>
            </Link>
          </div>


          {/* Desktop Navigation (derecha) */}
          <div className="hidden md:flex flex-1 justify-center items-stretch space-x-0 h-20">
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
                <Icon className="w-7 h-7 flex-shrink-0" />
                <span className="flex flex-col text-left leading-none text- md:text-base">
                  {label.split('\n').map((line, index) => (
                    <span key={index} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button (derecha, solo en móviles) */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-[#e6ad09] p-2 rounded"
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (desplegable debajo) */}
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
    </nav>
  );
}