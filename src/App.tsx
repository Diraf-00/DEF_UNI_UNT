import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/public/Home';
import { BaseLegal } from './components/public/BaseLegal';
import { Funciones } from './components/public/Funciones';
import { Procedimiento } from './components/public/Procedimiento';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LlenadoFormularios } from './components/public/Llenado-formularios';
import { FormularioAnexo01 } from './components/public/FormularioAnexo01';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

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
    </Router>
  );
}

export default App;