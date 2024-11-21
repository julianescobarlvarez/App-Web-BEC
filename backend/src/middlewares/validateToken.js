import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies; // sacar el token de las cookies

    if (!token) {
        return res.status(401).json({ message: "Autorización rechazada" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        req.user = user; // guardar los datos del usuario
        next();
    });
};
