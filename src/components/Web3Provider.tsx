import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import type { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
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

const connectors: [
  MetaMask | WalletConnect | CoinbaseWallet | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
];

export default function Web3Provider({ children }: { children?: ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
