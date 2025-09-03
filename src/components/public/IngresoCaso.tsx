import React, { useState } from 'react';
import { FileText, Upload, AlertCircle, CheckCircle, User, Calendar, FileX } from 'lucide-react';

export function IngresoCaso() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos del recurrente
    tipoRecurrente: '',
    nombres: '',
    apellidos: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    codigo: '',
    telefono: '',
    email: '',
    direccion: '',
    
    // Datos del denunciado
    nombresDenunciado: '',
    apellidosDenunciado: '',
    cargoArea: '',
    relacionDenunciado: '',
    
    // Información del caso
    tipoVulneracion: '',
    fechaHechos: '',
    lugarHechos: '',
    descripcionHechos: '',
    pretension: '',
    mediosProbatorios: '',
    
    // Declaraciones
    aceptaTerminos: false,
    autorizaTratamientoDatos: false
  });
  
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [expedienteGenerado, setExpedienteGenerado] = useState(null);

  const tiposVulneracion = [
    'Discriminación por género, raza, religión u orientación sexual',
    'Violación del debido proceso académico',
    'Hostigamiento sexual',
    'Negativa injustificada de servicios académicos',
    'Procedimientos académicos irregulares',
    'Conflictos entre miembros de la comunidad universitaria',
    'Vulneración de derechos estudiantiles',
    'Otros (especificar en la descripción)'
  ];

  const tiposRecurrente = [
    'Estudiante de pregrado',
    'Estudiante de posgrado',
    'Docente',
    'Personal administrativo',
    'Egresado',
    'Otro'
  ];

  const relacionesDenunciado = [
    'Docente',
    'Personal administrativo',
    'Estudiante',
    'Autoridad universitaria',
    'Otro'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = newFiles.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateExpediente = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const expediente = `DEF-${year}-${random}`;
    const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    return { expediente, codigo };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos obligatorios estén completos
    const requiredFields = [
      'tipoRecurrente', 'nombres', 'apellidos', 'numeroDocumento', 
      'telefono', 'email', 'tipoVulneracion', 'fechaHechos', 
      'descripcionHechos', 'pretension', 'aceptaTerminos', 'autorizaTratamientoDatos'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    // Simular envío
    const expedienteData = generateExpediente();
    setExpedienteGenerado(expedienteData);
    setSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Caso registrado exitosamente!
            </h1>
            <p className="text-gray-600 mb-6">
              Su caso ha sido registrado y se encuentra en proceso de evaluación de admisibilidad.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="font-semibold text-blue-900 mb-4">Información de su caso:</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Número de Expediente:</span>
                  <span className="text-blue-900 font-bold">{expedienteGenerado?.expediente}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Código de Seguimiento:</span>
                  <span className="text-blue-900 font-bold">{expedienteGenerado?.codigo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Fecha de Registro:</span>
                  <span className="text-blue-900">{new Date().toLocaleDateString('es-PE')}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-medium text-yellow-800 mb-1">Importante:</h3>
                  <p className="text-yellow-700 text-sm">
                    Guarde el código de seguimiento. Lo necesitará para consultar el estado de su caso. 
                    La evaluación de admisibilidad tomará máximo 5 días hábiles.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/seguimiento"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Seguir mi caso
              </a>
              <a
                href="/"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Presentar Nuevo Caso
          </h1>
          <p className="text-lg text-gray-600">
            Complete el formulario para registrar su caso ante la Defensoría Universitaria
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-24 h-1 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Datos Personales
            </span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Información del Caso
            </span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Evidencias
            </span>
            <span className={currentStep >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Confirmación
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Datos Personales */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Datos del Recurrente
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Recurrente *
                  </label>
                  <select
                    value={formData.tipoRecurrente}
                    onChange={(e) => handleInputChange('tipoRecurrente', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccione...</option>
                    {tiposRecurrente.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Documento *
                  </label>
                  <select
                    value={formData.tipoDocumento}
                    onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">Carné de Extranjería</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    value={formData.nombres}
                    onChange={(e) => handleInputChange('nombres', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    value={formData.apellidos}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    value={formData.numeroDocumento}
                    onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Universitario (si aplica)
                  </label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => handleInputChange('codigo', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Información del Caso */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Información del Caso
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Vulneración *
                </label>
                <select
                  value={formData.tipoVulneracion}
                  onChange={(e) => handleInputChange('tipoVulneracion', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione el tipo de vulneración...</option>
                  {tiposVulneracion.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de los Hechos *
                  </label>
                  <input
                    type="date"
                    value={formData.fechaHechos}
                    onChange={(e) => handleInputChange('fechaHechos', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lugar de los Hechos
                  </label>
                  <input
                    type="text"
                    value={formData.lugarHechos}
                    onChange={(e) => handleInputChange('lugarHechos', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Facultad, aula, oficina..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción de los Hechos *
                </label>
                <textarea
                  value={formData.descripcionHechos}
                  onChange={(e) => handleInputChange('descripcionHechos', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describa detalladamente los hechos ocurridos..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pretensión (lo que solicita) *
                </label>
                <textarea
                  value={formData.pretension}
                  onChange={(e) => handleInputChange('pretension', e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Indique qué solicita que se haga al respecto..."
                  required
                />
              </div>

              {/* Datos del Denunciado */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Datos del Denunciado (si aplica)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombres del Denunciado
                    </label>
                    <input
                      type="text"
                      value={formData.nombresDenunciado}
                      onChange={(e) => handleInputChange('nombresDenunciado', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos del Denunciado
                    </label>
                    <input
                      type="text"
                      value={formData.apellidosDenunciado}
                      onChange={(e) => handleInputChange('apellidosDenunciado', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo o Área
                    </label>
                    <input
                      type="text"
                      value={formData.cargoArea}
                      onChange={(e) => handleInputChange('cargoArea', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relación con la Universidad
                    </label>
                    <select
                      value={formData.relacionDenunciado}
                      onChange={(e) => handleInputChange('relacionDenunciado', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccione...</option>
                      {relacionesDenunciado.map((relacion) => (
                        <option key={relacion} value={relacion}>{relacion}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Evidencias */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Medios Probatorios y Evidencias
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción de Medios Probatorios
                </label>
                <textarea
                  value={formData.mediosProbatorios}
                  onChange={(e) => handleInputChange('mediosProbatorios', e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describa las evidencias que respaldan su caso..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargar Archivos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Formatos: PDF, Word, JPG, PNG. Máximo 10MB por archivo.
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Seleccionar Archivos
                  </label>
                </div>
              </div>

              {files.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Archivos Cargados:</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FileX className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirmación */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Confirmación y Declaraciones
              </h2>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Resumen del Caso:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Recurrente:</strong> {formData.nombres} {formData.apellidos}</p>
                  <p><strong>Tipo:</strong> {formData.tipoRecurrente}</p>
                  <p><strong>Vulneración:</strong> {formData.tipoVulneracion}</p>
                  <p><strong>Fecha de Hechos:</strong> {formData.fechaHechos}</p>
                  <p><strong>Archivos Adjuntos:</strong> {files.length} archivos</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terminos"
                    checked={formData.aceptaTerminos}
                    onChange={(e) => handleInputChange('aceptaTerminos', e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terminos" className="text-sm text-gray-700">
                    Declaro bajo juramento que la información proporcionada es veraz y exacta. 
                    Entiendo que proporcionar información falsa puede resultar en el archivo del caso 
                    y posibles sanciones según el reglamento universitario.
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="datos"
                    checked={formData.autorizaTratamientoDatos}
                    onChange={(e) => handleInputChange('autorizaTratamientoDatos', e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="datos" className="text-sm text-gray-700">
                    Autorizo el tratamiento de mis datos personales conforme a la Ley N° 29733 
                    de Protección de Datos Personales, para los fines propios de la Defensoría Universitaria.
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Proceso de Evaluación</h3>
                    <p className="text-blue-700 text-sm">
                      Su caso será evaluado en un plazo máximo de 5 días hábiles para determinar su admisibilidad. 
                      Recibirá un código de seguimiento para consultar el estado de su expediente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Anterior
              </button>
            )}
            
            <div className="ml-auto">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Enviar Caso
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}