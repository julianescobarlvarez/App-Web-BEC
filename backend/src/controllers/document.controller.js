import Document from "../models/document.model.js"

//Esta función toma los atributos del modelo del documento para crear una instancia,
//comunicarse con la base de datos en MongoDB y guardar el documento
export const createDocument = async (req, res) => {
  const {
    identificador,
    tipo,
    titulo,
    autor,
    editorial,
    año,
    edicion,
    categoria,
    tipoMedio } = req.body;

  const newDocument = new Document(
    {
      identificador,
      tipo,
      titulo,
      autor,
      editorial,
      año,
      edicion,
      categoria,
      tipoMedio
    })
  const savedDocument = await newDocument.save();
  res.json(savedDocument);
};

//Para consultar todos los documentos registrados
export const getDocuments = async (req, res) => {
  const documents = await Document.find();

  res.json(documents);

};

//Para consultar un documento por identificador
export const getDocument = async (req, res) => {
  const document = await Document.findOne({ identificador: req.params.id });
  if (!document) return res.status(404).json({ message: "No se pudo encontrar el documento" });
  res.json(document);
};

//Para consultar documentos por nombre
export const getDocumentByName = async (req, res) => {
  const document = await Document.find({ titulo: req.params.nombre });
  if (!document) return res.status(404).json({ message: "No se pudo encontrar el documento" });
  res.json(document);
};

//Para consultar documentos por autor
export const getDocumentByAuthor = async (req, res) => {
  const document = await Document.find({ autor: req.params.autor });
  if (!document) return res.status(404).json({ message: "No se pudo encontrar el documento" });
  res.json(document);
};

//Para consultar documentos por categoría
export const getDocumentByCategory = async (req, res) => {
  const document = await Document.find({ categoria: req.params.categoria });
  if (!document) return res.status(404).json({ message: "No se pudo encontrar el documento" });
  res.json(document);
};

//Para actualizar la información de un documento ya registrado
export const UpdateDocument = async (req, res) => {
  const document = await Document.findOneAndUpdate({ identificador: req.params.id }, req.body, {
    new: true
  });
  if (!document) return res.status(404).json({ message: "No se pudo encontrar el documento" });
  res.json(document);
};

//Para eliminar un documento ya registrado
export const DeleteDocument = async (req, res) => {
  const document = await Document.findOneAndDelete({ identificador: req.params.id });
  if (!document) return res.status(404).json({ message: "No se pudo encontrar el documento" });
  return res.sendStatus(204);
};