import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Lock, Bell, Shield, Save, Edit, Camera } from 'lucide-react';

interface PerfilUsuarioProps {
  user: any;
}

export function PerfilUsuario({ user }: PerfilUsuarioProps) {
  const [activeTab, setActiveTab] = useState('informacion');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || 'Dr. Juan Pérez',
    email: user?.email || 'defensor@unt.edu.pe',
    telefono: '+51 44 481569',
    cargo: 'Defensor Universitario',
    fechaInicio: '2023-03-15',
    biografia: 'Doctor en Derecho con especialización en Derechos Humanos. Más de 15 años de experiencia en el ámbito universitario y defensa de derechos estudiantiles.',
    direccion: 'Universidad Nacional de Trujillo, Av. Juan Pablo II s/n',
    especialidades: ['Derechos Humanos', 'Derecho Universitario', 'Mediación y Conciliación']
  });

  const [configuraciones, setConfiguraciones] = useState({
    notificacionesEmail: true,
    notificacionesSMS: false,
    notificacionesPush: true,
    reportesAutomaticos: true,
    seguimientoCasos: true,
    recordatoriosPlazos: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'informacion', label: 'Información Personal' },
    { id: 'configuracion', label: 'Configuración' },
    { id: 'seguridad', label: 'Seguridad' },
    { id: 'actividad', label: 'Actividad Reciente' }
  ];

  const actividadReciente = [
    {
      accion: 'Caso admitido',
      descripcion: 'Admitió caso DEF-2024-045 para investigación',
      fecha: '2024-01-22T14:30:00',
      tipo: 'caso'
    },
    {
      accion: 'Reporte generado',
      descripcion: 'Generó reporte mensual de enero 2024',
      fecha: '2024-01-22T10:15:00',
      tipo: 'reporte'
    },
    {
      accion: 'Comunicación enviada',
      descripcion: 'Envió solicitud de información para caso DEF-2024-043',
      fecha: '2024-01-21T16:45:00',
      tipo: 'comunicacion'
    },
    {
      accion: 'Actuación registrada',
      descripcion: 'Registró entrevista con recurrente del caso DEF-2024-042',
      fecha: '2024-01-21T11:20:00',
      tipo: 'actuacion'
    },
    {
      accion: 'Perfil actualizado',
      descripcion: 'Actualizó información de contacto',
      fecha: '2024-01-20T09:30:00',
      tipo: 'perfil'
    }
  ];

  const estadisticasPersonales = {
    casosGestionados: 156,
    casosResueltos: 128,
    tiempoPromedioResolucion: 12,
    satisfaccionPromedio: 4.3,
    casosEsteAño: 45,
    mesesEnCargo: 10
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfigChange = (field, value) => {
    setConfiguraciones(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Simular guardado
    setEditMode(false);
    alert('Perfil actualizado exitosamente');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    // Simular cambio de contraseña
    alert('Contraseña actualizada exitosamente');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getActividadIcon = (tipo) => {
    const iconos = {
      caso: '📋',
      reporte: '📊',
      comunicacion: '📧',
      actuacion: '📝',
      perfil: '👤'
    };
    return iconos[tipo] || '📄';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Perfil de Usuario
          </h1>
          <p className="text-gray-600">
            Gestione su información personal y configuraciones
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{formData.nombre}</h2>
                  <p className="text-gray-600">{formData.cargo}</p>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>{editMode ? 'Cancelar' : 'Editar'}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{formData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{formData.telefono}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">En el cargo desde {new Date(formData.fechaInicio).toLocaleDateString('es-PE')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{estadisticasPersonales.casosGestionados}</div>
            <div className="text-sm text-gray-600">Casos Gestionados</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">{estadisticasPersonales.casosResueltos}</div>
            <div className="text-sm text-gray-600">Casos Resueltos</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">{estadisticasPersonales.tiempoPromedioResolucion}d</div>
            <div className="text-sm text-gray-600">Tiempo Promedio</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-yellow-600">{estadisticasPersonales.satisfaccionPromedio}/5</div>
            <div className="text-sm text-gray-600">Satisfacción</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-indigo-600">{estadisticasPersonales.casosEsteAño}</div>
            <div className="text-sm text-gray-600">Casos Este Año</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">{estadisticasPersonales.mesesEnCargo}</div>
            <div className="text-sm text-gray-600">Meses en Cargo</div>
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
            {/* Información Personal */}
            {activeTab === 'informacion' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      disabled={!editMode}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!editMode}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      disabled={!editMode}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={formData.cargo}
                      onChange={(e) => handleInputChange('cargo', e.target.value)}
                      disabled={!editMode}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    disabled={!editMode}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                      editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                  </label>
                  <textarea
                    value={formData.biografia}
                    onChange={(e) => handleInputChange('biografia', e.target.value)}
                    disabled={!editMode}
                    rows={4}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                      editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidades
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.especialidades.map((esp, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
                
                {editMode && (
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Cambios</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Configuración */}
            {activeTab === 'configuracion' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span>Notificaciones</span>
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(configuraciones).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-500">
                            {key === 'notificacionesEmail' && 'Recibir notificaciones por correo electrónico'}
                            {key === 'notificacionesSMS' && 'Recibir notificaciones por SMS'}
                            {key === 'notificacionesPush' && 'Recibir notificaciones push en el navegador'}
                            {key === 'reportesAutomaticos' && 'Generar reportes automáticamente'}
                            {key === 'seguimientoCasos' && 'Notificaciones de seguimiento de casos'}
                            {key === 'recordatoriosPlazos' && 'Recordatorios de plazos por vencer'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleConfigChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Seguridad */}
            {activeTab === 'seguridad' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span>Cambiar Contraseña</span>
                  </h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <button
                      onClick={handleChangePassword}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Cambiar Contraseña</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sesiones Activas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Sesión Actual</p>
                        <p className="text-sm text-gray-500">Chrome en Windows • Última actividad: hace 2 minutos</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actividad Reciente */}
            {activeTab === 'actividad' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Actividad Reciente
                </h3>
                <div className="space-y-4">
                  {actividadReciente.map((actividad, index) => (
                    <div key={index} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl">{getActividadIcon(actividad.tipo)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{actividad.accion}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(actividad.fecha).toLocaleString('es-PE')}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{actividad.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}