import { Token } from "graphql";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

export function Stream({
  stream,
  stopStream,
}: {
  stream: any;
  stopStream: any;
}) {
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
      {Number(stream.currentFlowRate) > 0 ? (
        <div>
          <div className="break-words">
            Current flowrate: {stream.currentFlowRate}
          </div>
          <button
            className="border-solid border-2 border-black rounded p-1 mt-1"
            onClick={() => stopStream(stream.receiver)}
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
    </div>
  );
}
