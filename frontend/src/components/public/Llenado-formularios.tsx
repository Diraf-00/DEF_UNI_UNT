import { useNavigate } from 'react-router-dom';
import { FileText, FileCheck, Shield, ScrollText } from 'lucide-react';

export function LlenadoFormularios() {
  const navigate = useNavigate();

  const formularios = [
    {
      id: 'anexo-01',
      title: 'Anexo N° 01',
      subtitle: 'Formulario de Solicitud',
      description: 'Formulario para presentar denuncias, reclamos, quejas u otras solicitudes ante la Defensoría Universitaria.',
      icon: FileText,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      route: '/llenado-formularios/formulario-anexo-01' // Ruta vacía para que la agregues
    },
    /*{
      id: 'anexo-02',
      title: 'Anexo N° 02',
      subtitle: 'Acta de Acuerdo de Mediación',
      description: 'Documento para formalizar los acuerdos alcanzados durante el proceso de mediación.',
      icon: FileCheck,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      route: '/llenado-formularios/formulario-anexo-02' // Ruta vacía para que la agregues
    },
    {
      id: 'autorizacion-datos',
      title: 'Autorización de Datos Personales',
      subtitle: 'Ley N° 29733',
      description: 'Autorización para el tratamiento de datos personales según la Ley de Protección de Datos Personales.',
      icon: Shield,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      route: '/llenado-formularios/formulario-autorizacion-datos' // Ruta vacía para que la agregues
    },
    {
      id: 'declaracion-jurada',
      title: 'Declaración Jurada',
      subtitle: 'Declaración de Veracidad',
      description: 'Documento donde el solicitante declara bajo juramento la veracidad de la información proporcionada.',
      icon: ScrollText,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      route: '/llenado-formularios/formulario-declaracion-jurada' // Ruta vacía para que la agregues
    }*/
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentos en Línea
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seleccione el formulario que necesita completar. Todos los documentos pueden ser descargados en formato PDF una vez completados.
          </p>
        </div>

        {/* Grid de formularios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {formularios.map((form) => {
            const Icon = form.icon;
            return (
              <div
                key={form.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`${form.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{form.title}</h2>
                      <p className="text-sm opacity-90">{form.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-6 min-h-[80px]">
                    {form.description}
                  </p>

                  <button
                    onClick={() => form.route && navigate(form.route)}
                    className={`w-full ${form.color} ${form.hoverColor} text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2`}
                  >
                    <span>Completar Formulario</span>
                    <Icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Información Importante
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 font-bold">•</span>
              <span>Complete todos los campos obligatorios marcados con asterisco (*)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 font-bold">•</span>
              <span>Revise cuidadosamente la información antes de generar el PDF</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 font-bold">•</span>
              <span>Asegúrese de tener su firma digital en formato PNG, JPG o PDF</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 font-bold">•</span>
              <span>Los documentos generados deben ser presentados oficialmente en la Defensoría Universitaria</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 font-bold">•</span>
              <span>Todos los formularios son gratuitos y de uso exclusivo para la comunidad universitaria UNT</span>
            </li>
          </ul>
        </div>

        {/* Sección de ayuda */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            ❓ ¿Necesita ayuda?
          </h3>
          <p className="text-gray-700 mb-4">
            Si tiene dudas sobre cómo completar algún formulario o necesita asesoría, puede contactarnos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📧 Correo:</span>
              <span>defensoria@unt.edu.pe</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📞 Teléfono:</span>
              <span>(044) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">🕐 Horario:</span>
              <span>Lun-Vie 8:00-16:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
