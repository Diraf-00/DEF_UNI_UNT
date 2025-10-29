import { Shield, FileText } from 'lucide-react';

export function Funciones() {
  const colors = {
    darkBlue: '#132746',
    blue: '#193D73',
    orange: '#FF904E',
    paper: '#F3F3F1',
    gold: '#e6ad09',
    warmYellow: '#FFBC59',
  };

  const funciones = [
    'Recibir y atender consultas, denuncias o reclamos de la comunidad universitaria.',
    'Solicitar información a cualquier instancia de la universidad.',
    'Formular recomendaciones y sugerencias para la solución de los casos.',
    'Actuar como mediador o conciliador para la solución de conflictos.',
    'Difundir los derechos que son materia de defensa.',
    'Actuar de oficio o a solicitud de parte en casos de posible arbitrariedad.',
    'Proponer políticas o medidas de mejora en la defensa de derechos.',
    'Promover la mejora continua de la calidad del servicio universitario.',
    'Sesionar semanalmente o según lo requiera el Defensor Universitario.',
    'Reportar semestralmente a la SUNEDU los casos y medidas adoptadas.',
    'Realizar seguimiento de los casos derivados a otras instancias.',
  ];

  const noFunciones = [
    'Derechos colectivos o laborales.',
    'Medidas disciplinarias.',
    'Evaluaciones académicas de docentes o alumnos.',
    'Casos impugnables por otras vías legales.',
    'Reclamos del Código de Defensa del Consumidor (Libro de Reclamaciones).',
    'Denuncias anónimas o sin fundamento razonable.',
  ];

  const faqs = [
    {
      q: '¿Puede la Defensoría imponer sanciones?',
      a: 'No, solo recomienda o concilia.',
    },
    {
      q: '¿Cuál es el plazo máximo de investigación?',
      a: 'Hasta 30 días calendario (Art. 18).',
    },
    {
      q: '¿Se puede presentar una denuncia anónima?',
      a: 'No, debe estar identificada (Art. 23).',
    },
    {
      q: '¿Qué pasa luego de admitida mi queja?',
      a: 'Se inicia la investigación y puede derivar en conciliación o recomendación (Art. 24–27).',
    },
    {
      q: '¿La Defensoría tiene competencia sobre casos de acoso sexual?',
      a: 'Sí, si involucra derechos individuales y hechos dentro de la comunidad universitaria.',
    },
    {
      q: '¿Dónde puedo hacer seguimiento de mi caso?',
      a: 'A través del número de expediente asignado (Art. 22).',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ maxWidth: '1050px', margin: '0 auto', width: '100%' }}>


      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 mt-10 space-y-16 pb-24">
        <style>{`
          :root{--panel-radius:16px;--panel-padding:1.75rem}
          .colored-card{border-radius:var(--panel-radius);padding:var(--panel-padding);box-shadow:0 8px 25px rgba(15,23,42,0.08);transition:transform .2s ease, box-shadow .2s ease}
          .colored-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(15,23,42,0.12)}
          .section-title{font-size:1.75rem;font-weight:800;margin-bottom:1rem}
        `}</style>

        <section className="p-6 md:p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.paper }}>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-orange-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800">Funciones de la Defensoría</h3>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="colored-card" style={{ backgroundColor: '#e6ad0915', borderLeft: `4px solid ${colors.gold}` }}>
              <h4 className="font-semibold mb-2" style={{ color: colors.darkBlue }}>Qué hace (Art. 18)</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {funciones.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="colored-card" style={{ backgroundColor: '#FF000015', borderLeft: `4px solid #FF4C4C` }}>
              <h4 className="font-semibold mb-2" style={{ color: '#BF1E1E' }}>No son funciones (Art. 19)</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {noFunciones.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="p-6 md:p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.paper }}>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-blue-600 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800">Preguntas frecuentes</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((qa, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                <p className="font-semibold" style={{ color: colors.darkBlue }}>{qa.q}</p>
                <p className="text-sm text-gray-700 mt-1">{qa.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Funciones;
