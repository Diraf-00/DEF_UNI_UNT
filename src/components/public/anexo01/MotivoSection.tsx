import { Control, useWatch } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Anexo01Values } from "../../../validations/form-schemas";

interface MotivoSectionProps {
    control: Control<Anexo01Values>;
}

export function MotivoSection({ control }: MotivoSectionProps) {
    const motivo = useWatch({ control, name: "motivo" });

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">2. MOTIVO</h2>

            {/* Tipo de Motivo */}
            <FormField<Anexo01Values>
                control={control}
                name="motivo"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Tipo de Motivo <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-wrap gap-4"
                            >
                                {['denuncia', 'reclamo', 'queja', 'otro'].map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <RadioGroupItem value={type} id={`m-${type}`} />
                                        <label htmlFor={`m-${type}`} className="capitalize cursor-pointer">
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

            {/* Motivo Otro */}
            {motivo === 'otro' && (
                <FormField<Anexo01Values>
                    control={control}
                    name="motivoOtro"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Especifique el Motivo <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Especifique otro motivo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {/* Instancia Previa */}
            <FormField<Anexo01Values>
                control={control}
                name="instanciaPrevia"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>¿El motivo está siendo visto en otra instancia interna o externa? <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="si" id="ip-si" />
                                    <label htmlFor="ip-si" className="cursor-pointer">Sí</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="ip-no" />
                                    <label htmlFor="ip-no" className="cursor-pointer">No</label>
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    );
}
