import {z} from 'zod';

export const registerSchema = z.object({
    nombres: z.string({
        required_error: 'Los nombres son requeridos'
    }),
    apellidos: z.string({
        required_error: 'Los apellidos son requeridos'
    }),
    direccion: z.string({
        required_error: 'La dirección es obligatoria'
    }),
    telefono: z.number({
        required_error: 'El teléfono es obligatorio'
    }),
    email: z.string({
        required_error: 'El email es obligatorio'
    }).email({
        message: 'Email inválido'
    }),
    contraseña: z.string({
        required_error: 'La contraseña es obligatoria'
    }).min(5,{
        message: 'La contraseña debe tener mínimo 5 caracteres'
    }),
    foto: z.string().optional()
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Campo obligatorio'
    }).email({
        message: 'Email inválido'
    }),
    contraseña: z.string({
        required_error: 'Campo obligatorio'
    }).min(5,{
        message: 'La contraseña debe tener mínimo 5 caracteres'
    })
})