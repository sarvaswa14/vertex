const Note = require("../models/Note");
const getNotes = async (req, res) => {
    try{
        const notes =  await Note.find({userId : req.user.id});
        res.json(notes);
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const createNote =  async (req,res) => {
     try{
        const note = await Note.create({ title: req.body.title, content: req.body.content ?? '', userId: req.user.id })       
        res.json(note);
     }catch(error){
        res.status(500).json({ message: error.message })
     }
}
const updateNote = async (req,res) =>{
    try{
      const note= await Note.findByIdAndUpdate({_id: req.params.id,userId: req.user.id},req.body,{new : true}); 
      res.json(note)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const deleteNote = async (req,res) => {
    try{
        await Note.findOneAndDelete({_id: req.params.id, userId: req.user.id});
        res.json({message :'Task Deleted'})
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
module.exports = { getNotes, createNote, updateNote, deleteNote }