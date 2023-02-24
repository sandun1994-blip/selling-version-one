import { Box, Button, CircularProgress, Flex, Heading, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CartContext } from '../context/CartContext'

export default function OrderReviewPage() {

    const router=useRouter()

    const { cart ,clearCart} = useContext(CartContext)
    const toast = useToast()
    const {data:session}=useSession()
    const state = useSelector(state => state)
    const [displayPaypalBtns, setDisplayPaypalBtns] = useState(false)
    const itemsPrice = cart.reduce((acc, item) => (acc + item.price * item.qty), 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = itemsPrice * 0.15
    const totalPrice = shippingPrice + taxPrice + itemsPrice

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const [isPaid, setIsPaid] = useState(false)
    const [error, setError] = useState(false)
    const [orderLoading,setOrderLoading] =useState(false)
    const [orderIdDB,setOrderIdDB] =useState(null)


    useEffect(()=>{


if (displayPaypalBtns) {
const loadPaymentScript =async()=>{
    const response =await fetch('/api/keys/paypal',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const {clientId} = await response.json()
    paypalDispatch({
        type:'resetOptions',
        value:{
            'client-id':clientId,
            currency:'USD'
        }
    })
}

   
    loadPaymentScript()
}

    },[displayPaypalBtns])


    const handlePlaceOrder = async() => {
        setOrderLoading(true)
        const user_id =session.user._id
        const orderItems =cart.map(cartItem=>{
            return {name:cartItem.title,description:cartItem.description,image:cartItem.image,quantity:cartItem.qty?cartItem.qty:1}
        })
        const shippingAddress =state.shippingAddress
        const isPaid =false
        const isDelivered=false
        const paymentMethod='paypal'
        const reqBody ={user_id,orderItems,shippingAddress,isDelivered
            ,isPaid,paymentMethod,itemsPrice,shippingPrice,taxPrice,totalPrice}

        fetch('/api/orders',{
            method:'POST',
            headers:{
                'Content-Tyoe':'application/json'
            },
            body:JSON.stringify(reqBody)
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setOrderIdDB(data._id)
            setDisplayPaypalBtns(true)
        }).catch(err=>{
            setError(true)
        })
        setOrderLoading(false)

    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice,
                    },
                },
            ],
        }).then((orderID) => {
            return orderID
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async(details) => {

          
            setIsPaid(true)

            toast({
                title: 'Payment Success',
                description: 'thank you for your order',
                status: 'success',
                duration: 9000,
                isClosable: true

            })
              //todo updaterorder status in db
const {id:payment_id,status}=details
const email_address =details.payer.email_address
try {
    const response =await fetch('/api/payment/details',{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },

    bpdy:JSON.stringify({payment_id,email_address})
    
    })

    const data= response.json()
    clearCart()
    router.push(`/order/${orderIdDB}` )
} catch (error) {
    setError(true)
}
           
            // const name = details.payer.name.given_name;
            // alert(`Transaction completed by ${name}`);
        });
    }

    const onError = (err) => {
        setError(true)
        toast({
            title: 'Some thing went wrong',
            description: { err },
            status: 'error',
            duration: 9000,
            isClosable: true

        })
    }


    return (
        <Stack divider={<StackDivider />} spacing='4'>

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
                    {state.shippingAddress.paymentMethod ? state.shippingAddress.paymentMethod : 'Paypal'}
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
                        displayPaypalBtns ?(isPending?<CircularProgress isIndeterminate color='blue.300'/>:
                            <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                            /> ): <Button colorScheme={'yellow'} size='sm' onClick={handlePlaceOrder} isLoading={orderLoading}>
                                Place Order
                            </Button>
                    }

                </Flex>
            </Box>

        </Stack>
    )
}
