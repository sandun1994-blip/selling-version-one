import { Box, CloseButton, Flex, Image, Stack, Text, useColo, useColorModeValue, useColorModeValuerModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function CartItem({ item }) {

    const { removeFromCart } = useContext(CartContext)
    return (
        <Flex direction={{ base: 'column', md: 'row' }} justify='space-between' align='center'>
            <Stack direction={'row'} spacing='5' width='full'>
                <Image src={`/images${item.image}`} alt={item.title} width='120px'
                    height={'120px'} loading='lazy' />
                <Box pt='4'>
                    <Stack spacing={'0.5'}>
                        <Text fontWeight='medium'>
                            {item.title}
                        </Text>
                        <Text fontFamily={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>

                        </Text>

                    </Stack>
                    <Flex width='full' justify={'space-between'} display='flex'>
                        <Text fontWeight={'medium'} color={useColorModeValue('gray.400', 'gray.400')} fontSize='lg'>
                            ${item.price}
                        </Text>

                        <CloseButton onClick={()=>removeFromCart(item.id)}/>

                    </Flex>
                </Box>
            </Stack>
        </Flex>
    )
}
