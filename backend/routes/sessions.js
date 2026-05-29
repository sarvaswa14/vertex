const router = require('express').Router()
const{getSessions,createSession}=require("../controllers/sessionController")
router.get('/',getSessions)
router.post('/',createSession)
module.exports = router