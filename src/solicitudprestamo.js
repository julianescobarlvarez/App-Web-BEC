// src/SolicitudPrestamoForm.js
import React, { useState, useEffect } from 'react';

const Solicitudprestamo = ({ setPrestamos }) => {
    const [documento, setDocumento] = useState('');
    const [tipo, setTipo] = useState('libro');

    const tiposDeDocumento = {
        libro: 14, // 14 días
        revista: 7, // 7 días
        articuloDigital: 1 // 1 día
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fechaDevolucion = new Date();
        fechaDevolucion.setDate(fechaDevolucion.getDate() + tiposDeDocumento[tipo]);

        const nuevoPrestamo = {
            idPrestamo: Date.now(), // Un ID único
            tipoPrestamo: tipo,
            idEjemplar: documento,
            fechaPrestamo: new Date().toISOString().split('T')[0],
            horaPrestamo: new Date().toLocaleTimeString(),
            fechaDevolucion: fechaDevolucion.toISOString().split('T')[0],
            horaDevolucion: fechaDevolucion.toLocaleTimeString(),
        };

        // Guardar en el estado
        setPrestamos((prevPrestamos) => {
            const nuevosPrestamos = [...prevPrestamos, nuevoPrestamo];
            // Guardar en localStorage
            localStorage.setItem('prestamos', JSON.stringify(nuevosPrestamos));
            return nuevosPrestamos;
        });

        setDocumento('');
        setTipo('libro');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre del documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
            />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="libro">Libro</option>
                <option value="revista">Revista</option>
                <option value="articuloDigital">Artículo Digital</option>
            </select>
            <button type="submit">Agregar Préstamo</button>
        </form>
    );
};

export default Solicitudprestamo;
