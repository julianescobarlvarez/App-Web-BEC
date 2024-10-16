import React, { useState } from 'react' // Importa React y el hook useState
import { useForm } from 'react-hook-form' // Importa useForm para manejar el formulario
import { useNavigate } from 'react-router-dom' // Importa useNavigate para redirigir entre rutas
import '../estilos/estilillo.css';

function PagLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm() // Inicializa el formulario
    const navigate = useNavigate() // Permite la navegación entre rutas
    const [authError, setAuthError] = useState('') // Estado para mensajes de error de autenticación

    const onSubmit = (values) => {
        console.log(values) // Imprime los valores del formulario
        // Verifica las credenciales
        if (values.userId === "admin" && values.password === "password") {
            navigate('/dashboard') // Redirige a '/dashboard' si las credenciales son correctas
        } else {
            setAuthError('Credenciales inválidas') // Muestra mensaje de error si las credenciales son incorrectas
        }
    }

    return (
        <div className='registro-container'>
            <h2 className="text-2xl font-bold text-white mb-4">Sistema de Préstamo y Devolución</h2>
            <form onSubmit={handleSubmit(onSubmit)}> {/* Maneja el envío del formulario */}
                <input 
                    type="text" 
                    {...register("userId", {required: "El ID de usuario es requerido"})} // Campo de ID de usuario
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                    placeholder='ID de Usuario'
                />
                {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>} {/* Mensaje de error */}

                <input 
                    type="password" 
                    {...register("password", {
                        required: "La contraseña es requerida", // Campo de contraseña
                        minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                    })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                    placeholder='Contraseña'
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>} {/* Mensaje de error */}

                {authError && <p className="text-red-500 text-xs mt-1">{authError}</p>} {/* Mensaje de error de autenticación */}

                <button className='bg-indigo-600 text-white px-4 py-2 rounded-md my-2 w-full hover:bg-indigo-700'>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}

export default PagLogin // Exporta el componente