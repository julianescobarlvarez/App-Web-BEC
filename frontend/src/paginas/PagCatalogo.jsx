import { useForm } from 'react-hook-form';
import '../estilos/estilillo.css';
import '../estilos/PagCatalogo.css';
import imagenRegistro from '../assets/logo.png';
import iconoLupa from '../assets/icono_lupa.png';

function PagCatalogo(){
    //dd
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data.documento);
    };
    
    return(
        <div className="registro-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <img src={imagenRegistro} alt="Logo de registro" className="logo" />
                    <h1>
                        <span className="titulo-bec">BEC</span>
                        <span className="titulo-biblioteca">Biblioteca Estación Central</span>
                    </h1>
                </div>
            </header>
            <div>
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

/*
function PagCatalogo(){
    const [contador, setContador] = useState(0);

    const incrementar = () => {
        setContador(contador + 1);
    };

    return (
    <div>
        <p>Contador: {contador}</p>
        <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}
*/