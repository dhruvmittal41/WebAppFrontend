// src/pages/Gallery.jsx
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Spinner,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EVENTS = ["Roka","Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"];
const API = import.meta.env.VITE_API_BASE;

export default function Gallery() {
  const [imagesByEvent, setImagesByEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const data = {};
      for (let event of EVENTS) {
        try {
          const res = await fetch(`${API}/images/${event}`);
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

  if (loading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="pink.500" />
      </Center>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      {EVENTS.map((event) => (
        <VStack align="start" spacing={4} mt={{ base: 8, md: 10 }} key={event}>
          <Heading
            size={{ base: "md", sm: "lg", md: "xl" }}
            color="pink.600"
            textTransform="uppercase"
          >
            {event}
          </Heading>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4 }}
            spacing={{ base: 3, md: 5 }}
            w="full"
          >
            {imagesByEvent[event]?.map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt={`${event} ${idx}`}
                borderRadius="lg"
                boxShadow="md"
                objectFit="cover"
                w="100%"
                h="auto"
              />
            ))}
          </SimpleGrid>
        </VStack>
      ))}
    </Box>
  );
}
