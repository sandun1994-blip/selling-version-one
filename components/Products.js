import { Box, Card, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Product({data}) {
    
    return (
        <div>
            <Grid templateColumns={{base:'ifr',lg:'repeat(4,1fr)'}} gap={6}>
            {data.map((product) => (
                <GridItem key={product.id} colSpan={1}>
                    <Card>
                    <Link href={`/product/${product.id}`}>
            <Image
           src={`/images${product.image}`}
            alt={product.title} 
           height={230}
           width={230}
           style={{objectFit:'cover',height:'230px'}}
           />
           <Box py={1} px={2}>
           <h3>{product.title}</h3>
           <div>{product.description}</div>
           <div>${product.price}</div>
           </Box>
           </Link>
           </Card>
          </GridItem>
            ))}

</Grid>
            </div>
    )
}
