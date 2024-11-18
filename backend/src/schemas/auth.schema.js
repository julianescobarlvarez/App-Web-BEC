import {z} from 'zod';

export const registerSchema = z.object({
    nombres: z.string({
        required_error: 'Campo obligatorio'
    }),
    apellidos: z.string({
        required_error: 'Campo obligatorio'
    }),
    direccion: z.string({
        required_error: 'Campo obligatorio'
    }),
    telefono: z.number({
        required_error: 'Campo obligatorio'
    }),
    email: z.string({
        required_error: 'Campo obligatorio'
    }).email({
        message: 'Email inválido'
    }),
    contraseña: z.string({
        required_error: 'Campo obligatorio'
    }).min(5,{
        message: 'La contraseña debe tener mínimo 5 caracteres'
    }),
    foto
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