import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import imagenRegistro from '../assets/logo.png';
import imagenLogIn from '../assets/login.png';
import '../styles/styles.css';

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
  const { signin, isAuthenticated, loginError } = useAuth();

  // Redirigir al usuario al dashboard si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Manejo del envío del formulario
  const onSubmit = async (values) => {
    try {
      // Llama a la función signin del contexto para autenticar al usuario
      await signin(values.email, values.password);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  return (
    <div className="login-container">
      {/* Encabezado con logo y título */}
      <header className="header">
        <div className="header-content">
          <img src={imagenRegistro} alt="Logo de registro" className="logo" />
          <h1>
            <span className="title-bec">BEC</span>
            <span className="title-library">Biblioteca Estación Central</span>
          </h1>
        </div>
      </header>

      {/* Barra de navegación */}
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Acerca de</Link>
        <Link to="/catalog" className="nav-link">Catálogo</Link>
        <Link to="/loan" className="nav-link">Préstamo</Link>
        <Link to="/login" className="nav-link">Iniciar sesión</Link>
        <Link to="/register" className="nav-link">Registro</Link>
      </nav>

      {/* Imagen de inicio de sesión */}
      <img src={imagenLogIn} alt="Imagen Login" className="login-image" />

      {/* Mensaje de error de inicio de sesión */}
      {loginError && (
        <div className="error-message">{loginError}</div>
      )}

      {/* Formulario de inicio de sesión */}
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-title">Inicio de sesión</h2>

        {/* Campo de correo electrónico */}
        <div className="field">
          <input
            type="email"
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
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
        <div className="field">
          <input
            type="password"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
            className={`input ${errors.password ? 'input-error' : ''}`}
            placeholder="Contraseña*"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button className="register-button" type="submit">
          Ingresar
        </button>

        {/* Enlace para recuperar contraseña */}
        <div className="mt-4 text-center">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
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
