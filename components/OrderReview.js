import { Box, Button, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { CartContext } from '../context/CartContext'

export default function OrderReviewPage() {

    const {cart} =useContext(CartContext)

    const state =useSelector(state=>state)
const [displayPaypalBtns,setDisplayPaypalBtns] =useState(false)
    const itemsPrice =cart.reduce((acc,item)=>(acc+item.price* item.qty),0)
    const shippingPrice =itemsPrice>200?0:15
    const taxPrice =itemsPrice*0.15
    const totalPrice =shippingPrice +taxPrice +itemsPrice

    const [{isPending},paypalDispatch]=usePayPalScriptReducer()
    const [isPaid,setIsPaid] =useState(false)
    const [error,setError] =useState(false)


    const handlePlaceOrder=()=>{
        setDisplayPaypalBtns(true)
    }

const createOrder=(data,actions)=>{
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: totalPrice,
                },
            },
        ],
    }).then((orderdId)=>{
        return orderId
    })
}

  
  return (
    <Stack divider={<StackDivider/>}  spacing='4'>

        <Box>
            <Heading size='xs' textTransform={'uppercase'}>Shipping Address</Heading>
            <Text pt='2' fontSize={'sm'}>
                {state.shippingAddress.fullName}
            </Text>
            <Text pt='2' fontSize={'sm'}>
                {state.shippingAddress.address}
            </Text>
            <Text pt='2' fontSize={'sm'}>
                {state.shippingAddress.city}  {state.shippingAddress.postalCode}
            </Text>
            <Text pt='2' fontSize={'sm'}>
                {state.shippingAddress.country}
            </Text>
        </Box>
        
        <Box>
            <Heading size='xs' textTransform={'uppercase'}>Payment Method</Heading>
            <Text pt='2' fontSize={'sm'}>
                {state.shippingAddress.paymentMethod ?state.shippingAddress.paymentMethod:'Paypal'}
            </Text>
            </Box>

            <Box>
            <Heading size='xs' textTransform={'uppercase'}>Order Summary</Heading>
            <Text pt='2' fontSize={'sm'}>
                Items: ${itemsPrice}
            </Text>
            <Text pt='2' fontSize={'sm'}>
                Shipping: ${shippingPrice}
            </Text>
            <Text pt='2' fontSize={'sm'}>
                Tax: ${taxPrice}
            </Text>
            <Text pt='2' fontSize={'sm'}>
                Total: ${totalPrice}
            </Text>

            <Flex justify={'center'} align='center' pt={'4'}>

                {
                    displayPaypalBtns?
                    <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />:<Button colorScheme={'yellow'} size='sm' onClick={handlePlaceOrder}>
                Place Order
                                </Button>
                }
                
            </Flex>
        </Box>

    </Stack>
  )
}
