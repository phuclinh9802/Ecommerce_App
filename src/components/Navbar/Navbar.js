import React, { useState } from 'react';
import { Box, Text, Flex, Button, HStack } from '@chakra-ui/react'
import { data } from '../../data/data';
import { Link } from 'react-scroll';
import SearchBar from 'material-ui-search-bar';
import { useSelector, useDispatch } from 'react-redux';
import { toggling } from '../../reducers/toggleSlice'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const SIGN_UP = "Sign Up"
const SIGN_IN = "Sign In"
const LOG_OUT = "Log Out"
const USER = "Phillip"

const Navbar = () => {
    const [searchText, setSearchText] = useState('')
    // const [toggle, setToggle] = useState(false)
    const toggle = useSelector((state) => state.toggle.value)
    const dispatch = useDispatch()

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
                            <Button colorScheme='teal'>
                                {SIGN_UP}
                            </Button>

                            <Button colorScheme='red' onClick={() => dispatch(toggling(true))}>
                                {SIGN_IN}
                            </Button>
                        </HStack>
                        :
                        <HStack>
                            <Button className="cart" variant="ghost">
                                <AddShoppingCartIcon />
                            </Button>
                            <span className='userName'>
                                Welcome, {USER}
                            </span>
                            <Button colorScheme='red' onClick={() => dispatch(toggling(false))}>
                                {LOG_OUT}
                            </Button>

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
