import Rating from 'react-rating';
import { BUY_BUTTON, ADD_TO_CART } from '../../constants/button';

// import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import {
    Box, Image, Text, Stack,
    useColorMode, Button, Flex, Spacer
}
    from "@chakra-ui/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory, Route, Switch } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';

const ProductCard = (props) => {
    const { id, image, productName, description, rating } = props;

    const history = useHistory();
    const handleLink = (e) => {
        history.push(`/${id}`)
    }
    return (
        <>
            <Box w="300px" rounded="20px"
                overflow="hidden" bg="gray.200" mt={10}>
                <Link to={{ pathname: `/products/${id}`, state: { id, image, productName, description, rating } }} style={{ cursor: "pointer" }}>
                    <Image src=
                        {image}
                        alt={productName} boxSize="300">
                    </Image>
                </Link>



                <Box p={5}>
                    <Stack align="center">
                        <Text as="h1" fontSize='2xl' fontWeight="bold" my={2} >
                            {productName}
                        </Text>
                        <Text fontWeight="light">
                            {description}
                        </Text>
                    </Stack>
                    <Flex mt={4} >
                        <Spacer />
                        <Button pt={5} pb={5} mr={2} variant="ghost" size="xs" justifyContent='center'>
                            <img src="img/heart.png" width="24px" height="24px" />
                        </Button>
                        <Button p="5" mr={2} variant="solid"
                            colorScheme="green" size="md" justifyContent='center'>
                            {BUY_BUTTON}
                        </Button>
                        <Button variant="solid" ml={2} colorScheme="orange" size="md" justifyContent="center">
                            {ADD_TO_CART}
                        </Button>
                        <Spacer />
                    </Flex>
                    <Flex mt={4}>
                        <Spacer />
                        <Rating initialRating={rating} emptySymbol={<img style={{ width: "24px", height: "24px" }} src="img/star-16.png" />} fullSymbol={<img style={{ width: "24px", height: "24px" }} src="img/icons8-star-filled-16.png" className="icon" fractions={2}
                        />}
                        />
                        <Spacer />
                    </Flex>
                </Box>

            </Box>

        </>

    )
}

export default ProductCard;