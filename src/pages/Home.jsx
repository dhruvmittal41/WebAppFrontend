import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Countdown from '../components/Countdown';
import '../index.css';

export default function Home() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, pink.100, white)"
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 8 }}
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <VStack
        spacing={{ base: 6, md: 8 }}
        align="center"
        zIndex={1}
        width="100%"
        maxW="800px"
        px={{ base: 2, md: 4 }}
      >
        <Heading
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
          color="pink.600"
        >
          Welcome to the Wedding Celebration of
        </Heading>

        <Heading
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          color="pink.700"
        >
          Groom ❤️ Bride
        </Heading>

        <Text
          fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
          color="gray.600"
          maxW="600px"
        >
          “Two hearts. Two souls. One beautiful journey. Let the celebration of love begin!”
        </Text>

        <Countdown targetDate="2025-11-23T00:00:00" />
      </VStack>
    </Box>
  );
}
