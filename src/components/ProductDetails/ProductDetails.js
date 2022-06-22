import React from 'react';
import { useParams, withRouter, Route } from 'react-router-dom';

import { Grid, GridItem, Text, Stack, Button, Wrap, WrapItem } from '@chakra-ui/react';

import './ProductDetails.css';
import { ADD_TO_CART } from '../../constants/button';

const ProductDetails = ({ product }) => {
  const params = useParams();
  console.log(params.id);
  return (
    <Grid className='product-details' gridTemplateColumns={'400px 1fr 1fr'} gap={10} p={20}>
      <GridItem className='product-image' key={product.id}>
        <img src={product.image} alt={product.productName} />
      </GridItem>
      <GridItem className='product-content'>
        <Stack spacing={3} className="product-row">
          <Text fontSize='2xl'>{product.productName}</Text>
          <Text fontSize='lg'>${product.price}</Text>
          <Text fontSize='md'>{product.description}</Text>


        </Stack>
      </GridItem>
      <GridItem>
        <Grid gridTemplateColumns={'1fr'} gap={4} float='right'>
          <GridItem>
            <Button width='200px' colorScheme='green'>Buy Now</Button>

          </GridItem>
          <GridItem>
            <Button width='200px' variant='outline' borderColor='gray'>{ADD_TO_CART}</Button>

          </GridItem>
        </Grid>
      </GridItem >
    </Grid >
  )
}

export default withRouter(ProductDetails);