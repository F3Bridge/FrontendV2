import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Posts } from "./pages/Posts";
import { Profile } from "./pages/Profile";
import { Streams } from "./pages/Streams";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/profile/:address" element={<Profile />} />
        <Route path="/streams" element={<Streams />} />
      </Routes>
    </>
  );
}

export default App;
