import express from 'express'
import { saveAddress } from '../controllers/addressController.js'
import { getAddressByUserId } from '../controllers/addressController.js'
const addressrouter = express.Router()
addressrouter.post("/saveAddress",saveAddress)
addressrouter.get("/:userId",getAddressByUserId)
export default addressrouter;