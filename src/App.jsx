import React, { useState } from "react";
import Home from "./pages/Home";
import IntroConversation from "./components/IntroConversation";
import "bootstrap/dist/css/bootstrap.min.css";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [showIntro, setShowIntro] = useState(
    () => !localStorage.getItem("seenIntro")
  );

  const handleIntroFinish = () => {
    localStorage.setItem("seenIntro", "true");
    setShowIntro(false);
  };

  return showIntro ? (
    <IntroConversation onFinish={handleIntroFinish} />
  ) : (
    <>
      <Home />
      <MusicPlayer />
    </>
  );
}

export default App;
