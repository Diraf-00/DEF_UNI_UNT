import { Control, useWatch } from "react-hook-form";
import { Upload, FileText, X } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Anexo01Values } from "../../../validations/form-schemas";

interface SignatureSectionProps {
    control: Control<Anexo01Values>;
    setValue: (name: keyof Anexo01Values, value: any) => void;
}

export function SignatureSection({ control, setValue }: SignatureSectionProps) {
    const firmaFile = useWatch({ control, name: "firmaFile" });

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">7. LUGAR Y FECHA</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Lugar */}
                <FormField<Anexo01Values>
                    control={control}
                    name="lugar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lugar <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Trujillo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Fecha */}
                <div className="md:col-span-2">
                    <FormField<Anexo01Values>
                        control={control}
                        name="fecha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* DNI Firma */}
            <FormField<Anexo01Values>
                control={control}
                name="dnifirma"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>DNI (para firma) <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="12345678" maxLength={8} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Firma File */}
            <FormField<Anexo01Values>
                control={control}
                name="firmaFile"
                render={() => (
                    <FormItem>
                        <FormLabel>Firma (PNG o JPG) <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${!firmaFile ? 'border-gray-300' : 'border-blue-200 bg-blue-50'}`}>
                                {!firmaFile ? (
                                    <div>
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <label className="cursor-pointer">
                                            <span className="text-blue-600 hover:text-blue-700 font-medium">Seleccionar archivo</span>
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) setValue('firmaFile', file);
                                                }}
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
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    );
}
