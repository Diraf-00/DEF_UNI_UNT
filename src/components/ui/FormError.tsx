
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
    message?: string;
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-2 mt-1.5 text-red-600 text-sm font-semibold animate-in fade-in slide-in-from-top-1 bg-red-50 p-2 rounded-md border border-red-100">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
}
