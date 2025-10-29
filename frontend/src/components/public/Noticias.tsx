import { Bell, Megaphone } from 'lucide-react';

export function Noticias() {
  const colors = {
    darkBlue: '#132746',
    blue: '#193D73',
    paper: '#F3F3F1',
    gold: '#e6ad09',
  };

  const publicaciones = [
    {
      tipo: 'Taller',
      titulo: 'Taller sobre derechos estudiantiles',
      fecha: '2025-09-15',
      resumen: 'Sesión orientada a estudiantes sobre mecanismos de tutela y procedimientoss de la Defensoría.'
    },
    {
      tipo: 'Capacitación',
      titulo: 'Capacitación a personal administrativo',
      fecha: '2025-08-30',
      resumen: 'Buenas prácticas para la atención de consultas y remisión de información.'
    },
    {
      tipo: 'Campaña',
      titulo: 'Campaña de sensibilización sobre privacidad',
      fecha: '2025-07-10',
      resumen: 'Difusión de derechos y obligaciones en el manejo de datos personales.'
    }
  ];

  const comunicados = [
    {
      titulo: 'Defensoría Informa: Nueva norma sobre procedimientos internos',
      fecha: '2025-10-01',
      texto: 'Se publica la actualización del reglamento interno relacionado con plazos y competencias.'
    },
    {
      titulo: 'Calendario de talleres 2025-II',
      fecha: '2025-09-01',
      texto: 'Programación de actividades de formación dirigidas a la comunidad universitaria.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ maxWidth: '1050px', margin: '0 auto', width: '100%' }}>


      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 mt-10 space-y-12 pb-24">
        <style>{`
          :root{--panel-radius:16px;--panel-padding:1.75rem}
          .colored-card{border-radius:var(--panel-radius);padding:var(--panel-padding);box-shadow:0 8px 25px rgba(15,23,42,0.08);transition:transform .2s ease, box-shadow .2s ease}
          .colored-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(15,23,42,0.12)}
        `}</style>

        <section className="p-6 md:p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.paper }}>
          <div className="flex items-center gap-3 mb-4">
            <Megaphone className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Noticias y Difusión</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="colored-card bg-white">
              <h4 className="font-semibold mb-3" style={{ color: colors.darkBlue }}>Publicaciones</h4>
              <p className="text-gray-700 text-sm mb-4">Talleres, comunicados, capacitaciones y campañas de sensibilización.</p>
              <div className="space-y-3">
                {publicaciones.map((p, i) => (
                  <article key={i} className="p-3 border border-gray-100 rounded-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{p.titulo}</div>
                        <div className="text-xs text-gray-500">{p.tipo} • {new Date(p.fecha).toLocaleDateString('es-PE')}</div>
                        <p className="text-sm text-gray-700 mt-2">{p.resumen}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="colored-card bg-white">
              <h4 className="font-semibold mb-3" style={{ color: colors.darkBlue }}>Defensoría Informa</h4>
              <p className="text-gray-700 text-sm mb-4">Comunicados sobre derechos universitarios y nuevas normas.</p>
              <div className="space-y-3">
                {comunicados.map((c, idx) => (
                  <div key={idx} className="p-3 border border-gray-100 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-gray-800">{c.titulo}</div>
                      <div className="text-xs text-gray-500">{new Date(c.fecha).toLocaleDateString('es-PE')}</div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{c.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Bell className="w-4 h-4 mr-2" />
              Suscribirme a novedades
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Noticias;
