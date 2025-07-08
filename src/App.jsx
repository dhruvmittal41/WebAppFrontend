import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Story from './pages/Story';
import Blessings from './pages/Blessings';
import Map from './pages/Map';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';
import IntroConversation from './components/IntroConversation';
import MusicPlayer from './components/MusicPlayer';


function App() {
  const [showIntro, setShowIntro] = useState(() => !localStorage.getItem('seenIntro'));

  const handleFinishIntro = () => {
    localStorage.setItem('seenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <>
      {showIntro ? (
        <IntroConversation onFinish={handleFinishIntro} />
      ) : (
        <>
          <Navbar />
          <MusicPlayer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/story" element={<Story />} />
            <Route path="/blessings" element={<Blessings />} />
            <Route path="/map" element={<Map />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
