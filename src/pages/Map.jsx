import { Box, Heading, VStack, Text } from '@chakra-ui/react';

export default function Map() {
  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Heading fontSize="2xl" color="pink.700">Venue & Location 📍</Heading>
        <Text color="gray.600">
          Find your way to the celebration!
        </Text>
        {/* Later: Embed Google Maps iframe */}
      </VStack>
    </Box>
  );
}
