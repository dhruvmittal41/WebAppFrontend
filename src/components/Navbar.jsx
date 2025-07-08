import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  VStack,
  Collapse,
  useDisclosure,
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
    <Box
      as="nav"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        bg: "pink.100",
        px: { base: 4, md: 8 },
        py: 3,
        boxShadow: "md",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          h: 16,
        }}
      >
        {/* Logo / Title */}
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "xl",
            color: "pink.700",
            letterSpacing: "wide",
          }}
        >
          Wedding
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle Navigation"
          sx={{
            display: { base: "flex", md: "none" },
            color: "pink.700",
            fontSize: "xl",
          }}
        />

        {/* Desktop Links */}
        <HStack
          as="ul"
          spacing={6}
          sx={{
            display: { base: "none", md: "flex" },
          }}
        >
          {navItems.map((item) => (
            <Link
              as={RouterLink}
              key={item.name}
              to={item.path}
              sx={{
                fontWeight: "semibold",
                color: "pink.700",
                fontSize: "md",
                _hover: { textDecoration: "underline", color: "pink.600" },
              }}
            >
              {item.name}
            </Link>
          ))}
        </HStack>
      </Flex>

      {/* Mobile Collapse Menu */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          spacing={4}
          align="start"
          sx={{
            mt: 4,
            display: { md: "none" },
            px: 2,
          }}
        >
          {navItems.map((item) => (
            <Link
              as={RouterLink}
              key={item.name}
              to={item.path}
              onClick={onToggle}
              sx={{
                w: "full",
                fontWeight: "semibold",
                color: "pink.700",
                py: 2,
                px: 3,
                borderRadius: "md",
                transition: "all 0.2s ease",
                _hover: {
                  bg: "pink.200",
                  color: "pink.800",
                  textDecoration: "none",
                },
              }}
            >
              {item.name}
            </Link>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
}
