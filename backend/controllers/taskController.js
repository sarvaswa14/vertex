const Task = require("../models/Task");
const getTasks = async (req, res) => {
    try{
        const tasks =  await Task.find({userId : req.user.id});
        res.json(tasks);
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const createTask =  async (req,res) => {
     try{
        const task =await Task.create({title : req.body.title, priority: req.body.priority ?? 'Medium', category: req.body.category ?? 'General', userId: req.user.id});
        res.json(task);
     }catch(error){
        res.status(500).json({ message: error.message })
     }
}
const updateTask = async (req,res) =>{
    try{
      const task= await Task.findByIdAndUpdate({_id: req.params.id,userId: req.user.id},req.body,{new : true}); 
      res.json(task)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const deleteTask = async (req,res) => {
    try{
        await Task.findOneAndDelete({_id: req.params.id, userId: req.user.id});
        res.json({message :'Task Deleted'})
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
module.exports = { getTasks, createTask, updateTask, deleteTask }