import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Defensoría Universitaria
            </h3>
            <p className="text-sm">
              Órgano autónomo encargado de velar por el respeto de los derechos 
              de los miembros de la comunidad universitaria y la mejora continua 
              de la calidad del servicio educativo.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contacto
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>mesadepartes_defensoria@unitru.edu.pe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+51 944 627 332</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Av. Juan Pablo II S/N Urb. San Andrés Trujillo (Ciudad Universitaria) 
                  - Pool de aulas - Edificio administrativo (1er piso) 
                  - Ref.: A la altura de la primera puerta de la UNT</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Información Legal
            </h3>
            <div className="space-y-1 text-sm">
              <p>Ley Universitaria N° 30220</p>
              <p>Ley de Protección de Datos N° 29733</p>
              <p>Reglamento de la Defensoría</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Universidad Nacional de Trujillo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}