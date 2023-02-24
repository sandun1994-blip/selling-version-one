import { Card, CardBody, CardHeader, Progress } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export default function OrderConfirmationPage() {
    const router =useRouter()

    const {id} =router.query
  return (
    <div>
        <Progress value={3} max={3}/>
        
        <Card>
            <CardHeader>
Thank you for your order
            </CardHeader>
            <CardBody>
                <p> Order id :${id}</p>
            </CardBody>
        </Card>
       </div>
  )
}
