import { useState } from 'react';
import { Search, Calendar, FileText, Clock, CheckCircle, AlertCircle, User, MapPin } from 'lucide-react';

export function SeguimientoCaso() {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [casoEncontrado, setCasoEncontrado] = useState(null);
  const [error, setError] = useState('');

  // Datos de ejemplo para demostración
  const casosEjemplo = {
    'A1B2C3D4': {
      expediente: 'DEF-2024-001',
      estado: 'EN_INVESTIGACION',
      fechaIngreso: '2024-01-15',
      fechaUltimaActualizacion: '2024-01-22',
      tipoVulneracion: 'Discriminación por género, raza, religión u orientación sexual',
      recurrente: {
        tipo: 'Estudiante de pregrado',
        iniciales: 'J.P.G.'
      },
      timeline: [
        {
          fecha: '2024-01-15',
          estado: 'INGRESADO',
          descripcion: 'Caso ingresado al sistema',
          detalle: 'Se registró el caso con toda la documentación requerida'
        },
        {
          fecha: '2024-01-18',
          estado: 'ADMITIDO',
          descripcion: 'Caso admitido para investigación',
          detalle: 'Cumple con todos los requisitos de admisibilidad según el reglamento'
        },
        {
          fecha: '2024-01-20',
          estado: 'INVESTIGACION_INICIADA',
          descripcion: 'Solicitud de información enviada',
          detalle: 'Se enviaron solicitudes de información a las áreas correspondientes'
        },
        {
          fecha: '2024-01-22',
          estado: 'EN_INVESTIGACION',
          descripcion: 'Esperando respuestas',
          detalle: 'Se está esperando la respuesta de las áreas consultadas (plazo: 5 días hábiles)'
        }
      ],
      proximosPasos: 'Se espera respuesta de las áreas consultadas. Una vez recibida, se procederá con la evaluación del caso.',
      observaciones: 'El caso se encuentra dentro de los plazos reglamentarios.'
    },
    'E5F6G7H8': {
      expediente: 'DEF-2024-002',
      estado: 'PENDIENTE_SUBSANACION',
      fechaIngreso: '2024-01-10',
      fechaUltimaActualizacion: '2024-01-17',
      tipoVulneracion: 'Procedimientos académicos irregulares',
      recurrente: {
        tipo: 'Estudiante de pregrado',
        iniciales: 'M.L.R.'
      },
      timeline: [
        {
          fecha: '2024-01-10',
          estado: 'INGRESADO',
          descripcion: 'Caso ingresado al sistema',
          detalle: 'Se registró el caso para evaluación de admisibilidad'
        },
        {
          fecha: '2024-01-15',
          estado: 'OBSERVADO',
          descripcion: 'Caso observado por documentación incompleta',
          detalle: 'Falta adjuntar: copia de resolución académica cuestionada'
        },
        {
          fecha: '2024-01-17',
          estado: 'PENDIENTE_SUBSANACION',
          descripcion: 'Notificación de subsanación enviada',
          detalle: 'Se notificó al recurrente para subsanar observaciones. Plazo: 2 días hábiles'
        }
      ],
      proximosPasos: 'El recurrente debe subsanar las observaciones presentando la documentación faltante.',
      observaciones: 'Plazo para subsanación vence el 19 de enero de 2024.',
      requiereAccion: true
    }
  };

  const getEstadoInfo = (estado) => {
    const estados = {
      INGRESADO: { color: 'blue', label: 'Ingresado', icon: FileText },
      ADMITIDO: { color: 'green', label: 'Admitido', icon: CheckCircle },
      PENDIENTE_SUBSANACION: { color: 'yellow', label: 'Pendiente Subsanación', icon: AlertCircle },
      EN_INVESTIGACION: { color: 'blue', label: 'En Investigación', icon: Search },
      RESUELTO: { color: 'green', label: 'Resuelto', icon: CheckCircle },
      ARCHIVADO: { color: 'gray', label: 'Archivado', icon: FileText }
    };
    return estados[estado] || { color: 'gray', label: 'Desconocido', icon: FileText };
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;

    setLoading(true);
    setError('');
    setCasoEncontrado(null);

    // Simular búsqueda
    await new Promise(resolve => setTimeout(resolve, 1000));

    const caso = casosEjemplo[codigo.toUpperCase()];
    if (caso) {
      setCasoEncontrado(caso);
    } else {
      setError('No se encontró ningún caso con el código proporcionado. Verifique que el código sea correcto.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Seguimiento de Caso
          </h1>
          <p className="text-lg text-gray-600">
            Consulte el estado de su caso usando el código de seguimiento
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleBuscar} className="space-y-4">
            <div>
              <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Seguimiento
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  placeholder="Ej: A1B2C3D4"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>{loading ? 'Buscando...' : 'Buscar'}</span>
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">Códigos de Demostración:</h3>
                  <p className="text-yellow-700 text-sm">
                    Pruebe con: <strong>A1B2C3D4</strong> (caso en investigación) o <strong>E5F6G7H8</strong> (pendiente subsanación)
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Case Information */}
        {casoEncontrado && (
          <div className="space-y-6">
            {/* Case Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Expediente {casoEncontrado.expediente}
                </h2>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  getEstadoInfo(casoEncontrado.estado).color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  getEstadoInfo(casoEncontrado.estado).color === 'green' ? 'bg-green-100 text-green-800' :
                  getEstadoInfo(casoEncontrado.estado).color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getEstadoInfo(casoEncontrado.estado).label}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Recurrente</p>
                      <p className="font-medium">{casoEncontrado.recurrente.iniciales} ({casoEncontrado.recurrente.tipo})</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Ingreso</p>
                      <p className="font-medium">{new Date(casoEncontrado.fechaIngreso).toLocaleDateString('es-PE')}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tipo de Vulneración</p>
                      <p className="font-medium">{casoEncontrado.tipoVulneracion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Última Actualización</p>
                      <p className="font-medium">{new Date(casoEncontrado.fechaUltimaActualizacion).toLocaleDateString('es-PE')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Required Alert */}
            {casoEncontrado.requiereAccion && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-red-800 mb-1">Acción Requerida</h3>
                    <p className="text-red-700 text-sm mb-3">
                      Su caso requiere subsanación de documentos. {casoEncontrado.observaciones}
                    </p>
                    <a
                      href="/ingreso-caso"
                      className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Subsanar Documentos</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Historial del Caso
              </h3>
              
              <div className="space-y-6">
                {casoEncontrado.timeline.map((evento, index) => {
                  const estadoInfo = getEstadoInfo(evento.estado);
                  const IconComponent = estadoInfo.icon;
                  
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        estadoInfo.color === 'blue' ? 'bg-blue-100' :
                        estadoInfo.color === 'green' ? 'bg-green-100' :
                        estadoInfo.color === 'yellow' ? 'bg-yellow-100' :
                        'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          estadoInfo.color === 'blue' ? 'text-blue-600' :
                          estadoInfo.color === 'green' ? 'text-green-600' :
                          estadoInfo.color === 'yellow' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{evento.descripcion}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(evento.fecha).toLocaleDateString('es-PE')}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{evento.detalle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Próximos Pasos</h3>
              <p className="text-blue-800 text-sm mb-4">{casoEncontrado.proximosPasos}</p>
              {casoEncontrado.observaciones && (
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Observaciones:</h4>
                  <p className="text-blue-700 text-sm">{casoEncontrado.observaciones}</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">¿Necesita más información?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Si tiene preguntas sobre su caso, puede contactarnos:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+51 44 481569</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Correo</p>
                  <p className="text-gray-600">defensoria@unt.edu.pe</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Horario</p>
                  <p className="text-gray-600">L-V 8:00-17:00</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!casoEncontrado && !error && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Instrucciones de Uso
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">1</span>
                <p>
                  <strong>Ingrese su código de seguimiento:</strong> Utilice el código de 8 caracteres 
                  que recibió al presentar su caso.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">2</span>
                <p>
                  <strong>Consulte el estado:</strong> Podrá ver el estado actual de su caso y 
                  el historial de todas las actuaciones realizadas.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">3</span>
                <p>
                  <strong>Tome las acciones necesarias:</strong> Si su caso requiere alguna acción 
                  de su parte, se le notificará claramente qué debe hacer.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Privacidad y Seguridad</h3>
              <p className="text-yellow-700 text-sm">
                Por motivos de confidencialidad, solo se muestra información general del caso. 
                Los datos personales se mantienen protegidos conforme a la normativa vigente.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}