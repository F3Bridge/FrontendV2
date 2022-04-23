import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectionModal } from "../components/ConnectionModal";
import { Web3Auth } from "../connectors/web3auth";

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet";
  if (connector instanceof Web3Auth) return "Web3Auth";
  return "Unknown";
}
export function HomePage() {
  const { connector, isActive } = useWeb3React();
  const [modalShown, setModalShown] = useState(false);
  return (
    <div className="min-h-screen text-xl text-pink-700 bg-yellow-300">
      tHiS iS HomE pAgE{" "}
      <Link to="/friends">(Click here to go to friendSsS page)</Link>
      <div>
        {isActive ? <>Connector is: {getName(connector)}</> : "Inactive"}
      </div>
      <button onClick={() => setModalShown(true)}>Connect!</button>
      {modalShown && <ConnectionModal onClose={() => setModalShown(false)} />}
    </div>
  );
}
