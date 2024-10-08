// src/App.js
import React, { useState, useEffect } from 'react';
import SolicitudPrestamoForm from './solicitudprestamo';
import PantallaBibliotecario from './pantallabibli';
import './app.css';
import Login from './login';

const App = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [role, setRole] = useState(null);

    // Recuperar préstamos al cargar la aplicación
    useEffect(() => {
        const storedPrestamos = JSON.parse(localStorage.getItem('prestamos'));
        if (storedPrestamos) {
            setPrestamos(storedPrestamos);
        }
    }, []);

    return (
        <div>
            <h1>Gestión de Préstamos de Biblioteca</h1>
            {!role && <Login setRole={setRole} />}
            
            {role === 'cliente' && <SolicitudPrestamoForm setPrestamos={setPrestamos} />}
            {role === 'bibliotecario' && <PantallaBibliotecario prestamos={prestamos} />}
        </div>
    );
};

export default App;
