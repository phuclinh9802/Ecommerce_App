import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";



const CartDrawer = ({ onClose, isOpen }) => {
  const cart = useSelector((state) => state.cart)
  let { items } = cart;

  // console.log(JSON.stringify(data))

  return (
    <Drawer placement="right" size={'md'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Shopping Cart</DrawerHeader>
        <DrawerBody>
          {items.map((el) => {
            return (
              <>
                <p>{el.name}</p>
                <img src={el.image} />
              </>
            )
          })}

        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer;