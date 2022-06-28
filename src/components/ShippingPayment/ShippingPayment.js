import Shipping from "./Shipping/Shipping";
import {
  Grid,
  GridItem,
  Button,
  Box,
  Center,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
const ShippingPayment = () => {
  const handleSubmit = (e) => {};
  const handleClick = (e) => {};

  const items = useSelector((state) => state.cart.items);

  console.log(JSON.stringify(items));
  let allPrice = 0;
  items.forEach((item) => {
    allPrice = allPrice + item.price * item.quantity;
  });

  return (
    <Grid p={10} gridTemplateColumns={"2fr 1fr 100px"}>
      <GridItem>
        <Shipping />
      </GridItem>
      <GridItem pt={10}>
        <Box p={5} border="1px" borderColor="blackAlpha.500">
          <Box p={2} pb={5}>
            <Text fontSize={"lg"} fontWeight="bold">
              Your Order
            </Text>
          </Box>
          <Divider />
          <Grid pt={5} pb={5}>
            {items.map((el) => {
              let totalPrice = Number(el.price) * Number(el.quantity);
              return (
                <Grid
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                  gridTemplateColumns={"150px 1fr 100px 50px"}
                >
                  <GridItem>
                    <Center>
                      <img
                        src={el.image}
                        alt={el.name}
                        width="80px"
                        height="80px"
                      />
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Text fontSize="sm">{el.name}</Text>
                    <Text fontSize="sm" color="blackAlpha.500">
                      ${el.price}
                    </Text>
                  </GridItem>
                  <GridItem>
                    {/* <Center> */}
                    <Flex justifyContent={"flex-end"}>
                      <Text fontWeight={"bold"} fontSize="md">
                        ${totalPrice}
                      </Text>
                    </Flex>
                    <Flex flexDirection={"row"} justifyContent="end" gap={5}>
                      <Text fontSize="sm" pt={1}>
                        <em>Qty: {el.quantity}</em>
                      </Text>
                    </Flex>
                    {/* </Center> */}
                  </GridItem>
                </Grid>
              );
            })}
          </Grid>
          <Divider />

          <Flex
            flexDirection={"row"}
            justifyContent="flex-end"
            gap={5}
            pt={5}
            pb={5}
          >
            <Text fontSize={"lg"}>Total: </Text>
            <Text fontSize={"lg"} fontWeight="semibold">
              ${allPrice}
            </Text>
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <Button
              type="submit"
              colorScheme="whatsapp"
              variant="solid"
              width="-webkit-fit-content"
              form="billing-shipping"
              onClick={handleClick}
            >
              Place Your Order
            </Button>
          </Flex>
        </Box>
        <form id="billing-shipping" onSubmit={handleSubmit}></form>
      </GridItem>
    </Grid>
  );
};

export default ShippingPayment;
