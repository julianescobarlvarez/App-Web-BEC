import {useForm} from 'react-hook-form'
function pantalla(){}
const PantallaBibliotecario = ({ prestamos }) => {
    const prestamosVencidos = prestamos.filter((prestamo) => {
        const now = new Date();
        const fechaDevolucion = new Date(prestamo.fechaDevolucion + ' ' + prestamo.horaDevolucion);
        return now > fechaDevolucion; // Compara la fecha actual con la de devolución
    });

    return (
        <div>
            <h2>Solicitudes de Préstamo</h2>
            {prestamos.length > 0 ? (// si los prestamos son mayor a 0 muestra los siguientes datos
                <ul>
                    {prestamos.map((prestamo, index) => (
                        <li key={index}>
                            <strong>ID Préstamo:</strong> {prestamo.idPrestamo} <br />
                            <strong>Tipo:</strong> {prestamo.tipoPrestamo} <br />
                            <strong>ID Ejemplar:</strong> {prestamo.idEjemplar} <br />
                            <strong>Fecha Préstamo:</strong> {prestamo.fechaPrestamo} <br />
                            <strong>Hora Préstamo:</strong> {prestamo.horaPrestamo} <br />
                            <strong>Fecha Devolución:</strong> {prestamo.fechaDevolucion} <br />
                            <strong>Hora Devolución:</strong> {prestamo.horaDevolucion}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay solicitudes en este momento.</p>
            )}

            <h2>Préstamos Vencidos</h2>
            {prestamosVencidos.length > 0 ? (
                <ul>
                    {prestamosVencidos.map((prestamo, index) => (
                        <li key={index}>
                            <strong>ID Préstamo:</strong> {prestamo.idPrestamo} <br />
                            <strong>Tipo:</strong> {prestamo.tipoPrestamo} <br />
                            <strong>ID Ejemplar:</strong> {prestamo.idEjemplar} <br />
                            <strong>Fecha Préstamo:</strong> {prestamo.fechaPrestamo} <br />
                            <strong>Hora Préstamo:</strong> {prestamo.horaPrestamo} <br />
                            <strong>Fecha Devolución:</strong> {prestamo.fechaDevolucion} <br />
                            <strong>Hora Devolución:</strong> {prestamo.horaDevolucion}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay préstamos vencidos en este momento.</p>
            )}
        </div>
    );
};

export default PantallaBibliotecario;