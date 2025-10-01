import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Calendar, FileText, Filter, TrendingUp, Users, AlertTriangle, CheckCircle } from 'lucide-react';

export function Reportes() {
  const [tipoReporte, setTipoReporte] = useState('semestral');
  const [fechaInicio, setFechaInicio] = useState('2024-01-01');
  const [fechaFin, setFechaFin] = useState('2024-06-30');
  const [loading, setLoading] = useState(false);

  // Datos de ejemplo para reportes
  const datosReporte = {
    resumenGeneral: {
      totalCasos: 156,
      casosResueltos: 128,
      casosPendientes: 28,
      tiempoPromedioResolucion: 12, // días
      satisfaccionPromedio: 4.2
    },
    
    casosPorMes: [
      { mes: 'Ene', ingresados: 15, resueltos: 12, pendientes: 3 },
      { mes: 'Feb', ingresados: 22, resueltos: 18, pendientes: 7 },
      { mes: 'Mar', ingresados: 28, resueltos: 25, pendientes: 10 },
      { mes: 'Abr', ingresados: 35, resueltos: 30, pendientes: 15 },
      { mes: 'May', ingresados: 42, resueltos: 38, pendientes: 19 },
      { mes: 'Jun', ingresados: 38, resueltos: 40, pendientes: 17 }
    ],

    casosPorTipo: [
      { tipo: 'Discriminación', cantidad: 45, porcentaje: 28.8, color: '#EF4444' },
      { tipo: 'Procedimientos Académicos', cantidad: 38, porcentaje: 24.4, color: '#3B82F6' },
      { tipo: 'Hostigamiento Sexual', cantidad: 25, porcentaje: 16.0, color: '#F59E0B' },
      { tipo: 'Conflictos', cantidad: 22, porcentaje: 14.1, color: '#10B981' },
      { tipo: 'Servicios Académicos', cantidad: 16, porcentaje: 10.3, color: '#8B5CF6' },
      { tipo: 'Otros', cantidad: 10, porcentaje: 6.4, color: '#6B7280' }
    ],

    casosPorFacultad: [
      { facultad: 'Ingeniería', casos: 35, resueltos: 28, pendientes: 7 },
      { facultad: 'Medicina', casos: 28, resueltos: 24, pendientes: 4 },
      { facultad: 'Derecho', casos: 22, resueltos: 20, pendientes: 2 },
      { facultad: 'Educación', casos: 18, resueltos: 16, pendientes: 2 },
      { facultad: 'Ciencias Económicas', casos: 16, resueltos: 14, pendientes: 2 },
      { facultad: 'Ciencias Sociales', casos: 14, resueltos: 10, pendientes: 4 },
      { facultad: 'Farmacia', casos: 12, resueltos: 9, pendientes: 3 },
      { facultad: 'Otras', casos: 11, resueltos: 7, pendientes: 4 }
    ],

    tiemposResolucion: [
      { rango: '0-5 días', cantidad: 45, porcentaje: 35.2 },
      { rango: '6-10 días', cantidad: 38, porcentaje: 29.7 },
      { rango: '11-15 días', cantidad: 25, porcentaje: 19.5 },
      { rango: '16-20 días', cantidad: 12, porcentaje: 9.4 },
      { rango: '21+ días', cantidad: 8, porcentaje: 6.2 }
    ],

    satisfaccion: [
      { categoria: 'Muy Satisfecho', cantidad: 68, porcentaje: 53.1 },
      { categoria: 'Satisfecho', cantidad: 42, porcentaje: 32.8 },
      { categoria: 'Neutral', cantidad: 12, porcentaje: 9.4 },
      { categoria: 'Insatisfecho', cantidad: 4, porcentaje: 3.1 },
      { categoria: 'Muy Insatisfecho', cantidad: 2, porcentaje: 1.6 }
    ]
  };

  const tiposReporte = [
    { value: 'semestral', label: 'Reporte Semestral SUNEDU' },
    { value: 'mensual', label: 'Reporte Mensual Interno' },
    { value: 'anual', label: 'Reporte Anual' },
    { value: 'personalizado', label: 'Reporte Personalizado' }
  ];

  const handleGenerarReporte = async () => {
    setLoading(true);
    // Simular generación de reporte
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    
    // Simular descarga
    const element = document.createElement('a');
    const file = new Blob(['Contenido del reporte...'], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `reporte_defensoria_${tipoReporte}_${fechaInicio}_${fechaFin}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Módulo de Reportes
          </h1>
          <p className="text-gray-600">
            Genere reportes estadísticos para SUNEDU y autoridades universitarias
          </p>
        </div>

        {/* Configuración del Reporte */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span>Configuración del Reporte</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte
              </label>
              <select
                value={tipoReporte}
                onChange={(e) => setTipoReporte(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tiposReporte.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleGenerarReporte}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>{loading ? 'Generando...' : 'Generar Reporte'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Casos</p>
                <p className="text-2xl font-bold text-gray-900">{datosReporte.resumenGeneral.totalCasos}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Casos Resueltos</p>
                <p className="text-2xl font-bold text-green-600">{datosReporte.resumenGeneral.casosResueltos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Casos Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{datosReporte.resumenGeneral.casosPendientes}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tiempo Promedio</p>
                <p className="text-2xl font-bold text-purple-600">{datosReporte.resumenGeneral.tiempoPromedioResolucion}d</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Satisfacción</p>
                <p className="text-2xl font-bold text-indigo-600">{datosReporte.resumenGeneral.satisfaccionPromedio}/5</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Casos por Mes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Evolución Mensual de Casos
              </h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosReporte.casosPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ingresados" stroke="#3B82F6" name="Ingresados" strokeWidth={2} />
                <Line type="monotone" dataKey="resueltos" stroke="#10B981" name="Resueltos" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Casos por Tipo */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Casos por Tipo de Vulneración
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosReporte.casosPorTipo}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                  label={({ tipo, porcentaje }) => `${porcentaje}%`}
                >
                  {datosReporte.casosPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} casos`, 'Cantidad']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {datosReporte.casosPorTipo.map((tipo, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: tipo.color }}></div>
                    <span className="text-gray-700">{tipo.tipo}</span>
                  </div>
                  <span className="font-medium text-gray-900">{tipo.cantidad} ({tipo.porcentaje}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Casos por Facultad */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Distribución por Facultad
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={datosReporte.casosPorFacultad} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="facultad" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="casos" fill="#3B82F6" name="Total Casos" />
              <Bar dataKey="resueltos" fill="#10B981" name="Resueltos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tiempos de Resolución */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Tiempos de Resolución
            </h3>
            <div className="space-y-4">
              {datosReporte.tiemposResolucion.map((tiempo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{tiempo.rango}</span>
                  <div className="flex items-center space-x-3 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${tiempo.porcentaje}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {tiempo.cantidad} ({tiempo.porcentaje}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Satisfacción */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Nivel de Satisfacción
            </h3>
            <div className="space-y-4">
              {datosReporte.satisfaccion.map((satisf, index) => {
                const colors = ['bg-green-500', 'bg-green-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-500'];
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{satisf.categoria}</span>
                    <div className="flex items-center space-x-3 flex-1 ml-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${colors[index]} h-2 rounded-full`} 
                          style={{ width: `${satisf.porcentaje}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-16 text-right">
                        {satisf.cantidad} ({satisf.porcentaje}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reportes Predefinidos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Reportes Predefinidos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Reporte SUNEDU</h4>
                  <p className="text-sm text-gray-500">Semestral</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Reporte oficial requerido por SUNEDU con estadísticas semestrales.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generar Reporte
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Informe Ejecutivo</h4>
                  <p className="text-sm text-gray-500">Mensual</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Resumen ejecutivo para autoridades universitarias.
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Generar Informe
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Análisis Detallado</h4>
                  <p className="text-sm text-gray-500">Anual</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Análisis completo con tendencias y recomendaciones.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Generar Análisis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}