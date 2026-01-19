import React, { useState } from 'react';
import { Upload, Download, FileText, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface FormData {
  // Datos del recurrente
  tipoRecurrente: 'docente' | 'estudiante' | 'administrativo' | '';
  nombresApellidos: string;
  dni: string;
  celular: string;
  domicilio: string;
  escuelaProfesional: string;
  correo: string;
  codigoUNT: string;
  semestreAno: string;

  // Motivo
  motivo: 'denuncia' | 'reclamo' | 'queja' | 'otro' | '';
  motivoOtro: string;

  // Instancia previa
  instanciaPrevia: 'si' | 'no' | '';

  // Descripción de hechos
  descripcionHechos: string;

  // Derechos afectados
  derechosAfectados: string;

  // Pretensiones
  pretensiones: string;

  // Medios probatorios
  mediosProbatorios: string;

  // Firma
  firmaFile: File | null;
  lugar: string;
  fecha: string;
  dnifirma: string;
}

export function FormularioAnexo01() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    tipoRecurrente: '',
    nombresApellidos: '',
    dni: '',
    celular: '',
    domicilio: '',
    escuelaProfesional: '',
    correo: '',
    codigoUNT: '',
    semestreAno: '',
    motivo: '',
    motivoOtro: '',
    instanciaPrevia: '',
    descripcionHechos: '',
    derechosAfectados: '',
    pretensiones: '',
    mediosProbatorios: '',
    firmaFile: null,
    lugar: 'Trujillo',
    fecha: new Date().toISOString().split('T')[0],
    dnifirma: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case 'nombresApellidos':
      case 'lugar':
        // Only letters and spaces
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return false;
        break;
      case 'dni':
      case 'dnifirma':
      case 'codigoUNT':
        // Only numbers, max length handled by maxLength prop but good to check
        if (!/^\d*$/.test(value)) return false;
        break;
      case 'celular':
        if (!/^\d*$/.test(value)) return false;
        break;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Strict Input Validation
    if (!validateInput(name, value)) return;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea PNG o JPG
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        setFormData(prev => ({
          ...prev,
          firmaFile: file
        }));
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.firmaFile;
          return newErrors;
        });
      } else {
        setErrors(prev => ({
          ...prev,
          firmaFile: 'Solo se permiten archivos PNG o JPG'
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.tipoRecurrente) newErrors.tipoRecurrente = 'Seleccione el tipo de recurrente';

    if (!formData.nombresApellidos.trim()) newErrors.nombresApellidos = 'Ingrese nombres y apellidos';

    if (!formData.dni) {
      newErrors.dni = 'Ingrese DNI';
    } else if (formData.dni.length !== 8) {
      newErrors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!formData.celular) {
      newErrors.celular = 'Ingrese celular';
    } else if (formData.celular.length !== 9) {
      newErrors.celular = 'El celular debe tener 9 dígitos';
    }

    if (!formData.domicilio.trim()) newErrors.domicilio = 'Ingrese domicilio';

    if (!formData.escuelaProfesional.trim()) newErrors.escuelaProfesional = 'Ingrese Escuela Profesional / Dependencia';

    if (!formData.correo) {
      newErrors.correo = 'Ingrese correo electrónico';
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Ingrese un correo electrónico válido';
    }

    if (!formData.codigoUNT) newErrors.codigoUNT = 'Ingrese Código UNT';
    if (!formData.semestreAno) newErrors.semestreAno = 'Ingrese Año/Semestre';

    if (!formData.motivo) newErrors.motivo = 'Seleccione el motivo';
    if (formData.motivo === 'otro' && !formData.motivoOtro.trim()) {
      newErrors.motivoOtro = 'Especifique el motivo';
    }

    if (!formData.descripcionHechos.trim()) newErrors.descripcionHechos = 'Ingrese la descripción de los hechos obligatoriamente';

    if (!formData.lugar.trim()) newErrors.lugar = 'Ingrese el lugar';
    if (!formData.fecha) newErrors.fecha = 'Ingrese la fecha';

    if (!formData.firmaFile) newErrors.firmaFile = 'Suba su firma (PNG o JPG)';

    if (!formData.dnifirma) {
      newErrors.dnifirma = 'Ingrese DNI de la firma';
    } else if (formData.dnifirma !== formData.dni) {
      newErrors.dnifirma = 'El DNI de la firma debe coincidir con el DNI del solicitante';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePDF = async () => {
    if (!validateForm()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

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
      const tipoRecurrenteTexto = `Docente (${formData.tipoRecurrente === 'docente' ? 'X' : ' '})    Estudiante (${formData.tipoRecurrente === 'estudiante' ? 'X' : ' '})    Administrativo (${formData.tipoRecurrente === 'administrativo' ? 'X' : ' '})`;
      doc.text(tipoRecurrenteTexto, margin, yPos);
      yPos += lineHeight;

      doc.text(`Nombres y Apellidos: ${formData.nombresApellidos}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`DNI: ${formData.dni}`, margin, yPos);
      doc.text(`Celular: ${formData.celular}`, margin + 70, yPos);
      yPos += lineHeight;

      doc.text(`Domicilio: ${formData.domicilio}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`Escuela Profesional / Dependencia: ${formData.escuelaProfesional}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`Correo electrónico: ${formData.correo}`, margin, yPos);
      yPos += lineHeight;

      doc.text(`Código UNT: ${formData.codigoUNT}`, margin, yPos);
      doc.text(`Año/Semestre: ${formData.semestreAno}`, margin + 70, yPos);
      yPos += lineHeight + 5;

      // 2. MOTIVO
      doc.setFont('helvetica', 'bold');
      doc.text('2. MOTIVO:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      const motivoTexto = `Denuncia (${formData.motivo === 'denuncia' ? 'X' : ' '})    Reclamo (${formData.motivo === 'reclamo' ? 'X' : ' '})    Queja (${formData.motivo === 'queja' ? 'X' : ' '})`;
      doc.text(motivoTexto, margin, yPos);
      yPos += lineHeight;

      if (formData.motivo === 'otro') {
        doc.text(`Otro: ${formData.motivoOtro}`, margin, yPos);
        yPos += lineHeight;
      }

      const instanciaTexto = `¿El motivo está siendo visto en otra instancia? Sí (${formData.instanciaPrevia === 'si' ? 'X' : ' '})    No (${formData.instanciaPrevia === 'no' ? 'X' : ' '})`;
      doc.text(instanciaTexto, margin, yPos);
      yPos += lineHeight + 5;

      // 3. DESCRIPCIÓN DE HECHOS
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.text('3. DESCRIPCIÓN DE LOS HECHOS:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const hechosLines = doc.splitTextToSize(formData.descripcionHechos || 'N/A', pageWidth - 2 * margin);
      doc.text(hechosLines, margin, yPos);
      yPos += (hechosLines.length * 5) + 5;

      // 4. DERECHOS AFECTADOS
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('4. DERECHOS QUE CONSIDERA AFECTADOS:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const derechosLines = doc.splitTextToSize(formData.derechosAfectados || 'N/A', pageWidth - 2 * margin);
      doc.text(derechosLines, margin, yPos);
      yPos += (derechosLines.length * 5) + 5;

      // 5. PRETENSIONES
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('5. PRETENSIONES:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const pretensionesLines = doc.splitTextToSize(formData.pretensiones, pageWidth - 2 * margin);
      doc.text(pretensionesLines, margin, yPos);
      yPos += (pretensionesLines.length * 5) + 5;

      // 6. MEDIOS PROBATORIOS
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('6. MEDIOS PROBATORIOS:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const mediosLines = doc.splitTextToSize(formData.mediosProbatorios || 'N/A', pageWidth - 2 * margin);
      doc.text(mediosLines, margin, yPos);
      yPos += (mediosLines.length * 5) + 10;

      // 7. LUGAR Y FECHA
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('7. LUGAR Y FECHA:', margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      const fechaFormateada = new Date(formData.fecha).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      doc.text(`${formData.lugar}, ${fechaFormateada}`, margin, yPos);
      yPos += lineHeight + 15;

      // FIRMA
      if (formData.firmaFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target?.result as string;
          try {
            // Agregar imagen de firma
            doc.addImage(imgData, 'PNG', margin + 40, yPos, 40, 20);
            yPos += 25;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text('_____________________________', margin + 30, yPos);
            yPos += 5;
            doc.text('Firma', margin + 55, yPos);
            yPos += 5;
            doc.text(`DNI: ${formData.dnifirma}`, margin + 45, yPos);

            // Guardar PDF
            doc.save(`Anexo_01_${formData.nombresApellidos.replace(/\s+/g, '_')}.pdf`);
            alert('PDF generado exitosamente');
          } catch (error) {
            console.error('Error al agregar firma:', error);
            // Guardar sin firma si hay error
            yPos += 5;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text('_____________________________', margin + 30, yPos);
            yPos += 5;
            doc.text('Firma', margin + 55, yPos);
            yPos += 5;
            doc.text(`DNI: ${formData.dnifirma}`, margin + 45, yPos);

            doc.save(`Anexo_01_${formData.nombresApellidos.replace(/\s+/g, '_')}.pdf`);
            alert('PDF generado exitosamente (sin imagen de firma)');
          }
        };
        reader.readAsDataURL(formData.firmaFile);
      } else {
        // Sin firma
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('_____________________________', margin + 30, yPos);
        yPos += 5;
        doc.text('Firma', margin + 55, yPos);
        yPos += 5;
        doc.text(`DNI: ${formData.dnifirma}`, margin + 45, yPos);

        doc.save(`Anexo_01_${formData.nombresApellidos.replace(/\s+/g, '_')}.pdf`);
        alert('PDF generado exitosamente');
      }
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor intente nuevamente.');
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Anexo N° 01
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              FORMULARIO
            </h2>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              SEÑOR DEFENSOR UNIVERSITARIO
            </p>
            <p className="text-md text-gray-700">
              Universidad Nacional de Trujillo
            </p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Datos del Recurrente */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              1. DATOS PERSONALES DEL RECURRENTE
            </h2>

            {/* Tipo de Recurrente */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Recurrente <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoRecurrente"
                    value="docente"
                    checked={formData.tipoRecurrente === 'docente'}
                    onChange={(e) => handleRadioChange('tipoRecurrente', e.target.value)}
                    className="mr-2"
                  />
                  Docente
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoRecurrente"
                    value="estudiante"
                    checked={formData.tipoRecurrente === 'estudiante'}
                    onChange={(e) => handleRadioChange('tipoRecurrente', e.target.value)}
                    className="mr-2"
                  />
                  Estudiante
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoRecurrente"
                    value="administrativo"
                    checked={formData.tipoRecurrente === 'administrativo'}
                    onChange={(e) => handleRadioChange('tipoRecurrente', e.target.value)}
                    className="mr-2"
                  />
                  Administrativo
                </label>
              </div>
              {errors.tipoRecurrente && (
                <p className="text-red-500 text-sm mt-1">{errors.tipoRecurrente}</p>
              )}
            </div>

            {/* Nombres y Apellidos */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres y Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombresApellidos"
                value={formData.nombresApellidos}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese nombres y apellidos completos"
              />
              {errors.nombresApellidos && (
                <p className="text-red-500 text-sm mt-1">{errors.nombresApellidos}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  maxLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12345678"
                />
                {errors.dni && (
                  <p className="text-red-500 text-sm mt-1">{errors.dni}</p>
                )}
              </div>

              {/* Celular */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Celular
                </label>
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  maxLength={9}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="987654321"
                />
              </div>
            </div>

            {/* Domicilio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domicilio *
              </label>
              <input
                type="text"
                name="domicilio"
                value={formData.domicilio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dirección completa"
              />
            </div>

            {/* Escuela Profesional */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escuela Profesional / Dependencia Administrativa *
              </label>
              <input
                type="text"
                name="escuelaProfesional"
                value={formData.escuelaProfesional}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Ingeniería de Sistemas"
              />
            </div>

            {/* Correo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ejemplo@unt.edu.pe"
              />
              {errors.correo && (
                <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Codigo UNT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código UNT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="codigoUNT"
                  value={formData.codigoUNT}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese Código UNT"
                />
                {errors.codigoUNT && (
                  <p className="text-red-500 text-sm mt-1">{errors.codigoUNT}</p>
                )}
              </div>

              {/* Año/Semestre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año/Semestre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="semestreAno"
                  value={formData.semestreAno}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 2024-I"
                />
                {errors.semestreAno && (
                  <p className="text-red-500 text-sm mt-1">{errors.semestreAno}</p>
                )}
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
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motivo"
                    value="denuncia"
                    checked={formData.motivo === 'denuncia'}
                    onChange={(e) => handleRadioChange('motivo', e.target.value)}
                    className="mr-2"
                  />
                  Denuncia
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motivo"
                    value="reclamo"
                    checked={formData.motivo === 'reclamo'}
                    onChange={(e) => handleRadioChange('motivo', e.target.value)}
                    className="mr-2"
                  />
                  Reclamo
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motivo"
                    value="queja"
                    checked={formData.motivo === 'queja'}
                    onChange={(e) => handleRadioChange('motivo', e.target.value)}
                    className="mr-2"
                  />
                  Queja
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motivo"
                    value="otro"
                    checked={formData.motivo === 'otro'}
                    onChange={(e) => handleRadioChange('motivo', e.target.value)}
                    className="mr-2"
                  />
                  Otro
                </label>
              </div>
              {errors.motivo && (
                <p className="text-red-500 text-sm mt-1">{errors.motivo}</p>
              )}
            </div>

            {formData.motivo === 'otro' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especifique el Motivo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="motivoOtro"
                  value={formData.motivoOtro}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Especifique otro motivo"
                />
                {errors.motivoOtro && (
                  <p className="text-red-500 text-sm mt-1">{errors.motivoOtro}</p>
                )}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿El motivo está siendo visto en otra instancia interna o externa?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="instanciaPrevia"
                    value="si"
                    checked={formData.instanciaPrevia === 'si'}
                    onChange={(e) => handleRadioChange('instanciaPrevia', e.target.value)}
                    className="mr-2"
                  />
                  Sí
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="instanciaPrevia"
                    value="no"
                    checked={formData.instanciaPrevia === 'no'}
                    onChange={(e) => handleRadioChange('instanciaPrevia', e.target.value)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

          </section>

          {/* Descripción de Hechos */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              3. DESCRIPCIÓN DE LOS HECHOS
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Debe describirse con suficiente claridad el hecho o hechos que originan la solicitud; datos y cargo del denunciado, lugar, fecha, así como el motivo y alcance de la pretensión que se plantea, de corresponder (obligatorio).
            </p>
            <div>
              <textarea
                name="descripcionHechos"
                value={formData.descripcionHechos}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describa los hechos de manera clara y detallada..."
              />
              {errors.descripcionHechos && (
                <p className="text-red-500 text-sm mt-1">{errors.descripcionHechos}</p>
              )}
            </div>
          </section>

          {/* Derechos Afectados */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              4. DERECHOS QUE CONSIDERA AFECTADOS
            </h2>
            <div>
              <textarea
                name="derechosAfectados"
                value={formData.derechosAfectados}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Indique qué derechos considera que han sido afectados..."
              />
            </div>
          </section>

          {/* Pretensiones */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              5. PRETENSIONES
            </h2>
            <div>
              <textarea
                name="pretensiones"
                value={formData.pretensiones}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describa claramente lo que solicita a la Defensoría Universitaria..."
              />
              {errors.pretensiones && (
                <p className="text-red-500 text-sm mt-1">{errors.pretensiones}</p>
              )}
            </div>
          </section>

          {/* Medios Probatorios */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              6. MEDIOS PROBATORIOS
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Evidencias y/o datos de testigos
            </p>
            <div>
              <textarea
                name="mediosProbatorios"
                value={formData.mediosProbatorios}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Liste las evidencias documentales, testigos u otros medios probatorios..."
              />
            </div>
          </section>

          {/* Lugar y Fecha */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              7. LUGAR Y FECHA
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lugar *
                </label>
                <input
                  type="text"
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Trujillo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DNI (para firma) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dnifirma"
                value={formData.dnifirma}
                onChange={handleChange}
                maxLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12345678"
              />
              {errors.dnifirma && (
                <p className="text-red-500 text-sm mt-1">{errors.dnifirma}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firma (PNG o JPG) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {!formData.firmaFile ? (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Seleccionar archivo
                      </span>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG o JPG (máx. 5MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{formData.firmaFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(formData.firmaFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, firmaFile: null }))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              {errors.firmaFile && (
                <p className="text-red-500 text-sm mt-1">{errors.firmaFile}</p>
              )}
            </div>
          </section>

          {/* Botones de Acción */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleGeneratePDF}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <Download className="w-5 h-5" />
                <span>Descargar en PDF</span>
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
