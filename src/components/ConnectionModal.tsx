import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import { coinbaseWallet } from "../connectors/coinbaseWallet";
import { XIcon } from "@heroicons/react/solid";

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
        className="p-4 bg-white w-120 min-h-80 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between mb-4 align-center">
          <div className="text-gray-400">Choose your wallet provider</div>
          <XIcon onClick={onClose} className="w-8 h-8" />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <button
            className="p-4 bg-gray-100 rounded"
            onClick={withClose(() => metaMask.activate())}
          >
            Metamask
          </button>
          <button
            className="p-4 bg-gray-100 rounded"
            onClick={withClose(() => walletConnect.activate())}
          >
            Wallet Connect
          </button>
          <button
            className="p-4 bg-gray-100 rounded"
            onClick={withClose(() => coinbaseWallet.activate())}
          >
            Coinbase Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
