import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { Link } from "react-router-dom";

import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import { coinbaseWallet } from "../connectors/coinbaseWallet";
import { web3Auth } from "../connectors/web3auth";

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet";
  return "Unknown";
}
export function HomePage() {
  const { connector } = useWeb3React();
  return (
    <div className="min-h-screen text-xl text-pink-700 bg-yellow-300">
      tHiS iS HomE pAgE{" "}
      <Link to="/friends">(Click here to go to friendSsS page)</Link>
      <div>Connector is: {getName(connector)}</div>
      <div onClick={() => metaMask.activate()}>
        activate the mighty Metamask
      </div>
      <div onClick={() => walletConnect.activate()}>
        activate the mighty WAAAAALEEEEEET CONNEEEEEEEEEECT
      </div>
      <div onClick={() => coinbaseWallet.activate()}>
        activate the mighty Coinbase
      </div>
      <div onClick={() => web3Auth.activate()}>
        activate the mighty Web3Auth
      </div>
    </div>
  );
}
