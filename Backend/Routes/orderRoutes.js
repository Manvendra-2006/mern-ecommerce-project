import express from 'express'
import { placeorder } from '../controllers/orderController.js'
const orderRouter = express.Router()
orderRouter.post("/order-placed",placeorder)
export default orderRouter