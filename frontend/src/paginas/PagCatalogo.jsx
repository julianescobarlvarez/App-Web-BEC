import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import '../estilos/estilillo.css';
import '../estilos/PagCatalogo.css';
import imagenRegistro from '../assets/logo.png';
import iconoLupa from '../assets/icono_lupa.png';
import imagenCatalogo from '../assets/catalogo.png';

function PagCatalogo(){
    //Funciones del UseForm y UseState
    const {register, handleSubmit, reset} = useForm();//estado del formulario
    const [esVisible, setEsVisible] = useState(false);//estado de visibilidad del filtro

    //Función para la visibilidad del filtro
    const alternarDiv = () => {
        setEsVisible(prev => {
            // Si se cierra el filtro, se restablece el valor por defecto del select
            if (prev) {
                reset({ 
                    recursoSeleccionado: '', 
                    idiomaSeleccionado:'', 
                    fechaPublicacionSeleccionada: ''
                    });
            }
            return !prev;
          });
    };
 
    //Función para captar los datos ingresados por el usuario y utilizarlos posteriormente
    const onSubmit = (data) => {
        console.log(data);//Los datos ingresados se visualizan por consola
    };
    
    return(
        <div className="registro-container">
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
            <nav className="nav-catalogo">
                <Link to="/" className="nav-link">Acerca de</Link>
                <Link to="/catalogo" className="nav-link">Catálogo</Link>
                <Link to="/prestamo" className="nav-link">Préstamo</Link>
                <Link to="/login" className="nav-link">Iniciar sesión</Link>
                <Link to="/registro" className="nav-link">Registro</Link>
            </nav>
            {/* Imagencilla */}
            <img src={imagenCatalogo} alt="imagen catalogo" className="imagen-principal-catalogo"/>
            <div className='form-catalogo'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='search-box'>
                        {/*Campo de texto para el nombre o autor del documento */}
                        <input
                            type="text"
                            {...register("nombreOAutor", { required: true })}
                            placeholder='Buscar recurso por nombre o autor del documento'
                            autoComplete='off'
                        />
                        {/*Boton con imagen de lupa para ingresar los datos actuales*/}
                        <button type="submit" className='boton-lupa'>
                            <img src={iconoLupa} width="20px" />
                        </button>
                    </div>
                    <div className='filtro-busqueda'>
                        {/*Boton para mostrar y ocultar el filtro*/}
                        <button type="button" onClick={alternarDiv}>
                            Filtro {esVisible ? 'simple' : 'avanzado'}
                        </button>
                    </div>
                    {/*Filtro activado con criterios de búsqueda*/}
                    <div className={`filtro-oculto ${esVisible ? 'show' : 'hide'}`}>
                        {/*Lista desplegable para elegir criterio por categoría*/}
                        <p>Tipo de recurso: </p>
                        <select {...register('recursoSeleccionado')} defaultValue="">
                            <option value="">Todos los recursos</option>
                            <option value="articulo">Artículos</option>
                            <option value="documento">Documentos técnicos</option>
                            <option value="documental">Documentales</option>
                            <option value="libro">Libros</option>
                            <option value="relato">Relatos</option>
                            <option value="audio">Recursos de audio</option>
                        </select>
                        {/*Lista desplegable para elegir criterio por idioma*/}
                        <p>Idioma</p>
                        <select {...register('idiomaSeleccionado')} defaultValue="">
                            <option value="">Cualquier idioma</option>
                            <option value="español">Español</option>
                            <option value="ingles">Ingles</option>
                        </select>
                        {/*Fecha para elegir criterio por fecha de publicación*/}
                        <p>Fecha de publicación</p>
                        <input
                            type="date"
                            {...register('fechaPublicacionSeleccionada')} // Aquí puedes agregar validaciones si lo deseas
                        />
                        {/*Boton para aplicar los criterios del filtro*/}
                        <div className='aplicar-filtro'>
                            <button type="submit">
                                Aplicar filtro 
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='contenedor-parrafos-catalogo'>
                <div className='parrafos'>
                    {/*Div donde está un parrafo con una bienvenida al catálogo*/}
                    <h2 className="catalogo-title">
                        Bienvenido al Catálogo
                    </h2>
                    <p>
                        En esta sección encontrará todos los documentos en posesión de la Biblioteca de 
                        Estación Central de Chile. A través de su buscador principal, se puede acceder a la 
                        totalidad de la colección bibliográfica virtual disponible, que incluyen libros, revistas, 
                        documentos técnicos, artículos, etc. Utilice el sistema de búsqueda avanzada para combinar 
                        diversos criterios para precisar su consulta. Si posee una cuenta de usuario, también 
                        puede solicitar material, lo que le permitirá acceder a contenido digital desde la 
                        comodidad de su hogar.
                    </p>
                </div>
                <div className='parrafos2'>
                    {/*Div donde se muestran diversos programas disponibles de la biblioteca*/}
                    <h2 className="catalogo-title">
                        Programas y Proyectos
                    </h2>
                    <ul>
                        <li>Aula Virtual</li>
                        <li>Contenidos Locales</li>
                        <li>Jóvenes Programadores</li>
                        <li>Portal Estudios</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PagCatalogo