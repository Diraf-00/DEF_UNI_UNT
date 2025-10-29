import { Download, FileText, Clock, Users, AlertCircle } from 'lucide-react';

export function Formularios() {
  const colors = {
    darkBlue: '#132746',
    blue: '#193D73',
    paper: '#F3F3F1',
    gold: '#e6ad09',
  };

  const formularios = [
    {
      nombre: 'Anexo N° 01 - Formulario de Solicitud',
      descripcion: 'Formulario principal para presentar casos ante la Defensoría Universitaria',
      formato: 'PDF',
      tamaño: '245 KB',
      version: 'v2.1',
      fechaActualizacion: '2024-01-15',
      obligatorio: true,
      categoria: 'principal'
    },
    {
      nombre: 'Anexo N° 02 - Acta de Conciliación',
      descripcion: 'Formato para el registro de acuerdos de conciliación',
      formato: 'PDF',
      tamaño: '180 KB',
      version: 'v1.3',
      fechaActualizacion: '2024-01-10',
      obligatorio: false,
      categoria: 'proceso'
    },
    {
      nombre: 'Formulario de Subsanación',
      descripcion: 'Para subsanar observaciones en casos inadmisibles',
      formato: 'PDF',
      tamaño: '156 KB',
      version: 'v1.1',
      fechaActualizacion: '2023-12-20',
      obligatorio: false,
      categoria: 'proceso'
    },
    {
      nombre: 'Declaración Jurada de Veracidad',
      descripcion: 'Declaración de veracidad de la información proporcionada',
      formato: 'PDF',
      tamaño: '120 KB',
      version: 'v1.0',
      fechaActualizacion: '2023-11-15',
      obligatorio: true,
      categoria: 'complementario'
    },
    {
      nombre: 'Autorización para Tratamiento de Datos',
      descripcion: 'Consentimiento para el tratamiento de datos personales según Ley N° 29733',
      formato: 'PDF',
      tamaño: '98 KB',
      version: 'v2.0',
      fechaActualizacion: '2024-02-01',
      obligatorio: true,
      categoria: 'complementario'
    }
  ];

  const instrucciones = [
    {
      paso: 1,
      titulo: 'Descarga el formulario',
      descripcion: 'Descarga el Anexo N° 01 desde esta página'
    },
    {
      paso: 2,
      titulo: 'Completa todos los campos',
      descripcion: 'Llena toda la información requerida de manera clara y precisa'
    },
    {
      paso: 3,
      titulo: 'Adjunta evidencias',
      descripcion: 'Incluye todos los documentos probatorios relevantes'
    },
    {
      paso: 4,
      titulo: 'Presenta tu caso',
      descripcion: 'Usa el formulario web o entrega presencialmente'
    }
  ];

  const handleDownload = (formulario: any) => {
    // Simular descarga
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${formulario.nombre}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ maxWidth: '1050px', margin: '0 auto', width: '100%' }}>
      <section>
        <div style={{ maxWidth: '1050px', margin: '0 auto', width: '100%' }}>
          <img
            src="/images/banner-defensoria.webp"
            alt="Banner Defensoría Universitaria"
            className="w-full h-44 md:h-64 lg:h-80 object-cover"
            style={{ display: 'block', width: '100%', maxWidth: '1050px', margin: '0 auto' }}
          />
        </div>
      </section>

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 mt-10 space-y-12 pb-24">
        <style>{`
          :root{--panel-radius:16px;--panel-padding:1.75rem}
          .colored-card{border-radius:var(--panel-radius);padding:var(--panel-padding);box-shadow:0 8px 25px rgba(15,23,42,0.08);transition:transform .2s ease, box-shadow .2s ease}
          .colored-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(15,23,42,0.12)}
        `}</style>

        <section className="p-6 md:p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.paper }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Formularios y Documentos</h3>
          </div>

          <div className="text-gray-700 mb-6">
            <p className="text-sm">Descarga los formularios oficiales necesarios para presentar tu caso ante la Defensoría Universitaria o utiliza el formulario en línea para mayor rapidez.</p>
          </div>

          {/* Alerta importante */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Información Importante</h3>
              <p className="text-yellow-700 text-sm mt-1">
                También puedes presentar tu caso directamente a través de nuestro 
                <a href="/ingreso-caso" className="text-yellow-800 underline font-medium ml-1">
                  formulario en línea
                </a>, sin necesidad de descargar documentos.
              </p>
            </div>
          </div>
        </div>

        </section>

        {/* Instrucciones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Instrucciones de Uso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instrucciones.map((instruccion) => (
              <div key={instruccion.paso} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {instruccion.paso}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {instruccion.titulo}
                </h3>
                <p className="text-sm text-gray-600">
                  {instruccion.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Formularios Principales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Formularios Principales
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {formularios
              .filter(f => f.categoria === 'principal')
              .map((formulario, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {formulario.nombre}
                        </h3>
                        {formulario.obligatorio && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Obligatorio
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {formulario.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span>{formulario.formato}</span>
                      <span>{formulario.tamaño}</span>
                      <span>{formulario.version}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(formulario.fechaActualizacion).toLocaleDateString('es-PE')}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(formulario)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar</span>
                  </button>
                </div>
              ))}
          </div>
        </section>

        {/* Formularios de Proceso */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Formularios de Proceso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formularios
              .filter(f => f.categoria === 'proceso')
              .map((formulario, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {formulario.nombre}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {formulario.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{formulario.formato} - {formulario.tamaño}</span>
                    <span>{formulario.version}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(formulario)}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar</span>
                  </button>
                </div>
              ))}
          </div>
        </section>

        {/* Formularios Complementarios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Documentos Complementarios
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {formularios
              .filter(f => f.categoria === 'complementario')
              .map((formulario, index, arr) => (
                <div key={index} className={`p-6 ${index !== arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {formulario.nombre}
                          {formulario.obligatorio && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Obligatorio
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {formulario.descripcion}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{formulario.formato} - {formulario.tamaño}</span>
                          <span>{formulario.version}</span>
                          <span>Actualizado: {new Date(formulario.fechaActualizacion).toLocaleDateString('es-PE')}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(formulario)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Información adicional */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Ayuda y Asesoría</h3>
            </div>
            <p className="text-blue-800 text-sm mb-4">
              Si necesitas ayuda para completar los formularios, puedes contactarnos 
              para recibir asesoría personalizada.
            </p>
            <div className="text-sm text-blue-700">
              <p><strong>Teléfono:</strong> +51 44 481569</p>
              <p><strong>Email:</strong> defensoria@unt.edu.pe</p>
              <p><strong>Horario:</strong> L-V 8:00-17:00</p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Alternativa Digital</h3>
            </div>
            <p className="text-green-800 text-sm mb-4">
              Presenta tu caso directamente en línea sin necesidad de descargar formularios. 
              Más rápido y eficiente.
            </p>
            <a
              href="/ingreso-caso"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>Ir al formulario en línea</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}