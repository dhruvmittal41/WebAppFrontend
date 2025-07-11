import { Box, Heading, Text, VStack, Image, Stack } from '@chakra-ui/react';
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
          zIndex={1}
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
      sx={{
        border: '12px double #d4af37',
        borderRadius: '24px',
        boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
      }}
    >
      {/* Background Mandala */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('/mandala-bg.png')"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="contain"
        opacity={0.09}
        zIndex={0}
      />

      {/* Floral Background - Responsive */}
      <Box
        position="absolute"
        inset="0"
        bgImage="url('/Bg-img.jpg')"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        opacity={0.4}
        zIndex={0}
      />

      {/* Radial pastel overlay */}
      <Box
        position="absolute"
        inset="0"
        bg="radial-gradient(circle at center, rgba(255,240,245,0.5), transparent 70%)"
        zIndex={0}
      />

      {/* Fireflies */}
      {generateFireflies(30)}

      {/* Main Content */}
      <VStack
        spacing={{ base: 6, md: 8 }}
        align="center"
        zIndex={3}
        width="100%"
        maxW="900px"
        px={{ base: 2, md: 4 }}
      >
        {/* Invitation Box */}
        <Box
          bg="whiteAlpha.800"
          px={{ base: 4, md: 8 }}
          py={6}
          border="3px solid #E0B973"
          borderRadius="2xl"
          boxShadow="lg"
          maxW="700px"
          textAlign="center"
          w="100%"
        >
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
            श्रीगणेशाय नमः
          </Text>

          {/* Kalash Icons */}
          <Box display="flex" justifyContent="space-between" mt={2} px={4}>
            <Image src="/kalash-left.png" alt="Kalash Left" boxSize="50px" />
            <Image src="/kalash-right.png" alt="Kalash Right" boxSize="50px" />
          </Box>

          {/* Couple Name */}
          <Heading
            fontFamily="'Great Vibes', cursive"
            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
            color="pink.700"
            mt={4}
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

          {/* Family Info */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 16 }}
            mt={6}
            justify="center"
            align="flex-start"
          >
            {/* Groom */}
            <Box textAlign="center" flex="1">

              <Stack spacing={1} fontFamily="'Great Vibes', cursive">
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">Son of</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">Sh. Ajeet Bansal</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">Smt. Neha Bansal</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" mt={2}>Grandson of</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">Sh. Ramnivas Bansal</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">Smt. Rama Devi</Text>
              </Stack>
            </Box>

            {/* Bride */}
            <Box textAlign="center" flex="1">
              <Stack spacing={1} fontFamily="'Great Vibes', cursive">
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">Daughter of</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">Sh. Mithlesh Jaiswal</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">Smt. Seema Jaiswal</Text>
              </Stack>
            </Box>
          </Stack>

          {/* Quote */}
          <Text fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} color="gray.600" mt={6}>
            “Two hearts. Two souls. One beautiful journey. Let the celebration of love begin!”
          </Text>
        </Box>

        {/* Countdown */}
        <Countdown targetDate="2025-11-23T00:00:00" />
      </VStack>
    </Box>
  );
}
