import { useForm } from 'react-hook-form';
import '../estilos/estilillo.css';
import imagenRegistro from '../assets/logo.png';
import { Link } from 'react-router-dom';
import imagenPrestamo from '../assets/prestamo.png';

function SolicitudPrestamo({ setPrestamos }) {
    // Usa useForm para manejar el registro y el manejo del formulario
    const { register, handleSubmit, formState: { errors }} = useForm();

    // Función que se ejecuta cuando el formulario se manda
    const onSubmit = (data) => {
        const tiposDeDocumento = {
            libro: 14, // 14 días
            revista: 7, // 7 días
            articuloDigital: 1 // 1 día
        };

        const fechaDevolucion = new Date();
        fechaDevolucion.setDate(fechaDevolucion.getDate() + tiposDeDocumento[data.tipo]);

        const nuevoPrestamo = {
            idPrestamo: Date.now(), // Un ID único basado en la fecha 
            tipoPrestamo: data.tipo, // Tipo de documento seleccionado
            idEjemplar: data.documento, // El nombre o ID del documento ingresado
            fechaPrestamo: new Date().toISOString().split('T')[0], // Fecha de préstamo 
            horaPrestamo: new Date().toLocaleTimeString(), // Hora del préstamo 
            fechaDevolucion: fechaDevolucion.toISOString().split('T')[0], // Fecha de devolución 
            horaDevolucion: fechaDevolucion.toLocaleTimeString() // Hora de devolución 
        };

        // Actualiza el estado de prestamos
        setPrestamos((prevPrestamos) => {
            const nuevosPrestamos = [...prevPrestamos, nuevoPrestamo];
            // Almacena los préstamos en localStorage para que no borre al actualizar
            localStorage.setItem('prestamos', JSON.stringify(nuevosPrestamos));
            return nuevosPrestamos;
        });
    };

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
            <img src={imagenPrestamo} alt="Imagen Préstamo" className="imagen-prestamo" />
            <form className="form-wrapper"onSubmit={handleSubmit(onSubmit)}>
                <h2 className="registro-titulo">Solicitudes</h2>
                {/*Campo de texto para el nombre del documento */}
                <div className="campo">
                    <input
                        type="text"
                        {...register("documento", { required: true })} // Registra el campo "documento"
                        className={`input ${errors.documento ? 'input-error' : ''}`}
                        placeholder='Nombre del documento*'
                    />
                </div>
                <div className="campo">
                {/* Menú desplegable para seleccionar el tipo de documento */}
                    <select
                        {...register("tipo", { required: true })} // Registra el campo "tipo"
                        className={`input ${errors.tipo ? 'input-error' : ''}`}
                    >
                        <option value="libro">Libro</option>
                        <option value="revista">Revista</option>{/* estas son las opciones que se permiten  */}
                        <option value="articuloDigital">Artículo Digital</option>
                    </select>
                </div>

                {/* Botón para enviar el formulario */}
                <button type="submit" className='boton-registrar'>
                    Pedir Préstamo
                </button>
            </form>
            {/* Footer con dirección y horario */}
            <footer className="footer">
                <p>Dirección: Av. Libertador Bernardo O'Higgins 1234, Estación Central, Santiago, Chile. Horario: Lunes a Viernes, 9:00 - 18:00 hrs</p>
            </footer>
        </div>
    );
}

export default SolicitudPrestamo;
