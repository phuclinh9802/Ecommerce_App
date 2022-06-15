import ProductList from "./ProductList/ProductList";
import { withRouter } from 'react-router-dom'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
    VStack,
    HStack,
    Box,
    CloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { onClose } = useDisclosure();
    const auth = useSelector((state) => state.auth)
    const { isAuthenticated, user } = auth
    let fullName = isAuthenticated ? user.firstName + " " + user.lastName : ""

    return (
        <>
            {/* <Box>
                <HStack>
                    {isAuthenticated &&
                        (<Alert status='success'>
                            <AlertIcon />
                            Welcome, {fullName}
                            <CloseButton
                                alignSelf='flex-start'
                                position='relative'
                                right={-1}
                                top={-1}
                                onClick={onClose}
                            />
                        </Alert>)
                        //  : (
                        //     <Alert status='error'>
                        //         <AlertIcon />
                        //         There is something wrong with your account, please try again.
                        //     </Alert>
                        // )
                    }
                </HStack>
            </Box> */}
            <ProductList />

        </>
    )
}

export default withRouter(Dashboard);