import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useState } from "react";
import { providers } from "ethers";

const App = () => {
  const [web3Provider, setWeb3Provider] = useState();

  useEffect(() => {
    const getProvider = async () => {
      const provider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
      });
      // await provider.enable();
      /* @ts-ignore */
      //setWeb3Provider(new providers.Web3Provider(provider));
    };

    getProvider();
  }, []);

  return <div className="text-xl text-red-500">Test</div>;
};

export default App;
