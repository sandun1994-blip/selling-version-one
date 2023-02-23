import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { CartContext } from '../context/CartContext'

export default function   CartPage() {

  const {cart} =useContext(CartContext)

  const calculateSum =(cartItems)=>{
console.log(cartItems);
    return cartItems.reduce((acc,item)=>acc+Number(item.price),0)
  }
//   console.log(cart);
// console.log(calculateSum(cart));
  return (
    <Box maxW={{base:'3XL',lg:'7xl'}} mx='auto' px={{base:'4',md:'8',lg:'12'}}
    py={{base:'4',md:'8',lg:'12'}}
    > 
      {cart.length ===0?(<Text fontSize={'xl'} fontWeight='bold'>Your cart is empty</Text>):
      (<>
      <Stack
      as={'section'}
      spacing={{base:'8',lg:'14'}}
      direction={{base:'column',lg:'row'}}
      align={{lg:'flex-start'}}
      >
        <Stack flex='2' spacing={{base:'6',lg:'10'}}>
          <Heading as={'h1'} size='2xl'>Shoping cart</Heading>
          <Stack spacing={'6'}>
          {cart?.length>0 && cart.map((item)=>(
          <CartItem key={item.id} item={item}/>
        ))}
          </Stack>

        </Stack>
        <Flex direction={'column'} align='center' flex={'1'}>
          <OrderSummary total={calculateSum(cart)}/>

        </Flex>
      </Stack>
      </>)}
    </Box>
  )
}
