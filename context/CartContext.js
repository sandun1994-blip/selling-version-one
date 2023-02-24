import React, { createContext, use, useReducer } from 'react'


const initialState ={
    cart:[]
}

const cartReducer =(state,action)=>{
    switch(action.type){
        case 'ADD_ITEM':{
   //check item is already in 
const itemInCart =state.cart.find((item)=>item.id ===action.payload.id)

if (itemInCart) {
    return {
        ...state,cart:state.cart.map((item)=>item.id ===action.payload.id?{...item,qty:item.qty+1}:item)
    }
}else{
    return {...state,cart:[...state.cart,{...action.payload,qty:1}]}
}}


case 'UPDATE_QTY':{
        
    return {...state,cart:state.cart.map((item)=>item.id===action.payload.id?{...item,qty:action.payload.qty}:item)}

}
        case 'REMOVE_ITEM':
            return {...state,cart:state.cart.filter(d=>d.id!=action.payload.id)}

        default:
            return state    
    }
}

const CartContext =createContext()

const CartProvider=({children})=>{

const [state,dispatch] =useReducer(cartReducer,initialState)


const addToCart =(item)=>{dispatch({type:'ADD_ITEM',payload:item})}

const removeFromCart =(itemId)=>{dispatch({type:'ADD_ITEM',payload:itemId})}

const updateQty =(itemId,qty)=>{dispatch({type:'UPDATE_QTY',payload:{id:itemId,qty}})}



    



    return( <CartContext.Provider value={{...state,addToCart,removeFromCart,updateQty}} >
        {children}
            </CartContext.Provider>)
}


export {CartContext,CartProvider}