import Address from "../models/Address.js"
export async function saveAddress(req,resp){
    try{
        const address = await Address.create(req.body) 
        resp.json({message:"Address Saved Successfully",address})
    }
    catch(error){
        resp.status(500).json({message:"Error in saving address",error})
    }
}
export async function getAddressByUserId(req,resp){  
    try{
       const { userId} = req.params;
       if(!userId){
        resp.status(500).json({message:"No user"})
       }
       const address = await Address.find({
        userId : req.params.userId
       })
       if(!address){
        resp.json({message:"Address not found"})
       }
       resp.json(address)
    }
    catch(error){
        resp.status(500).json({message:"Error in getting address y userId",error})
    }
}