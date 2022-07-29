import React, { useEffect, useState } from "react";
import { useParams, withRouter, useHistory, Link } from "react-router-dom";
import Rating from "react-rating";
import {
  Grid,
  GridItem,
  Text,
  Stack,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";

import "./ProductDetails.css";
import { ADD_TO_CART, BUY_NOW_BUTTON } from "../../constants/button";
import { useSelector, connect } from "react-redux";
import { currentProduct } from "../../actions/productActions";
import PropTypes from "prop-types";
import { StarBorder, Star, AttachMoney } from "@material-ui/icons";
import CartDrawer from "../CartDrawer/CartDrawer";
import { postCart, updateQtyProduct } from '../../actions/cartActions';
import { v4 as uuidv4 } from 'uuid'

const ProductDetails = ({ currentProduct, postCart, updateQtyProduct }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [select, setSelect] = useState(1);

  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { items } = cart;
  const { product } = products;
  const history = useHistory();

  const params = useParams();

  let uniqueId = uuidv4();


  const handleChange = (e) => {
    setSelect(e.target.value)
  }

  const handleClick = () => {
    const data = {
      uniqueId: uniqueId,
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: select,
    }
    postCart(data);
    updateQtyProduct(uniqueId, select, Number(product.price) * Number(select));
    onOpen();
  }


  // useEffect(() => {
  // }, [updateQtyProduct])

  let selectQty = [];
  for (let i = 1; i <= product.quantity; i++) {
    selectQty.push(i);
  }

  useEffect(() => {
    history.push(`/products/${params.id}`);
    currentProduct(String(params.id));
  }, [currentProduct, history, params.id]);

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
            <Select w="200px" size="sm" value={select} onChange={e => handleChange(e)}>
              {selectQty.map((qty) => {
                return <option value={qty}>{qty}</option>
              })}
            </Select>
          </GridItem>
          <GridItem>
            <Link to="/users/shipping">
              <Button width="200px" colorScheme="green">
                {BUY_NOW_BUTTON}
              </Button>
            </Link>
          </GridItem>
          <GridItem>
            <Button width="200px" variant="outline" borderColor="gray" onClick={handleClick}>
              {ADD_TO_CART}
            </Button>
            <CartDrawer isOpen={isOpen} onClose={onClose} data={items} quantity={select} updatedPrice={product.price} />
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

ProductDetails.propTypes = {
  currentProduct: PropTypes.func.isRequired,
  postCart: PropTypes.func.isRequired,
  updateQtyProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
});

export default connect(mapStateToProps, { currentProduct, postCart, updateQtyProduct })(
  withRouter(ProductDetails)
);
