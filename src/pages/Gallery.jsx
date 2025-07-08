// src/pages/Gallery.jsx
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Spinner,
  VStack,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EVENTS = ["Roka", "Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"];
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
      <Heading
        mb={6}
        size="2xl"
        textAlign="center"
        color="pink.600"
        textTransform="uppercase"
      >
        Wedding Gallery
      </Heading>

      <Accordion allowMultiple defaultIndex={[0]}>
        {EVENTS.map((event) => (
          <AccordionItem key={event} border="none" mb={6}>
            <h2>
              <AccordionButton
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue("pink.100", "pink.900")}
                _hover={{ bg: "pink.200" }}
                px={6}
                py={4}
                borderRadius="xl"
                boxShadow="md"
              >
                <Box flex="1" textAlign="left">
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="pink.700">
                    {event}
                  </Text>
                </Box>
                <AccordionIcon color="pink.700" />
              </AccordionButton>
            </h2>
            <AccordionPanel px={6} py={4}>
              {imagesByEvent[event].length === 0 ? (
                <Text color="gray.500">No images available for {event} yet.</Text>
              ) : (
                <SimpleGrid
                  columns={{ base: 2, sm: 3, md: 4 }}
                  spacing={{ base: 3, md: 5 }}
                >
                  {imagesByEvent[event].map((url, idx) => (
                    <Image
                      key={idx}
                      src={url}
                      alt={`${event} ${idx}`}
                      borderRadius="lg"
                      boxShadow="md"
                      objectFit="cover"
                      w="100%"
                      h="auto"
                      transition="0.3s ease-in-out"
                      _hover={{ transform: "scale(1.05)" }}
                    />
                  ))}
                </SimpleGrid>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
