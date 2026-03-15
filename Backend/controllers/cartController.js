import Cart from "../models/Cart.js";
import product from "../models/product.js";
export async function AddCart(req,resp){
    try{
        const {userId,productId} = req.body
        let cart = await Cart.findOne({userId}) // Yaha hum Cart logic system userId ke basis par bana rhe hain

        if(!cart){
            cart = new Cart({userId,items:[
                { productId,quantity:1}
            ]})
        }
        
            const item = cart.items.find((item)=> item.productId.toString() === productId.toString()) // Yahaa Par hum ye check kar rhe hain ki product phele se rehta hain ya nhi 
        
        if(item){
            item.quantity +=1;
        }
        else{
            cart.items.push({productId,quantity:1}) // Man lo productId same nhi hoti hain toh items array ke nadar ek new object create hoga database main usi collection main 
        }
        await cart.save()
     resp.json({
            message:"Item added to cart",
            cart
        })
    }
    catch(error){
     return  resp.status(500).json({message:"Server Error", error})
    }
}
export async function DeleteCart(req,resp){
    try{
      const {userId,productId}   = req.body
      let cart = await Cart.findOne({userId})
      
       
      if(!cart){
       return resp.status(400).json({message:"Card Not found"})
      }
      
      cart.items = cart.items.filter((item)=> item.productId.toString() !==  productId)  // Here filter remove the elemt which does not satify condition
      await cart.save()
    return  resp.json({
        message:"Cart Deleted Successfully",
        cart
      })
    }
    catch(error){
      return  resp.status(500).json({message:"Server Error",error})
    }
}
export async function UpdateCart(req,resp){
    try{
        const {userId,productId,quantity} = req.body
        const updatedCart = await Cart.findOne({userId})
        if(!updatedCart){
            return resp.status(400).json({message:"Cart Not Found"})
        }
        const item = updatedCart.items.find((item)=> item.productId.toString() === productId.toString())
        if(!item){
                return resp.status(400).json({message:"Item not found"})
        }
        item.quantity = quantity;
        await updatedCart.save()
        return resp.json({
            message:"Item updated Successfully",
            updatedCart
        })
    }
    catch(error){
        resp.json({
            message:"Card not eror"
        })
    }
}
export  const getCart = async (req,resp)=>{
    try{
        const {userId} = req.params;
        console.log(userId)
        if (!userId) {
            return resp.status(400).json({ message: "userId is required" });
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');  // Here Populate checks productId ref in Schema then get data from products collection
    //Pehle particular Cart find hota hai → fir populate schema me ref:'Product' check karta hai → fir us productId se Product collection me search karke poora product data attach kar deta hai.
        if (!cart) {
            return resp.status(404).json({ message: "Cart not found" });
        }

        resp.json(cart);
    }
    catch(error){
        resp.status(500).json({message:"Internal Server Error"})
    }
}