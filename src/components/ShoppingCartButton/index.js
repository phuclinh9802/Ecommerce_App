import React from "react";
import {
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "./index.css";
import CartDrawer from "../CartDrawer/CartDrawer";
const ShoppingCartButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="unstyled"
        onClick={onOpen}
      >
        <AddShoppingCartIcon />
      </Button>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ShoppingCartButton;
