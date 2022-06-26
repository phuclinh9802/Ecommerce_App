import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  Grid,
  GridItem,
  Flex,
  Center,
  Divider,
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
          <Flex flexDirection={'column'} gap={5}>
            {items.map((el) => {
              return (
                <>
                  <Grid alignItems={'center'} justifyContent={'center'} gap={2} gridTemplateColumns={'1fr 1fr 50px'}>
                    <GridItem >
                      <p>{el.name}</p>
                    </GridItem>
                    <GridItem>
                      <Center>
                        <img src={el.image} width="180px" height="180px" />
                      </Center>
                    </GridItem>
                    <GridItem>
                      <Center>
                        <Button colorScheme={'red'} variantColor={'red'} variant="ghost" size="sm" borderRadius={50}>X</Button>
                      </Center>
                    </GridItem>
                  </Grid>
                  <Divider width={'100%'} />
                </>
              )
            })}
          </Flex>

        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer;