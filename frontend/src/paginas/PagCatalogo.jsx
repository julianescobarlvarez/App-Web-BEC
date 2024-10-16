import { useForm } from 'react-hook-form';
import { useState } from 'react'
import '../estilos/estilillo.css';
import '../estilos/PagCatalogo.css';
import imagenRegistro from '../assets/logo.png';
import iconoLupa from '../assets/icono_lupa.png';
import imagenCatalogo from '../assets/catalogo.png';
import { Link } from 'react-router-dom';

function PagCatalogo(){
    //dd
    const {register, handleSubmit} = useForm();
    const [isVisible, setIsVisible] = useState(true);

    const toggleDiv = () => {
        setIsVisible(!isVisible);
      };

    const onSubmit = (data) => {
        console.log(data.documento);
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
                        {/*Campo de texto para el nombre del documento */}
                        <input
                            type="text"
                            {...register("documento", { required: true })}
                            placeholder='Buscar recurso por nombre o autor del documento'
                            autoComplete='off'
                        />
                        <button type="submit" className='boton-lupa'>
                            <img src={iconoLupa} width="20px" />
                        </button>
                    </div>
                    <div className='filtro-busqueda'>
                        <button type="submit" onClick={toggleDiv}>
                            Filtro avanzado
                        </button>
                    </div>
                    <div className='filtro-oculto' style={{ display: isVisible ? 'block' : 'none' }}>
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
                        <p>Idioma</p>
                        <select {...register('idiomaSeleccionado')} defaultValue="">
                            <option value="">Cualquier idioma</option>
                            <option value="español">Español</option>
                            <option value="ingles">Ingles</option>
                        </select>
                        <p>Fecha de publicación</p>
                        <input
                            type="date"
                            {...register('selectedDate')}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PagCatalogo