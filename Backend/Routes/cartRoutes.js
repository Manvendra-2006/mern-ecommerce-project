import express from 'express'
import { AddCart, DeleteCart, getCart, UpdateCart } from '../controllers/cartController.js'
const cartrouter = express.Router()

cartrouter.post("/add",AddCart)
cartrouter.put("/update",UpdateCart)
cartrouter.delete("/remove",DeleteCart)
cartrouter.get("/:userId",getCart)
export default cartrouter