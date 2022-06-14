import React, { useEffect, useState, Component } from "react";
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

import { Link, withRouter } from "react-router-dom";
import Login from "./Login";
import { SIGN_UP } from "../../constants/auth";
import { connect } from 'react-redux'
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import classnames from 'classnames'

class Register extends Component {
    constructor(props) {
        super(props);
        // initial state:
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            password2: "",
            errors: {},
        };
        this.initialRef = React.createRef()
        this.finalRef = React.createRef()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            password2: this.state.password2,
        };
        console.log(newUser)
        this.props.registerUser(newUser, this.props.history)
    };



    render() {
        const { isOpen, onClose, onOpen } = this.props;
        const { errors } = this.state;

        return (
            <>
                {/* <Button colorScheme="teal" onClick={onOpen}>
        {SIGN_UP}
      </Button> */}
                <Modal
                    initialFocusRef={this.initialRef}
                    finalFocusRef={this.finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="xl"
                >
                    <ModalOverlay />
                    <form noValidate onSubmit={this.handleSubmit}>
                        <ModalContent>
                            <ModalHeader>Login</ModalHeader>
                            <ModalBody pb={6}>
                                <ModalCloseButton />
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input className={classnames("", { invalid: errors.email })} name="email" onChange={this.handleChange} value={this.state.email} error={errors.email} ref={this.initialRef} placeholder="Username" />
                                    <span className="red-text">{errors.email}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input className={classnames("", { invalid: errors.firstName })} name="firstName" onChange={this.handleChange} value={this.state.firstName} error={errors.firstName} placeholder="First Name..." />
                                    <span className="red-text">{errors.firstName}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input className={classnames("", { invalid: errors.lastName })} name="lastName" onChange={this.handleChange} value={this.state.lastName} error={errors.lastName} placeholder="Last Name..." />
                                    <span className="red-text">{errors.lastName}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input className={classnames("", { invalid: errors.password })} name="password" onChange={this.handleChange} value={this.state.password} error={errors.password} type="password" placeholder="Password" />
                                    <span className="red-text">{errors.password}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input className={classnames("", { invalid: errors.password2 })} name="password2" onChange={this.handleChange} value={this.state.password2} error={errors.password2} type="password" placeholder="Confirm Password" />
                                    <span className="red-text">{errors.password2}</span>
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
    }
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
