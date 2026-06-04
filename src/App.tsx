import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Home } from './components/public/Home';
import { BaseLegal } from './components/public/BaseLegal';
import { Funciones } from './components/public/Funciones';
import { Procedimiento } from './components/public/Procedimiento';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LlenadoFormularios } from './components/public/Llenado-formularios';
import { FormularioAnexo01 } from './components/public/FormularioAnexo01';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-center" richColors />

      {/* Banner: VISIBLE SIEMPRE ENCIMA del Navbar */}

      <div style={{ width: '100%', lineHeight: 0 }}>
        <img
          src="/images/banner-defensoria.png"
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
      <AppContent />
    </Router>
  );
}

export default App;