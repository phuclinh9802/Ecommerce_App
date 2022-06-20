
import Rating from 'react-rating';


// import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import { SimpleGrid, Box, Grid, GridItem } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';
import products from '../../data/product';

import './ProductList.css'



const ProductList = () => {
    const [collapsed, setCollapsed] = useState(false);
    // const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(false);
    const handleCollapsedChange = (checked) => {
        setCollapsed(checked)
    }

    const handleToggleSidebar = (value) => {
        setToggled(value)
    }

    return (
        <div className="product-list">
            <div className={`sb ${toggled ? 'toggled' : ''}`}>
                <Sidebar collapsed={collapsed} toggled={toggled} handleToggleSidebar={handleToggleSidebar} />

            </div>
            <div className='product-grid'>
                <Grid templateColumns='repeat(3, 1fr)' gap={20} className='product-grid' >
                    {products.map((product, i) => {
                        return (
                            <GridItem w='50%'>
                                <Box key={product.id}>
                                    <ProductCard id={product.id} image={product.image} productName={product.productName} description={product.description} rating={product.rating} />
                                </Box>
                            </GridItem>

                        )
                    })}
                </Grid>
            </div>

        </div>

    )
}

export default ProductList;