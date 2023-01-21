import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './db/connect.js';

import postRoute from './routes/postRoute.js';
import dalleRoute from './routes/dalleRoute.js';

const PORT = 8000

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))


// Connect to MongoDB
connectDB(process.env.MONGO_URI);

//Routes
app.use('/api/posts', postRoute)
app.use('/api/dalles', dalleRoute)


// Start the server
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})