import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, HStack, useDisclosure } from '@chakra-ui/react'
import { data } from '../../data/data';
// import { Link } from 'react-scroll';
import SearchBar from 'material-ui-search-bar';
import { useSelector, useDispatch } from 'react-redux';
import { toggling } from '../../reducers/toggleSlice'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom'
import Login from '../Authenticate/Login'

import { SIGN_IN, SIGN_UP, LOG_OUT, USER } from '../../constants/auth';


const Navbar = () => {
    const [searchText, setSearchText] = useState('')
    const [user, setUser] = useState('')
    // const [toggle, setToggle] = useState(false)
    const toggle = useSelector((state) => state.toggle.value)
    const dispatch = useDispatch()
    const { onOpen, isOpen, onClose } = useDisclosure()

    useEffect(() => {
        fetch('/api/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json()
        }).then(user => {
            setUser(user)
        }).catch(err => {
            console.log(err)
        })
    })

    let username = user.username


    return (
        <Box w="100%">
            <Flex w="100%" px="5" py="5" align="center" justify="space-between"
                display={{ base: 'none', md: 'flex' }}>
                <Button variant="solid">
                    eComShop
                </Button>
                <HStack as="nav">
                    <SearchBar
                        style={{ width: '1000px' }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onRequestSearch={() => { }} />
                </HStack>
                {
                    toggle ?
                        <HStack>
                            <Link to='/register'>
                                <Button colorScheme='teal'>
                                    {SIGN_UP}
                                </Button>
                            </Link>
                            {/* <Button colorScheme='red' onClick={() => dispatch(toggling(true))}>
                                    {SIGN_IN}
                                </Button> */}
                            <Link to='/login'>
                                <Button colorScheme="red" onClick={onOpen}>{SIGN_IN}</Button>
                            </Link>
                            <Login isOpen={isOpen} onClose={onClose} />
                        </HStack>
                        :
                        <HStack>
                            <Button className="cart" variant="ghost">
                                <AddShoppingCartIcon />
                            </Button>
                            <span className='userName'>
                                Welcome, {username}
                            </span>
                            <Link to='/logout'>
                                <Button colorScheme='red' onClick={() => dispatch(toggling(false))}>
                                    {LOG_OUT}
                                </Button>
                            </Link>

                        </HStack>
                }
            </Flex>

        </Box>
    )
}




const Logo = (props) => {
    return (
        <Box {...props}>
            <Text fontSize="lg" fontWeight="bold">
                eComShop
            </Text>
        </Box>
    )
}

export default Navbar;
