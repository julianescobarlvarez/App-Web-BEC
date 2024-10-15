import { useForm } from 'react-hook-form';
import '../estilos/estilillo.css';
import imagenRegistro from '../assets/logo.png';
import imagenCrearCuenta from '../assets/crear_cuenta.png'; // Importa la imagen

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

      {/* Imagen entre header y texto */}
      <img src={imagenCrearCuenta} alt="Crear cuenta" className="imagen-crear-cuenta" />

      {/* Texto decorativo */}
      <p className="descripcion">
        Crea una cuenta para poder solicitar préstamos de nuestra amplia colección multimedia
      </p>

      <div className="form-wrapper">
        <h2 className="registro-titulo">Registro de usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo Nombre */}
          <div className="campo">
            <input
              type="text"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              className={`input ${errors.nombre ? 'input-error' : ''}`}
              placeholder="Nombre"
            />
            {errors.nombre && (
              <p className="mensaje-error">{errors.nombre.message}</p>
            )}
          </div>

          {/* Campo Email */}
          <div className="campo">
            <input
              type="email"
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Ingrese un email válido',
                },
              })}
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="Correo electrónico"
            />
            {errors.email && (
              <p className="mensaje-error">{errors.email.message}</p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="campo">
            <input
              type="password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="mensaje-error">{errors.password.message}</p>
            )}
          </div>

          {/* Botón Registrar */}
          <button type="submit" className="boton-registrar">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PagRegistro;