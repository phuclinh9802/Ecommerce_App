import Rating from 'react-rating';
import { BUY_BUTTON, ADD_TO_CART } from '../../../constants/button';

// import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import {
    Box, Image, Text, Stack,
    useColorMode, Button, Flex, Spacer
}
    from "@chakra-ui/react";

const ProductCard = (props) => {
    const { image, productName, description, rating } = props
    return (
        <>
            <Box w="500px" rounded="20px"
                overflow="hidden" bg="gray.200" mt={10}>
                <a href="https://reactjs.org" style={{ cursor: "pointer" }}>
                    <Image src=
                        {image}
                        alt={productName} boxSize="500">
                    </Image>
                </a>


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