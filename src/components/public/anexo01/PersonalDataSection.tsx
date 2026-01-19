import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Anexo01Values } from "../../../validations/form-schemas";

interface PersonalDataSectionProps {
    control: Control<Anexo01Values>;
}

export function PersonalDataSection({ control }: PersonalDataSectionProps) {
    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">1. DATOS PERSONALES DEL RECURRENTE</h2>

            {/* Tipo de Recurrente */}
            <FormField<Anexo01Values>
                control={control}
                name="tipoRecurrente"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Tipo de Recurrente <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                            >
                                {['docente', 'estudiante', 'administrativo'].map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <RadioGroupItem value={type} id={`r-${type}`} />
                                        <label htmlFor={`r-${type}`} className="capitalize cursor-pointer">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Nombres y Apellidos */}
            <FormField<Anexo01Values>
                control={control}
                name="nombresApellidos"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombres y Apellidos <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="Ingrese nombres y apellidos completos" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DNI */}
                <FormField<Anexo01Values>
                    control={control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="12345678" maxLength={8} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Celular */}
                <FormField<Anexo01Values>
                    control={control}
                    name="celular"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Celular <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="987654321" maxLength={9} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Domicilio */}
            <FormField<Anexo01Values>
                control={control}
                name="domicilio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Domicilio <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="Dirección completa" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Escuela Profesional */}
            <FormField<Anexo01Values>
                control={control}
                name="escuelaProfesional"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Escuela Profesional / Dependencia Administrativa <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="Ej: Ingeniería de Sistemas" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Correo */}
            <FormField<Anexo01Values>
                control={control}
                name="correo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correo Electrónico <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="ejemplo@unt.edu.pe" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Codigo UNT */}
                <FormField<Anexo01Values>
                    control={control}
                    name="codigoUNT"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código UNT <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese Código UNT" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Año/Semestre */}
                <FormField<Anexo01Values>
                    control={control}
                    name="semestreAno"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Año/Semestre <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: 2024-I" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </section>
    );
}
