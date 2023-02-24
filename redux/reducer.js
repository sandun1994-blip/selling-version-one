import { HYDRATE } from "next-redux-wrapper"

const initialState={
    currentStep:0,
    shippingAddress:{
        fullName:'',
        address:'',
        city:'',
        postalCode:'',
        county:''
    }
}


export const reducer=(state=initialState,action)=>{


    switch(action.type){
        case HYDRATE:
            return {...state,...action.payload}

            case 'address/saveShippingAddress' :
console.log(action.payload);
            return {...state,shippingAddress:action.payload}

            case 'checkout/nextStep' :

            return {...state,currentStep:state.currentStep+1}

            case 'checkout/prevStep' :

            return {...state,currentStep:state.currentStep-1}

            default:
                return state;
    }


}