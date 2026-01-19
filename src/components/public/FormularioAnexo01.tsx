
import { Upload, Download, FileText, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { anexo01Schema, Anexo01Values } from '../../validations/form-schemas';
import { FormError } from '../../components/ui/FormError';

export function FormularioAnexo01() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Anexo01Values>({
    resolver: zodResolver(anexo01Schema),
    defaultValues: {
      tipoRecurrente: undefined,
      nombresApellidos: '',
      dni: '',
      celular: '',
      domicilio: '',
      escuelaProfesional: '',
      correo: '',
      codigoUNT: '',
      semestreAno: '',
      motivo: undefined,
      motivoOtro: '',
      instanciaPrevia: undefined,
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

  const firmaFile = watch('firmaFile');
  const motivo = watch('motivo');

  const onSubmit = async (data: Anexo01Values) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      let yPos = 20;

      // Header
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Anexo N° 01', pageWidth / 2, yPos, { align: 'center' });
      yPos += lineHeight;

      doc.setFontSize(14);
      doc.text('FORMULARIO', pageWidth / 2, yPos, { align: 'center' });
      yPos += lineHeight + 2;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('SEÑOR DEFENSOR UNIVERSITARIO', pageWidth / 2, yPos, { align: 'center' });
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.text('Universidad Nacional de Trujillo', pageWidth / 2, yPos, { align: 'center' });
      yPos += lineHeight + 5;

      // 1. DATOS PERSONALES
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('1. DATOS PERSONALES DEL RECURRENTE:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      const tipoRecurrenteTexto = `Docente (${data.tipoRecurrente === 'docente' ? 'X' : ' '})    Estudiante (${data.tipoRecurrente === 'estudiante' ? 'X' : ' '})    Administrativo (${data.tipoRecurrente === 'administrativo' ? 'X' : ' '})`;
      doc.text(tipoRecurrenteTexto, margin, yPos);
      yPos += lineHeight;

      doc.text(`Nombres y Apellidos: ${data.nombresApellidos}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`DNI: ${data.dni}`, margin, yPos);
      doc.text(`Celular: ${data.celular}`, margin + 70, yPos);
      yPos += lineHeight;

      doc.text(`Domicilio: ${data.domicilio}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`Escuela Profesional / Dependencia: ${data.escuelaProfesional}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`Correo electrónico: ${data.correo}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`Código UNT: ${data.codigoUNT}`, margin, yPos);
      doc.text(`Año/Semestre: ${data.semestreAno}`, margin + 70, yPos);
      yPos += lineHeight + 5;

      // 2. MOTIVO
      doc.setFont('helvetica', 'bold');
      doc.text('2. MOTIVO:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      const motivoTexto = `Denuncia (${data.motivo === 'denuncia' ? 'X' : ' '})    Reclamo (${data.motivo === 'reclamo' ? 'X' : ' '})    Queja (${data.motivo === 'queja' ? 'X' : ' '})`;
      doc.text(motivoTexto, margin, yPos);
      yPos += lineHeight;

      if (data.motivo === 'otro') {
        doc.text(`Otro: ${data.motivoOtro}`, margin, yPos);
        yPos += lineHeight;
      }

      const instanciaTexto = `¿El motivo está siendo visto en otra instancia? Sí (${data.instanciaPrevia === 'si' ? 'X' : ' '})    No (${data.instanciaPrevia === 'no' ? 'X' : ' '})`;
      doc.text(instanciaTexto, margin, yPos);
      yPos += lineHeight + 5;

      // 3. DESCRIPCIÓN DE HECHOS
      if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
      doc.setFont('helvetica', 'bold');
      doc.text('3. DESCRIPCIÓN DE LOS HECHOS:', margin, yPos);
      yPos += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const hechosLines = doc.splitTextToSize(data.descripcionHechos || 'N/A', pageWidth - 2 * margin);
      doc.text(hechosLines, margin, yPos);
      yPos += (hechosLines.length * 5) + 5;

      // 4. DERECHOS AFECTADOS
      if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('4. DERECHOS QUE CONSIDERA AFECTADOS:', margin, yPos);
      yPos += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const derechosLines = doc.splitTextToSize(data.derechosAfectados || 'N/A', pageWidth - 2 * margin);
      doc.text(derechosLines, margin, yPos);
      yPos += (derechosLines.length * 5) + 5;

      // 5. PRETENSIONES
      if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('5. PRETENSIONES:', margin, yPos);
      yPos += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const pretensionesLines = doc.splitTextToSize(data.pretensiones || 'N/A', pageWidth - 2 * margin);
      doc.text(pretensionesLines, margin, yPos);
      yPos += (pretensionesLines.length * 5) + 5;

      // 6. MEDIOS PROBATORIOS
      if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('6. MEDIOS PROBATORIOS:', margin, yPos);
      yPos += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const mediosLines = doc.splitTextToSize(data.mediosProbatorios || 'N/A', pageWidth - 2 * margin);
      doc.text(mediosLines, margin, yPos);
      yPos += (mediosLines.length * 5) + 10;

      // 7. LUGAR Y FECHA
      if (yPos > pageHeight - 60) { doc.addPage(); yPos = 20; }
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('7. LUGAR Y FECHA:', margin, yPos);
      yPos += lineHeight;
      doc.setFont('helvetica', 'normal');
      const fechaFormateada = new Date(data.fecha + 'T12:00:00').toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      doc.text(`${data.lugar}, ${fechaFormateada}`, margin, yPos);
      yPos += lineHeight + 15;

      // FIRMA
      if (data.firmaFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target?.result as string;
          try {
            const format = data.firmaFile.type.includes('png') ? 'PNG' : 'JPEG';
            doc.addImage(imgData, format, margin + 40, yPos, 40, 20);
            yPos += 25;
            finalizePDF(doc, data, margin, yPos);
          } catch (error) {
            console.error('Error al agregar firma:', error);
            yPos += 25; // Space for missing signature
            finalizePDF(doc, data, margin, yPos);
          }
        };
        reader.readAsDataURL(data.firmaFile);
      } else {
        // Fallback (though validation prevents this)
        yPos += 25;
        finalizePDF(doc, data, margin, yPos);
      }

    } catch (error) {
      console.error('Error al generar PDF:', error);
      toast.error('Error al generar el PDF. Por favor intente nuevamente.');
    }
  };

  const finalizePDF = (doc: jsPDF, data: Anexo01Values, margin: number, yPos: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('_____________________________', margin + 30, yPos);
    yPos += 5;
    doc.text('Firma', margin + 55, yPos);
    yPos += 5;
    doc.text(`DNI: ${data.dnifirma}`, margin + 45, yPos);

    const fileName = `Anexo_01_${data.nombresApellidos.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
    toast.success('¡PDF generado exitosamente!');
  };

  const onError = () => {
    toast.error('Por favor corrija los errores en el formulario');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/llenado-formularios')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
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

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* Datos del Recurrente */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">1. DATOS PERSONALES DEL RECURRENTE</h2>

            {/* Tipo de Recurrente */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Recurrente <span className="text-red-500">*</span>
              </label>
              <Controller
                name="tipoRecurrente"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-4">
                    {['docente', 'estudiante', 'administrativo'].map((type) => (
                      <label key={type} className="flex items-center capitalize">
                        <input
                          type="radio"
                          {...field}
                          value={type}
                          checked={field.value === type}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              />
              <FormError message={errors.tipoRecurrente?.message} />
            </div>

            {/* Nombres y Apellidos */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres y Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('nombresApellidos')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nombresApellidos ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ingrese nombres y apellidos completos"
              />
              <FormError message={errors.nombresApellidos?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={8}
                  {...register('dni')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="12345678"
                />
                <FormError message={errors.dni?.message} />
              </div>

              {/* Celular */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Celular <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={9}
                  {...register('celular')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.celular ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="987654321"
                />
                <FormError message={errors.celular?.message} />
              </div>
            </div>

            {/* Domicilio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domicilio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('domicilio')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.domicilio ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Dirección completa"
              />
              <FormError message={errors.domicilio?.message} />
            </div>

            {/* Escuela Profesional */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escuela Profesional / Dependencia Administrativa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('escuelaProfesional')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.escuelaProfesional ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ej: Ingeniería de Sistemas"
              />
              <FormError message={errors.escuelaProfesional?.message} />
            </div>

            {/* Correo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('correo')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.correo ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="ejemplo@unt.edu.pe"
              />
              <FormError message={errors.correo?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Codigo UNT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código UNT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('codigoUNT')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.codigoUNT ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ingrese Código UNT"
                />
                <FormError message={errors.codigoUNT?.message} />
              </div>

              {/* Año/Semestre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año/Semestre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('semestreAno')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.semestreAno ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ej: 2024-I"
                />
                <FormError message={errors.semestreAno?.message} />
              </div>
            </div>
          </section>

          {/* Motivo */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">2. MOTIVO</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Motivo <span className="text-red-500">*</span>
              </label>
              <Controller
                name="motivo"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4">
                    {['denuncia', 'reclamo', 'queja', 'otro'].map((type) => (
                      <label key={type} className="flex items-center capitalize">
                        <input
                          type="radio"
                          {...field}
                          value={type}
                          checked={field.value === type}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              />
              <FormError message={errors.motivo?.message} />
            </div>

            {motivo === 'otro' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especifique el Motivo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('motivoOtro')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.motivoOtro ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Especifique otro motivo"
                />
                <FormError message={errors.motivoOtro?.message} />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿El motivo está siendo visto en otra instancia interna o externa? *
              </label>
              <Controller
                name="instanciaPrevia"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" {...field} value="si" checked={field.value === 'si'} className="mr-2" />
                      Sí
                    </label>
                    <label className="flex items-center">
                      <input type="radio" {...field} value="no" checked={field.value === 'no'} className="mr-2" />
                      No
                    </label>
                  </div>
                )}
              />
            </div>
          </section>

          {/* Descripción de Hechos */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">3. DESCRIPCIÓN DE LOS HECHOS</h2>
            <p className="text-sm text-gray-600 mb-4">
              Debe describirse con suficiente claridad el hecho o hechos que originan la solicitud; datos y cargo del denunciado, lugar, fecha, así como el motivo y alcance de la pretensión que se plantea, de corresponder (obligatorio).
            </p>
            <textarea
              {...register('descripcionHechos')}
              rows={8}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.descripcionHechos ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Describa los hechos de manera clara y detallada..."
            />
            <FormError message={errors.descripcionHechos?.message} />
          </section>

          {/* Derechos Afectados */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">4. DERECHOS QUE CONSIDERA AFECTADOS</h2>
            <textarea
              {...register('derechosAfectados')}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Indique qué derechos considera que han sido afectados..."
            />
          </section>

          {/* Pretensiones */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">5. PRETENSIONES</h2>
            <textarea
              {...register('pretensiones')}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pretensiones ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Describa claramente lo que solicita a la Defensoría Universitaria..."
            />
            <FormError message={errors.pretensiones?.message} />
          </section>

          {/* Medios Probatorios */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">6. MEDIOS PROBATORIOS</h2>
            <p className="text-sm text-gray-600 mb-4">Evidencias y/o datos de testigos</p>
            <textarea
              {...register('mediosProbatorios')}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Liste las evidencias documentales, testigos u otros medios probatorios..."
            />
          </section>

          {/* Lugar y Fecha */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">7. LUGAR Y FECHA</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lugar *</label>
                <input
                  type="text"
                  {...register('lugar')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lugar ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Trujillo"
                />
                <FormError message={errors.lugar?.message} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha *</label>
                <input
                  type="date"
                  {...register('fecha')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fecha ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormError message={errors.fecha?.message} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">DNI (para firma) <span className="text-red-500">*</span></label>
              <input
                type="text"
                maxLength={8}
                {...register('dnifirma')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dnifirma ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="12345678"
              />
              <FormError message={errors.dnifirma?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Firma (PNG o JPG) <span className="text-red-500">*</span></label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.firmaFile ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                {!firmaFile ? (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">Seleccionar archivo</span>
                      <Controller
                        name="firmaFile"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) field.onChange(file);
                            }}
                            className="hidden"
                          />
                        )}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG o JPG (máx. 5MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{firmaFile.name}</p>
                        <p className="text-sm text-gray-500">{(firmaFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setValue('firmaFile', undefined)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              <FormError message={errors.firmaFile?.message as string} />
            </div>
          </section>

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
      </div>
    </div>
  );
}
