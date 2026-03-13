import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signupUser = async (req,resp) =>{
    const {name,email,password} = req.body // Destructuring
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
export const loginuser = async (req,resp) =>{
    try{
        const {email,password} = req.body // Destructuring

        const user = await User.findOne({email})

        if(!user){
            return resp.status(400).json({message:"User not found"})
        }

        const match = await bcrypt.compare(password,user.password)

        if(!match){
           return resp.status(400).json({message:"Invalid Credentials"})
        }

        const token = jwt.sign(  // Ye method hoti jwt ki token generate krne ki
            {id:user._id},
            process.env.JWT_TOKEN,
            {expiresIn : "7d"}
        ) 

        resp.json({
            message:"Login Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }
    catch(error){
        console.log("Login Error:",error)
        resp.status(500).json({message:"Server Error"})
    }
}
