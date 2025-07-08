import {
  Box,
  VStack,
  HStack,
  Text,
  Circle,
  Container,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const shimmer = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255,165,0, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(255,165,0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255,165,0, 0); }
`;

const getEmoji = (title) => {
  const map = {
    Engagement: '💍',
    'Haldi Ceremony': '🌼',
    'Mehndi Night': '🤲',
    Sangeet: '🪘',
    'Wedding Day': '💒',
  };
  return map[title] || '🎉';
};

const programs = [
  {
    title: 'Roka',
    date: '2025-07-04',
    status: 'completed',
    description: '#Rokafied',
  },
  {
    title: 'Haldi Ceremony',
    date: 'Not announced yet',
    status: 'upcoming',
    description: 'A vibrant ceremony full of color and blessings.',
  },
  {
    title: 'Mehndi Night',
    date: 'Not announced yet',
    status: 'upcoming',
    description: 'Celebrating with music, dance, and intricate mehndi art.',
  },
  {
    title: 'Sangeet',
    date: 'Not announced yet',
    status: 'upcoming',
    description: 'Dance and fun with family performances.',
  },
  {
    title: 'Wedding Day',
    date: '2025-11-23',
    status: 'upcoming',
    description: 'The big day of union and celebration.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

export default function ProgramRoadmap() {
  const lastActiveIndex = programs.findLastIndex(
    (p) => p.status === 'completed' || p.status === 'ongoing'
  );

  const navigate = useNavigate();

  const handleClick = (eventName) => {
    navigate(`/gallery?event=${encodeURIComponent(eventName)}`);
  };

  return (
    <Container maxW="6xl" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={{ base: 4, sm: 6, md: 8 }}
        border="3px solid #FFD700"
        bgGradient="linear(to-br, white, #FFF4D6)"
        position="relative"
        overflow="hidden"
      >
        <Text
          fontSize={{ base: '2xl', sm: '3xl' }}
          fontWeight="bold"
          color="orange.600"
          mb={{ base: 6, md: 8 }}
          textAlign="center"
        >
          Wedding Journey
        </Text>

        <Box position="relative" pl={{ base: 6, md: 12 }}>
          <VStack align="start" spacing={{ base: 8, md: 10 }}>
            {programs.map((step, index) => (
              <MotionBox
                key={index}
                custom={index}
                initial="hidden"
                animate="show"
                variants={itemVariants}
                w="full"
                position="relative"
              >
                {index < lastActiveIndex && (
                  <Box
                    position="absolute"
                    top="24px"
                    left="23px"
                    width="4px"
                    height="100%"
                    bg="orange.300"
                    zIndex={0}
                    borderRadius="full"
                  />
                )}

                <HStack
                  align="start"
                  spacing={{ base: 3, sm: 4 }}
                  position="relative"
                  zIndex={1}
                  flexDirection={{ base: 'column', sm: 'row' }}
                  alignItems={{ base: 'flex-start', sm: 'center' }}
                >
                  <Circle
                    size={{ base: '10', sm: '12' }}
                    bg="white"
                    boxShadow="md"
                    border="2px solid"
                    borderColor="orange.300"
                    animation={
                      step.status === 'ongoing' ? `${shimmer} 2s infinite` : 'none'
                    }
                    fontSize={{ base: 'xl', sm: '2xl' }}
                    flexShrink={0}
                  >
                    {getEmoji(step.title)}
                  </Circle>

                  <Box
                    w="100%"
                    bg="rgba(255, 255, 255, 0.85)"
                    p={4}
                    borderRadius="xl"
                    boxShadow="sm"
                    border="1px solid #ffe9a9"
                    backdropFilter="blur(5px)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'scale(1.02)',
                      boxShadow: 'md',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleClick(step.title)}
                  >
                    <Text
                      fontSize={{ base: 'lg', sm: 'xl' }}
                      fontWeight="semibold"
                      color="orange.700"
                    >
                      {step.title}
                    </Text>
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color="gray.500"
                      mb={2}
                    >
                      {step.date}
                    </Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700">
                      {step.description}
                    </Text>
                  </Box>
                </HStack>
              </MotionBox>
            ))}
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}
