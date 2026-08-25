import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Home } from './components/public/Home';
import { BaseLegal } from './components/public/BaseLegal';
import { Funciones } from './components/public/Funciones';
import { Procedimiento } from './components/public/Procedimiento';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LlenadoFormularios } from './components/public/Llenado-formularios';
import { FormularioAnexo01 } from './components/public/FormularioAnexo01';

// Componente para forzar el scroll al inicio de la vista activa (ocultando el banner superior)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const outerMain = document.querySelector('main');
      if (outerMain) {
        // Obtenemos el wrapper del Navbar (que está justo antes del main)
        const navbarWrapper = outerMain.previousElementSibling;
        const navbarHeight = navbarWrapper ? navbarWrapper.getBoundingClientRect().height : 0;

        // Buscamos el elemento de contenido real (el primer section del main interno o externo)
        const innerMain = outerMain.querySelector('main');
        const contentEl = innerMain
          ? (innerMain.querySelector('section') || innerMain.firstElementChild)
          : (outerMain.querySelector('section') || outerMain.firstElementChild);

        if (contentEl) {
          const rect = contentEl.getBoundingClientRect();
          // Calculamos la posición absoluta Y del contenido en la página
          const contentAbsoluteTop = rect.top + window.scrollY;

          // Posicionamos el scroll de manera que el contenido empiece justo debajo del navbar con un margen estético de 16px
          const targetScrollY = contentAbsoluteTop - navbarHeight;

          window.scrollTo({
            top: targetScrollY,
            behavior: 'auto', // Instantáneo para evitar efecto de "salto" visual
          });
        } else if (navbarWrapper) {
          const navRect = navbarWrapper.getBoundingClientRect();
          const navAbsoluteTop = navRect.top + window.scrollY;
          window.scrollTo({
            top: navAbsoluteTop,
            behavior: 'auto',
          });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Ejecutamos inmediatamente
    handleScroll();

    // Pequeño retardo adicional en caso de que el navegador esté renderizando asíncronamente
    const timer = setTimeout(handleScroll, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-center" richColors />

      {/* Banner: VISIBLE SIEMPRE ENCIMA del Navbar */}

      <div style={{ width: '100%', lineHeight: 0 }}>
        <img
          src="/images/banner-defensoria2.webp"
          alt="Banner Defensoría Universitaria"
          style={{ display: 'block', width: '100%' }}
          className="w-full h-44 md:h-64 lg:h-80 object-cover"
        />
      </div>

      {/* Navbar sticky: se pega arriba al scrollear */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <Navbar />
      </div>

      <main className="flex-grow">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/base-legal" element={<BaseLegal />} />
          <Route path="/procedimiento" element={<Procedimiento />} />
          <Route path="/funciones" element={<Funciones />} />
          <Route path="/llenado-formularios" element={<LlenadoFormularios />} />
          <Route path="/llenado-formularios/formulario-anexo-01" element={<FormularioAnexo01 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;