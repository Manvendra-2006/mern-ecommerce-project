import productData from "../models/product.js";
export const createProduct = async (req,resp) =>{
    try{
        const product = await productData.create(req.body);
        resp.json({
            message : "Product Created Successfully",
            product,
        })
    }
    catch(error){
        resp.status(500).json({message:"Server error",error})
    }
}
export const getProducts = async (req,resp) =>{
    try{
        const products = await productData.find().sort({createdAt : -1})
        resp.json(products)
    }
    catch(error){
        resp.status(500).json({message:"Server error",error})
    }
}
export const updateProducts = async (req,resp) =>{
    try{
        const updated = await productData.findByIdAndUpdate(req.params.id,req.body,{returnDocument:"after"})
        resp.json({
            message:"Product updated successfully",
            updated
        })
    }
    catch(error){
        resp.status(500).json({message:"Serever error",error})
    }
}
export const deleteProducts = async (req,resp) =>{
    try{
        const deleted = await productData.findByIdAndDelete(req.params.id,req.body,{returnDocument:"after"})
        resp.json({
            message:"Products Deleted Successfully",
            deleted
        })
    }
    catch(error){
        resp.status(500).json({
            message:"Server Error",
            error
        })
    }
}