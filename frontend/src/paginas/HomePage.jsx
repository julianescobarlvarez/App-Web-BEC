import React from 'react';
import '../estilos/estilillo.css';
import logo from '../assets/logo.png';
import imagenBiblioteca from '../assets/imagen.jpg';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';

import { useNavigate } from 'react-router-dom';

function Homepage() {

  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/login'); // Redirect to login page after logging out
  };

  // Hook para la navegación entre rutas
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* Header con logo y título */}
      <header className="header">
        <img src={logo} alt="Logo de la Biblioteca" className="logo" />
        <h1 className="titulo-header">
          <span className="titulo-bec">BEC</span>
          <span className="titulo-biblioteca">Biblioteca Estación Central</span>
        </h1>
      </header>

      {/* Navegación */}
      <nav className="nav-prestamo">
        <Link to="/" className="nav-link">Acerca de</Link>
        <Link to="/catalogo" className="nav-link">Catálogo</Link>
        <Link to="/prestamo" className="nav-link">Préstamo</Link>
        <Link to="/login" className="nav-link">Iniciar sesión</Link>
        <Link to="/registro" className="nav-link">Registro</Link>
        {isAuthenticated && (
    <button className="nav-link" onClick={handleLogout}>Cerrar sesión</button>
  )}
</nav>

      {/* Sección principal con mensaje y descripción */}
        <h2 className="hero-title">Bienvenid@</h2>
      <section className="hero">
        <p className="hero-description">
          La Biblioteca de Estación Central (BEC) es un destacado centro cultural y educativo en la comuna,
          conocido por su amplia colección de libros y documentos técnicos que atraen a estudiantes de diversos
          niveles educativos. Además, ofrecemos una rica selección de multimedia, incluyendo películas y
          documentales en DVD y Blu-ray, así como registros auditivos variados.
          <br />
          <br />
          Nuestro equipo de bibliotecarios, altamente capacitado, está disponible para responder a todas las
          consultas y maximizar el aprovechamiento de nuestros recursos. La BEC también ha abierto sus puertas a
          la comunidad local, consolidándose como un punto de referencia clave en la comuna.
        </p>
      </section>
    <img src={imagenBiblioteca} alt="Imagen de la biblioteca" className="hero-img" />

      {/* Footer con dirección y horario */}
      <footer className="footer">
        <p>Dirección: Av. Libertador Bernardo O'Higgins 1234, Estación Central, Santiago, Chile. Horario: Lunes a Viernes, 9:00 - 18:00 hrs</p>
      </footer>
    </div>
  );
}

export default Homepage;