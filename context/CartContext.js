import React, { createContext, use, useReducer } from 'react'


const initialState ={
    cart:[]
}

const cartReducer =(state,action)=>{
    switch(action.type){
        case 'ADD_ITEM':
        return {...state,cart:[...state.cart,action.payload]}
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



    



    return( <CartContext.Provider value={{...state,addToCart,removeFromCart}} >
        {children}
            </CartContext.Provider>)
}


export {CartContext,CartProvider}