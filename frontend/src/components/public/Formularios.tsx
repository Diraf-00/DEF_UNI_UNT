import React from 'react';
import { Download, FileText, Clock, Users, AlertCircle, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Formularios() {
  const navigate = useNavigate();
  
  const formularios = [
    {
      nombre: 'Anexo N° 01 - Formulario de Solicitud',
      descripcion: 'Formulario principal para presentar casos ante la Defensoría Universitaria',
      formato: 'PDF',
      tamaño: '245 KB',
      version: 'v2.1',
      fechaActualizacion: '2024-01-15',
      obligatorio: true,
      categoria: 'principal',
      tieneFormularioInteractivo: true,
      rutaFormulario: '/formulario-anexo01'
    },
    {
      nombre: 'Anexo N° 02 - Acta de Conciliación',
      descripcion: 'Formato para el registro de acuerdos de conciliación',
      formato: 'PDF',
      tamaño: '180 KB',
      version: 'v1.3',
      fechaActualizacion: '2024-01-10',
      obligatorio: false,
      categoria: 'proceso',
      tieneFormularioInteractivo: true,
      rutaFormulario: '/formulario-anexo02'
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
      categoria: 'complementario',
      tieneFormularioInteractivo: true,
      rutaFormulario: '/formulario-declaracion-jurada'
    },
    {
      nombre: 'Autorización para Tratamiento de Datos',
      descripcion: 'Consentimiento para el tratamiento de datos personales según Ley N° 29733',
      formato: 'PDF',
      tamaño: '98 KB',
      version: 'v2.0',
      fechaActualizacion: '2024-02-01',
      obligatorio: true,
      categoria: 'complementario',
      tieneFormularioInteractivo: true,
      rutaFormulario: '/formulario-autorizacion-datos'
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

  const handleFormularioClick = (formulario: any) => {
    if (formulario.tieneFormularioInteractivo && formulario.rutaFormulario) {
      navigate(formulario.rutaFormulario);
    } else {
      // Simular descarga
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${formulario.nombre}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Formularios y Documentos
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descarga los formularios oficiales necesarios para presentar tu caso 
            ante la Defensoría Universitaria.
          </p>
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
                    onClick={() => handleFormularioClick(formulario)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    {formulario.tieneFormularioInteractivo ? (
                      <>
                        <Edit className="w-4 h-4" />
                        <span>Llenar Formulario</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                      </>
                    )}
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
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
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
                    onClick={() => handleFormularioClick(formulario)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                  >
                    {formulario.tieneFormularioInteractivo ? (
                      <>
                        <Edit className="w-4 h-4" />
                        <span>Llenar Formulario</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                      </>
                    )}
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
                      onClick={() => handleFormularioClick(formulario)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      {formulario.tieneFormularioInteractivo ? (
                        <>
                          <Edit className="w-4 h-4" />
                          <span>Llenar Formulario</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Descargar</span>
                        </>
                      )}
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
      </div>
    </div>
  );
}