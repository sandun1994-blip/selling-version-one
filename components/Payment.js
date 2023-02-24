import { Box, Button, Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function PaymentMethod() {

    const dispatch = useDispatch()

    const store = useSelector(state => state)
    const [paymentMethod, setPaymentMethod] = useState(store.paymentMethod ? store.paymentMethod : '')

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value)
        dispatch({ type: 'checkout/paymentMethod', payload: value })
    }

    const prevStep = () => {
        dispatch({ type: 'checkout/prevStep' })
    }

    const nextStep = () => {
        dispatch({ type: 'checkout/nextStep' })
    }

    return (
        <Box display={'flex'} flexDirection='column'>
            <RadioGroup onChange={handlePaymentMethodChange} value={paymentMethod}>
                <Stack direction={'column'}>
                    <Radio value='paypal'>Paypal</Radio>

                </Stack>
            </RadioGroup>

            <Flex justifyContent={'space-between'}>
                <Button mt='4' onClick={prevStep}>Back</Button>
                <Button mt='4' onClick={nextStep}>Continue</Button>
            </Flex>
        </Box>
    )
}
