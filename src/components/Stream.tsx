import { Token } from "graphql";
import { useState } from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

export function Stream({
  stream,
  stopStream,
}: {
  stream: any;
  stopStream: any;
}) {
  const [canceled, setCanceled] = useState(false);
  const [canceling, setCanceling] = useState(false);
  return (
    <div className="p-4 m-4 mx-auto bg-white shadow-xl rounded-xl">
      <div className="flex flex-row justify-between">
        <div className="text-sm text-gray-400">Receiver: {stream.receiver}</div>
        <div>
          <Link className="underline" to={`/profile/${stream.receiver}`}>
            See the profile
          </Link>
        </div>
      </div>
      {Number(stream.currentFlowRate) > 0 && !canceled ? (
        <div>
          <div className="break-words">
            Current flowrate: {stream.currentFlowRate}
          </div>
          <button
            className="border-solid border-2 border-black rounded p-1 mt-1"
            onClick={async () => {
              setCanceling(true);
              try {
                await stopStream(stream.receiver);
                setCanceled(true);
              } catch (e) {}
              setCanceling(false);
            }}
          >
            Stop Stream
          </button>
        </div>
      ) : (
        <div className="break-words">
          {" "}
          Total streamed: {stream.streamedUntilUpdatedAt}
        </div>
      )}
      <div className="text-right text-sm mt-2">
        Token:
        <div className="text-gray-400">{stream.token.symbol}</div>
      </div>
      {canceling && (
        <div className="h-full w-full top-0 left-0 absolute bg-[#000000a0] flex justify-center items-center text-black">
          <div className="p-4 bg-white w-96 min-h-80 rounded-xl">
            <div>Waiting for tx confirmation...</div>
          </div>
        </div>
      )}
    </div>
  );
}
