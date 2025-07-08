import { Box, Heading, Text, VStack,Image } from '@chakra-ui/react';
import Countdown from '../components/Countdown';

export default function Home() {
  const generateFireflies = (count = 30) => {
    return Array.from({ length: count }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 5;

      return (
        <Box
          key={`firefly-${i}`}
          position="absolute"
          top={`${top}%`}
          left={`${left}%`}
          w="6px"
          h="6px"
          bg="yellow.300"
          borderRadius="full"
          filter="blur(1px)"
          zIndex="0"
          sx={{
            animation: `twinkle ${duration}s ease-in-out ${delay}s infinite alternate`,
            '@keyframes twinkle': {
              '0%': { opacity: 0.3, transform: 'translateY(0px) scale(1)' },
              '100%': { opacity: 1, transform: 'translateY(-10px) scale(1.5)' },
            },
          }}
        />
      );
    });
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, pink.50, yellow.50)"
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 8 }}
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {/* Radial pastel overlay */}
      <Box
        position="absolute"
        inset="0"
        bg="radial-gradient(circle at center, rgba(255,240,245,0.5), transparent 70%)"
        zIndex="0"
      />

      {/* Fireflies */}
      {generateFireflies(30)}

      {/* Main Content */}
      <VStack
        spacing={{ base: 6, md: 8 }}
        align="center"
        zIndex={1}
        width="100%"
        maxW="800px"
        px={{ base: 2, md: 4 }}
      >
        {/* Ganesha symbol with Sanskrit subtitle */}
<Box textAlign="center" mb={4}>
  <Image
    src="/ganesha.png"
    alt="Lord Ganesha"
    boxSize={{ base: '60px', md: '80px' }}
    mx="auto"
    mb={2}
  />
  <Text
    fontSize={{ base: 'md', md: 'lg' }}
    color="gray.600"
    fontWeight="medium"
    fontFamily="'Noto Sans Devanagari', serif"
  >
    ॐ गणेशाय नमः
  </Text>
</Box>

        <Heading fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }} color="pink.600">
          Welcome to the Wedding Celebration of
        </Heading>

        <Heading  
        fontFamily="'Great Vibes', cursive"
        fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
        color="pink.700"
        sx={{
          animation: 'shimmer 3s ease-in-out infinite',
          '@keyframes shimmer': {
          '0%': { opacity: 0.9 },
          '50%': {
                  opacity: 1,
                  textShadow: '0 0 12px rgba(255, 190, 200, 0.6)',
                  },
          '100%': { opacity: 0.9 },
    },
  }}

  >
          Shivam ❤️ Simran
        </Heading>

        <Text fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} color="gray.600" maxW="600px">
          “Two hearts. Two souls. One beautiful journey. Let the celebration of love begin!”
        </Text>

        <Countdown targetDate="2025-11-23T00:00:00" />
      </VStack>
    </Box>
  );
}
