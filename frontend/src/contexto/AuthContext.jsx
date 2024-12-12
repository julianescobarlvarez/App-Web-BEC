import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, verifyTokenRequest, loginRequest } from '../api/auth';

import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error(error.response);
            setErrors(error.response?.data || ['Error durante el registro']);
        }
    };



    // Método para iniciar sesión
    const signin = async (email, contraseña) => {
        try {
            const res = await loginRequest({ email, contraseña });
            console.log('Inicio de sesión exitoso:', res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.log(error.response.data)
            console.error('Error al iniciar sesión:', error.response);
            setErrors(error.response.data);
        }
    };

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(false);
                setLoading(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, [])

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    })

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                loading,
                user,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
