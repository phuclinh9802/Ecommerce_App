import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  useDisclosure,
  Button,
  FormLabel,
  FormControl,
  Input,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Login from "./Login";
import { SIGN_UP } from "../../constants/auth";

const Register = (props) => {
  // initial state:
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    error: {},
  });

  const { isOpen, onClose, onOpen } = props;
  //   const { isOpen, onClose, onOpen } = useDisclosure();
  //   const {
  //     isOpen: isLoginOpen,
  //     onOpen: onLoginOpen,
  //     onClose: onLoginClose,
  //   } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const inputRef = React.createRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.button.current.click();
    }, 5000);
  }, []);

  const fun = () => {
    console.log("Hello!");
  };

  const handleChange = (e) => {
    setUser({ [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,
    password2: user.password2,
  };
  return (
    <>
      {/* <Button colorScheme="teal" onClick={onOpen}>
        {SIGN_UP}
      </Button> */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalBody pb={6}>
              <ModalCloseButton />
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input ref={initialRef} placeholder="Username" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input ref={initialRef} placeholder="First Name..." />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input ref={initialRef} placeholder="Last Name..." />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm Password" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Link to="/login">
                <ChakraLink
                  mr={10}
                  onClick={() => {
                    onClose();
                    onOpen();
                  }}
                >
                  Already have an account? Click here
                </ChakraLink>
              </Link>
              <Link to="/">
                <Button
                  type="submit"
                  variantColor="teal"
                  variant="outline"
                  width="full"
                  mr={3}
                  onClick={() => {
                    onClose();
                    console.log("success!");
                  }}
                >
                  Register
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default Register;
