import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const hashPassword =async(password)=>{
    if(password.length<8){
        throw new Error('Passsword must be 8 characters or longer')
    }

    return await hash(password,12)
}

export const signToken =(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    },
    process.env.JWT_SECRET)
   
}