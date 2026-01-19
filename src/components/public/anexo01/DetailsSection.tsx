import { Control } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage, FormDescription } from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { Anexo01Values } from "../../../validations/form-schemas";

interface DetailsSectionProps {
    control: Control<Anexo01Values>;
}

export function DetailsSection({ control }: DetailsSectionProps) {
    return (
        <>
            {/* Descripción de Hechos */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">3. DESCRIPCIÓN DE LOS HECHOS</h2>
                <FormField<Anexo01Values>
                    control={control}
                    name="descripcionHechos"
                    render={({ field }) => (
                        <FormItem>
                            <FormDescription>
                                Debe describirse con suficiente claridad el hecho o hechos que originan la solicitud; datos y cargo del denunciado, lugar, fecha, así como el motivo y alcance de la pretensión que se plantea, de corresponder (obligatorio).
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Describa los hechos de manera clara y detallada..."
                                    className="min-h-[200px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>

            {/* Derechos Afectados */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">4. DERECHOS QUE CONSIDERA AFECTADOS</h2>
                <FormField<Anexo01Values>
                    control={control}
                    name="derechosAfectados"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Indique qué derechos considera que han sido afectados..."
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>

            {/* Pretensiones */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">5. PRETENSIONES</h2>
                <FormField<Anexo01Values>
                    control={control}
                    name="pretensiones"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Describa claramente lo que solicita a la Defensoría Universitaria..."
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>

            {/* Medios Probatorios */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">6. MEDIOS PROBATORIOS</h2>
                <FormField<Anexo01Values>
                    control={control}
                    name="mediosProbatorios"
                    render={({ field }) => (
                        <FormItem>
                            <FormDescription>Evidencias y/o datos de testigos</FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="Liste las evidencias documentales, testigos u otros medios probatorios..."
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>
        </>
    );
}
