import React from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';

export function BaseLegal() {
  const leyes = [
    {
      titulo: 'Ley Universitaria N° 30220',
      descripcion: 'Ley que regula la creación, funcionamiento, supervisión y cierre de las universidades.',
      articulos: ['Art. 95 - Defensoría Universitaria', 'Art. 96 - Funciones del Defensor'],
      fecha: '2014-07-09',
      enlace: '#'
    },
    {
      titulo: 'Ley de Protección de Datos Personales N° 29733',
      descripcion: 'Ley que garantiza el derecho fundamental a la protección de datos personales.',
      articulos: ['Art. 1 - Objeto', 'Art. 2 - Ámbito de aplicación'],
      fecha: '2011-07-03',
      enlace: '#'
    },
    {
      titulo: 'Reglamento de la Defensoría Universitaria UNT',
      descripcion: 'Reglamento específico que establece las funciones y procedimientos de la Defensoría de la UNT.',
      articulos: ['Cap. I - Disposiciones Generales', 'Cap. II - Procedimientos'],
      fecha: '2023-01-15',
      enlace: '#'
    }
  ];

  const decretos = [
    {
      titulo: 'D.S. N° 016-2015-MINEDU',
      descripcion: 'Reglamento de la Ley Universitaria',
      fecha: '2015-12-26'
    },
    {
      titulo: 'Resolución de Superintendencia N° 033-2017-SUNEDU',
      descripcion: 'Reglamento del Registro Nacional de Grados y Títulos',
      fecha: '2017-08-28'
    }
  ];

  const principios = [
    'Autonomía e independencia funcional',
    'Imparcialidad en las actuaciones',
    'Confidencialidad de la información',
    'Transparencia en los procedimientos',
    'Celeridad en la resolución',
    'Accesibilidad para todos los miembros'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Marco Legal
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce la base normativa que sustenta el funcionamiento de la Defensoría 
            Universitaria y los derechos que protegemos.
          </p>
        </div>

        {/* Leyes Principales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Normativa Principal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leyes.map((ley, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {ley.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {ley.descripcion}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Artículos relevantes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {ley.articulos.map((articulo, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {articulo}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(ley.fecha).toLocaleDateString('es-PE')}
                  </span>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver documento</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Principios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Principios Rectores
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              La Defensoría Universitaria se rige por los siguientes principios fundamentales:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principios.map((principio, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{principio}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decretos y Resoluciones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Decretos y Resoluciones
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {decretos.map((decreto, index) => (
              <div key={index} className={`p-6 ${index !== decretos.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {decreto.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {decreto.descripcion}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(decreto.fecha).toLocaleDateString('es-PE')}
                    </span>
                  </div>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm ml-4">
                    <Download className="w-4 h-4" />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competencias */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Competencias de la Defensoría
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                ✅ Competencias Incluidas
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Violación de derechos académicos</li>
                <li>• Discriminación por cualquier motivo</li>
                <li>• Procedimientos académicos irregulares</li>
                <li>• Hostigamiento sexual</li>
                <li>• Conflictos entre miembros de la comunidad</li>
                <li>• Problemas de acceso a servicios universitarios</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">
                ❌ Fuera de Competencia
              </h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• Asuntos de naturaleza penal</li>
                <li>• Conflictos laborales (régimen CAS/CAP)</li>
                <li>• Decisiones académicas colegiadas</li>
                <li>• Asuntos en proceso judicial</li>
                <li>• Reclamos sobre infraestructura</li>
                <li>• Temas administrativos rutinarios</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Tienes dudas sobre tus derechos?
          </h2>
          <p className="text-blue-100 mb-6">
            Si necesitas más información o consideras que tus derechos han sido vulnerados, 
            no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/formularios"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Descargar Formularios</span>
            </a>
            <a
              href="/ingreso-caso"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Presentar Caso</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}