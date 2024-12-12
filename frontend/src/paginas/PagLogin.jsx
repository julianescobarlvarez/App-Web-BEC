import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexto/AuthContext.jsx';
import imagenRegistro from '../assets/logo.png';
import imagenLogIn from '../assets/login.png';
import '../estilos/estilillo.css';

function PagLogin() {
  // Configuración de react-hook-form para manejar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Hook para la navegación entre rutas
  const navigate = useNavigate();

  // Acceso al contexto de autenticación
  const { signin, isAuthenticated, errors: authErrors } = useAuth();

  // Redirigir al usuario al catálogo si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/catalogo');
    }
  }, [isAuthenticated, navigate]);

//console.log(isAuthenticated)

  // Manejo del envío del formulario
  const onSubmit = async (values) => {
    try {
      // Llama a la función signin del contexto para autenticar al usuario
      console.log(values);
      await signin(values.email, values.contraseña);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  return (
    <div className="registro-container">
      {/* Encabezado con logo y título */}
      <header className="header">
        <div className="header-content">
          <img src={imagenRegistro} alt="Logo de registro" className="logo" />
          <h1>
            <span className="titulo-bec">BEC</span>
            <span className="titulo-biblioteca">Biblioteca Estación Central</span>
          </h1>
        </div>
      </header>

      {/* Barra de navegación */}
      <nav className="nav-prestamo">
        <Link to="/" className="nav-link">Acerca de</Link>
        <Link to="/catalogo" className="nav-link">Catálogo</Link>
        <Link to="/prestamo" className="nav-link">Préstamo</Link>
        <Link to="/login" className="nav-link">Iniciar sesión</Link>
        <Link to="/registro" className="nav-link">Registro</Link>
      </nav>

      {/* Imagen de inicio de sesión */}
      <img src={imagenLogIn} alt="Imagen Login" className="imagen-login" />

      {/* Mensaje de error de inicio de sesión */}
      {authErrors.length > 0 && (
        <div className="error-message">
          {authErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      {/* Formulario de inicio de sesión */}
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="registro-titulo">Inicio de sesión</h2>

        {/* Campo de correo electrónico */}
        <div className="campo">
          <input
            type="email"
            {...register('email', {
              required: 'Campo Oblicatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            className={`input ${errors.email ? 'input-error' : ''}`}
            placeholder="Correo Electrónico*"
          />
          {errors.email && (
            <p className="error-text">{errors.email.message}</p>
          )}
        </div>

        {/* Campo de contraseña */}
        <div className="campo">
          <input
            type="password"
            {...register('contraseña', {
              required: 'Campo obligatorio',
              minLength: {
                value: 5,
                message: 'La contraseña debe tener mínimo 5 caracteres',
              },
            })}
            className={`input ${errors.contraseña ? 'input-error' : ''}`}
            placeholder="Contraseña*"
          />
          {errors.contraseña && (
            <p className="error-text">{errors.contraseña.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button className="boton-registrar" type="submit">
          Ingresar
        </button>

        {/* Enlace para recuperar contraseña */}
        <div className="mt-4 text-center">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Enlace para registrarse */}
        <div className="mt-4 text-center">
          <p>¿Aún no tienes cuenta? <Link to="/registro" className="text-blue-500 hover:underline">Regístrate aquí</Link></p>
        </div>
      </form>

      {/* Pie de página con información de contacto */}
      <footer className="footer">
        <p>
          Dirección: Av. Libertador Bernardo O'Higgins 1234, Estación Central,
          Santiago, Chile. Horario: Lunes a Viernes, 9:00 - 18:00 hrs
        </p>
      </footer>
    </div>
  );
}

export default PagLogin;
