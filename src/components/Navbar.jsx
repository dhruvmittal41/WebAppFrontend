import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  VStack,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink as RouterLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Programs", path: "/programs" },
  { name: "Gallery", path: "/gallery" },
  { name: "Story", path: "/story" },
  { name: "Blessings", path: "/blessings" },
  { name: "Map", path: "/map" },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="pink.100" px={{ base: 4, md: 6 }} py={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo or Title (Optional) */}
        <Box fontWeight="bold" color="pink.700" fontSize="lg">
          Wedding
        </Box>

        {/* Hamburger Menu (Mobile) */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle Navigation"
        />

        {/* Desktop Nav Links */}
        <HStack
          spacing={6}
          display={{ base: "none", md: "flex" }}
        >
          {navItems.map((item) => (
            <Link
              as={RouterLink}
              key={item.name}
              to={item.path}
              fontWeight="bold"
              color="pink.700"
              _hover={{ textDecoration: "underline" }}
            >
              {item.name}
            </Link>
          ))}
        </HStack>
      </Flex>

      {/* Mobile Nav Menu */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          align="start"
          spacing={4}
          mt={4}
          px={2}
          display={{ md: "none" }}
        >
          {navItems.map((item) => (
            <Link
              as={RouterLink}
              key={item.name}
              to={item.path}
              fontWeight="bold"
              color="pink.700"
              _hover={{ textDecoration: "underline" }}
              w="full"
              onClick={onToggle}
            >
              {item.name}
            </Link>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
}
