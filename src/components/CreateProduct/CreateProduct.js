import { useState } from "react";
import { PRODUCT_DESCRIPTION, PRODUCT_IMAGE, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_QUANTITY } from "../../constants/product";
import { createProduct } from "../../actions/productActions";
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { FormControl, FormLabel, Input, Button, useToast, Textarea } from '@chakra-ui/react';

import './CreateProduct.css'

const CreateProduct = ({ createProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: '0.0',
    quantity: '0'
  });

  const history = useHistory();
  const toast = useToast();
  const productReducer = useSelector((state) => state.products);
  const { products } = productReducer;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    }

    createProduct(newProduct);
    console.log("products: " + JSON.stringify(products))
    // setProduct({
    //   name: '',
    //   image: '',
    //   description: '',
    //   price: 0.0,
    //   quantity: 0
    // })

  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleClick = (e) => {
    toast({
      position: "bottom-right",
      title: "Product created!",
      description: "Product " + product.name + " has been created!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <div className="create-product">
      <form id="create-product-form" onSubmit={(e) => handleSubmit(e)}>
        <FormControl isRequired>
          <FormLabel>{PRODUCT_NAME}</FormLabel>
          <Input name="name" onChange={handleChange} value={product.name} placeholder={PRODUCT_NAME} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{PRODUCT_IMAGE}</FormLabel>
          <Input name="image" onChange={handleChange} value={product.image} placeholder={PRODUCT_IMAGE} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{PRODUCT_DESCRIPTION}</FormLabel>
          <Textarea name="description" onChange={handleChange} value={product.description} placeholder={PRODUCT_DESCRIPTION} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{PRODUCT_PRICE}</FormLabel>
          <Input name="price" onChange={handleChange} value={product.price} placeholder={PRODUCT_PRICE} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{PRODUCT_QUANTITY}</FormLabel>
          <Input name="quantity" onChange={handleChange} value={product.quantity} placeholder={PRODUCT_QUANTITY} />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          variant="solid"
          width="-webkit-fit-content"
          mt={5}
          p={5}
          form="create-product-form"
          onClick={handleClick}
        >
          Create
        </Button>
      </form>
    </div >
  )
}

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  products: state.products,
})

export default connect(mapStateToProps, { createProduct })(CreateProduct);