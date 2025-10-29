import { Clock, Clipboard } from 'lucide-react';

export function Procedimiento() {
  const colors = {
    darkBlue: '#132746',
    blue: '#193D73',
    orange: '#FF904E',
    paper: '#F3F3F1',
    gold: '#e6ad09',
  };

  const pasos = [
    { titulo: 'Solicitud', descripcion: 'Por escrito o medio virtual mediante formulario oficial. Incluye datos del denunciante, descripción de hechos, pretensión y pruebas.' },
    { titulo: 'Registro', descripcion: 'Se asigna un número de expediente y código anónimo (Art. 22).' },
    { titulo: 'Admisibilidad', descripcion: 'Evaluación dentro de 5 días hábiles; si no cumple requisitos se solicita subsanación o se archiva (Art. 23).' },
    { titulo: 'Investigación', descripcion: 'Solicitud de información y descargos a las áreas involucradas. Plazo máximo: 30 días calendario (Art. 18).' },
    { titulo: 'Conciliación', descripcion: 'Se cita a las partes para lograr acuerdo. Si hay acuerdo, se levanta Acta de Mediación (Anexo 2).' },
    { titulo: 'Recomendaciones', descripcion: 'Si no hay acuerdo, se emiten recomendaciones (no vinculantes).' },
    { titulo: 'Informe final', descripcion: 'Incluye hechos, análisis, medidas y cumplimiento; se entrega a las partes y al Rectorado (Art. 28).' },
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
            <Clock className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-800">Procedimiento y Recursos Visuales</h3>
          </div>

          <div className="colored-card bg-white">
            <h4 className="font-semibold mb-3" style={{ color: colors.darkBlue }}>Procedimiento (Art. 21–28)</h4>
            <p className="text-gray-700 mb-4">Cómo se tramitan las denuncias, reclamos o consultas. A continuación se presenta el flujo general y los plazos relevantes.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pasos.map((p, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e6ad09]15 flex items-center justify-center text-[#e6ad09] font-semibold">{idx + 1}</div>
                    <div>
                      <h5 className="font-semibold text-gray-800">{p.titulo}</h5>
                      <p className="text-sm text-gray-700 mt-1">{p.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-6 md:p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.paper }}>
          <div className="flex items-center gap-3 mb-4">
            <Clipboard className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Flujograma visual</h3>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <p className="text-gray-700 mb-4">Esquema en 7 pasos:</p>
            <div className="flex overflow-x-auto gap-4 py-2">
              {pasos.map((p, i) => (
                <div key={i} className="min-w-[180px] flex-shrink-0 bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-3">
                    <span className="text-blue-700 font-semibold">{i + 1}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{p.titulo}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Iconografía: Solicitud → Registro → Admisibilidad → Investigación → Conciliación → Recomendación → Informe Final</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Procedimiento;
