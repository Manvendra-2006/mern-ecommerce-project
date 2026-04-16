// import Cart from '../models/Cart.js';
// import Order from '../models/Order.js';
// export const placeorder = async (req,resp) =>{
//     try{
//         const {userId,address} = req.body
//         const cart = await Cart.findOne({userId}).populate('items.productId')
//         if(!cart || cart.items.length === 0){
//             return resp.status(400).json({message:"Cart is empty"});
//         }
//         const orderItems = cart.items.map(item =>({
//             productId : item.productId._id,
//             quantity : item.quantity,
//             price : item.productId.prices,
//         }));
//         const totalAmount = orderItems.reduce((total,item)=> total + (item.price * item.quantity) , 0);
//         const newOrder = await Order.create({
//             userId,
//             items:orderItems,
//             address,
//             totalAmount,
//             paymentMethod:'COD',
//         })
//         await Cart.findOneAndUpdate({userId},{items:[]})
//         resp.status(200).json({message:"Order placed Successfully",orderId : newOrder._id})
//     }
//     catch(error){
//         resp.status(500).json({message:"Internal Server Error"});
//     }
// }

import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

export const placeorder = async (req, resp) => {
    try {
        const { userId, address } = req.body;

        console.log("BODY:", req.body);

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        console.log("CART:", cart);

        if (!cart || cart.items.length === 0) {
            return resp.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = cart.items.map(item => {
            console.log("CART ITEM:", item);

            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.prices, // ya price, product model ke hisaab se
            };
        });

        console.log("ORDER ITEMS:", orderItems);

        const totalAmount = orderItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );

        console.log("TOTAL AMOUNT:", totalAmount);

        const newOrder = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: 'COD',
        });

        await Cart.findOneAndUpdate({ userId }, { items: [] });

        return resp.status(200).json({
            message: "Order placed Successfully",
            orderId: newOrder._id
        });
    } catch (error) {
        console.log("PLACE ORDER ERROR:", error);
        return resp.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};