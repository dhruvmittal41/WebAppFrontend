import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Countdown from '../components/Countdown';
import '../index.css';
export default function Home() {



  return (


      <>
    <Box
      minH="100vh"
      bgGradient="linear(to-r, pink.100, white)"
      py={16}
      px={8}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={8} align="center" textAlign="center" zIndex={1}>
        <Heading fontSize={['2xl', '3xl', '5xl']} color="pink.600">
          Welcome to the Wedding Celebration of
        </Heading>

        <Heading fontSize={['3xl', '4xl', '6xl']} color="pink.700">
          Groom ❤️ Bride
        </Heading>

        <Text fontSize="xl" color="gray.600" maxW="600px">
          “Two hearts. Two souls. One beautiful journey. Let the celebration of love begin!”
        </Text>

        <Countdown targetDate="2025-11-23T00:00:00" />
      </VStack>
    </Box>
    </>
  );
}   
