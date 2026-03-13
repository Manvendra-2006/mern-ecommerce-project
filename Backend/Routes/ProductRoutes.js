import express from 'express'
import { createProduct } from '../controllers/productController.js'
import { getProducts } from '../controllers/productController.js'
import { updateProducts } from '../controllers/productController.js'
import { deleteProducts } from '../controllers/productController.js'
const productrouter = express.Router()
productrouter.post("/add",createProduct)
productrouter.put("/update/:id",updateProducts)
productrouter.delete("/delete/:id",deleteProducts)
productrouter.get("/",getProducts)
export default productrouter
