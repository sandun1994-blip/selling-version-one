import { Button, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'

export default function OrderSummary({total}) {
   const router =useRouter();
  return (
    <Stack spacing={'8'} borderWidth='1px' rounded={'lg'} padding='8' width={'full'}>
        <Heading>
            Order Summary
        </Heading>
        <Stack>
            <Flex justifyContent={'space-between'}>
                <Heading size={'sm'}> Subtotal</Heading>
                <Heading size={'sm'}> ${`${total}`}</Heading>
            </Flex>
        </Stack>
        <Button size={'lg'} 
        onClick={()=>router.push('/checkout')}
        color={useColorModeValue('white','gray.900')}
        fontSize='md' bg={useColorModeValue('GRAY.900','GRAY.50')}>Checkout</Button>
    </Stack>
  )
}
