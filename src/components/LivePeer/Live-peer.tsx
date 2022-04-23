import { videonft } from "@livepeer/video-nft";
import { useEffect } from "react";

const apiOpts = {
  auth: { apiKey: "3d048cfc-daaa-4092-8b16-30e9a89de9bf" },
  // defaults to current origin if not specifie
};
const chainId = ethereum.chainId; // or await ethereum.request({ method: 'eth_chainId' });
const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId });

// file is optional, will open a file picker if not provided.
async function mintNft(file: any) {
  const nftInfo = await minter.createNft({
    name: "My NFT",
    file,
    nftMetadata: {
      description: "My NFT description",
      traits: { "my-custom-trait": "my-custom-value" },
    },
  });
  console.log(
    `minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`
  );
  return nftInfo;
}

const LivePeer = () => {
  const { provider } = useWeb3React();

  useEffect(() => {}, []);

  return <div></div>;
};

export default LivePeer;
