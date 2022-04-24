import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import { coinbaseWallet } from "../connectors/coinbaseWallet";

export function ConnectionModal({ onClose }: { onClose: () => void }) {
  const withClose = (action: () => void) => () => {
    action();
    onClose();
  };
  return (
    <div
      className="h-full w-full top-0 left-0 absolute bg-[#000000a0] flex justify-center items-center text-black"
      onClick={onClose}
    >
      <div
        className="p-4 bg-white w-96 min-h-80 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between mb-4 align-center">
          <div className="text-gray-400">Choose your wallet provider</div>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <button
            className="p-4 shadow-xl rounded-xl"
            onClick={withClose(() => metaMask.activate())}
          >
            Metamask
          </button>
          <button
            className="p-4 shadow-xl rounded-xl"
            onClick={withClose(() => walletConnect.activate())}
          >
            Wallet Connect
          </button>
          <button
            className="p-4 shadow-xl rounded-xl"
            onClick={withClose(() => coinbaseWallet.activate())}
          >
            Coinbase Wallet
          </button>
          <button
            className="p-4 shadow-xl rounded-xl"
            onClick={withClose(() => {})}
          >
            Web3Auth
          </button>
        </div>
      </div>
    </div>
  );
}
