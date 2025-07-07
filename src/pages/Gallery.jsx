// src/pages/Gallery.jsx
import {
  Box, Heading, SimpleGrid, Image, Spinner, VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EVENTS = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"];

export default function Gallery() {
  const [imagesByEvent, setImagesByEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const data = {};
      for (let event of EVENTS) {
        try {
          const res = await fetch(`http://localhost:5055/images/${event}`);
          const json = await res.json();
          data[event] = json.images || [];
        } catch (err) {
          console.error(`[${event}] fetch error:`, err);
          data[event] = [];
        }
      }
      setImagesByEvent(data);
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) return <Spinner size="xl" mx="auto" my={12} />;

  return (
    <Box maxW="6xl" mx="auto" p={4}>
      {EVENTS.map((event) => (
        <VStack align="start" spacing={4} mt={8} key={event}>
          <Heading size="lg">{event}</Heading>
          <SimpleGrid columns={[2, 3, 4]} spacing={4} w="full">
            {imagesByEvent[event]?.map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt={`${event} ${idx}`}
                borderRadius="lg"
                boxShadow="md"
              />
            ))}
          </SimpleGrid>
        </VStack>
      ))}
    </Box>
  );
}
