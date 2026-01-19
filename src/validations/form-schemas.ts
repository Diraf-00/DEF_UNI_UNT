
import { z } from 'zod';

// Configuración de validaciones
const DNI_REGEX = /^\d{8}$/;
const PHONE_REGEX = /^\d{9}$/;
const ALPHA_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
// Regex estricto para Año-Semestre: Ej. 2024-I, 2024-II, 2024-EXT
const SEMESTRE_REGEX = /^\d{4}-(1|2|I|II|EXT)$/;

// Schema para el Anexo 01
export const anexo01Schema = z.object({
    // Datos del Recurrente
    tipoRecurrente: z.enum(['docente', 'estudiante', 'administrativo'] as const, {
        error: () => ({ message: 'Por favor seleccione una opción válida (Docente, Estudiante, Administrativo)' })
    }),

    nombresApellidos: z.string()
        .min(1, 'El nombre es obligatorio')
        .max(100, 'El nombre es muy largo')
        .regex(ALPHA_REGEX, 'El nombre solo debe contener letras y espacios'),

    dni: z.string()
        .regex(DNI_REGEX, 'El DNI debe tener exactamente 8 dígitos numéricos'),

    celular: z.string()
        .regex(PHONE_REGEX, 'El celular debe tener exactamente 9 dígitos numéricos'),

    domicilio: z.string()
        .min(5, 'El domicilio debe ser más detallado (mín. 5 caracteres)')
        .max(200, 'El domicilio es muy largo'),

    escuelaProfesional: z.string()
        .min(3, 'Ingrese una escuela o dependencia válida'),

    correo: z.string()
        .email('Ingrese un correo electrónico válido (ej. usuario@dominio.com)'),

    codigoUNT: z.string()
        .min(1, 'El código UNT es obligatorio')
        .regex(/^\d+$/, 'El código UNT solo debe contener números'),

    semestreAno: z.string()
        .regex(SEMESTRE_REGEX, 'El formato debe ser AÑO-SEMESTRE (ej. 2024-1, 2024-2, 2024-I, 2024-II, 2024-EXT)'),

    // Motivo
    motivo: z.enum(['denuncia', 'reclamo', 'queja', 'otro'] as const, {
        error: () => ({ message: 'Seleccione un motivo válido' })
    }),

    motivoOtro: z.string().optional(),

    instanciaPrevia: z.enum(['si', 'no'] as const, {
        error: () => ({ message: 'Seleccione una opción' })
    }),

    // Detalles
    descripcionHechos: z.string()
        .min(20, 'La descripción de los hechos debe ser detallada (mínimo 20 caracteres)'),

    derechosAfectados: z.string().optional(),

    pretensiones: z.string().optional(),

    mediosProbatorios: z.string().optional(),

    // Firma y Lugar
    lugar: z.string()
        .min(1, 'El lugar es obligatorio')
        .regex(ALPHA_REGEX, 'El lugar solo debe contener letras y espacios'),

    fecha: z.string()
        .min(1, 'La fecha es obligatoria'),

    dnifirma: z.string()
        .regex(DNI_REGEX, 'El DNI de firma debe tener 8 dígitos numéricos'),

    firmaFile: z.any()
        .refine((file) => file instanceof File, 'Debe subir un archivo de firma')
        .refine((file) => file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg', 'Solo se permiten archivos PNG, JPG o JPEG')
        .refine((file) => file?.size <= 5 * 1024 * 1024, 'El archivo no debe pesar más de 5MB')

}).refine((data) => {
    if (data.motivo === 'otro') {
        return !!data.motivoOtro && data.motivoOtro.trim().length > 0;
    }
    return true;
}, {
    message: "Especifique el motivo",
    path: ["motivoOtro"],
}).refine((data) => {
    if (data.dnifirma && data.dni) {
        return data.dni === data.dnifirma;
    }
    return true;
}, {
    message: "El DNI de la firma no coincide con el DNI del recurrente",
    path: ["dnifirma"],
});

export type Anexo01Values = z.infer<typeof anexo01Schema>;
