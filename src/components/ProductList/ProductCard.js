import Rating from "react-rating";

import {
  Box,
  Image,
  Text,
  Stack,
  Center,
} from "@chakra-ui/react";
import { StarBorder, Star, FavoriteBorder, Favorite } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { currentProduct } from "../../actions/productActions";
import PropTypes from "prop-types";

import './ProductCard.css';

const ProductCard = (props) => {
  const { id, image, productName, price } = props;
  const products = useSelector((state) => state.products);
  const { product } = products;
  return (
    <Box w="300px" rounded="20px" overflow="hidden" bg="" mt={10}>
      <Center>

        <Link
          to={{
            pathname: `/products/${id}`,
          }}
          style={{ cursor: "pointer" }}
        >
          <Image src={image} alt={productName} boxSize="200"></Image>
        </Link>
      </Center>

      <Box p={2}>
        <Stack pl={5} align="start">
          <Text as="h1" fontSize="xl" fontWeight="" my={2}>
            <Link to={`/product/${id}`} className="link-pname">
              {productName}
            </Link>
            <Rating
              style={{ marginLeft: "25px" }}
              start={0}
              stop={1}
              initialRating={product.rating}
              emptySymbol={<FavoriteBorder />}
              fullSymbol={<Favorite style={{ color: '#F08080' }} />}
            />
          </Text>
          <Rating
            initialRating={product.rating}
            emptySymbol={<StarBorder />}
            fullSymbol={<Star style={{ color: '#FFD700' }} />}
          />
          <Text fontSize="2xl" fontWeight="bold">
            ${price}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

ProductCard.propTypes = {
  currentProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { currentProduct })(ProductCard);
