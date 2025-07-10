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
  { char: 'groom', text: "Ready to join the celebration?" },
];

export default function IntroConversation({ onFinish }) {
  const bgMusic = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const isLast = current === dialogues.length - 1;

  useEffect(() => {
    if (!hasStarted) return;
    const playMusic = async () => {
      try {
        bgMusic.current.volume = 1.0;
        bgMusic.current.loop = true;
        await bgMusic.current.play();
      } catch (err) {
        console.warn("🎧 Autoplay blocked:", err);
      }
    };
    playMusic();
  }, [hasStarted]);

  useEffect(() => {
    if (!isLast) {
      const timer = setTimeout(() => setCurrent((prev) => prev + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  const triggerConfettiAndFinish = () => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    setTimeout(() => {
      bgMusic.current.pause();
      onFinish();
    }, 1000);
  };

  return (
    <>
      {!hasStarted ? (
        <div className="start-experience">
          <button className="continue-btn" onClick={() => setHasStarted(true)}>
            Start Experience 🎶
          </button>
        </div>
      ) : (
        <div className="intro-container royal-bg">
          <audio ref={bgMusic} src="/sounds/bg-music.mp3" preload="auto" />

          {/* Background elements */}
         <div className="background-overlay">
          <img src="/assets/mandala.png" alt="Ganesha" className="ganesha-svg ganesha" />
          <div className="mandala mandala1"></div>
          <div className="mandala mandala2"></div>
          <div className="mandala mandala3"></div>
          <div className="mandala mandala4"></div>
        </div>

          {/* Characters */}
          {!isLast ? (
            <>
              <div className="character left"><img src={bride1} alt="bride" /></div>
              <div className="character right"><img src={groom1} alt="groom" /></div>
            </>
          ) : (
            <div className="centered-image-wrapper">
              <img src={together} alt="bride and groom together" className="centered-image" />
            </div>
          )}

          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.9 }}
              className={`speech-bubble ${
                isLast ? 'center-bubble' : dialogues[current].char === 'bride' ? 'left-bubble' : 'right-bubble'
              }`}
            >
              {dialogues[current].text}
            </motion.div>
          </AnimatePresence>

          {/* Final CTA */}
          {isLast && (
            <button onClick={triggerConfettiAndFinish} className="continue-btn">
              Let’s Go 💕
            </button>
          )}
        </div>
      )}
    </>
  );
}
