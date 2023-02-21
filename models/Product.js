import mongoose from "mongoose";


const productSchema =new mongoose.Schema(
    {
        id:{type:String,required:true,unique:true},
        title:{type:String,required:true},
        image:{type:String,required:true},
        price:{type:String,required:true},
        description:{type:String,required:true},
    },
    {
        timestamps:true
    }
)

const Product =mongoose.models.Product || mongoose.model('Product',productSchema)

export default Product