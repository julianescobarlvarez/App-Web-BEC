import { z } from 'zod';

export const updateRequestSchema = z.object({
    estado: z.string({
        required_error: 'El estado es requerido',
    }).refine((estado) => ['pendiente', 'aprobado', 'rechazado'].includes(estado), {
        message: 'Estado inválido. Debe ser "pendiente", "aprobado" o "rechazado".',
    }),
});
