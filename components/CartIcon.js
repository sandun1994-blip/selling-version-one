

import { Box, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function CartIcon() {

    const { cart } = useContext(CartContext)
    const { colorMode } = useColorMode()

    const hoverColor = { light: 'gray.800', dark: 'gray.100' }
    const iconColor = { light: 'gray.600', dark: 'gray.300' }
    const fontColor = { light: 'gray.800', dark: 'gray.100' }


    return (
        <Box position='relative'>
            <IconButton aria-label='cart' icon={<Text fontSize='2xl'></Text>} variant='ghost' color={iconColor[colorMode]} _hover={{ color: hoverColor[colorMode] }} />

            {
                cart.length > 0 && (<Box position='absolute' top={0} right={0} bg={hoverColor[colorMode]}
                    p={1} rounded='sm' color={fontColor[colorMode]}>

                    <Text fontWeight='bold' color={'red'}>{cart.length}</Text>

                </Box>)
            }
        </Box>
    )
}
