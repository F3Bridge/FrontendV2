import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ConnectionModal } from "./ConnectionModal";

export function Navbar() {
  const [modalShown, setModalShown] = useState(false);
  const { provider, connector, isActive } = useWeb3React();

  const [address, setAddress] = useState<string | null>();

  useEffect(() => {
    if (!provider) return;
    if (!(provider instanceof Web3Provider)) return;
    provider.getSigner(0).getAddress().then(setAddress);
  }, [provider]);

  return (
    <>
      <div className="shadow-xl mb-4 w-full">
        <div className="max-w-4xl m-auto p-4 flex justify-between items-center">
          <div className="flex flex-row items-center space-x-12">
            <div>
              <h1 className="text-xl text-bold">F3Bridge</h1>
            </div>
            <div>
              <ul className="flex flex-row space-x-8">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-gray-400"
                    }
                  >
                    Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/streams"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-gray-400"
                    }
                  >
                    Streams
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/nft-video"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-gray-400"
                    }
                  >
                    NFT Video
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/discord"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-gray-400"
                    }
                  >
                    Discord
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {isActive ? (
            <button onClick={() => connector.deactivate()}>
              Sign out ({address?.substring(0, 4)}...
              {address?.substring(40, 42)})
            </button>
          ) : (
            <button onClick={() => setModalShown(true)}>Sign in</button>
          )}
        </div>
      </div>
      {modalShown && <ConnectionModal onClose={() => setModalShown(false)} />}
    </>
  );
}
