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
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { deleteCart } from "../../actions/cartActions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from "react";
import { updateQtyProduct } from "../../actions/productActions";


const CartDrawer = ({ onClose, isOpen, quantity, updatedPrice, deleteCart, updateQtyProduct }) => {
  const cart = useSelector((state) => state.cart)
  const products = useSelector((state) => state.products);
  let { items } = cart;
  let { qty, price } = products;


  // console.log('quantity: ' + quantity)
  // console.log('price: ' + price)

  const handleDelete = (id) => {
    deleteCart(id)
  }
  // console.log(JSON.stringify(data))

  return (
    <Drawer placement="right" size={'xl'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Shopping Cart</DrawerHeader>
        <DrawerBody>
          <Flex flexDirection={'column'} gap={5}>
            {items.map((el) => {
              let totalPrice = Number(el.price) * Number(el.quantity);
              return (
                <>
                  <Grid alignItems={'center'} justifyContent={'center'} gap={2} gridTemplateColumns={'150px 1fr 150px 150px'}>
                    <GridItem>
                      <Center>
                        <img src={el.image} alt={el.name} width="120px" height="120px" />
                      </Center>
                    </GridItem>
                    <GridItem >
                      <p>{el.name}</p>
                      <Text fontSize="sm" color='blackAlpha.500'>${el.price}</Text>
                    </GridItem>
                    <GridItem >
                      {/* <Center> */}
                      <Flex justifyContent={'flex-end'}>
                        <Text fontSize="lg">${totalPrice}</Text>
                      </Flex>
                      {/* </Center> */}
                    </GridItem>
                    <GridItem>
                      <Flex flexDirection={'row'} justifyContent='end' gap={5} >
                        <Text pt={1}>Qty: {el.quantity}</Text>
                        <Button
                          colorScheme={'red'}
                          variantColor={'red'}
                          variant="ghost"
                          size="sm"
                          borderRadius={50}
                          onClick={() => handleDelete(el.id)}
                        >X</Button>
                      </Flex>
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

CartDrawer.propTypes = {
  deleteCart: PropTypes.func.isRequired,
  updateQtyProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  products: state.products,
})

export default connect(mapStateToProps, { deleteCart, updateQtyProduct })(CartDrawer);