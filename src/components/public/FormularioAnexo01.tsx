import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowLeft, Download } from 'lucide-react';

import { anexo01Schema, Anexo01Values } from '../../validations/form-schemas';
import { generateAnexo01PDF } from '../../services/pdf/anexo01-generator';
import { Form } from '../../components/ui/form';

import { PersonalDataSection } from './anexo01/PersonalDataSection';
import { MotivoSection } from './anexo01/MotivoSection';
import { DetailsSection } from './anexo01/DetailsSection';
import { SignatureSection } from './anexo01/SignatureSection';

export function FormularioAnexo01() {
  const navigate = useNavigate();

  const form = useForm<Anexo01Values>({
    resolver: zodResolver(anexo01Schema),
    defaultValues: {
      tipoRecurrente: "" as any,
      nombresApellidos: '',
      dni: '',
      celular: '',
      domicilio: '',
      escuelaProfesional: '',
      correo: '',
      codigoUNT: '',
      semestreAno: '',
      motivo: "" as any,
      motivoOtro: '',
      instanciaPrevia: "" as any,
      descripcionHechos: '',
      derechosAfectados: '',
      pretensiones: '',
      mediosProbatorios: '',
      firmaFile: undefined,
      lugar: 'Trujillo',
      fecha: new Date().toISOString().split('T')[0],
      dnifirma: ''
    }
  });

  const onSubmit = async (data: Anexo01Values) => {
    const success = await generateAnexo01PDF(data);
    if (success) {
      // Optional: Reset form or navigate, but usually users might want to keep data to correct mistakes if PDF isn't perfect
      // form.reset(); 
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
    toast.error('Por favor corrija los errores en el formulario');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/llenado-formularios')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Documentos en Línea
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Anexo N° 01</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">FORMULARIO</h2>
            <p className="text-lg font-semibold text-gray-800 mb-1">SEÑOR DEFENSOR UNIVERSITARIO</p>
            <p className="text-md text-gray-700">Universidad Nacional de Trujillo</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">

            <PersonalDataSection control={form.control} />

            <MotivoSection control={form.control} />

            <DetailsSection control={form.control} />

            <SignatureSection control={form.control} setValue={form.setValue} />

            {/* Botones de Acción */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Generar PDF</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                Una vez generado el documento, revíselo antes de presentarlo oficialmente
              </p>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
