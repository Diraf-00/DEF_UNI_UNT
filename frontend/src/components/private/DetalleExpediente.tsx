import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, User, MapPin, Clock, FileText, Download, 
  Send, Plus, Edit, AlertTriangle, CheckCircle, MessageSquare,
  Upload, Phone, Mail, Building
} from 'lucide-react';

export function DetalleExpediente() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('informacion');
  const [newComment, setNewComment] = useState('');
  const [newAction, setNewAction] = useState('');

  // Datos de ejemplo del expediente
  const expediente = {
    id: 1,
    expediente: 'DEF-2024-045',
    codigo: 'A1B2C3D4',
    estado: 'EN_INVESTIGACION',
    fechaIngreso: '2024-01-20T10:30:00',
    fechaUltimaActualizacion: '2024-01-22T14:15:00',
    prioridad: 'alta',
    asignado: 'Dr. María López',
    plazo: '2024-01-27T17:00:00',
    
    recurrente: {
      nombres: 'Juan Pablo',
      apellidos: 'García Mendoza',
      tipoDocumento: 'DNI',
      numeroDocumento: '12345678',
      tipo: 'Estudiante de pregrado',
      codigo: 'E202012345',
      telefono: '+51 987654321',
      email: 'jgarcia@unt.edu.pe',
      direccion: 'Av. América Norte 123, Trujillo'
    },
    
    denunciado: {
      nombres: 'Carlos Eduardo',
      apellidos: 'Ruiz Hernández',
      cargo: 'Docente Principal',
      area: 'Facultad de Ingeniería',
      relacion: 'Docente'
    },
    
    caso: {
      tipoVulneracion: 'Discriminación por género, raza, religión u orientación sexual',
      fechaHechos: '2024-01-15',
      lugarHechos: 'Aula 205 - Facultad de Ingeniería',
      descripcionHechos: 'Durante la clase de Cálculo I, el docente realizó comentarios discriminatorios hacia mi persona por mi orientación sexual, mencionando que "personas como yo no deberían estar estudiando ingeniería". Esto ocurrió frente a todos mis compañeros de clase, generando un ambiente hostil y afectando mi rendimiento académico.',
      pretension: 'Solicito que se investigue el caso y se tomen las medidas disciplinarias correspondientes contra el docente. Además, solicito disculpas públicas y garantías de que este tipo de situaciones no se repitan.',
      mediosProbatorios: 'Testimonio de 3 compañeros de clase que presenciaron los hechos, grabación de audio del incidente, capturas de pantalla de mensajes de WhatsApp donde otros estudiantes comentan sobre el comportamiento del docente.'
    },
    
    archivos: [
      {
        nombre: 'Testimonio_Compañero1.pdf',
        tamaño: '245 KB',
        fecha: '2024-01-20',
        tipo: 'Testimonio'
      },
      {
        nombre: 'Audio_Incidente.mp3',
        tamaño: '1.2 MB',
        fecha: '2024-01-20',
        tipo: 'Evidencia'
      },
      {
        nombre: 'Capturas_WhatsApp.pdf',
        tamaño: '890 KB',
        fecha: '2024-01-20',
        tipo: 'Evidencia'
      }
    ],
    
    timeline: [
      {
        fecha: '2024-01-20T10:30:00',
        accion: 'CASO_INGRESADO',
        descripcion: 'Caso ingresado al sistema',
        detalle: 'Se registró el caso con toda la documentación requerida',
        responsable: 'Sistema',
        documentos: ['Formulario_Anexo01.pdf', 'Declaracion_Jurada.pdf']
      },
      {
        fecha: '2024-01-20T11:45:00',
        accion: 'CASO_ASIGNADO',
        descripcion: 'Caso asignado para evaluación',
        detalle: 'Asignado a Dr. María López para evaluación de admisibilidad',
        responsable: 'Coordinación',
        documentos: []
      },
      {
        fecha: '2024-01-21T09:15:00',
        accion: 'CASO_ADMITIDO',
        descripcion: 'Caso admitido para investigación',
        detalle: 'Cumple con todos los requisitos de admisibilidad según el reglamento. Se procede con la investigación.',
        responsable: 'Dr. María López',
        documentos: ['Resolucion_Admisibilidad.pdf']
      },
      {
        fecha: '2024-01-21T14:30:00',
        accion: 'SOLICITUD_INFORMACION',
        descripcion: 'Solicitud de información enviada',
        detalle: 'Se envió solicitud de información a la Facultad de Ingeniería y al docente mencionado',
        responsable: 'Dr. María López',
        documentos: ['Solicitud_Facultad.pdf', 'Solicitud_Docente.pdf']
      },
      {
        fecha: '2024-01-22T14:15:00',
        accion: 'SEGUIMIENTO',
        descripcion: 'Seguimiento de solicitudes',
        detalle: 'Se realizó seguimiento a las solicitudes enviadas. Plazo de respuesta: 5 días hábiles',
        responsable: 'Dr. María López',
        documentos: []
      }
    ]
  };

  const getEstadoInfo = (estado) => {
    const estados = {
      INGRESADO: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Ingresado', icon: FileText },
      ADMITIDO: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Admitido', icon: CheckCircle },
      PENDIENTE_SUBSANACION: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pendiente Subsanación', icon: AlertTriangle },
      EN_INVESTIGACION: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'En Investigación', icon: Clock },
      RESUELTO: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Resuelto', icon: CheckCircle }
    };
    return estados[estado] || { color: 'bg-gray-100 text-gray-800 border-gray-200', label: estado, icon: FileText };
  };

  const tabs = [
    { id: 'informacion', label: 'Información General' },
    { id: 'timeline', label: 'Bitácora' },
    { id: 'archivos', label: 'Archivos' },
    { id: 'acciones', label: 'Acciones' }
  ];

  const estadoInfo = getEstadoInfo(expediente.estado);
  const IconEstado = estadoInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/expedientes"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Expedientes</span>
            </a>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Expediente {expediente.expediente}
              </h1>
              <p className="text-gray-600">
                {expediente.recurrente.nombres} {expediente.recurrente.apellidos}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${estadoInfo.color}`}>
                <IconEstado className="w-5 h-5" />
                <span className="font-medium">{estadoInfo.label}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Fecha Ingreso</p>
                <p className="font-medium">{new Date(expediente.fechaIngreso).toLocaleDateString('es-PE')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Asignado a</p>
                <p className="font-medium">{expediente.asignado}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Plazo</p>
                <p className="font-medium">
                  {expediente.plazo ? new Date(expediente.plazo).toLocaleDateString('es-PE') : 'Sin plazo'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Prioridad</p>
                <p className={`font-medium capitalize ${
                  expediente.prioridad === 'alta' ? 'text-red-600' :
                  expediente.prioridad === 'media' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {expediente.prioridad}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Información General */}
            {activeTab === 'informacion' && (
              <div className="space-y-8">
                {/* Datos del Recurrente */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span>Datos del Recurrente</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Nombres y Apellidos</p>
                        <p className="font-medium">{expediente.recurrente.nombres} {expediente.recurrente.apellidos}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Documento de Identidad</p>
                        <p className="font-medium">{expediente.recurrente.tipoDocumento}: {expediente.recurrente.numeroDocumento}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipo de Recurrente</p>
                        <p className="font-medium">{expediente.recurrente.tipo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Código Universitario</p>
                        <p className="font-medium">{expediente.recurrente.codigo}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-medium">{expediente.recurrente.telefono}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Correo Electrónico</p>
                          <p className="font-medium">{expediente.recurrente.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Dirección</p>
                          <p className="font-medium">{expediente.recurrente.direccion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Datos del Denunciado */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Building className="w-5 h-5 text-gray-600" />
                    <span>Datos del Denunciado</span>
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Nombres y Apellidos</p>
                        <p className="font-medium">{expediente.denunciado.nombres} {expediente.denunciado.apellidos}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cargo</p>
                        <p className="font-medium">{expediente.denunciado.cargo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Área</p>
                        <p className="font-medium">{expediente.denunciado.area}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Relación</p>
                        <p className="font-medium">{expediente.denunciado.relacion}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información del Caso */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span>Información del Caso</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Tipo de Vulneración</p>
                      <p className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg font-medium">
                        {expediente.caso.tipoVulneracion}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Fecha de los Hechos</p>
                        <p className="bg-gray-50 p-3 rounded-lg font-medium">
                          {new Date(expediente.caso.fechaHechos).toLocaleDateString('es-PE')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Lugar de los Hechos</p>
                        <p className="bg-gray-50 p-3 rounded-lg font-medium">
                          {expediente.caso.lugarHechos}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Descripción de los Hechos</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-900 leading-relaxed">{expediente.caso.descripcionHechos}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Pretensión</p>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <p className="text-blue-900 leading-relaxed">{expediente.caso.pretension}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Medios Probatorios</p>
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <p className="text-green-900 leading-relaxed">{expediente.caso.mediosProbatorios}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline/Bitácora */}
            {activeTab === 'timeline' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bitácora del Caso
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Nueva Actuación</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {expediente.timeline.map((evento, index) => (
                    <div key={index} className="relative">
                      {index !== expediente.timeline.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        </div>
                        
                        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{evento.descripcion}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(evento.fecha).toLocaleString('es-PE')}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{evento.detalle}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Por: {evento.responsable}
                            </span>
                            
                            {evento.documentos.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {evento.documentos.length} documento(s)
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {evento.documentos.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex flex-wrap gap-2">
                                {evento.documentos.map((doc, idx) => (
                                  <span key={idx} className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    <FileText className="w-3 h-3" />
                                    <span>{doc}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agregar Nueva Actuación */}
                <div className="mt-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Agregar Nueva Actuación</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción de la Actuación
                      </label>
                      <textarea
                        value={newAction}
                        onChange={(e) => setNewAction(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describa la actuación realizada..."
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                        Cancelar
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Guardar Actuación
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Archivos */}
            {activeTab === 'archivos' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Archivos del Expediente
                  </h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Subir Archivo</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expediente.archivos.map((archivo, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{archivo.nombre}</p>
                          <p className="text-sm text-gray-500">{archivo.tamaño}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {archivo.tipo}
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Subido: {new Date(archivo.fecha).toLocaleDateString('es-PE')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Acciones */}
            {activeTab === 'acciones' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Acciones del Caso
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Cambiar Estado</h4>
                      <select className="w-full border border-blue-300 rounded-lg px-3 py-2 text-blue-900">
                        <option>En Investigación</option>
                        <option>Pendiente Subsanación</option>
                        <option>Resuelto</option>
                        <option>Archivado</option>
                      </select>
                      <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Actualizar Estado
                      </button>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">Enviar Comunicación</h4>
                      <select className="w-full border border-green-300 rounded-lg px-3 py-2 text-green-900 mb-2">
                        <option>Recurrente</option>
                        <option>Denunciado</option>
                        <option>Área/Facultad</option>
                      </select>
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Enviar Notificación
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Generar Documento</h4>
                      <select className="w-full border border-purple-300 rounded-lg px-3 py-2 text-purple-900 mb-2">
                        <option>Acta de Conciliación</option>
                        <option>Resolución Final</option>
                        <option>Solicitud de Información</option>
                      </select>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Generar Documento
                      </button>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-2">Acciones Especiales</h4>
                      <div className="space-y-2">
                        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Archivar Caso
                        </button>
                        <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                          Derivar a Otra Instancia
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}