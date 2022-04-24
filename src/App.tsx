import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LivePeer from "./components/Livepeer/Live-peer";

import { Navbar } from "./components/Navbar";
import { Intro } from "./pages/Intro";
import { IntroCont } from "./pages/IntroCont";
import { Posts } from "./pages/Posts";
import { Profile } from "./pages/Profile";
import { Streams } from "./pages/Streams";

function App() {
  const [isIntro, setIsIntro] = useState(true);

  return (
    <>
      {isIntro ? (
        <>
          <Intro />
          <IntroCont setIsIntro={setIsIntro} />
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/profile/:address" element={<Profile />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/nft-video" element={<LivePeer />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
