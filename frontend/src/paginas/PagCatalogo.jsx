import { useForm } from 'react-hook-form';
import '../estilos/estilillo.css';
import '../estilos/PagCatalogo.css';
import imagenRegistro from '../assets/logo.png';
import iconoLupa from '../assets/icono_lupa.png';
import { Link } from 'react-router-dom';

function PagCatalogo(){
    //dd
    const {register, handleSubmit} = useForm();

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

            <div className='form-catalogo'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='search-box'>
                        {/*Campo de texto para el nombre del documento */}
                        <input
                            type="text"
                            {...register("documento", { required: true })}
                            placeholder='Buscar recurso por nombre o autor del documento'
                        />
                        <button type="submit" className="botonbuscar">
                            <img src={iconoLupa} width="20px" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PagCatalogo