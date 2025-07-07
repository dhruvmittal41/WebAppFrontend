import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import bride1 from '../assets/chibi-bride1.png';
import groom1 from '../assets/chibi-groom1.png';
import together from '../assets/chibi-bride-groom.png';
import confetti from 'canvas-confetti';
import './IntroConversation.css';

const dialogues = [
  { char: 'bride', text: "Hey! You there!" },
  { char: 'groom', text: "Yeah, you! The one scrolling." },
  { char: 'bride', text: "Don't you know what's happening?" },
  { char: 'groom', text: "It's the biggest event of our lives!" },
  { char: 'bride', text: "Our wedding!! 🎉" },
  { char: 'groom', text: "Ready to join the celebration?" }, // FINAL
];

export default function IntroConversation({ onFinish }) {
  const bgMusic = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [current, setCurrent] = useState(0);
  const isLast = current === dialogues.length - 1;

  // Background music starts on mount
 useEffect(() => {
  if (!hasStarted) return;

  const playMusic = async () => {
    try {
      bgMusic.current.volume = 0.8;
      bgMusic.current.loop = true;
      await bgMusic.current.play();
    } catch (err) {
      console.warn("🎧 Autoplay blocked:", err);
    }
  };
  playMusic();
}, [hasStarted]);

  // Advance dialogue timer
  useEffect(() => {
    if (!isLast) {
      const timer = setTimeout(() => setCurrent((prev) => prev + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  const triggerConfettiAndFinish = () => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    setTimeout(() => {
      bgMusic.current.pause(); // Optional: fade out instead of abrupt stop
      onFinish();
    }, 1000);
  };

  return (
    <>
     {!hasStarted && (
  <div className="start-experience">
    <button
      className="continue-btn"
      onClick={() => setHasStarted(true)}
    >
      Start Experience 🎶
    </button>
  </div>
)}
{hasStarted && (
  <>
    <div className="intro-container">
      {/* Audio Elements */}
      <audio ref={bgMusic} src="/sounds/bg-music.mp3" preload="auto" />

      {/* Characters */}
      {!isLast && (
        <>
          <div className="character left">
            <img src={bride1} alt="bride" />
          </div>
          <div className="character right">
            <img src={groom1} alt="groom" />
          </div>
        </>
      )}

      {/* Final bride & groom together centered */}
      {isLast && (
        <div className="centered-image-wrapper">
          <img src={together} alt="bride and groom" className="centered-image" />
        </div>
      )}

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.0 }}
          className={`speech-bubble ${
            isLast ? 'center-bubble' : dialogues[current].char === 'bride' ? 'left-bubble' : 'right-bubble'
          }`}
        >
          <strong>{dialogues[current].char === 'bride' ? '👰 ' : '🤵 '}</strong>
          {dialogues[current].text}
        </motion.div>
      </AnimatePresence>

      {/* Continue Button */}
      {isLast && (
        <button onClick={triggerConfettiAndFinish} className="continue-btn">
          Let’s Go 💕
        </button>
      )}
    </div>
  </>
  )}
  </>
  );
}
