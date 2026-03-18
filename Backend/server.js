import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './Routes/authRoutes.js'
import productrouter from './Routes/ProductRoutes.js'
import cartrouter from './Routes/cartRoutes.js'
import addressrouter from './Routes/addressRoutes.js'
import orderRouter from './Routes/orderRoutes.js'
dotenv.config() // dotenv is a npm pacakge and dotenv.config() is a function which loads .env file variable in node.js application
connectDB()
const app = express()
app.use(cors())
app.use(express.json()) // This middleware converts json data into javaScript object
app.use('/api/auth',router) // It connects router and /api/auth
app.use('/api/products',productrouter)
app.use('/api/cart',cartrouter)
app.use('/api/address',addressrouter)
app.use('/api/order',orderRouter)
app.listen(8900)