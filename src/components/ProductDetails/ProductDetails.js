import React, { useEffect } from "react";
import { useParams, withRouter, Route, useHistory } from "react-router-dom";
import Rating from "react-rating";
import {
  Grid,
  GridItem,
  Text,
  Stack,
  Button,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";

import "./ProductDetails.css";
import { ADD_TO_CART, BUY_NOW_BUTTON } from "../../constants/button";
import { useSelector, connect } from "react-redux";
import { currentProduct } from "../../actions/productActions";
import PropTypes from "prop-types";
import { StarBorder, Star, AttachMoney } from "@material-ui/icons";
import CartDrawer from "../CartDrawer/CartDrawer";
import { postCart } from '../../actions/cartActions';

const ProductDetails = ({ currentProduct, postCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { items } = cart;
  const { product } = products;
  const history = useHistory();

  const params = useParams();

  const handleClick = () => {
    const data = {
      name: product.name,
      image: product.image,
    }
    postCart(data);
    onOpen();
  }

  useEffect(() => {
    history.push(`/products/${params.id}`);
    currentProduct(String(params.id));
  }, []);

  return (
    <Grid
      className="product-details"
      gridTemplateColumns={"1fr 1fr 1fr"}
      gap={10}
      p={20}
    >
      <GridItem className="product-image" key={product.id}>
        <img src={product.image} alt={product.name} />
      </GridItem>
      <GridItem className="product-content">
        <Stack spacing={3} className="product-row">
          <Text fontSize="2xl">{product.name}</Text>
          <span>
            <Rating
              initialRating={product.rating}
              emptySymbol={
                <StarBorder />
              }
              fullSymbol={
                <Star />
              }
            />
          </span>
          <hr />
          <Text fontSize="3xl" fontWeight="semibold">
            <AttachMoney fontSize="medium" />
            {product.price}
          </Text>
          <Text fontSize="md">{product.description}</Text>
        </Stack>
      </GridItem>
      <GridItem>
        <Grid gridTemplateColumns={"1fr"} ml={5} gap={4}>
          <GridItem>
            <Button width="200px" colorScheme="green">
              {BUY_NOW_BUTTON}
            </Button>
          </GridItem>
          <GridItem>
            <Button width="200px" variant="outline" borderColor="gray" onClick={handleClick}>
              {ADD_TO_CART}
            </Button>
            <CartDrawer isOpen={isOpen} onClose={onClose} data={items} />
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

ProductDetails.propTypes = {
  currentProduct: PropTypes.func.isRequired,
  postCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
});

export default connect(mapStateToProps, { currentProduct, postCart })(
  withRouter(ProductDetails)
);
