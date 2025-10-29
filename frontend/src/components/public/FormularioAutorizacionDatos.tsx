import React, { useState } from 'react';
import { Upload, Download, FileText, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface FormData {
  nombresApellidos: string; dni: string; domicilio: string;
  lugar: string; dia: string; mes: string; anio: string;
  firmaFile: File | null; dniFirma: string;
}

export function FormularioAutorizacionDatos() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombresApellidos: '', dni: '', domicilio: '',
    lugar: 'Trujillo',
    dia: new Date().getDate().toString(),
    mes: new Date().toLocaleDateString('es-PE', { month: 'long' }),
    anio: new Date().getFullYear().toString(),
    firmaFile: null, dniFirma: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors; });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'application/pdf' || file.type === 'image/jpeg') {
        setFormData(prev => ({ ...prev, firmaFile: file }));
        setErrors(prev => { const newErrors = { ...prev }; delete newErrors.firmaFile; return newErrors; });
      } else {
        setErrors(prev => ({ ...prev, firmaFile: 'Solo PNG, JPG o PDF' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombresApellidos) newErrors.nombresApellidos = 'Requerido';
    if (!formData.dni) newErrors.dni = 'Requerido';
    if (!formData.domicilio) newErrors.domicilio = 'Requerido';
    if (!formData.firmaFile) newErrors.firmaFile = 'Requerido';
    if (!formData.dniFirma) newErrors.dniFirma = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePDF = async () => {
    if (!validateForm()) { alert('Complete todos los campos obligatorios'); return; }
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20; let yPos = 20;

      doc.setFontSize(12); doc.setFont('helvetica', 'bold');
      doc.text('AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES', pageWidth / 2, yPos, { align: 'center' });
      yPos += 7;
      doc.setFontSize(10);
      doc.text('(Ley N° 29733 y su Reglamento D.S. N° 003-2013-JUS)', pageWidth / 2, yPos, { align: 'center' });
      yPos += 12;

      doc.setFontSize(10); doc.setFont('helvetica', 'normal');
      const intro = `Yo, ${formData.nombresApellidos}, identificado(a) con DNI N° ${formData.dni}, con domicilio en ${formData.domicilio}.`;
      const introLines = doc.splitTextToSize(intro, pageWidth - 2 * margin);
      doc.text(introLines, margin, yPos);
      yPos += (introLines.length * 5) + 8;

      const p1 = 'Por medio del presente documento, autorizo de manera libre, previa, expresa, informada e inequívoca a la Defensoría Universitaria de la Universidad Nacional de Trujillo para que realice el tratamiento de los datos personales que he proporcionado a través del formulario de solicitud y de toda la documentación que presente durante el procedimiento. Esto incluye, de ser el caso, datos sensibles que sean estrictamente necesarios para la investigación.';
      const p1Lines = doc.splitTextToSize(p1, pageWidth - 2 * margin);
      doc.text(p1Lines, margin, yPos);
      yPos += (p1Lines.length * 4.5) + 6;

      doc.text('Esta autorización se otorga con la finalidad exclusiva de:', margin, yPos);
      yPos += 6;

      doc.setFontSize(9);
      const finalidades = [
        'a) Gestionar, tramitar y evaluar mi solicitud (denuncia, reclamo, queja o mediación).',
        'b) Realizar las indagaciones, comunicaciones y coordinaciones necesarias para el esclarecimiento de los hechos.',
        'c) Contactarme para informarme sobre el estado y los avances de mi caso.',
        'd) Elaborar el informe final y las recomendaciones que correspondan.'
      ];

      finalidades.forEach(f => {
        const fLines = doc.splitTextToSize(f, pageWidth - 2 * margin - 5);
        doc.text(fLines, margin + 5, yPos);
        yPos += (fLines.length * 4) + 2;
      });

      if (yPos > pageHeight - 80) { doc.addPage(); yPos = 20; }

      yPos += 4;
      doc.setFontSize(10);
      const p2 = 'Declaro conocer que mis datos serán almacenados en el banco de datos personales de la Defensoría Universitaria y serán tratados con la más estricta confidencialidad y bajo las medidas de seguridad técnicas, organizativas y legales necesarias para protegerlos, de acuerdo con la Ley N° 29733.';
      const p2Lines = doc.splitTextToSize(p2, pageWidth - 2 * margin);
      doc.text(p2Lines, margin, yPos);
      yPos += (p2Lines.length * 4.5) + 6;

      const p3 = 'Asimismo, estoy informado(a) de que puedo ejercer mis derechos de acceso, rectificación, cancelación y oposición (ARCO) sobre mis datos personales, dirigiendo una solicitud escrita a la Defensoría Universitaria.';
      const p3Lines = doc.splitTextToSize(p3, pageWidth - 2 * margin);
      doc.text(p3Lines, margin, yPos);
      yPos += (p3Lines.length * 4.5) + 6;

      const p4 = 'El plazo de conservación de mis datos será el necesario para cumplir con la finalidad para la cual fueron recopilados y para atender las responsabilidades legales que pudieran derivarse del procedimiento.';
      const p4Lines = doc.splitTextToSize(p4, pageWidth - 2 * margin);
      doc.text(p4Lines, margin, yPos);
      yPos += (p4Lines.length * 4.5) + 6;

      doc.text('En señal de conformidad, otorgo mi consentimiento.', margin, yPos);
      yPos += 10;

      doc.text(`${formData.lugar}, ${formData.dia} de ${formData.mes} de ${formData.anio}`, margin, yPos);
      yPos += 20;

      if (formData.firmaFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target?.result as string;
          try {
            doc.addImage(imgData, 'PNG', margin + 30, yPos, 40, 20);
            yPos += 25;
            doc.text('_________________________', margin + 20, yPos);
            yPos += 5;
            doc.text('Firma', margin + 45, yPos);
            yPos += 5;
            doc.text(`DNI N°: ${formData.dniFirma}`, margin + 35, yPos);
            doc.save(`Autorizacion_Datos_${formData.nombresApellidos.replace(/\s+/g, '_')}.pdf`);
            alert('PDF generado exitosamente');
          } catch (error) {
            yPos += 5;
            doc.text('_________________________', margin + 20, yPos);
            yPos += 5;
            doc.text('Firma', margin + 45, yPos);
            yPos += 5;
            doc.text(`DNI N°: ${formData.dniFirma}`, margin + 35, yPos);
            doc.save(`Autorizacion_Datos_${formData.nombresApellidos.replace(/\s+/g, '_')}.pdf`);
            alert('PDF generado (sin imagen de firma)');
          }
        };
        reader.readAsDataURL(formData.firmaFile);
      } else {
        doc.text('_________________________', margin + 20, yPos);
        yPos += 5;
        doc.text('Firma', margin + 45, yPos);
        yPos += 5;
        doc.text(`DNI N°: ${formData.dniFirma}`, margin + 35, yPos);
        doc.save(`Autorizacion_Datos_${formData.nombresApellidos.replace(/\s+/g, '_')}.pdf`);
        alert('PDF generado exitosamente');
      }
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={() => navigate('/formularios')} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />Volver a Formularios
          </button>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES</h1>
            <p className="text-sm text-gray-600">(Ley N° 29733 y su Reglamento D.S. N° 003-2013-JUS)</p>
            <p className="text-md text-gray-700 mt-2">Universidad Nacional de Trujillo</p>
          </div>
        </div>

        <form className="space-y-6">
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Datos Personales</h2>
            <div className="space-y-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombres y Apellidos <span className="text-red-500">*</span></label>
                <input type="text" name="nombresApellidos" value={formData.nombresApellidos} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ingrese su nombre completo" />
                {errors.nombresApellidos && <p className="text-red-500 text-sm mt-1">{errors.nombresApellidos}</p>}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">DNI <span className="text-red-500">*</span></label>
                  <input type="text" name="dni" value={formData.dni} onChange={handleChange} maxLength={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="12345678" />
                  {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Domicilio <span className="text-red-500">*</span></label>
                  <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Dirección completa" />
                  {errors.domicilio && <p className="text-red-500 text-sm mt-1">{errors.domicilio}</p>}</div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Lugar y Fecha</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Lugar</label>
                <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Día</label>
                <input type="number" name="dia" value={formData.dia} onChange={handleChange} min="1" max="31" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <input type="text" name="mes" value={formData.mes} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                <input type="text" name="anio" value={formData.anio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Firma</h2>
            <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">DNI (para firma) <span className="text-red-500">*</span></label>
              <input type="text" name="dniFirma" value={formData.dniFirma} onChange={handleChange} maxLength={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="12345678" />
              {errors.dniFirma && <p className="text-red-500 text-sm mt-1">{errors.dniFirma}</p>}</div>

            <div><label className="block text-sm font-medium text-gray-700 mb-2">Subir Firma (PNG, JPG o PDF) <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {!formData.firmaFile ? (
                  <div><Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">Seleccionar archivo</span>
                      <input type="file" accept=".png,.pdf,.jpg,.jpeg" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG o PDF (máx. 5MB)</p></div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{formData.firmaFile.name}</p>
                        <p className="text-sm text-gray-500">{(formData.firmaFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, firmaFile: null }))} className="text-red-600 hover:text-red-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              {errors.firmaFile && <p className="text-red-500 text-sm mt-1">{errors.firmaFile}</p>}</div>
          </section>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <button type="button" onClick={handleGeneratePDF} className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 font-medium">
              <Download className="w-5 h-5" /><span>Descargar PDF</span>
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">Revise el documento antes de presentarlo oficialmente</p>
          </div>
        </form>
      </div>
    </div>
  );
}
