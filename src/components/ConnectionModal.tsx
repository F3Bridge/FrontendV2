import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import { coinbaseWallet } from "../connectors/coinbaseWallet";
import { web3Auth } from "../connectors/web3auth";

export function ConnectionModal({ onClose }: { onClose: () => void }) {
  const withClose = (action: () => void) => () => {
    action();
    onClose();
  };
  return (
    <div className="h-full w-full top-0 left-0 absolute bg-[#000000a0]">
      <div className="bg-white w-80 min-h-80 rounded-xl">
        <div onClick={onClose}>Close</div>
        <div>Choose how do you want to connect:</div>
        <div className="grid grid-cols-2 grid-rows-2">
          <button onClick={withClose(() => metaMask.activate())}>
            Metamask
          </button>
          <button onClick={withClose(() => walletConnect.activate())}>
            Wallet Connect
          </button>
          <button onClick={withClose(() => coinbaseWallet.activate())}>
            Coinbase Wallet
          </button>
          <button onClick={withClose(() => web3Auth.activate())}>
            Web3Auth
          </button>
        </div>
      </div>
    </div>
  );
}
