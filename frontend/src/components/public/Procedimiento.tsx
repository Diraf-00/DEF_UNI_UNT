import { useState } from 'react';
import { Clock } from 'lucide-react';

export function Procedimiento() {
  const colors = {
    darkBlue: '#132746',
    blue: '#193D73',
    orange: '#FF904E',
    paper: '#F3F3F1',
    gold: '#e6ad09',
  };

  const [tarjetasVolteadas, setTarjetasVolteadas] = useState<Set<number>>(new Set());

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
          
          .flip-card-container {
            width: 200px;
            height: 200px;
            transition: width 0.6s;
          }
          
          .flip-card-container.flipped {
            width: 400px;
            height: 200px;
          }
          
          .flip-card {
            perspective: 1000px;
            width: 100%;
            height: 100%;
          }
          
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }
          
          .flip-card-container.flipped .flip-card-inner {
            transform: rotateY(180deg);
          }
          
          .flip-card-front {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            border-radius: 8px;
          }
          
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            border-radius: 8px;
            transform: rotateY(180deg);
            overflow-y: auto;
          }
        `}</style>

        <section className="p-6 md:p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.paper }}>
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-800">Procedimiento y Recursos Visuales</h3>
          </div>

          <div className="bg-white shadow-md" style={{ borderRadius: '16px', padding: '1.75rem' }}>
            <h4 className="font-semibold mb-3" style={{ color: colors.darkBlue }}>Procedimiento (Art. 21–28)</h4>
            <p className="text-gray-700 mb-4">Cómo se tramitan las denuncias, reclamos o consultas. Haz clic en cada tarjeta para ver más información.</p>

            <div className="flex justify-center">
              <div className="space-y-4">
                {pasos.map((p, idx) => {
                  const isFlipped = tarjetasVolteadas.has(idx);
                  
                  const toggleFlip = () => {
                    const newSet = new Set(tarjetasVolteadas);
                    if (isFlipped) {
                      newSet.delete(idx);
                    } else {
                      newSet.add(idx);
                    }
                    setTarjetasVolteadas(newSet);
                  };
                  
                  return (
                    <div key={idx} className="relative flex justify-center">
                      {/* Línea conectora (excepto el último) */}
                      {idx < pasos.length - 1 && (
                        <div 
                          className={`absolute top-full w-0.5 h-4 transition-colors duration-200 ${
                            isFlipped ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        />
                      )}
                      
                      {/* Tarjeta con efecto flip */}
                      <div 
                        className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
                      >
                        <div className="flip-card">
                          <div className="flip-card-inner">
                          {/* Cara frontal */}
                          <button
                            onClick={toggleFlip}
                            className="flip-card-front flex flex-col items-center justify-center p-6 border-2 border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-200 cursor-pointer"
                            style={{ 
                              borderRadius: '8px',
                            }}
                          >
                            {/* Número del paso */}
                            <div 
                              className="w-16 h-16 flex items-center justify-center font-bold text-2xl mb-4 bg-blue-100 text-blue-700"
                              style={{ borderRadius: '8px' }}
                            >
                              {idx + 1}
                            </div>
                            
                            {/* Título del paso */}
                            <h5 className="font-semibold text-center text-base text-gray-800">
                              {p.titulo}
                            </h5>
                          </button>
                          
                          {/* Cara trasera */}
                          <button
                            onClick={toggleFlip}
                            className="flip-card-back flex flex-col items-start p-4 border-2 border-blue-500 bg-blue-50 shadow-md transition-all duration-200 cursor-pointer"
                            style={{ 
                              borderRadius: '8px',
                            }}
                          >
                            {/* Número del paso en la parte trasera */}
                            <div 
                              className="w-10 h-10 flex items-center justify-center font-bold text-lg mb-2 bg-blue-600 text-white self-center flex-shrink-0"
                              style={{ borderRadius: '8px' }}
                            >
                              {idx + 1}
                            </div>
                            
                            {/* Título del paso */}
                            <h5 className="font-semibold text-center text-sm text-blue-700 mb-2 w-full flex-shrink-0">
                              {p.titulo}
                            </h5>
                            
                            {/* Descripción con scroll si es necesario */}
                            <div className="flex-1 overflow-y-auto w-full">
                              <p className="text-xs text-gray-700 text-left leading-relaxed">
                                {p.descripcion}
                              </p>
                            </div>
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Procedimiento;
