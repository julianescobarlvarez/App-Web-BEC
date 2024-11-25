export const isAdmin = (req, res, next) => {
    if (req.user.rol !== "admin") {
        console.log(req.user.email)
        return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
    }
    next();
};