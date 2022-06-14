
import Rating from 'react-rating';


// import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import { SimpleGrid, Box, Grid } from '@chakra-ui/react';
import products from '../../../data/product'
import ProductCard from './ProductCard';

const ProductList = () => {
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
            {products.map((product, i) => {
                return (
                    <Box key={i}>
                        <ProductCard image={product.image} productName={product.productName} description={product.description} rating={product.rating} />
                    </Box>
                )
            })}
        </Grid>
    )
}

export default ProductList;