import { useForm } from 'react-hook-form'; 

function SolicitudPrestamo({ setPrestamos }) {
    // Usa useForm para manejar el registro y el manejo del formulario
    const { register, handleSubmit } = useForm();

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
        <div className='bg-slate-900 max-w-md p-10 rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*Campo de texto para el nombre del documento */}
                <input
                    type="text"
                    {...register("documento", { required: true })} // Registra el campo "documento"
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Nombre del documento'
                />

                {/* Menú desplegable para seleccionar el tipo de documento */}
                <select
                    {...register("tipo", { required: true })} // Registra el campo "tipo"
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                >
                    <option value="libro">Libro</option>
                    <option value="revista">Revista</option>{/* estas son las opciones que se permiten  */}
                    <option value="articuloDigital">Artículo Digital</option>
                </select>

                {/* Botón para enviar el formulario */}
                <button type="submit" className='text-white'>
                    Agregar Préstamo
                </button>
            </form>
        </div>
    );
}

export default SolicitudPrestamo;
