import React, { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface FormData {
  dia: string; mes: string; anio: string; hora: string;
  solicitanteNombres: string; solicitanteDNI: string; solicitanteCelular: string;
  solicitanteDependencia: string; solicitanteCargo: string;
  requeridoNombres: string; requeridoDNI: string; requeridoCelular: string;
  requeridoDependencia: string; requeridoCargo: string;
  hechos: string; acuerdos: string;
  horaCierre: string; diaCierre: string; mesCierre: string; anioCierre: string;
}

export function FormularioAnexo02() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    dia: new Date().getDate().toString(),
    mes: new Date().toLocaleDateString('es-PE', { month: 'long' }),
    anio: new Date().getFullYear().toString(),
    hora: '', solicitanteNombres: '', solicitanteDNI: '', solicitanteCelular: '',
    solicitanteDependencia: '', solicitanteCargo: '',
    requeridoNombres: '', requeridoDNI: '', requeridoCelular: '',
    requeridoDependencia: '', requeridoCargo: '',
    hechos: '', acuerdos: '',
    horaCierre: '',
    diaCierre: new Date().getDate().toString(),
    mesCierre: new Date().toLocaleDateString('es-PE', { month: 'long' }),
    anioCierre: new Date().getFullYear().toString()
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors; });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.dia) newErrors.dia = 'Requerido';
    if (!formData.mes) newErrors.mes = 'Requerido';
    if (!formData.anio) newErrors.anio = 'Requerido';
    if (!formData.hora) newErrors.hora = 'Requerido';
    if (!formData.solicitanteNombres) newErrors.solicitanteNombres = 'Requerido';
    if (!formData.solicitanteDNI) newErrors.solicitanteDNI = 'Requerido';
    if (!formData.requeridoNombres) newErrors.requeridoNombres = 'Requerido';
    if (!formData.requeridoDNI) newErrors.requeridoDNI = 'Requerido';
    if (!formData.hechos) newErrors.hechos = 'Requerido';
    if (!formData.acuerdos) newErrors.acuerdos = 'Requerido';
    if (!formData.horaCierre) newErrors.horaCierre = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePDF = async () => {
    if (!validateForm()) { alert('Complete todos los campos obligatorios'); return; }
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20; let yPos = 20;

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('ACTA DE ACUERDO DE MEDIACIÓN', pageWidth / 2, yPos, { align: 'center' });
      yPos += 12;

      doc.setFontSize(10); doc.setFont('helvetica', 'normal');
      const intro = `En la ciudad universitaria, la Defensoría Universitaria de la Universidad Nacional de Trujillo, el día ${formData.dia} de ${formData.mes} del ${formData.anio}, siendo las ${formData.hora} horas, los señores abajo mencionados, asisten a la Audiencia de Mediación de manera libre, voluntaria y sin presión alguna con la finalidad de llegar a un acuerdo:`;
      const introLines = doc.splitTextToSize(intro, pageWidth - 2 * margin);
      doc.text(introLines, margin, yPos);
      yPos += (introLines.length * 5) + 8;

      doc.setFont('helvetica', 'bold');
      doc.text('1. Base Legal:', margin, yPos); yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text('Reglamento de Defensoría Universitaria.', margin, yPos); yPos += 10;

      doc.setFont('helvetica', 'bold');
      doc.text('2. Identificación de las partes:', margin, yPos); yPos += 6;
      doc.text('Solicitante:', margin, yPos); yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombres y Apellidos: ${formData.solicitanteNombres}`, margin, yPos); yPos += 5;
      doc.text(`DNI: ${formData.solicitanteDNI}  Celular: ${formData.solicitanteCelular}`, margin, yPos); yPos += 5;
      doc.text(`Dependencia: ${formData.solicitanteDependencia}`, margin, yPos); yPos += 5;
      doc.text(`Cargo: ${formData.solicitanteCargo}`, margin, yPos); yPos += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Requerido:', margin, yPos); yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombres y Apellidos: ${formData.requeridoNombres}`, margin, yPos); yPos += 5;
      doc.text(`DNI: ${formData.requeridoDNI}  Celular: ${formData.requeridoCelular}`, margin, yPos); yPos += 5;
      doc.text(`Dependencia: ${formData.requeridoDependencia}`, margin, yPos); yPos += 5;
      doc.text(`Cargo: ${formData.requeridoCargo}`, margin, yPos); yPos += 10;

      doc.setFont('helvetica', 'bold');
      doc.text('3. Hechos:', margin, yPos); yPos += 6;
      doc.setFont('helvetica', 'normal');
      const hechosLines = doc.splitTextToSize(formData.hechos, pageWidth - 2 * margin);
      doc.text(hechosLines, margin, yPos);
      yPos += (hechosLines.length * 5) + 8;

      doc.setFont('helvetica', 'bold');
      doc.text('4. Acuerdos de la mediación:', margin, yPos); yPos += 6;
      doc.setFont('helvetica', 'normal');
      const acuerdosLines = doc.splitTextToSize(formData.acuerdos, pageWidth - 2 * margin);
      doc.text(acuerdosLines, margin, yPos);
      yPos += (acuerdosLines.length * 5) + 10;

      doc.setFont('helvetica', 'bold');
      doc.text('5. Conformidad y cierre del acta', margin, yPos); yPos += 6;
      doc.setFont('helvetica', 'normal');
      const cierre = `Las partes han colaborado activamente, respetando la labor de mediación por parte del Defensor Universitario, y declaran haber alcanzado los acuerdos descritos; y para que así conste, siendo las ${formData.horaCierre} del día ${formData.diaCierre} de ${formData.mesCierre} del año ${formData.anioCierre}, se firma la presente acta por triplicado y se extiende un ejemplar a cada una de las partes, manteniendo la debida reserva y confidencialidad de la presente acta.`;
      const cierreLines = doc.splitTextToSize(cierre, pageWidth - 2 * margin);
      doc.text(cierreLines, margin, yPos);
      yPos += (cierreLines.length * 5) + 15;

      doc.setFontSize(9);
      const col1 = 30; const col2 = pageWidth / 2 + 10;
      doc.text('____________________', col1, yPos);
      doc.text('____________________', col2, yPos);
      doc.text('SOLICITANTE', col1 + 5, yPos + 5);
      doc.text('REQUERIDO', col2 + 10, yPos + 5);
      yPos += 15;
      doc.text('____________________', pageWidth / 2 - 20, yPos);
      doc.text('DEFENSOR UNIVERSITARIO', pageWidth / 2 - 25, yPos + 5);

      doc.save(`Acta_Mediacion_${formData.solicitanteNombres.replace(/\s+/g, '_')}.pdf`);
      alert('PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={() => navigate('/llenado-formularios')} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />Volver a Documentos en Línea
          </button>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Anexo N° 02</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ACTA DE ACUERDO DE MEDIACIÓN</h2>
            <p className="text-md text-gray-700">Universidad Nacional de Trujillo</p>
          </div>
        </div>

        <form className="space-y-6">
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Fecha y Hora de la Audiencia</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Día <span className="text-red-500">*</span></label>
                <input type="number" name="dia" value={formData.dia} onChange={handleChange} min="1" max="31" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.dia && <p className="text-red-500 text-sm mt-1">{errors.dia}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Mes <span className="text-red-500">*</span></label>
                <input type="text" name="mes" value={formData.mes} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.mes && <p className="text-red-500 text-sm mt-1">{errors.mes}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Año <span className="text-red-500">*</span></label>
                <input type="number" name="anio" value={formData.anio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.anio && <p className="text-red-500 text-sm mt-1">{errors.anio}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Hora <span className="text-red-500">*</span></label>
                <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.hora && <p className="text-red-500 text-sm mt-1">{errors.hora}</p>}</div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Datos del Solicitante</h2>
            <div className="space-y-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombres y Apellidos <span className="text-red-500">*</span></label>
                <input type="text" name="solicitanteNombres" value={formData.solicitanteNombres} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.solicitanteNombres && <p className="text-red-500 text-sm mt-1">{errors.solicitanteNombres}</p>}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">DNI <span className="text-red-500">*</span></label>
                  <input type="text" name="solicitanteDNI" value={formData.solicitanteDNI} onChange={handleChange} maxLength={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.solicitanteDNI && <p className="text-red-500 text-sm mt-1">{errors.solicitanteDNI}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
                  <input type="tel" name="solicitanteCelular" value={formData.solicitanteCelular} onChange={handleChange} maxLength={9} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Dependencia</label>
                <input type="text" name="solicitanteDependencia" value={formData.solicitanteDependencia} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                <input type="text" name="solicitanteCargo" value={formData.solicitanteCargo} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Datos del Requerido</h2>
            <div className="space-y-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombres y Apellidos <span className="text-red-500">*</span></label>
                <input type="text" name="requeridoNombres" value={formData.requeridoNombres} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.requeridoNombres && <p className="text-red-500 text-sm mt-1">{errors.requeridoNombres}</p>}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">DNI <span className="text-red-500">*</span></label>
                  <input type="text" name="requeridoDNI" value={formData.requeridoDNI} onChange={handleChange} maxLength={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  {errors.requeridoDNI && <p className="text-red-500 text-sm mt-1">{errors.requeridoDNI}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
                  <input type="tel" name="requeridoCelular" value={formData.requeridoCelular} onChange={handleChange} maxLength={9} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Dependencia</label>
                <input type="text" name="requeridoDependencia" value={formData.requeridoDependencia} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                <input type="text" name="requeridoCargo" value={formData.requeridoCargo} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">3. Hechos</h2>
            <div><textarea name="hechos" value={formData.hechos} onChange={handleChange} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Describa los hechos..." />
              {errors.hechos && <p className="text-red-500 text-sm mt-1">{errors.hechos}</p>}</div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">4. Acuerdos de la Mediación</h2>
            <div><textarea name="acuerdos" value={formData.acuerdos} onChange={handleChange} rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Describa los acuerdos..." />
              {errors.acuerdos && <p className="text-red-500 text-sm mt-1">{errors.acuerdos}</p>}</div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">5. Conformidad y Cierre</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Hora <span className="text-red-500">*</span></label>
                <input type="time" name="horaCierre" value={formData.horaCierre} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                {errors.horaCierre && <p className="text-red-500 text-sm mt-1">{errors.horaCierre}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Día <span className="text-red-500">*</span></label>
                <input type="number" name="diaCierre" value={formData.diaCierre} onChange={handleChange} min="1" max="31" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Mes <span className="text-red-500">*</span></label>
                <input type="text" name="mesCierre" value={formData.mesCierre} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Año <span className="text-red-500">*</span></label>
                <input type="number" name="anioCierre" value={formData.anioCierre} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
            </div>
          </section>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <button type="button" onClick={handleGeneratePDF} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium">
              <Download className="w-5 h-5" /><span>Descargar PDF</span>
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">Revise el documento antes de presentarlo oficialmente</p>
          </div>
        </form>
      </div>
    </div>
  );
}
