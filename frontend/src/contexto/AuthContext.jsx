import { createContext, useState, useContext } from 'react'; 
import { registerRequest, loginRequest } from '../api/auth'; // Asegúrate de que loginRequest esté importado correctamente

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

    // Método para registrar usuarios
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
    const signin = async (email, password) => {
        try {
            const res = await loginRequest({ email, password });
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

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin, 
                user,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
