import React, { Component, useState, useMemo } from "react";
import { Navigate, Link } from "react-router-dom";
import isAuthenticated from "../../lib/authenticate";
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

import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import classnames from 'classnames'
import PropTypes from 'prop-types'



class Login extends Component {
    //   const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", errors: {} }
        this.initialRef = React.createRef()
        this.finalRef = React.createRef()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userLogin)
        console.log(userLogin)

    }

    render() {
        const { errors } = this.state;
        const { isOpen, onClose, onOpen } = this.props;

        // POST request to server
        return (
            <>
                <Modal
                    initialFocusRef={this.initialRef}
                    finalFocusRef={this.finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Login</ModalHeader>
                        <ModalBody pb={6}>
                            <ModalCloseButton />
                            <form id="login-form" noValidate onSubmit={(e) => this.handleSubmit(e)}>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input className={classnames("", { invalid: errors.email || errors.emailnotfound })} name="email" ref={this.initialRef} onChange={this.handleChange} value={this.state.email} error={errors.email} type="email" placeholder="johndoe@gmail.com" />
                                    <span className="red-text">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input className={classnames("", { invalid: errors.password || errors.passwordincorrect })} name="password" onChange={this.handleChange} value={this.state.password} error={errors.password} type="password" placeholder="Password" required />
                                    <span className="red-text">
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
                                    Already have an account? Click here
                                </ChakraLink>
                            </Link>
                            <Button
                                type="submit"
                                variantColor="teal"
                                variant="outline"
                                width="full"
                                mr={3}
                                form="login-form"
                                onClick={onClose}
                            >
                                Login
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };
}
// }

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
