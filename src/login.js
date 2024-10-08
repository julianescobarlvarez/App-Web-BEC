// src/Login.js
import React, { useState } from 'react';

const Login = ({ setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Esto es solo una simulación, puedes conectar a una API
        if (username === 'bibliotecario' && password === 'admin') {
            setRole('bibliotecario');
        } else {
            setRole('cliente');
        }

        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;
