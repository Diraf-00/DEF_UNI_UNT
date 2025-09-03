import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  TrendingUp,
  Bell,
} from "lucide-react";

interface DashboardProps {
  user: any;
}

export function Dashboard({ user }: DashboardProps) {
  // Datos de ejemplo para métricas
  const estadisticas = {
    casosActivos: 45,
    casosPendientes: 12,
    casosResueltos: 128,
    plazosPorVencer: 8,
  };

  const casosPorMes = [
    { mes: "Ene", ingresados: 15, resueltos: 12 },
    { mes: "Feb", ingresados: 22, resueltos: 18 },
    { mes: "Mar", ingresados: 28, resueltos: 25 },
    { mes: "Abr", ingresados: 35, resueltos: 30 },
    { mes: "May", ingresados: 42, resueltos: 38 },
    { mes: "Jun", ingresados: 38, resueltos: 40 },
  ];

  const casosPorTipo = [
    { nombre: "Discriminación", valor: 25, color: "#3B82F6" },
    {
      nombre: "Procedimientos Académicos",
      valor: 20,
      color: "#10B981",
    },
    { nombre: "Hostigamiento", valor: 15, color: "#F59E0B" },
    { nombre: "Conflictos", valor: 18, color: "#EF4444" },
    { nombre: "Servicios", valor: 12, color: "#8B5CF6" },
    { nombre: "Otros", valor: 10, color: "#6B7280" },
  ];

  const casosRecientes = [
    {
      expediente: "DEF-2024-045",
      recurrente: "J.P.G.",
      tipo: "Discriminación por género",
      estado: "EN_INVESTIGACION",
      fechaIngreso: "2024-01-20",
      prioridad: "alta",
    },
    {
      expediente: "DEF-2024-044",
      recurrente: "M.L.R.",
      tipo: "Procedimientos académicos irregulares",
      estado: "PENDIENTE_SUBSANACION",
      fechaIngreso: "2024-01-18",
      prioridad: "media",
    },
    {
      expediente: "DEF-2024-043",
      recurrente: "A.S.T.",
      tipo: "Hostigamiento sexual",
      estado: "ADMITIDO",
      fechaIngreso: "2024-01-15",
      prioridad: "alta",
    },
    {
      expediente: "DEF-2024-042",
      recurrente: "R.C.V.",
      tipo: "Conflictos entre miembros",
      estado: "RESUELTO",
      fechaIngreso: "2024-01-10",
      prioridad: "baja",
    },
  ];

  const notificaciones = [
    {
      tipo: "vencimiento",
      mensaje:
        "Caso DEF-2024-040 - Plazo de respuesta vence mañana",
      fecha: "2024-01-23",
      urgente: true,
    },
    {
      tipo: "nuevo_caso",
      mensaje: "Nuevo caso ingresado: DEF-2024-045",
      fecha: "2024-01-22",
      urgente: false,
    },
    {
      tipo: "respuesta",
      mensaje: "Respuesta recibida para caso DEF-2024-038",
      fecha: "2024-01-22",
      urgente: false,
    },
    {
      tipo: "vencimiento",
      mensaje: "Caso DEF-2024-039 - Subsanación por vencer",
      fecha: "2024-01-21",
      urgente: true,
    },
  ];

  const getEstadoColor = (estado) => {
    const colores = {
      EN_INVESTIGACION: "bg-blue-100 text-blue-800",
      PENDIENTE_SUBSANACION: "bg-yellow-100 text-yellow-800",
      ADMITIDO: "bg-green-100 text-green-800",
      RESUELTO: "bg-gray-100 text-gray-800",
    };
    return colores[estado] || "bg-gray-100 text-gray-800";
  };

  const getPrioridadColor = (prioridad) => {
    const colores = {
      alta: "bg-red-100 text-red-800",
      media: "bg-yellow-100 text-yellow-800",
      baja: "bg-green-100 text-green-800",
    };
    return colores[prioridad] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel de Control
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenido, {user?.nombre || "Usuario"}. Resumen de
            la actividad de la Defensoría Universitaria.
          </p>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Casos Activos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {estadisticas.casosActivos}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                +12%
              </span>
              <span className="text-sm text-gray-500 ml-1">
                vs mes anterior
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Pendientes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {estadisticas.casosPendientes}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-red-600 font-medium">
                +3
              </span>
              <span className="text-sm text-gray-500 ml-1">
                nuevos esta semana
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Resueltos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {estadisticas.casosResueltos}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                +8
              </span>
              <span className="text-sm text-gray-500 ml-1">
                este mes
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Plazos por Vencer
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {estadisticas.plazosPorVencer}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-red-600 font-medium">
                Requieren atención
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfico de Casos por Mes */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Casos por Mes
              </h2>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  Tendencia positiva
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={casosPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="ingresados"
                  fill="#3B82F6"
                  name="Ingresados"
                />
                <Bar
                  dataKey="resueltos"
                  fill="#10B981"
                  name="Resueltos"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Notificaciones */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Notificaciones Recientes
              </h2>
            </div>
            <div className="space-y-4">
              {notificaciones.map((notif, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    notif.urgente
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      notif.urgente
                        ? "text-red-800"
                        : "text-gray-800"
                    }`}
                  >
                    {notif.mensaje}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.fecha).toLocaleDateString(
                      "es-PE",
                    )}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todas las notificaciones
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Casos por Tipo */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Casos por Tipo de Vulneración
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={casosPorTipo}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  label={({ nombre, valor }) =>
                    `${nombre}: ${valor}%`
                  }
                >
                  {casosPorTipo.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Casos Recientes */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Casos Recientes
              </h2>
              <a
                href="/expedientes"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver todos
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-500">
                      Expediente
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">
                      Recurrente
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">
                      Tipo
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">
                      Estado
                    </th>
                    <th className="text-left py-2 text-sm font-medium text-gray-500">
                      Prioridad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {casosRecientes.map((caso, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3">
                        <a
                          href={`/expediente/${caso.expediente}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          {caso.expediente}
                        </a>
                      </td>
                      <td className="py-3 text-sm text-gray-900">
                        {caso.recurrente}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {caso.tipo}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(caso.estado)}`}
                        >
                          {caso.estado.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(caso.prioridad)}`}
                        >
                          {caso.prioridad}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/expedientes"
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <h3 className="font-medium">
                Gestionar Expedientes
              </h3>
              <p className="text-sm text-blue-100 mt-1">
                Ver y administrar todos los casos
              </p>
            </a>
            <a
              href="/reportes"
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              <BarChart className="w-6 h-6 mx-auto mb-2" />
              <h3 className="font-medium">Generar Reportes</h3>
              <p className="text-sm text-green-100 mt-1">
                Crear informes para SUNEDU
              </p>
            </a>
            <a
              href="/perfil"
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              <Users className="w-6 h-6 mx-auto mb-2" />
              <h3 className="font-medium">Configuración</h3>
              <p className="text-sm text-purple-100 mt-1">
                Gestionar perfil y configuración
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}