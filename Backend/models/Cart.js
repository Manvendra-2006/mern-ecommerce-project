import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, // Through this This line create a relation it stores id of different Collection
        ref : 'User',
        required: true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default : 1
            }
        }
    ]
})
export default mongoose.model('Cart',CartSchema)