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
} from "@chakra-ui/react";

import "./ProductDetails.css";
import { ADD_TO_CART } from "../../constants/button";
import { useSelector, connect } from "react-redux";
import { currentProduct } from "../../actions/productActions";
import PropTypes from "prop-types";
import { StarBorder, Star, AttachMoney } from "@material-ui/icons";

const ProductDetails = ({ currentProduct }) => {
  const products = useSelector((state) => state.products);
  const { product } = products;
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    history.push(`/products/${params.id}`);
    currentProduct(String(params.id));
  }, []);
  console.log(JSON.stringify(product));

  console.log(params.id);
  return (
    <Grid
      className="product-details"
      gridTemplateColumns={"400px 1fr 1fr"}
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
                // <img
                //   style={{ width: "24px", height: "24px" }}
                //   src="/img/star-16.png"
                // />
                <StarBorder />
              }
              fullSymbol={
                // <img
                //   style={{ width: "24px", height: "24px" }}
                //   src="/img/icons8-star-filled-16.png"
                //   className="icon"
                //   fractions={2}
                // />
                <Star color="warning" />
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
        <Grid gridTemplateColumns={"1fr"} gap={4} float="right">
          <GridItem>
            <Button width="200px" colorScheme="green">
              Buy Now
            </Button>
          </GridItem>
          <GridItem>
            <Button width="200px" variant="outline" borderColor="gray">
              {ADD_TO_CART}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

ProductDetails.propTypes = {
  currentProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { currentProduct })(
  withRouter(ProductDetails)
);
