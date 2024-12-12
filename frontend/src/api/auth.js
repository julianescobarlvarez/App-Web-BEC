import axios from 'axios';

const API = "http://localhost:3000/api";

// Función para registrar un usuario
export const registerRequest = (user) => axios.post(`${API}/registro`, user);

// Función para iniciar sesión
export const loginRequest = (credentials) => axios.post(`${API}/login`, credentials);
