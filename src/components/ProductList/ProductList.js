import { useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import Sidebar from "../Sidebar/Sidebar";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import "./ProductList.css";
import { getProducts } from "../../actions/productActions";
const ProductList = ({ getProducts }) => {
  const product = useSelector((state) => state.products);
  const { products } = product;


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={2}>
      <GridItem colSpan={1}>
        <Sidebar
        />
      </GridItem>
      <GridItem colSpan={7}>
        {products ? (
          <Grid className="grid-card" templateColumns="repeat(5, 1fr)" gap={5} p={5}>
            {products?.map((product, i) => {
              return (
                <GridItem key={product.id} w="50%">
                  <Box>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      productName={product.name}
                      price={product.price}
                      description={product.description}
                      rating={product.rating}
                    />
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        ) : (
          <div>Loading...</div>
        )
        }
      </GridItem>
    </Grid>
  );
};


ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, { getProducts })(ProductList);
