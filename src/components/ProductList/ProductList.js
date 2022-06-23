import { useEffect } from "react";
import Rating from "react-rating";

// import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import { SimpleGrid, Box, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import "./ProductList.css";
import { getProducts } from "../../actions/productActions";

const ProductList = ({ getProducts }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);
  const product = useSelector((state) => state.products);
  const { products } = product;
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-list">
      <div className={`sb ${toggled ? "toggled" : ""}`}>
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className="product-grid">
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={10}
          className="product-grid"
        >
          {products.map((product, i) => {
            return (
              <GridItem w="50%">
                <Box key={product.id}>
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
      </div>
    </div>
  );
};

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(ProductList);
