import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './Routes/authRoutes.js'
dotenv.config() // dotenv is a npm pacakge and dotenv.config() is a function which loads .env file variable in node.js application
connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',router) // It connects router and /api/auth

app.listen(8900)