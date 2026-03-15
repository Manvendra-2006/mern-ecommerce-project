import mongoose from "mongoose";
async function connectDB(){
    await  mongoose.connect(process.env.MongoURL)
    console.log("DataBase is connected")
    // const schema = mongoose.Schema({

    // })
    // const Model = mongoose.model('Data',schema,'Data')
    // const result = await Model.find()
}
export default connectDB