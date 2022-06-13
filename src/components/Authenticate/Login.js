import React, { Component, useState } from 'react';
import { Navigate, Link } from 'react-router-dom'
import isAuthenticated from '../../lib/authenticate'
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure, Button, FormLabel, FormControl, Input } from '@chakra-ui/react';
import { SIGN_IN } from '../../constants/auth';

const Login = (props) => {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated())
    const { isOpen, onClose } = props;

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let form = e.target
        let formData = new FormData(form)
        let params = new URLSearchParams()
        params.append('username', formData.get('username'))
        params.append('password', formData.get('password'))
        params.append('remember', formData.get('remember'))

        // POST request to server
        fetch('/api/login', {
            method: 'POST',
            body: params
        }).then((res) => {
            return res.json()
        }).then(data => {
            localStorage.setItem('token', data.token)
            setLoggedIn(true)
        }).catch((err) => {
            console.error(err)
        })
    }

    // if (loggedIn) {
    //     return (
    //         <Navigate to={{ pathname: '/', state: { from: this.props.location } }}
    //         />
    //     )
    // }

    // else {
    return (
        <>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Password" required />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Link to="/dashboard">
                                <Button type="submit" variantColor="teal" variant="outline" width="full" mr={3}>
                                    Login
                                </Button>
                            </Link>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>

    )
}
// }

export default Login;