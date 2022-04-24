import { Web3Provider } from "@ethersproject/providers";
import {
  Framework as SuperfluidFramework,
  IWeb3FlowInfo,
} from "@superfluid-finance/sdk-core";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import { Stream } from "../components/Stream";

export function Streams() {
  const { provider } = useWeb3React();
  const [superfluid, setSuperfluid] = useState<SuperfluidFramework | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [streams, setStreams] = useState([]);

  async function getSuperfluidFramework() {
    /* @ts-ignore */
    const signer = (provider as Web3Provider).getSigner(0);

    const chainId = 80001;
    const sf = await SuperfluidFramework.create({
      chainId,
      provider,
    });

    /* @ts-ignore */
    const daiTokenContract = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

    return { sf, daiTokenContract, signer };
  }

  async function deleteFlow(recipient: any) {
    const { sf, daiTokenContract, signer } = await getSuperfluidFramework();

    try {
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        sender: address,
        receiver: recipient,
        /* @ts-ignore */
        superToken: daiTokenContract,
      });
      console.log("Deleting your stream...");

      const transaction = await deleteFlowOperation.exec(signer);
      await transaction.wait();
      console.log(
        `Congrats - you've just deleted your money stream!
           Super Token: DAIxF
           Sender: ${address}
           Receiver: ${recipient}
        `
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    async function getStreams() {
      setLoading(true);
      if (!superfluid) {
        setLoading(false);
        return;
      }
      /* @ts-ignore */
      const { sf, daiTokenContract, signer } = await getSuperfluidFramework();
      const streamsList = await sf.query.listStreams({ sender: address });
      /* @ts-ignore */
      setStreams([...streamsList.data]);
      console.log(streams);
      setLoading(false);
    }

    getStreams();

    if (streams) setLoading(false);
  }, [superfluid, provider]);

  useEffect(() => {
    if (!provider) {
      setSuperfluid(undefined);
      return;
    }
    (provider as Web3Provider).getSigner(0).getAddress().then(setAddress);
    SuperfluidFramework.create({
      networkName: "mumbai",
      provider,
    }).then(setSuperfluid);
  }, [provider]);

  useEffect(() => {
    if (!superfluid) return;
    (async () => {
      const daix = await superfluid.loadSuperToken("fDAIx");
      const signer = (provider as Web3Provider).getSigner(0);
      try {
        const flow = await superfluid.cfaV1.getFlow({
          sender: await signer.getAddress(),
          receiver: address,
          superToken: daix.address,
          providerOrSigner: signer,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [superfluid]);

  if (loading)
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="max-w-3xl m-auto my-4 px-4">
      {streams.length < 1 ? (
        <div>You haven't created any streams. Go create one!</div>
      ) : (
        streams.map((stream: any) => (
          <Stream stream={stream} key={stream.id} stopStream={deleteFlow} />
        ))
      )}
    </div>
  );
}
