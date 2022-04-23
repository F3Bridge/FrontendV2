import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import type { Connector } from "@web3-react/types";
import { providers, Signer } from "ethers";
import { ReactNode } from "react";

import {
  coinbaseWallet,
  hooks as coinbaseWalletHooks,
} from "../connectors/coinbaseWallet";

import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";

import {
  hooks as walletConnectHooks,
  walletConnect,
} from "../connectors/walletConnect";

const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
];

export default function Web3Provider({ children }: { children?: ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
