import jsPDF from 'jspdf';
import { Anexo01Values } from '../../validations/form-schemas';
import { toast } from 'sonner';

export const generateAnexo01PDF = async (data: Anexo01Values) => {
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

        // Helper to add text block
        const addTextBlock = (title: string, content: string | undefined | null) => {
            if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, yPos);
            yPos += lineHeight;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const lines = doc.splitTextToSize(content || 'N/A', pageWidth - 2 * margin);
            doc.text(lines, margin, yPos);
            yPos += (lines.length * 5) + 5;
        };

        // 3. DESCRIPCIÓN DE HECHOS
        addTextBlock('3. DESCRIPCIÓN DE LOS HECHOS:', data.descripcionHechos);

        // 4. DERECHOS AFECTADOS
        addTextBlock('4. DERECHOS QUE CONSIDERA AFECTADOS:', data.derechosAfectados);

        // 5. PRETENSIONES
        addTextBlock('5. PRETENSIONES:', data.pretensiones);

        // 6. MEDIOS PROBATORIOS
        addTextBlock('6. MEDIOS PROBATORIOS:', data.mediosProbatorios);

        yPos += 5; // Extra space before footer

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
            // Handle file reading inside a Promise to make it async compatible
            await new Promise<void>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgData = e.target?.result as string;
                    try {
                        const format = data.firmaFile.type.includes('png') ? 'PNG' : 'JPEG';
                        doc.addImage(imgData, format, margin + 40, yPos, 40, 20);
                        yPos += 25;
                        resolve();
                    } catch (error) {
                        console.error('Error al agregar firma:', error);
                        yPos += 25;
                        resolve(); // Continue even if image fails
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(data.firmaFile);
            });
        } else {
            yPos += 25;
        }

        finalizePDF(doc, data, margin, yPos);
        return true;

    } catch (error) {
        console.error('Error al generar PDF:', error);
        toast.error('Error al generar el PDF. Por favor intente nuevamente.');
        return false;
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
