import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAcessToken} from '../libs/jwt.js';
export const register = async (req, res) => {
    const {nombres, apellidos, direccion, telefono, email, contraseña, foto} = req.body;
    try{
        const passwordHash = await bcrypt.hash(contraseña, 11)

        const newUser = new User({
            nombres,
            apellidos,
            direccion,
            telefono,
            email,
            contraseña: passwordHash,
            foto
        });

        const userSaved = await newUser.save();

        const token = await createAcessToken({id: userSaved._id})
        res.cookie("token", token);
        res.json({
           id: userSaved._id,
           nombres: userSaved.nombres,
           email: userSaved.email,
           createdAt: userSaved.createdAt,
           updatedAt: userSaved.updatedAt
        });
        
    }   catch (error){
        res.status(500).json({ message: error.message});
    }
}
export const login = async (req, res) => {
    const {email, contraseña} = req.body;
    try{
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({message: "Usuario no encontrado"});
        const isMatch = await bcrypt.compare(contraseña, userFound.contraseña)

        const passwordHash = await bcrypt.hash(contraseña, 11);
        if (!isMatch) return res.status(400).json({message : "Contraseña incorrecta"});


        const token = await createAcessToken({id: userFound._id})
        res.cookie("token", token);
        res.json({
           id: userFound._id,
           nombres: userFound.nombres,
           email: userFound.email,
           createdAt: userFound.createdAt,
           updatedAt: userFound.updatedAt
        });
        
    }   catch (error){
        res.status(500).json({ message: error.message});
    }
}
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}