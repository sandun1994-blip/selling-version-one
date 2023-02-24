import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import * as yup from 'yup'



const loginSchema=yup.object().shape({
    email:yup.string().email('invalid email').required('Email is required'),
    password:yup.string().min(8,'PASSWORD MUST BE AT LEAST 8 CHARCTERS').required('password is required')
})

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)



    const handleSubmit = async(e) => {
        e.preventDefault()

try {
    await loginSchema.validate({
        email,password
    },{
        abortEarly:false
    })
} catch (error) {
    const validationErrors={}

    if(error instanceof yup.ValidationError){
        error.inner.forEach(({path,message})=>{
            validationErrors[path]=message
        })
    
        
    }
    setError(validationErrors)
    return
}

const result =signIn('credentials',{
    email:email,
    password:password,
    callbackUrl:'/',
        redirect:true
})


if (result.error) {

    setError(result.error)
    
}

        console.log('login', result);
        setEmail('')
        setPassword('')

    }





    return (
        <Container maxW={'lg'} py={{ base: '12', md: '24' }} px={{ base: 0, sm: '8' }}>
            <Stack spacing={'8'}>
                <Stack spacing={'6'} textAlign='center'>
                    <Heading>Log in to your account</Heading>
                    <HStack spacing={'1'} justify='center'>
                        <Text>
                            Don &apos;t have an accounnt?
                        </Text>
                        <Link href={'/signup'} passHref>
                            <Button variant={'link'} colorScheme='pink'>Sign Up</Button>
                        </Link>
                    </HStack>
                </Stack>

            </Stack>
            <Box py={{ base: '4', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                borderRadius={{ base: 'none', sm: 'xl' }}
            >

                <form  >
                    <Stack spacing={'6'}>
                        <Stack spacing={'6'}>
                            <FormControl>
                                <FormLabel htmlFor='email' >Email address</FormLabel>
                                <Input id='email' type={'email'} onChange={(e) => setEmail(e.target.value)} value={email}></Input>
                                < FormHelperText color={'red'} id='email-helper-text'>{error.email}</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input id='password' type={'password'} onChange={(e) => setPassword(e.target.value)} value={password}></Input>
                                < FormHelperText id='password-helper-text'>{error.password}</FormHelperText>
                            </FormControl>
                        </Stack>
                        <HStack justify={'space-between'}>
                            <Button variant={'link'} colorScheme='pink' size='sm'>
                                Forgot Password
                            </Button>
                        </HStack>
                        <Stack>
                            <Button colorScheme={'pink'} onClick={handleSubmit} >
                                Sign In
                            </Button>
                        </Stack>
                    </Stack>
                </form>

            </Box>
        </Container>
    )
}
