const Session = require("../models/Session")
const getSessions = async(req,res) =>{
    try{
        const sessions = await Session.find({userId: req.user.id})
        res.json(sessions)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const createSession = async (req,res) => {
    try{
        const session = await Session.create({duration: req.body.duration, userId: req.user.id})
        res.json(session)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const deleteSession = async (req, res) => {
  try {
    await Session.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    res.json({ message: 'Session deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports =  { getSessions, createSession,deleteSession}