import { videonft } from "@livepeer/video-nft";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

const LivePeer = () => {
  const { provider, chainId } = useWeb3React();

  const apiOpts = {
    auth: { apiKey: "3d048cfc-daaa-4092-8b16-30e9a89de9bf" },
    endpoint: videonft.api.prodApiEndpoint,
  };
  // or await ethereum.request({ method: 'eth_chainId' });
  // async function mintNft(file: any) {
  //   /* @ts-ignore */
  //   const minter = new videonft.minter.FullMinter(apiOpts, {
  //     provider,
  //     /* @ts-ignore */
  //     chainId,
  //   });
  //   const nftInfo = await minter.createNft({
  //     name: "My NFT",
  //     file,
  //     nftMetadata: {
  //       description: "My NFT description",
  //       traits: { "my-custom-trait": "my-custom-value" },
  //     },
  //   });
  //   console.log(
  //     `minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`
  //   );
  //   return nftInfo;
  // }

  async function mintNft(event = null) {
    const minter = new videonft.minter.FullMinter(apiOpts, {
      provider,
      /* @ts-ignore */
      chainId,
    });
    const file = await minter.uploader.pickFile();
    let asset = await minter.api.createAsset("My NFT", file);
    // optional, optimizes the video for the NFT
    asset = await minter.api.nftNormalize(asset);

    const nftMetadata = {
      description: "My NFT description",
      traits: { "my-custom-trait": "my-custom-value" },
    };
    const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata);
    const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
    const nftInfo = await minter.web3.getMintedNftInfo(tx);
    console.log(
      `minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`
    );
    return nftInfo;
  }

  return (
    <div>
      <input type="file" onChange={() => mintNft()} />
    </div>
  );
};

export default LivePeer;
