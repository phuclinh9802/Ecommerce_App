import { useState } from "react";
// import { PRODUCT_DESCRIPTION, PRODUCT_IMAGE, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_QUANTITY } from "../../constants/product";
import { updateAddress } from "../../../actions/shippingBillingActions";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Textarea,
  Divider,
} from "@chakra-ui/react";

// import './CreateProduct.css'

const Shipping = ({ updateAddress }) => {
  const history = useHistory();
  const toast = useToast();

  const [shippingBillingAddress, setShippingBillingAddress] = useState({
    shipAddress: "",
    shipCity: "",
    shipCode: "",
    shipState: "",
    shipCountry: "",
    billAddress: "",
    billCity: "",
    billCode: "",
    billState: "",
    billCountry: "",
  });

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setShippingBillingAddress({
      shipAddress: shippingBillingAddress.shipAddress,
      shipCity: shippingBillingAddress.shipCity,
      shipCode: shippingBillingAddress.shipCode,
      shipState: shippingBillingAddress.shipState,
      shipCountry: shippingBillingAddress.shipCountry,
    });

    toast({
      position: "top-right",
      title: "Shipping address added!",
      description: "Now to billing address!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmitBilling = (e) => {
    e.preventDefault();
    setShippingBillingAddress({
      ...shippingBillingAddress,
      billAddress: shippingBillingAddress.billAddress,
      billCity: shippingBillingAddress.billCity,
      billCode: shippingBillingAddress.billCode,
      billState: shippingBillingAddress.billState,
      billCountry: shippingBillingAddress.billCountry,
    });
    toast({
      position: "top-right",
      title: "Billing address added!",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shippingBillingAddress);
    updateAddress(shippingBillingAddress);

    setShippingBillingAddress({
      shipAddress: "",
      shipCity: "",
      shipState: "",
      shipCode: "",
      shipCountry: "",
      billAddress: "",
      billCity: "",
      billState: "",
      billCode: "",
      billCountry: "",
    });
  };

  const handleShippingBilling = (e) => {
    setShippingBillingAddress({
      ...shippingBillingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    toast({
      position: "bottom-right",
      title: "Data has been processed!",
      description: "On to Review Order!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={10} className="shipping-billing">
      <Box
        // bg={"blackAlpha.300"}
        p={8}
        boxShadow={"base"}
        border="1px"
        borderColor={"blackAlpha.500"}
        borderRadius={8}
        w={"4xl"}
      >
        <form id="shipping-form" onSubmit={(e) => handleSubmitShipping(e)}>
          <FormControl isRequired>
            <FormLabel>Shipping Address</FormLabel>
            <Input
              variant="filled"
              name="shipAddress"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.shipAddress}
              placeholder={"Shipping Address..."}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              variant="filled"
              name="shipCity"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.shipCity}
              placeholder={"City"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Input
              variant="filled"
              name="shipState"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.shipState}
              placeholder="State"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input
              variant="filled"
              name="shipCode"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.shipCode}
              placeholder="Postal Code"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              variant="filled"
              name="shipCountry"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.shipCountry}
              placeholder="Country"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="yellow"
            variant="solid"
            width="-webkit-fit-content"
            mt={5}
            p={5}
            form="shipping-form"
          >
            Create
          </Button>
        </form>
      </Box>
      {/* <Divider mt={5} mb={5} w={"5xl"} /> */}
      <Box
        mt={10}
        p={8}
        border="1px"
        borderColor={"blackAlpha.500"}
        boxShadow={"base"}
        borderRadius={8}
        w={"4xl"}
      >
        <form id="billing-form" onSubmit={(e) => handleSubmitBilling(e)}>
          <FormControl isRequired>
            <FormLabel>Billing Address</FormLabel>
            <Input
              variant="filled"
              name="billAddress"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.billAddress}
              placeholder={"Billing Address..."}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              variant="filled"
              name="billCity"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.billCity}
              placeholder={"City"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Input
              variant="filled"
              name="billState"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.billState}
              placeholder="State"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input
              variant="filled"
              name="billCode"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.billCode}
              placeholder="Code"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              variant="filled"
              name="billCountry"
              onChange={handleShippingBilling}
              value={shippingBillingAddress.billCountry}
              placeholder="Country"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="yellow"
            variant="solid"
            width="-webkit-fit-content"
            mt={5}
            p={5}
            form="billing-form"
          >
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
};

Shipping.propTypes = {
  updateAddress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  shipping: state.shipping,
});

export default connect(mapStateToProps, { updateAddress })(Shipping);
