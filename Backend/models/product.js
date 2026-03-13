import mongoose from "mongoose";
const productData = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,        
    },
    prices:{
        type:Number,
        required:true,
    },
    category:{
        type : String,
    },
    image : {
        type: String,
    },
    stock :{
        type : Number,
        default : 0,
    }
},{
    timestamps : true,
});
export default mongoose.model("Product",productData)