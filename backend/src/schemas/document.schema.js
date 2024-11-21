import { z } from 'zod';

export const createDocumentSchema = z.object({
    identificador: z.string({
        required_error: 'El identificador es requerido'
    }),
    tipo: z.string({
        required_error: 'El tipo de documento es requerido'
    }),
    titulo: z.string({
        required_error: 'El título es requerido'
    }),
    autor: z.string({
        required_error: 'El autor es requerido'
    }),
    editorial: z.string({
        required_error: 'Editorial inválida'
    }).optional(),
    año: z.number({
        required_error: 'El año es requerido'
    }),
    edicion: z.string({
        required_error: 'Edición inválida'
    }).optional(),
    categoria: z.string({
        required_error: 'La categoría es requerido'
    }),
    tipoMedio: z.string({
        required_error: 'El tipo de medio es requerido'
    })
});