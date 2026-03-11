import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
    }
},{
    timestamps : true  // It is a mongoose Scheema option which automatically add two field createAt and updateAt
})
export default mongoose.model('User',userSchema);