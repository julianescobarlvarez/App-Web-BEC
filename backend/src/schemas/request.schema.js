import { z } from 'zod';

export const updateRequestSchema = z.object({
    params: z.object({
        identificador: z.string({
            required_error: 'El identificador del documento es requerido',
        }),
    }),
    body: z.object({
        estado: z.string({
            required_error: 'El estado es requerido',
        }).refine((estado) => ['pendiente', 'aprobado', 'rechazado'].includes(estado), {
            message: 'Estado inválido. Debe ser "pendiente", "aprobado" o "rechazado".',
        }),
    }),
});
