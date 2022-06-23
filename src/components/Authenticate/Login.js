import React, { Component, useState, useEffect, useRef } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import { isEmpty } from "is-empty";
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
  useDisclosure,
  Button,
  FormLabel,
  FormControl,
  Input,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { useSelector, connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  ACCOUNT_FOUND_MESSAGE,
  ACCOUNT_NOT_FOUND_MESSAGE,
} from "../../constants/messages";
import { LOG_IN } from "../../constants/auth";

const Login = ({ isOpen, onClose, onOpen, loginUser }) => {
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
  // const { isOpen, onClose, onOpen, onNotification } = props;
  const errors = useSelector((state) => state.errors);
  // console.log("Login: " + isAuthenticated)
  // console.log("Login " + JSON.stringify(user));
  // useEffect(() => {
  //     // console.log("inside useeffect " + isAuthenticated)
  //     history.push('/dashboard')
  // }, [isAuthenticated])

  // console.log(JSON.stringify(errors))
  // console.log(errors.email)
  // console.log(errors.password)

  console.log("isAuthenticated: " + isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
      history.push("/dashboard");
      toast({
        position: "bottom-right",
        title: "Welcome, " + me.firstName + " " + me.lastName,
        description: "We're glad to have you here!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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

  //   if (isAuthenticated) {
  //     onClose();
  //     history.push("/dashboard");
  //     toast({
  //       position: "bottom-right",
  //       title: "Welcome, " + user.firstName + " " + user.lastName,
  //       description: "We're glad to have you here!",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } else if (Object.keys(errors).length > 0) {
  //     toast({
  //       position: "bottom-right",
  //       title: "Please check your username/password",
  //       description: JSON.stringify(errors),
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }

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
    console.log(userInfo);
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
              variantColor="teal"
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

// class Login extends Component {
//     //   const [loggedIn, setLoggedIn] = useState(isAuthenticated());
//     constructor(props) {
//         super(props);
//         this.state = { email: "", password: "", errors: {} }
//         this.initialRef = React.createRef()
//         this.finalRef = React.createRef()
//     }

//     componentWillReceiveProps(nextProps) {
//         console.log("nextProps: " + nextProps.location.pathname)
//         console.log("this.props: " + this.props.location.pathname)
//         console.log(nextProps.auth.isAuthenticated + " comp")
//         if (nextProps.auth.isAuthenticated && nextProps.location.pathname == this.props.location.pathname) {
//             console.log("isAuthenticated")
//             this.props.history.push('/dashboard')
//         }
//         // if (nextProps.errors) {
//         //     this.setState({
//         //         errors: nextProps.errors
//         //     })
//         // }
//     }

//     handleChange = (e) => {
//         this.setState({ ...this.state, [e.target.name]: e.target.value })
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         const userLogin = {
//             email: this.state.email,
//             password: this.state.password
//         }
//         this.props.loginUser(userLogin)
//         console.log(userLogin)

//     }

//     render() {
//         const { errors } = this.state;
//         const { isOpen, onClose, onOpen, onNotification } = this.props;
//         const { auth } = this.props
//         console.log("this.props.auth.isAuthenticated: " + auth.isAuthenticated);

//         const onSubmit = () => {
//             onClose();
//             onNotification();
//         }

//         // POST request to server
//         return (
//             <>
//                 <Modal
//                     initialFocusRef={this.initialRef}
//                     finalFocusRef={this.finalRef}
//                     isOpen={isOpen}
//                     onClose={onClose}
//                     size="xl"
//                 >
//                     <ModalOverlay />
//                     <ModalContent>
//                         <ModalHeader>Login</ModalHeader>
//                         <ModalBody pb={6}>
//                             <ModalCloseButton />
//                             <form id="login-form" noValidate onSubmit={(e) => this.handleSubmit(e)}>
//                                 <FormControl isRequired>
//                                     <FormLabel>Email</FormLabel>
//                                     <Input className={classnames("", { invalid: errors.email || errors.emailnotfound })} name="email" ref={this.initialRef} onChange={this.handleChange} value={this.state.email} error={errors.email} type="email" placeholder="johndoe@gmail.com" />
//                                     <span className="red-text">
//                                         {errors.email}
//                                         {errors.emailnotfound}
//                                     </span>
//                                 </FormControl>
//                                 <FormControl isRequired>
//                                     <FormLabel>Password</FormLabel>
//                                     <Input className={classnames("", { invalid: errors.password || errors.passwordincorrect })} name="password" onChange={this.handleChange} value={this.state.password} error={errors.password} type="password" placeholder="Password" required />
//                                     <span className="red-text">
//                                         {errors.password}
//                                         {errors.passwordincorrect}
//                                     </span>
//                                 </FormControl>
//                             </form>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Link to="/login">
//                                 <ChakraLink
//                                     mr={10}
//                                     onClick={() => {
//                                         onClose();
//                                         onOpen();
//                                     }}
//                                 >
//                                     {ACCOUNT_NOT_FOUND_MESSAGE}
//                                 </ChakraLink>
//                             </Link>
//                             <Button
//                                 type="submit"
//                                 variantColor="teal"
//                                 variant="outline"
//                                 width="-webkit-fit-content"
//                                 mr={3}
//                                 form="login-form"
//                                 onClick={onSubmit}
//                             >
//                                 {LOG_IN}
//                             </Button>
//                         </ModalFooter>
//                     </ModalContent>
//                 </Modal>
//             </>
//         );
//     };
// }

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
