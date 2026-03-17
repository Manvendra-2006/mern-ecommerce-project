import mongoose from 'mongoose'
const AddressSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref :'User'
    },
    fullName : String,
    phone :String,
    addressLine : String,
    city:String,
    state:String,
    pincode : String
},{
    timestamps:true
}
)
export default mongoose.model('Address',AddressSchema)

// A one user can support multiple address