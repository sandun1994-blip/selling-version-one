import { Box, Card, CardBody, CardHeader, Progress, Stack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShippingAddressForm from '../components/forms/Shipping'
import OrderReviewPage from '../components/OrderReview'
import PaymentMethod from '../components/Payment'

export default function CheckoutPage() {

    const dispatch = useDispatch()
    const activeStep = useSelector((state) => state.currentStep)

    const steps = [{ name: 'Shipping', component: <ShippingAddressForm /> },
    { name: 'Payment', component: <PaymentMethod/> },
    { name: 'Review', component: <OrderReviewPage/> }
    ]

    return (
        <Stack spacing={4}>
            <Progress value={activeStep} max={steps.length} />

            <Box mx={'auto'}>
                <Card w='xl' m='auto'>
                    <CardHeader>
                        {steps[activeStep].name}
                    </CardHeader>
                    <CardBody>
                        {steps[activeStep].component}
                    </CardBody>
                </Card>

            </Box>

        </Stack>
    )
}
