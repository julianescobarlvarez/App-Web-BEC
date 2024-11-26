import mongoose from "mongoose";

//Estructura del modelo de un pedido
const requestSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  documentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Documento",
    required: true,
  },
  fechaSolicitud: {
    type: Date,
    default: Date.now,
  },
  fechaVencimiento: {
    type: Date,
    required: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado", "devuelto"],
    default: "pendiente",
  },
});

export default mongoose.model("Request", requestSchema);