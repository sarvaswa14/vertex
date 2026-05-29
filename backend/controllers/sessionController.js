const Session = require("../models/Session")
const getSessions = async(req,res) =>{
    try{
        const sessions = await Session.find({})
        res.json(sessions)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
const createSession = async (req,res) => {
    try{
        const session = await Session.create({duration: req.body.duration})
        res.json(session)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
module.exports =  { getSessions, createSession}