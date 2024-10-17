import { useForm } from 'react-hook-form';
import '../estilos/estilillo.css';
import imagenRegistro from '../assets/logo.png';
import imagenCrearCuenta from '../assets/crear_cuenta.png';
import { Link } from 'react-router-dom';

function PagRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
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
      <nav className="nav_registro">
        <Link to="/" className="nav-link">Acerca de</Link>
        <Link to="/catalogo" className="nav-link">Catálogo</Link>
        <Link to="/prestamo" className="nav-link">Préstamo</Link>
        <Link to="/login" className="nav-link">Iniciar sesión</Link>
        <Link to="/registro" className="nav-link">Registro</Link>
      </nav>

      {/* Imagen entre header y texto */}
      <img src={imagenCrearCuenta} alt="Crear cuenta" className="imagen-crear-cuenta" />

      {/* Texto decorativo */}
      <p className="descripcion">
        Crea una cuenta para poder solicitar préstamos de nuestra amplia colección multimedia
      </p>

      <div className="form-wrapper">
        <h2 className="registro-titulo">Registro de usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo Nombres */}
          <div className="campo">
            <input
              type="text"
              {...register('nombres', { required: 'Los nombres son obligatorios' })}
              className={`input ${errors.nombres ? 'input-error' : ''}`}
              placeholder="Nombre(s)*"
            />
            {errors.nombres && (
              <p className="mensaje-error">{errors.nombres.message}</p>
            )}
          </div>

          {/* Campo Apellidos */}
          <div className="campo">
            <input
              type="text"
              {...register('apellidos', { required: 'Los apellidos son obligatorios' })}
              className={`input ${errors.apellidos ? 'input-error' : ''}`}
              placeholder="Apellidos*"
            />
            {errors.apellidos && (
              <p className="mensaje-error">{errors.apellidos.message}</p>
            )}
          </div>

          {/* Campo RUT */}
          <div className="campo">
            <input
              type="text"
              {...register('rut', { required: 'El RUT es obligatorio' })}
              className={`input ${errors.rut ? 'input-error' : ''}`}
              placeholder="RUT*"
            />
            {errors.rut && (
              <p className="mensaje-error">{errors.rut.message}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="campo">
            <input
              type="tel"
              {...register('telefono', { required: 'El teléfono es obligatorio' })}
              className={`input ${errors.telefono ? 'input-error' : ''}`}
              placeholder="Teléfono*"
            />
            {errors.telefono && (
              <p className="mensaje-error">{errors.telefono.message}</p>
            )}
          </div>

          {/* Campo Dirección */}
          <div className="campo">
            <input
              type="text"
              {...register('direccion', { required: 'La dirección es obligatoria' })}
              className={`input ${errors.direccion ? 'input-error' : ''}`}
              placeholder="Dirección*"
            />
            {errors.direccion && (
              <p className="mensaje-error">{errors.direccion.message}</p>
            )}
          </div>

          {/* Subir Foto de Perfil */}
          <div className="campo">
            <label htmlFor="fotoPerfil" className="label-foto-perfil">Foto de perfil</label>
            <input
              type="file"
              id="fotoPerfil"
              {...register('fotoPerfil')}
              className="input-file"
              accept="image/*"
            />
          </div>

          {/* Botón Registrar */}
          <button type="submit" className="boton-registrar">
            Registrar
          </button>
        </form>
      </div>
        {/* Footer con dirección y horario */}
        <footer className="footer-registro">
          <p>Dirección: Av. Libertador Bernardo O'Higgins 1234, Estación Central, Santiago, Chile. Horario: Lunes a Viernes, 9:00 - 18:00 hrs</p>
        </footer>
    </div>
  );
}

export default PagRegistro;