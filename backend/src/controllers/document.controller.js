 import Document from "../models/document.model.js"
 
 
 export const getDocuments = async (req, res)=> {
    const document = await Document.find({
        user: req.user.id
    });

    res.json(document);

};
 export const createDocument = async (req, res)=> {
      const {title, description, date } = req.body

      console.log(req.user)

      const newDocument= new Document(
      {
        title,
        description,
        date,
        user: req.user.id


      })
      const saveDocument = await newDocument.save();
      res.json(savedDocument);
    };
export const getDocument = async (req, res)=> {;
 const Document =await Document.findById(req.params.id)
 if (!document) return res.status(404).json({message: "document not found"})
 res.json(document)
};
export const UpdateDocument = async (req, res)=> {
        const Document =await Document.findById(req.params.id, req.body)
    if (!document) return res.status(404).json({message: "document not found"})
    res.json(document)
   };

 export const DeleteDocument = async (req, res)=> {
 const Document =await Document.findById(req.params.id)
 if (!document) return res.status(404).json({message: "document not found"});
 return res.sendStatus(204);

};