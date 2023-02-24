import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'

import CartIcon from './CartIcon'

export default function Layout({ children }) {
    const {data:session,status} =useSession()

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <div>
            <Head><title>E-commerce </title></Head>
            <Box><Flex bg={useColorModeValue('white', 'gray.600')} minH={'60px'} py={{ base: 2 }}
                px={{ base: 4 }} borderBottom={1} borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link href={'/'} >
                        <Text fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>lOGO</Text>
                    </Link>

                    <Stack flex={{ base: 1 }} justify={'flex-end'} direction={'row'} spacing={6}>
                        <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>

                        <Link href='/cart' >
                            <CartIcon />
                        </Link>

<>
{status==='authenticated'?(<Button display={'inline-flex'} fontSize={'sm'} fontWeight={600} variant={'link'} color={'white'} bg={'pink.400'} href={'#'} _hover={{ bg: 'pink.300' }}
onClick={()=>signOut()}
>Sign out</Button>):
( <> <Button fontSize={'sm'} fontWeight={400} ><Link href='/login' passHref >
                            
Sign In</Link></Button>   
<Button display={{base:'none',md:'inline-flex'}} fontSize={'sm'} fontWeight={600} variant={'link'} color={'white'} bg={'pink.400'} href={'#'} _hover={{ bg: 'pink.300' }}>
<Link href='/signup' passHref>                           
Sign Up In</Link> </Button></>)}


</>


                       </Stack>
                </Flex>
            </Flex></Box>
            {children}


            <Box><Flex bg={useColorModeValue('white', 'gray.600')} minH={'60px'} py={{ base: 2 }}
                px={{ base: 4 }} borderTop={1} borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center' }} alignItems={{ base: 'center' }}>
                    <Text fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>lOGO</Text>
                    Copyright 2023.
                </Flex>
            </Flex></Box>
        </div>
    )
}
