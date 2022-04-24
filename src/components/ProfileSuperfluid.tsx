import { Web3Provider } from "@ethersproject/providers";
import {
  Framework as SuperfluidFramework,
  IWeb3FlowInfo,
} from "@superfluid-finance/sdk-core";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export function ProfileSuperfluid({ address }: { address: string }) {
  const { provider } = useWeb3React();
  const [superfluid, setSuperfluid] = useState<SuperfluidFramework | undefined>(
    undefined
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [existingFlow, setExistingFlow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provider) {
      setSuperfluid(undefined);
      return;
    }
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
        if (Number(flow.flowRate) > 0) {
          setExistingFlow(true);
        }
      } catch (e) {
        console.log(e);
        setExistingFlow(false);
      }
    })();
  }, [superfluid]);

  if (!superfluid)
    return (
      <div>
        Please sign in using Polygon Network to open a stream for this profile
      </div>
    );

  const createFlow = async () => {
    setLoading(true);
    const daix = await superfluid.loadSuperToken("fDAIx");
    const signer = (provider as Web3Provider).getSigner(0);
    const createFlowOperation = superfluid.cfaV1.createFlow({
      sender: await signer.getAddress(),
      receiver: address,
      superToken: daix.address,
      flowRate: amount,
    });
    try {
      const txnResponse = await createFlowOperation.exec(signer);
      const txnReceipt = await txnResponse.wait();
      setLoading(false);
      setModalOpen(false);
      setExistingFlow(true);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      {existingFlow ? (
        "You are already sponsoring this profile"
      ) : (
        <button onClick={() => setModalOpen(true)}>
          Sponsor (create stream)
        </button>
      )}
      {modalOpen && (
        <div
          className="h-full w-full top-0 left-0 absolute bg-[#000000a0] flex justify-center items-center text-black"
          onClick={() => !loading && setModalOpen(false)}
        >
          <div
            className="p-4 bg-white w-96 min-h-80 rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {loading ? (
              <div>Waiting for tx confirmation...</div>
            ) : (
              <>
                <div className="flex justify-between mb-4 align-center">
                  <div className="text-gray-400">Open a new stream</div>
                  <button onClick={() => setModalOpen(false)}>Close</button>
                </div>
                <div>
                  <input
                    className="block w-full py-2 px-4 rounded shadow-inner mb-4 bg-neutral-100"
                    placeholder="fDAIx Amount"
                    type="number"
                    onChange={(e) =>
                      setAmount(
                        e.target.value === "" ? "" : "" + Number(e.target.value)
                      )
                    }
                  />
                  <button
                    onClick={createFlow}
                    className="py-2 px-4 rounded shadow-lg block w-full bg-neutral-100"
                  >
                    Open stream
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
