import { FileText, Download } from 'lucide-react';

export function BaseLegal() {
  const colors = {
    darkBlue: '#132746',
    blue: '#193D73',
    paper: '#F3F3F1',
    gold: '#e6ad09',
  };

  const marcoLegal = [
    'Constitución Política del Perú',
    'Ley Universitaria N° 30220',
    'Estatuto Institucional UNT',
    'Reglamento de Organización y Funciones UNT (R.R. N°1173-2022)',
    'Ley de Procedimiento Administrativo General N°27444',
    'Ley del Código de Ética de la Función Pública (N°27815)',
    'Ley del Servicio Civil (N°30057)',
    'Ley de Protección de Datos Personales (N°29733)',
    'Resolución SUNEDU N°064-2019-SUNEDU/CD',
  ];

  const decretos = [
    {
      titulo: 'D.S. N° 016-2015-MINEDU',
      descripcion: 'Reglamento de la Ley Universitaria',
      fecha: '2015-12-26',
      url: 'https://www.gob.pe/institucion/minedu/normas-legales/118310-016-2015-minedu'
    },
    {
      titulo: 'Resolución de Superintendencia N° 033-2017-SUNEDU',
      descripcion: 'Reglamento del Registro Nacional de Grados y Títulos',
      fecha: '2017-08-28',
      url: 'https://www.gob.pe/institucion/sunedu/normas-legales/614425-033-2017'
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
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Documentos y Marco Legal</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="colored-card" style={{ backgroundColor: '#ffffff' }}>
              <h4 className="font-semibold mb-3" style={{ color: colors.darkBlue }}>Marco Legal (Art. 4)</h4>
              <p className="text-gray-700 mb-4">Acceso a normativa, resoluciones y base legal.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {marcoLegal.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="mt-6">
                <a
                  href="/docs/Reglamento N°003-2025-DEF.UNIV-UNT.pdf"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold"
                  download
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Reglamento N°003-2025-DEF.UNIV/UNT (PDF)</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Decretos y Resoluciones</h3>
                {decretos.map((d, i) => (
                  <div key={i} className={`mb-4 ${i !== decretos.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
                    <h4 className="font-medium text-gray-800">
                      {d.url ? (
                        <a 
                          href={d.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {d.titulo}
                        </a>
                      ) : (
                        d.titulo
                      )}
                    </h4>
                    <p className="text-gray-600 text-sm">{d.descripcion}</p>
                    <span className="text-xs text-gray-500">{new Date(d.fecha).toLocaleDateString('es-PE')}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cómo usar estos documentos</h3>
                <p className="text-gray-700 text-sm">Puedes consultar y descargar la normativa para sustentar tus solicitudes o para la elaboración de expedientes. Si necesitas asistencia para interpretar un artículo o procedimiento, contáctanos y te orientaremos.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BaseLegal;