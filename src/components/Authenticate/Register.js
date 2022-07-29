import React, { Component } from "react";
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
    Button,
    FormLabel,
    FormControl,
    Input,
    Link as ChakraLink,
} from "@chakra-ui/react";

import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import classnames from 'classnames'
import { CONFIRM_PASSWORD, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD } from "../../constants/label";
import { ACCOUNT_FOUND_MESSAGE } from "../../constants/messages";

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
        this.props.registerUser(newUser, this.props.history)
    };



    render() {
        const { isOpen, onClose, onOpen } = this.props;
        const { errors } = this.state;

        return (
            <>
                <Modal
                    initialFocusRef={this.initialRef}
                    finalFocusRef={this.finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="2xl"

                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Login</ModalHeader>
                        <ModalBody pb={6}>
                            <ModalCloseButton />
                            <form id="register-form" noValidate onSubmit={this.handleSubmit}>
                                <FormControl isRequired>
                                    <FormLabel>{EMAIL}</FormLabel>
                                    <Input className={classnames("", { invalid: errors.email })} name="email" onChange={this.handleChange} value={this.state.email} error={errors.email} ref={this.initialRef} placeholder="Username" />
                                    <span className="red-text">{errors.email}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>{FIRST_NAME}</FormLabel>
                                    <Input className={classnames("", { invalid: errors.firstName })} name="firstName" onChange={this.handleChange} value={this.state.firstName} error={errors.firstName} placeholder="First Name..." />
                                    <span className="red-text">{errors.firstName}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>{LAST_NAME}</FormLabel>
                                    <Input className={classnames("", { invalid: errors.lastName })} name="lastName" onChange={this.handleChange} value={this.state.lastName} error={errors.lastName} placeholder="Last Name..." />
                                    <span className="red-text">{errors.lastName}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>{PASSWORD}</FormLabel>
                                    <Input className={classnames("", { invalid: errors.password })} name="password" onChange={this.handleChange} value={this.state.password} error={errors.password} type="password" placeholder="Password" />
                                    <span className="red-text">{errors.password}</span>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>{CONFIRM_PASSWORD}</FormLabel>
                                    <Input className={classnames("", { invalid: errors.password2 })} name="password2" onChange={this.handleChange} value={this.state.password2} error={errors.password2} type="password" placeholder="Confirm Password" />
                                    <span className="red-text">{errors.password2}</span>
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
                                    {ACCOUNT_FOUND_MESSAGE}
                                </ChakraLink>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="teal"
                                variant="outline"
                                width="-webkit-fit-content"
                                mr={3}
                                form="register-form"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Register
                            </Button>
                        </ModalFooter>
                    </ModalContent>
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
