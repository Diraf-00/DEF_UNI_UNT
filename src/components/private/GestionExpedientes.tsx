import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Download, Calendar, User, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export function GestionExpedientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Datos de ejemplo
  const expedientes = [
    {
      id: 1,
      expediente: 'DEF-2024-045',
      recurrente: {
        nombres: 'Juan Pablo',
        apellidos: 'García Mendoza',
        tipo: 'Estudiante de pregrado',
        codigo: 'E202012345'
      },
      tipoVulneracion: 'Discriminación por género, raza, religión u orientación sexual',
      estado: 'EN_INVESTIGACION',
      fechaIngreso: '2024-01-20T10:30:00',
      fechaUltimaActualizacion: '2024-01-22T14:15:00',
      prioridad: 'alta',
      asignado: 'Dr. María López',
      plazo: '2024-01-27T17:00:00'
    },
    {
      id: 2,
      expediente: 'DEF-2024-044',
      recurrente: {
        nombres: 'María Elena',
        apellidos: 'Rodríguez Castro',
        tipo: 'Estudiante de pregrado',
        codigo: 'E202098765'
      },
      tipoVulneracion: 'Procedimientos académicos irregulares',
      estado: 'PENDIENTE_SUBSANACION',
      fechaIngreso: '2024-01-18T09:15:00',
      fechaUltimaActualizacion: '2024-01-21T11:30:00',
      prioridad: 'media',
      asignado: 'Dr. Juan Pérez',
      plazo: '2024-01-25T17:00:00'
    },
    {
      id: 3,
      expediente: 'DEF-2024-043',
      recurrente: {
        nombres: 'Ana Sofía',
        apellidos: 'Torres Vega',
        tipo: 'Docente',
        codigo: 'D202001234'
      },
      tipoVulneracion: 'Hostigamiento sexual',
      estado: 'ADMITIDO',
      fechaIngreso: '2024-01-15T16:45:00',
      fechaUltimaActualizacion: '2024-01-20T10:00:00',
      prioridad: 'alta',
      asignado: 'Dr. María López',
      plazo: '2024-01-22T17:00:00'
    },
    {
      id: 4,
      expediente: 'DEF-2024-042',
      recurrente: {
        nombres: 'Roberto Carlos',
        apellidos: 'Vargas Silva',
        tipo: 'Personal administrativo',
        codigo: 'A202005678'
      },
      tipoVulneracion: 'Conflictos entre miembros de la comunidad universitaria',
      estado: 'RESUELTO',
      fechaIngreso: '2024-01-10T11:20:00',
      fechaUltimaActualizacion: '2024-01-19T15:45:00',
      prioridad: 'baja',
      asignado: 'Dr. Juan Pérez',
      plazo: null
    },
    {
      id: 5,
      expediente: 'DEF-2024-041',
      recurrente: {
        nombres: 'Carmen Rosa',
        apellidos: 'Flores Huamán',
        tipo: 'Estudiante de posgrado',
        codigo: 'P202001111'
      },
      tipoVulneracion: 'Negativa injustificada de servicios académicos',
      estado: 'EN_INVESTIGACION',
      fechaIngreso: '2024-01-08T14:30:00',
      fechaUltimaActualizacion: '2024-01-22T09:20:00',
      prioridad: 'media',
      asignado: 'Dr. María López',
      plazo: '2024-01-26T17:00:00'
    }
  ];

  const estados = [
    { value: '', label: 'Todos los estados' },
    { value: 'INGRESADO', label: 'Ingresado' },
    { value: 'ADMITIDO', label: 'Admitido' },
    { value: 'PENDIENTE_SUBSANACION', label: 'Pendiente Subsanación' },
    { value: 'EN_INVESTIGACION', label: 'En Investigación' },
    { value: 'RESUELTO', label: 'Resuelto' },
    { value: 'ARCHIVADO', label: 'Archivado' }
  ];

  const tiposVulneracion = [
    { value: '', label: 'Todos los tipos' },
    { value: 'discriminacion', label: 'Discriminación' },
    { value: 'procedimientos', label: 'Procedimientos Académicos' },
    { value: 'hostigamiento', label: 'Hostigamiento Sexual' },
    { value: 'conflictos', label: 'Conflictos' },
    { value: 'servicios', label: 'Servicios Académicos' },
    { value: 'otros', label: 'Otros' }
  ];

  const getEstadoInfo = (estado) => {
    const estados = {
      INGRESADO: { color: 'bg-blue-100 text-blue-800', label: 'Ingresado' },
      ADMITIDO: { color: 'bg-green-100 text-green-800', label: 'Admitido' },
      PENDIENTE_SUBSANACION: { color: 'bg-yellow-100 text-yellow-800', label: 'Pendiente Subsanación' },
      EN_INVESTIGACION: { color: 'bg-purple-100 text-purple-800', label: 'En Investigación' },
      RESUELTO: { color: 'bg-gray-100 text-gray-800', label: 'Resuelto' },
      ARCHIVADO: { color: 'bg-gray-100 text-gray-500', label: 'Archivado' }
    };
    return estados[estado] || { color: 'bg-gray-100 text-gray-800', label: estado };
  };

  const getPrioridadInfo = (prioridad) => {
    const prioridades = {
      alta: { color: 'bg-red-100 text-red-800', label: 'Alta' },
      media: { color: 'bg-yellow-100 text-yellow-800', label: 'Media' },
      baja: { color: 'bg-green-100 text-green-800', label: 'Baja' }
    };
    return prioridades[prioridad] || { color: 'bg-gray-100 text-gray-800', label: prioridad };
  };

  const isPlazoVencido = (plazo) => {
    if (!plazo) return false;
    return new Date(plazo) < new Date();
  };

  const getTimeRemaining = (plazo) => {
    if (!plazo) return null;
    const now = new Date();
    const deadline = new Date(plazo);
    const diff = deadline.getTime() - now.getTime();
    
    if (diff < 0) return 'Vencido';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  // Filtrar expedientes
  const expedientesFiltrados = expedientes.filter(expediente => {
    const matchesSearch = 
      expediente.expediente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expediente.recurrente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expediente.recurrente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expediente.tipoVulneracion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = !filtroEstado || expediente.estado === filtroEstado;
    const matchesTipo = !filtroTipo || expediente.tipoVulneracion.toLowerCase().includes(filtroTipo);
    
    return matchesSearch && matchesEstado && matchesTipo;
  });

  // Paginación
  const totalPages = Math.ceil(expedientesFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const expedientesPaginados = expedientesFiltrados.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Expedientes
          </h1>
          <p className="text-gray-600">
            Administre todos los casos de la Defensoría Universitaria
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por expediente, recurrente o tipo..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {estados.map(estado => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Vulneración
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tiposVulneracion.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{expedientesFiltrados.length}</div>
            <div className="text-sm text-gray-600">Casos Mostrados</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {expedientesFiltrados.filter(e => e.estado === 'PENDIENTE_SUBSANACION').length}
            </div>
            <div className="text-sm text-gray-600">Pendientes Subsanación</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {expedientesFiltrados.filter(e => e.estado === 'EN_INVESTIGACION').length}
            </div>
            <div className="text-sm text-gray-600">En Investigación</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {expedientesFiltrados.filter(e => e.plazo && isPlazoVencido(e.plazo)).length}
            </div>
            <div className="text-sm text-gray-600">Plazos Vencidos</div>
          </div>
        </div>

        {/* Tabla de Expedientes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Expediente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Recurrente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tipo de Vulneración</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Prioridad</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Plazo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Asignado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {expedientesPaginados.map((expediente) => (
                  <tr key={expediente.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <a
                          href={`/expediente/${expediente.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          {expediente.expediente}
                        </a>
                        <div className="text-xs text-gray-500">
                          {new Date(expediente.fechaIngreso).toLocaleDateString('es-PE')}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {expediente.recurrente.nombres} {expediente.recurrente.apellidos}
                        </div>
                        <div className="text-sm text-gray-500">
                          {expediente.recurrente.tipo}
                        </div>
                        <div className="text-xs text-gray-400">
                          {expediente.recurrente.codigo}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {expediente.tipoVulneracion}
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoInfo(expediente.estado).color}`}>
                        {getEstadoInfo(expediente.estado).label}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPrioridadInfo(expediente.prioridad).color}`}>
                        {getPrioridadInfo(expediente.prioridad).label}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      {expediente.plazo ? (
                        <div className={`text-sm ${isPlazoVencido(expediente.plazo) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          <div>{getTimeRemaining(expediente.plazo)}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(expediente.plazo).toLocaleDateString('es-PE')}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{expediente.asignado}</div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <a
                          href={`/expediente/${expediente.id}`}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:text-gray-800"
                          title="Descargar"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, expedientesFiltrados.length)} de {expedientesFiltrados.length} resultados
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm rounded ${
                          page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No results */}
        {expedientesFiltrados.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron expedientes
            </h3>
            <p className="text-gray-600">
              Ajuste los filtros de búsqueda para ver más resultados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}