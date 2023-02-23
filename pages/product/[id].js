import { Box, Button, Container, Flex, Heading, Image, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Product from '../../models/Product'
import { data } from '../../utils/data'
import db from '../../utils/db'

export default function ProductPage({product}) {
    const router = useRouter()
    const { id } = router.query
    const {addToCart} =useContext(CartContext)
    // const product = data.products.find(d => d.id == Number(id))

    if (!product) {

        return <div>Product not found</div>

    }

    return (

        <Container maxW={'container.xl'} mt={2}>
            <SimpleGrid columns={[1, 2]} spacing={2}>
                <Flex>
                    <Image src={`/images${product.image}`} rounded={'md'} alt={product.title} align={'center'} h={'100%'} w={{ base: '100%', sm: '400px', lg: '500px' }} />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as='header'>
                        <Heading lineHeight={1.2}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {product.title}
                        </Heading>
                        <Text
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}

                        >
                            {`$${product.price} USD`}

                        </Text>
                    </Box>

                    <Text
                        color={useColorModeValue('gray.500', 'gray.400')}
                        fontSize={'lg'}
                    >
                        {product.description}

                    </Text>
                    <Flex flexGrow={1} alignItems={'end'}>
                        <Button 
                        rounded={'md'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        color={useColorModeValue('gray.900','gray.50')}
                        bg={useColorModeValue('white','gray.900')}
                        textTransform={'uppercase'}

                        onClick={()=>addToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    </Flex>

                </Stack>

            </SimpleGrid>
        </Container>

    )
}

export async function getServerSideProps(context){

    const {params} =context
    const {id} =params

    await db.connect()
    const product =await Product.findOne({id}).lean()
    await db.disconnect()

    return {
        props:{product:db.convertDocToObj(product)}
    }

}