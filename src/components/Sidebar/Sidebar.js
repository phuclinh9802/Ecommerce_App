import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  VStack,
  Divider,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // bg={useColorModeValue("gray.100", "gray.900")}
  return (
    <Box display="block">
      <SidebarContent onClose={() => onClose} />
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  // bg={useColorModeValue("white", "gray.900")}
  return (
    <Box
      // borderRight="1px"
      // borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="sticky"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="semibold">
          Categories
        </Text>
        {/* <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} /> */}
      </Flex>
      {/* <Divider /> */}
      <Stack mt={2}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// //import useState hook to create menu collapse state
// import React, { useState } from "react";

// //import react pro sidebar components
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
// } from "react-pro-sidebar";

// //import icons from react icons
// import { FaList, FaRegHeart } from "react-icons/fa";
// import {
//   FiHome,
//   FiLogOut,
//   FiArrowLeftCircle,
//   FiArrowRightCircle,
// } from "react-icons/fi";
// import { RiPencilLine } from "react-icons/ri";
// import { BiCog } from "react-icons/bi";

// //import sidebar css from react-pro-sidebar module and our custom css
// import "react-pro-sidebar/dist/css/styles.css";
// import "./Sidebar.css";
// import { Box } from "@chakra-ui/react";

// const Header = () => {
//   //create initial menuCollapse state using useState hook
//   const [menuCollapse, setMenuCollapse] = useState(false);

//   //create a custom function that will change menucollapse state from false to true and true to false
//   const menuIconClick = () => {
//     //condition checking to change state from true to false and vice versa
//     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
//   };

//   return (
//     <Box>
//       <div id="header">
//         {/* collapsed props to change menu size using menucollapse state */}
//         <ProSidebar collapsed={menuCollapse}>
//           <SidebarHeader>
//             <div className="logotext">
//               {/* small and big change using menucollapse state */}
//               <p>{menuCollapse ? "" : "Category"}</p>
//             </div>
//             <div className="closemenu" onClick={menuIconClick}>
//               {/* changing menu collapse icon on click */}
//               {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <Menu iconShape="square">
//               {/* <MenuItem active={true} icon={<FiHome />}>
//                 Home
//               </MenuItem> */}
//               <MenuItem icon={<FaList />}>Books</MenuItem>
//               <MenuItem icon={<FaRegHeart />}>Electronics</MenuItem>
//               <MenuItem icon={<RiPencilLine />}>School Supplies</MenuItem>
//               <MenuItem icon={<BiCog />}>Settings</MenuItem>
//             </Menu>
//           </SidebarContent>
//           {/* <SidebarFooter>
//             <Menu iconShape="square">
//               <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
//             </Menu>
//           </SidebarFooter> */}
//         </ProSidebar>
//       </div>
//     </Box>
//   );
// };

// export default Header;
