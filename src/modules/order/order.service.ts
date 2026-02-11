import { prisma } from "../../lib/prisma";
import IOrder from "../../types/order.types";
import IUser from "../../types/user.types";





//create order
const createOrder = async (mealId: string, customerId: string, payload: IOrder) => {

    const mealsData = await prisma.meals.findFirstOrThrow({
        where: { id: mealId },
        select: {
            id: true,
            provider_id: true,
            price: true,
            discountPrice: true,
            name: true
        }
    });
    
    let totalPrice = 0;
    //calculation the price
    if(mealsData.discountPrice !== null){
        totalPrice = payload.quantity * mealsData.discountPrice
    }else{
        totalPrice = payload.quantity * mealsData.price;
    }

    const orderData = {
        mealId: mealsData.id,
        mealName: mealsData.name,
        price: mealsData.price,
        discountPrice: mealsData.discountPrice,
        quantity: payload.quantity,
        totalPrice: totalPrice,
        deliveryAddress: payload.deliveryAddress || null,
        customer_id: customerId,
        provider_id: mealsData.provider_id

    }
    const result = await prisma.order.create({
        data: orderData
    });

    return result;
};

//check your own order
const getOwnCart = async(customerId:string)=>{
    const result = await prisma.order.findMany({
        where:{
            customer_id: customerId
        }
    });

    return result
}

//get order by id

const getOrderById = async(orderId:string, user:IUser)=>{
    const orderIdNumber = Number(orderId)
    const result = await prisma.order.findUnique({
        where:{
            id:orderIdNumber
        }
    });
    if(!result){
        throw new Error("Order not found")
    }
    if(user.roles === "Customer" && user.id !== result?.customer_id){
        throw new Error("You don't have permission to perform this action")
    }

    if(user.roles === "Provider" && user.id !== result?.provider_id){
        throw new Error("You don't have permission to perform this action")
    }
    return result
}



export const orderService = {
    createOrder,
    getOwnCart,
    getOrderById
}