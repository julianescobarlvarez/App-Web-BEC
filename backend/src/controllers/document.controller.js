 import Document from "../models/document.model.js"
 
 
 export const getDocuments = async (req, res)=> {
    const documents = await Document.find();

    res.json(documents);

};
 export const createDocument = async (req, res)=> {
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
export const getDocument = async (req, res)=> {
  const document = await Document.findOne({identificador: req.params.id});
  if (!document) return res.status(404).json({message: "No se pudo encontrar el documento"});
  res.json(document);
};
export const UpdateDocument = async (req, res)=> {
  const document = await Document.findOneAndUpdate({identificador: req.params.id}, req.body, {
    new: true
  });
  if (!document) return res.status(404).json({message: "No se pudo encontrar el documento"});
  res.json(document);
};

 export const DeleteDocument = async (req, res)=> {
  const document = await Document.findOneAndDelete({identificador: req.params.id});
  if (!document) return res.status(404).json({message: "No se pudo encontrar el documento"});
  return res.sendStatus(204);
};