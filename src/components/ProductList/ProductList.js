import { useEffect } from "react";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
import { getProducts } from "../../actions/productActions";

const ProductList = () => {
  const product = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { products } = product;


  useEffect(() => {
    dispatch(getProducts());
  }, [products]);

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


export default ProductList;
