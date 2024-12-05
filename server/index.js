import express from 'express';
// const mongoose = require('mongoose')
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/connectionDb.js';
import transactionRouter from './route/transactionRoute.js';


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api',transactionRouter)

const PORT = 8085

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
    })
