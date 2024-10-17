import React, { useState } from 'react' // Importa React y el hook useState
import { useForm } from 'react-hook-form' // Importa useForm para manejar el formulario
import { useNavigate } from 'react-router-dom' // Importa useNavigate para redirigir entre rutas
import imagenRegistro from '../assets/logo.png';
import '../estilos/estilillo.css';
import { Link } from 'react-router-dom';
import imagenLogIn from '../assets/login.png';

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
            {/* Encabezado */}
            <header className="header">
                <div className="header-content">
                <img src={imagenRegistro} alt="Logo de registro" className="logo" />
                <h1>
                    <span className="titulo-bec">BEC</span>
                    <span className="titulo-biblioteca">Biblioteca Estación Central</span>
                </h1>
                </div>
            </header>
            {/* Navegación */}
            <nav className="nav-prestamo">
                <Link to="/" className="nav-link">Acerca de</Link>
                <Link to="/catalogo" className="nav-link">Catálogo</Link>
                <Link to="/prestamo" className="nav-link">Préstamo</Link>
                <Link to="/login" className="nav-link">Iniciar sesión</Link>
                <Link to="/registro" className="nav-link">Registro</Link>
            </nav>
            <img src={imagenLogIn} alt="Crear cuenta" className="imagen-login" />
            <form className="form-wrapper"onSubmit={handleSubmit(onSubmit)}> {/* Maneja el envío del formulario */}
                <h2 className="registro-titulo">Inicio de sesión</h2>
                <div className="campo">
                <input 
                    type="text" 
                    {...register("userId", {required: "El ID de usuario es requerido"})} // Campo de ID de usuario
                    className={`input ${errors.userId ? 'input-error' : ''}`}
                    placeholder='ID de Usuario'
                />
                {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>} {/* Mensaje de error */}
                </div>
                <div className="campo">
                <input 
                    type="password" 
                    {...register("password", {
                        required: "La contraseña es requerida", // Campo de contraseña
                        minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                    })}
                    className={`input ${errors.password ? 'input-error' : ''}`}
                    placeholder='Contraseña'
                />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>} {/* Mensaje de error */}

                {authError && <p className="text-red-500 text-xs mt-1">{authError}</p>} {/* Mensaje de error de autenticación */}

                <button className='boton-registrar'>
                    Ingresar
                </button>
            </form>
            {/* Footer con dirección y horario */}
            <footer className="footer">
                <p>Dirección: Av. Libertador Bernardo O'Higgins 1234, Estación Central, Santiago, Chile. Horario: Lunes a Viernes, 9:00 - 18:00 hrs</p>
            </footer>
        </div>
    )
}

export default PagLogin // Exporta el componente