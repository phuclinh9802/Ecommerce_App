import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link, useHistory, useLocation } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import {
  Button,
  FormLabel,
  FormControl,
  Input,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { useSelector, connect } from "react-redux";
import { loginUser, googleUser } from "../../actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";
import { ACCOUNT_NOT_FOUND_MESSAGE } from "../../constants/messages";
import { LOG_IN } from "../../constants/auth";

const Login = ({ isOpen, onClose, onOpen, loginUser, googleUser }) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    errors: {},
  });
  const initialRef = useRef();
  const finalRef = useRef();
  const auth = useSelector((state) => state.auth);
  const { user, isAuthenticated, me } = auth;
  const toast = useToast();

  const history = useHistory();
  const location = useLocation();
  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    if (isAuthenticated && location.pathname !== "/login") {
      console.log("different");
      history.push(location.pathname);
    } else if (isAuthenticated) {
      console.log("different here");
      history.push("/dashboard");
    } else if (Object.keys(errors).length > 0) {
      toast({
        position: "bottom-right",
        title: "Please check your username/password",
        description: JSON.stringify(errors),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isAuthenticated]);

  const handleGoogle = () => {
    const newWindow = window.open(
      "http://localhost:5000/auth/google",
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      let timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) clearInterval(timer);
          console.log("Yay we're authenticated");
          googleUser();
          history.push("/dashboard");
        }
      }, 5000);
    }

    // toast({
    //   position: "bottom-right",
    //   title: "Hello, " + me.firstName + " " + me.lastName,
    //   description: "Welcome to eComShop! ",
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    // });
  };

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const userInfo = {
    email: userLogin.email,
    password: userLogin.password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(userInfo);
    history.push("/dashboard");
    onClose();
    toast({
      position: "bottom-right",
      title: "Hello, " + me.firstName + " " + me.lastName,
      description: "Welcome to eComShop! ",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  let err = [];
  let desc = "";
  const onSubmit = () => {
    if (isAuthenticated) {
      if (Object.keys(errors) > 0) {
        for (var e in errors) delete errors[e];
      }
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody pb={6}>
            <ModalCloseButton />
            <Button colorScheme="red" onClick={handleGoogle}>
              Google
            </Button>
            <form id="login-form" noValidate onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                  name="email"
                  ref={initialRef}
                  onChange={handleChange}
                  value={userLogin.email}
                  error={errors.email}
                  type="email"
                  placeholder="johndoe@gmail.com"
                />
                <span className="red-text" style={{ color: "red" }}>
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                  name="password"
                  onChange={handleChange}
                  value={userLogin.password}
                  error={errors.password}
                  type="password"
                  placeholder="Password"
                  required
                />
                <span className="red-text" style={{ color: "red" }}>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </FormControl>
            </form>
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
                {ACCOUNT_NOT_FOUND_MESSAGE}
              </ChakraLink>
            </Link>
            <Button
              type="submit"
              colorScheme="teal"
              variant="outline"
              width="-webkit-fit-content"
              mr={3}
              form="login-form"
              onClick={onSubmit}
            >
              {LOG_IN}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  googleUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, googleUser })(
  withRouter(Login)
);
