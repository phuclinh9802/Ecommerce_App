import React from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "./index.css";
import CartDrawer from "../CartDrawer/CartDrawer";
const ShoppingCartButton = ({ isLight }) => {
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
