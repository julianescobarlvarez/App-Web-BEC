import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    identificador: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        enum: ['libro', 'documentoTecnico', 'pelicula', 'documental', 'audio'],
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: false
    },
    año: {
        type: Number,
        required: true
    },
    edicion: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    tipoMedio: {
        type: String,
        enum: ['físico', 'digital'],
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('Documento', documentSchema);
