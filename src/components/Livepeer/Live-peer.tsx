import { videonft } from "@livepeer/video-nft";
import { useWeb3React } from "@web3-react/core";

const LivePeer = () => {
  const { provider, chainId } = useWeb3React();

  const apiOpts = {
    auth: { apiKey: "3d048cfc-daaa-4092-8b16-30e9a89de9bf" },
    endpoint: videonft.api.prodApiEndpoint,
  };

  async function mintNft(event = null) {
    const minter = new videonft.minter.FullMinter(apiOpts, {
      provider,
      /* @ts-ignore */
      chainId,
    });
    const file = await minter.uploader.pickFile();
    let asset = await minter.api.createAsset("My NFT", file);
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
    <div className="max-w-3xl m-auto my-4 px-4">
      <div className="p-4 m-4 mx-auto bg-white shadow-xl rounded-xl">
        <div className="flex flex-row justify-center mb-10">
          <div className="text-sm text-gray-400">Mint your own NFT Video</div>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="border-solid border-2 border-black rounded p-1 mt-1"
            onClick={() => mintNft()}
          >
            Click here to mint NFT Video
          </button>
        </div>
        <div className="text-right text-sm mt-2">
          Powered by:
          <div className="text-gray-400">Livepeer</div>
        </div>
      </div>
    </div>
  );
};

export default LivePeer;
