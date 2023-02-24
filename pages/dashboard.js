import { Container, Flex, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {

    const router =useRouter()

    const {data:session} =useSession()

    const [loading,setLoading] =useState(false)
    const [orders,setOrders] =useState([])

    useEffect(()=>{
if (session && !session.user.isAdmin) {
router.push('/')
    
}
    },[session])


    useEffect(()=>{
        
            getOrders()
        
    },[])

async function getOrders(){
    setLoading(true)
   await fetch('/api/list-orders').then(
        res=>res.json()
    ).then(data=>setOrders(data)).catch(err=>console.log(err))

    setLoading(false)
}
 if (loading) {
    return (<Flex justifyContent={'center'} alignItems='center'>
        <Spinner/>
    </Flex>)
 }

  return (
    <Container>
        <TableContainer>
            <Table variant={'simple'}>
                <TableCaption>Orders</TableCaption>
         <Thead>
            <Tr>
                <Th>
                    Id

                </Th>
                <Th>
                   Payment methoad

                </Th>
                <Th>
                   Total Price

                </Th>
            </Tr>
         </Thead>
         <Tbody>
            {
                orders.map((order)=>(
                    <Tr key={order._id}>
<Td >{order._id}</Td>
<Td >{order.paymentMethod}</Td>
<Td >{order.totalPrice}</Td>
                    </Tr>
                ))
            }
         </Tbody>
            </Table>
        </TableContainer>
    </Container>
  )
}
