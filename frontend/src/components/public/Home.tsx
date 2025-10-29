import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Scale, FileText, PlusCircle, Search } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Shield className="w-20 h-20 mx-auto mb-6 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Defensoría Universitaria
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Protegemos los derechos de la comunidad universitaria y promovemos 
            la excelencia académica en la Universidad Nacional de Trujillo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ingreso-caso"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Presentar Caso</span>
            </Link>
            <Link
              to="/seguimiento"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Seguimiento</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos el órgano autónomo encargado de velar por el respeto de los derechos 
              de los miembros de la comunidad universitaria y promover la mejora continua 
              de los servicios educativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Protección de Derechos
              </h3>
              <p className="text-gray-600">
                Garantizamos el respeto de los derechos fundamentales de estudiantes, 
                docentes y personal administrativo.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mediación y Conciliación
              </h3>
              <p className="text-gray-600">
                Facilitamos soluciones pacíficas a conflictos mediante procesos 
                de mediación y conciliación.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Transparencia
              </h3>
              <p className="text-gray-600">
                Mantenemos procesos transparentes y accesibles para toda la 
                comunidad universitaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Principios 
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Independencia',
                description: 'Actuamos sin presiones ni subordinación a otras autoridades.'
              },
              {
                title: 'Autonomía',
                description: 'Decidimos y gestionamos nuestras funciones de manera propia.'
              },
              {
                title: 'Imparcialidad',
                description: 'Garantizamos un trato justo y sin favoritismos.'
              },
              {
                title: 'Confidencialidad',
                description: 'Protegemos la información y datos del solicitante.'
              },       
              {
                title: 'Supletoriedad',
                description: 'Intervenimos cuando otros mecanismos no son suficientes.'
              },
              {
                title: 'Autoridad responsable',
                description: 'Nuestras acciones tienen respaldo institucional y deben ser atendidas.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            ¿Necesitas nuestra ayuda?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Estamos aquí para apoyarte. Conoce cómo podemos ayudarte.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/base-legal"
              className="bg-blue-700 hover:bg-blue-800 p-4 rounded-lg transition-colors"
            >
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Marco Legal</h3>
            </Link>
            <Link
              to="/formularios"
              className="bg-blue-700 hover:bg-blue-800 p-4 rounded-lg transition-colors"
            >
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Formularios</h3>
            </Link>
            <Link
              to="/ingreso-caso"
              className="bg-blue-700 hover:bg-blue-800 p-4 rounded-lg transition-colors"
            >
              <PlusCircle className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Nuevo Caso</h3>
            </Link>
            <Link
              to="/seguimiento"
              className="bg-blue-700 hover:bg-blue-800 p-4 rounded-lg transition-colors"
            >
              <Search className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold">Seguimiento</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}