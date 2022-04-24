import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Intro } from "./pages/Intro";
import { IntroCont } from "./pages/IntroCont";
import { Posts } from "./pages/Posts";
import { Profile } from "./pages/Profile";
import { Streams } from "./pages/Streams";

function App() {
  const isIntro = true;
  return (
    <>
      {isIntro ? (
        <>
          <Intro />
          <IntroCont />
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/profile/:address" element={<Profile />} />
            <Route path="/streams" element={<Streams />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
