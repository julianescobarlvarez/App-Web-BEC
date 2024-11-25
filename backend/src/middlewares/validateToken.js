import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
    const { token } = req.cookies; // sacar el token de las cookies

    if (!token) {
        return res.status(401).json({ message: "Autorización rechazada" });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET); // Verificar el token
        const user = await User.findById(decoded.id); // Buscar al usuario completo en la base de datos

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        req.user = user; // Guardar el usuario completo en req.user
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
