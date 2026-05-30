const router = require('express').Router()
const{getSessions,createSession,deleteSession}=require("../controllers/sessionController")
const auth = require('../middleware/auth')
router.get('/',auth,getSessions)
router.post('/',auth,createSession)
router.delete('/:id', auth, deleteSession)
module.exports = router