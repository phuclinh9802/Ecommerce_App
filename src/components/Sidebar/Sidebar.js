import React from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiPlus
} from "react-icons/fi";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar() {
  // bg={useColorModeValue("gray.100", "gray.900")}
  return (
    <Box display="block">
      <SidebarContent />
    </Box>
  );
}

const SidebarContent = ({ ...rest }) => {
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
      </Flex>
      <Stack mt={2}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
        <NavItem key="create-product" icon={FiPlus} href={'/admin/product/create'}>
          Create Product
        </NavItem>
      </Stack>
    </Box>
  );
};

const NavItem = ({ href, icon, children, ...rest }) => {
  return (
    <Link
      href={href}
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

