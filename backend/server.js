const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks')
const sessionRoutes = require('./routes/sessions')
const noteRoutes = require('./routes/notes')
const authRoutes = require('./routes/auth')
require('dotenv').config();
app.use(cors({
  origin: ['https://focusos-mern.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('Connected to MongoDB')).catch((err)=> console.log(err))
app.use('/api/tasks',taskRoutes)
app.use('/api/sessions',sessionRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/auth',authRoutes)
app.listen(port,()=> {
    console.log(`app listening on port ${port}`)});


