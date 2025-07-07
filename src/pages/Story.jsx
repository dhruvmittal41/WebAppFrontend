import { Box, Heading, VStack, Text } from '@chakra-ui/react';

export default function Story() {
  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Heading fontSize="2xl" color="pink.700">Our Love Story ❤️</Heading>
        <Text color="gray.600">
          A glimpse into our journey together, from our first meeting to "I do".
        </Text>
        {/* Add timeline or paragraphs with milestones */}
      </VStack>
    </Box>
  );
}
