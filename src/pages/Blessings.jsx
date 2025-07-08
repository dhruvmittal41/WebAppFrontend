import {
  Box,
  Heading,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Blessings() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [blessings, setBlessings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const API = import.meta.env.VITE_API_BASE;
  // ✅ Fetch blessings on mount
  useEffect(() => {
    const fetchBlessings = async () => {
      try {
        const res = await axios.get(`${API}/api/blessings`);
        console.log('[Fetched blessings]', res.data);
        const data = Array.isArray(res.data) ? res.data : [];
        setBlessings(data);
      } catch (err) {
        console.error('❌ Error fetching blessings:', err);
        toast({
          title: 'Error fetching blessings',
          description: 'Please try again later.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlessings();
  }, []);

  // ✅ Submit blessing
  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter both name and message.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSubmitting(true);
    const newBlessing = { name, message };

    try {
      const res = await axios.post(`${API}/api/blessings`, newBlessing);
      if (res?.data?.name && res?.data?.message) {
        setBlessings([res.data, ...blessings]);
        setName('');
        setMessage('');
        toast({
          title: 'Blessing Sent!',
          description: 'Thank you for your kind words ❤️',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Invalid blessing format from backend');
      }
    } catch (err) {
      console.error('❌ Error sending blessing:', err);
      toast({
        title: 'Failed to send blessing',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box py={12} px={4} maxW="900px" mx="auto">
      <VStack spacing={4}>
        <Heading fontSize="3xl" color="pink.700">Send Your Blessings 🙏</Heading>
        <Text color="gray.600" fontSize="md">
          Leave a heartfelt message for the lovely couple!
        </Text>

        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          bg="white"
          borderColor="pink.200"
          isDisabled={submitting}
        />

        <Textarea
          placeholder="Write your blessing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          bg="white"
          borderColor="pink.200"
          isDisabled={submitting}
        />

        <Button colorScheme="pink" onClick={handleSubmit} isLoading={submitting}>
          Send Blessing
        </Button>
      </VStack>

      {loading ? (
        <VStack mt={10}>
          <Spinner size="lg" color="pink.500" />
          <Text>Loading blessings...</Text>
        </VStack>
      ) : blessings.length > 0 ? (
        <>
          <Text mt={10} fontSize="xl" fontWeight="semibold" color="pink.600" textAlign="center">
            ❤️ {blessings.length} Blessings Received
          </Text>

          <Heading mt={4} mb={4} fontSize="2xl" color="pink.600" textAlign="center">
            💌 Blessings Wall
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {blessings.map((b, idx) => (
              <Box key={idx} bg="white" p={4} rounded="md" boxShadow="md">
                <Text fontWeight="bold" color="pink.800">{b.name}</Text>
                <Text mt={2} color="gray.700">{b.message}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Text mt={10} textAlign="center" color="gray.500">
          No blessings yet. Be the first to send one!
        </Text>
      )}
    </Box>
  );
}
