import { Box, Text, Link, Stack, useColorModeValue } from '@chakra-ui/react';

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
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          Developed with ❤️ by{' '}
          <Link
            href="mailto:mittaldhruv41@gmail.com"
            isExternal
            color="orange.400"
            _hover={{ textDecoration: 'underline' }}
          >
            Dhruv Mittal
          </Link>
        </Text>
        <Link
          href="https://www.linkedin.com/in/dhruv-mittal-a701b1330/"
          isExternal
          fontSize="sm"
          color={useColorModeValue('gray.500', 'gray.400')}
          _hover={{ color: 'orange.500' }}
        >
          LinkedIn Profile ↗
        </Link>
      </Stack>
    </Box>
  );
}
