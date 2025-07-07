import { Box, Heading, VStack, Text } from '@chakra-ui/react';

export default function Blessings() {
  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Heading fontSize="2xl" color="pink.700">Send Your Blessings 🙏</Heading>
        <Text color="gray.600">
          Leave a message for the lovely couple!
        </Text>
        {/* Later: Input field and blessings list */}
      </VStack>
    </Box>
  );
}
