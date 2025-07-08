import { IconButton } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const playlist = [
  '/songs/soft1.mp3',
  '/songs/soft2.mp3',
  '/songs/soft3.mp3',
];

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export default function MusicPlayer() {
  const location = useLocation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(shuffle([...playlist]));

  useEffect(() => {
    // Pause if on intro route
    if (location.pathname === '/intro') {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [location]);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    const next = (trackIndex + 1) % shuffledPlaylist.length;
    setTrackIndex(next);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={shuffledPlaylist[trackIndex]}
        onEnded={handleEnded}
        loop={false}
      />
      {location.pathname !== '/intro' && (
        <IconButton
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          position="fixed"
          top="4"
          right="4"
          zIndex="999"
          aria-label="Toggle music"
          onClick={toggleMusic}
          size="sm"
          colorScheme="pink"
          variant="ghost"
        />
      )}
    </>
  );
}
