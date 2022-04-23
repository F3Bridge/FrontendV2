import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet(
      actions,
      {
        url: "https://cloudflare-eth.com",
        appName: "F3Bridge",
      },
      true
    )
);
