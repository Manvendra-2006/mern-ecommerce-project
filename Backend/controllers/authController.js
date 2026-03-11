import User from "../models/User.js";
import bcrypt from 'bcryptjs'
export const signupUser = async (req,resp) =>{
    const {name,email,password} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        return resp.status(400).json({message :"User already exists"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    await User.create({
        name,
        email,
        password:hashPassword
    })
    resp.json({message:"User registered successfully"})
}