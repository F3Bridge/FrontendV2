import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(
      actions,
      {
        rpc: { 1: "https://cloudflare-eth.com" },
      },
      true
    ),
  [1]
);
