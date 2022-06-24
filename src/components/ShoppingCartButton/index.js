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
      <Drawer placement="right" size={'md'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Shopping Cart</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCartButton;
