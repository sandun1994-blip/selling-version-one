import { createRouter } from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";



const router  =createRouter()


router.post(async(req,res)=>{
    try {
        
    await db.connect()
    const newOrder= new Order({
        ...req.body,user:req.body.user_id
    })
const order =await newOrder.save()
await db.disconnect()
res.send({message:'order saved',data:order})
    } catch (error) {
       res.send({message:error}) 
    }

})


export default router.handler({})