import { useEffect, useState } from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const total = Date.parse(targetDate) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack spacing={1}>
      <Text fontSize="2xl" color="pink.600" fontWeight="bold">
        Countdown to Our Big Day 💖
      </Text>
      <HStack spacing={4}>
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </HStack>
    </VStack>
  );
}

function TimeBox({ label, value }) {
  return (
    <VStack spacing={0}>
      <Text fontSize="3xl" fontWeight="bold" color="pink.800">
        {value < 10 ? `0${value}` : value}
      </Text>
      <Text fontSize="sm" color="gray.600">{label}</Text>
    </VStack>
  );
}
