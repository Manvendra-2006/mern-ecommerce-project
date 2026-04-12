import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
export const placeorder = async (req,resp) =>{
    try{
        const {userId,address} = req.body
        const cart = await Cart.findOne({userId}).populate('items.productId')
        if(!cart || cart.items.length === 0){
            return resp.status(400).json({message:"Cart is empty"});
        }
        const orderItems = cart.items.map(item =>({
            productId : item.productId._id,
            quantity : item.quantity,
            price : item.productId.prices,
        }));
        const totalAmount = orderItems.reduce((total,item)=> total + (item.price * item.quantity) , 0);
        const newOrder = await Order.create({
            userId,
            items:orderItems,
            address,
            totalAmount,
            paymentMethod:'COD',
        })
        await Cart.findOneAndUpdate({userId},{items:[]})
        resp.status(200).json({message:"Order placed Successfully",orderId : newOrder._id})
    }
    catch(error){
        resp.status(500).json({message:"Internal Server Error"});
    }
}