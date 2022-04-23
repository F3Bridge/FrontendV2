import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useState } from "react";
import { providers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FriendsPage } from "./pages/FriendsPage";
import Navbar from './components/Navbar'
import { CommunitiesPage } from './pages/CommunitiesPage'
import { DiscordPage } from "./pages/DiscordPage";

const App = () => {
  return (
	  <>
	<Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/FriendsPage" element={<FriendsPage />} />
	    <Route path="/CommunitiesPage" element={<CommunitiesPage />} />
      <Route path="/DiscordPage" element={<DiscordPage />} />
    </Routes>
	</>

  );
};

export default App;
