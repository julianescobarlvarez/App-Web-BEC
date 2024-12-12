import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAcessToken } from '../libs/jwt.js';
import userModel from '../models/user.model.js';

import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../config.js';

//Función para hacer el registro de usuarios
export const register = async (req, res) => {
    const { nombres, apellidos, direccion, rut, telefono, email, contraseña, foto } = req.body;
    try {

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["El correo ya está en uso"]);

        const passwordHash = await bcrypt.hash(contraseña, 11)

        const newUser = new User({
            nombres,
            apellidos,
            direccion,
            rut,
            telefono,
            email,
            contraseña: passwordHash,
            foto: req.file ? `/uploads/${req.file.filename}` : null, // Ruta de la foto
        });

        const userSaved = await newUser.save();

        const token = await createAcessToken({ id: userSaved._id })

        res.cookie("token", token);

        res.json({
            id: userSaved._id,
            nombres: userSaved.nombres,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Función para hacer el logueo de usuarios
export const login = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
        const isMatch = await bcrypt.compare(contraseña, userFound.contraseña)

        const passwordHash = await bcrypt.hash(contraseña, 11);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });


        const token = await createAcessToken({ id: userFound._id })
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            nombres: userFound.nombres,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}
//Función para solicitar un usuario por identificador. Sólo funciona al estar logeado
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
    return res.json({
        id: userFound._id,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}
//Función para actualizar los datos de un usuario. Sólo funciona al estar logeado
export const updateUser = async (req, res) => {
    const { nombres, apellidos, direccion, rut, telefono, foto } = req.body;

    try {
        const userUpdated = await User.findByIdAndUpdate(
            req.user.id,
            {
                nombres,
                apellidos,
                direccion,
                rut,
                telefono,
                foto,
            },
            { new: true }
        );

        if (!userUpdated) return res.status(404).json({ message: "Usuario no encontrado" });

        return res.json({
            id: userUpdated._id,
            nombres: userUpdated.nombres,
            apellidos: userUpdated.apellidos,
            direccion: userUpdated.direccion,
            rut: userUpdated.rut,
            telefono: userUpdated.telefono,
            foto: userUpdated.foto,
            updatedAt: userUpdated.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Función para actualizar el rol de un usuario. Sólo para administradores.
export const updateUserRole = async (req, res) => {
    const { id, rol } = req.body;

    if (!["user", "admin"].includes(rol)) {
        return res.status(400).json({ message: "Rol inválido." });
    }

    try {
        const userUpdated = await User.findByIdAndUpdate(
            id,
            { rol },
            { new: true }
        );

        if (!userUpdated) return res.status(404).json({ message: "Usuario no encontrado." });

        return res.json({
            id: userUpdated._id,
            nombres: userUpdated.nombres,
            role: userUpdated.role,
            updatedAt: userUpdated.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Función para eliminar un usuario del sistema. Sólo para administradores.
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userFound = await User.findById(id);
        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

        await User.findByIdAndDelete(id);

        return res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(400).json({ message: 'No autorizado'});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado'});

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No autorizado'});

        return res.json({
            id: userFound._id,
            nombres: userFound.nombres,
            email: userFound.email
        })
    })
}
