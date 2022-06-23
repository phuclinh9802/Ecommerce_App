import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  HStack,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  Portal,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { data } from "../../data/data";
// import { Link } from 'react-scroll';
import SearchBar from "material-ui-search-bar";
import { useSelector, useDispatch } from "react-redux";
import { toggling } from "../../reducers/toggleSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, withRouter } from "react-router-dom";
import Login from "../Authenticate/Login";
import Register from "../Authenticate/Register";
import { connect } from "react-redux";
import { currentUser, logOutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

import { SIGN_IN, SIGN_UP, LOG_OUT, USER } from "../../constants/auth";
import { BRAND, CONFIRM_MESSAGE } from "../../constants/messages";
import { CANCEL } from "../../constants/button";

import "./Navbar.css";
import ShoppingCartButton from "../ShoppingCartButton";

const Navbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const auth = useSelector((state) => state.auth);
  const { user, isAuthenticated, me } = auth;
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  console.log("Navbar: " + user.firstName);
  console.log("Navbar: " + isAuthenticated);
  console.log("Navbar: " + JSON.stringify(me));

  // login modal
  const { onOpen, isOpen, onClose } = useDisclosure();

  const token = localStorage.getItem("jwtToken");
  console.log("token: " + token);
  useEffect(() => {
    props.currentUser();
  }, [token]);

  // toast for notification
  // const toast = useToast()

  // register modal
  const {
    onOpen: onOpenRegisterModal,
    isOpen: isOpenRegisterModal,
    onClose: onCloseRegisterModal,
  } = useDisclosure();

  // logout modal
  const {
    onOpen: onOpenLogOut,
    isOpen: isOpenLogOut,
    onClose: onCloseLogOut,
  } = useDisclosure();

  const handleLogOut = (e) => {
    e.preventDefault();
    onCloseLogOut();
    for (var e in errors) {
      delete errors[e];
    }
    props.logOutUser();
  };

  return (
    <Box w="100%" className="nav-bar">
      <Flex
        w="100%"
        px="5"
        py="5"
        align="center"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <Link to="/">
          <Button variant="solid">{BRAND}</Button>
        </Link>
        <HStack as="nav">
          <SearchBar
            style={{ width: "1000px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onRequestSearch={() => {}}
          />
        </HStack>
        {!isAuthenticated ? (
          <HStack>
            <Link to="/register">
              <Button colorScheme="teal" onClick={onOpenRegisterModal}>
                {SIGN_UP}
              </Button>
            </Link>
            <Register
              onOpen={onOpen}
              isOpen={isOpenRegisterModal}
              onClose={onCloseRegisterModal}
            />
            {/* <Button colorScheme='red' onClick={() => dispatch(toggling(true))}>
                                    {SIGN_IN}
                                </Button> */}
            <Link to="/login">
              <Button colorScheme="red" onClick={onOpen}>
                {SIGN_IN}
              </Button>
            </Link>
            <Login
              onOpen={onOpenRegisterModal}
              isOpen={isOpen}
              onClose={onClose}
              isAuthenticated={isAuthenticated}
            />
          </HStack>
        ) : (
          <HStack>
            <div style={{ display: "none" }}>
              <Login
                onOpen={onOpenRegisterModal}
                isOpen={isOpen}
                onClose={onClose}
                isAuthenticated={isAuthenticated}
              />
            </div>
            <ShoppingCartButton />
            <span className="userName">
              Welcome, {me.firstName + " " + me.lastName}
            </span>
            <Link to="/">
              <Button colorScheme="red" onClick={onOpenLogOut}>
                {LOG_OUT}
              </Button>
              <Modal isOpen={isOpenLogOut} onClose={onCloseLogOut}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{LOG_OUT}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>{CONFIRM_MESSAGE}</ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleLogOut}>
                      {LOG_OUT}
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      {CANCEL}
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Link>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

// const Logo = (props) => {
//     return (
//         <Box {...props}>
//             <Text fontSize="lg" fontWeight="bold">
//                 eComShop
//             </Text>
//         </Box>
//     );
// };

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOutUser, currentUser })(
  withRouter(Navbar)
);
