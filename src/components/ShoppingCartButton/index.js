import React, { forwardRef, useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Portal,
} from "@chakra-ui/react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "./index.css";
const ShoppingCartButton = ({ isLight }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="unstyled"
            // className={isLight ? "cart-light" : "cart"}
            // colorScheme="white"
            // variant="ghost"
          >
            <AddShoppingCartIcon />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Here's what you chose</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Button colorScheme="blue">Button</Button>
              <Button colorScheme="blue">Button</Button>
              <Button colorScheme="blue">Button</Button>
            </PopoverBody>
            <PopoverFooter>
              <Button style={{ float: "right" }} colorScheme="orange">
                Checkout
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default ShoppingCartButton;
