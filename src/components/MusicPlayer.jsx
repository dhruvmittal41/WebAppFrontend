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
  // eslint-disable-next-line no-unused-vars
  const [shuffledPlaylist, setShuffledPlaylist] = useState(shuffle([...playlist]));

  
  useEffect(() => {
    if (location.pathname === '/intro') {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [location]);

  // Autoplay on first interaction
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

  // When track index changes, load and play next track
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.load(); // ensures new source is loaded
      audioRef.current.play().catch(() => {});
    }
  }, [isPlaying, trackIndex]);

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
        preload="auto"
      />
    </>
  );
}
