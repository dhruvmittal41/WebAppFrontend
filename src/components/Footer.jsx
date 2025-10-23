import { Box, Text, Link, Stack, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r, pink.50, yellow.50)"
      width="100%"
      py={4}
      mt="auto"
      textAlign="center"
    >
      <Stack spacing={1} align="center">
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          Developed with ❤️ by{" "}
          <Link
            href="mailto:mittaldhruv41@gmail.com"
            isExternal
            color="orange.400"
            _hover={{ textDecoration: "underline" }}
          >
            Dhruv Mittal
          </Link>
        </Text>
      </Stack>
    </Box>
  );
}
