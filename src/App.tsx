import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Posts } from "./pages/Posts";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/profile/:address" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
