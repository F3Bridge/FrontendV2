import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ConnectionModal } from "../components/ConnectionModal";

export function DiscordPage() {
  const { provider, isActive } = useWeb3React();
  const [modalShown, setModalShown] = useState(false);

  const [discordHandle, setDiscordHandle] = useState<string | null>(null);
  const [discordAuthUrl, setDiscordAuthUrl] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const authorize = async () => {
    const signer = (provider as Web3Provider).getSigner(0);
    const walletAddress = await signer.getAddress();
    console.log(walletAddress);
    const request = await fetch("/api/v1/auth", {
      method: "POST",
      body: JSON.stringify({ walletAddress }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());

    console.log(request);
    const response = {
      ...request,
      response: await signer.signMessage(request.challenge),
    };

    console.log(response);

    console.log(
      await fetch("/api/v1/auth/verify", {
        method: "POST",
        body: JSON.stringify(response),
        headers: { "Content-Type": "application/json" },
      }).then((r) => r.json())
    );
  };

  useEffect(() => {
    (async () => {
      if (accessToken) {
        try {
          console.log("test");
          const res = await fetch("/api/v1/users/me").then((r) => r.json());
          setDiscordHandle(res.discordHandle);
        } catch (e) {
          console.log("catch");
          setAccessToken(null);
          localStorage.removeItem("accessToken");
        }
      } else {
        const res = await fetch("/api/v1/discord").then((r) => r.json());
        setDiscordAuthUrl(res.url);
      }
    })();
  }, [accessToken]);

  if (!provider) {
    return (
      <div className="mt-4 bg-gray-200 rounded-xl">
        You need to sign in with Ethereum first.
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-200 rounded-xl">
      {!isActive ? (
        <div>
          <button onClick={() => setModalShown(true)}>Auth</button>
          {modalShown && (
            <ConnectionModal onClose={() => setModalShown(false)} />
          )}
        </div>
      ) : (
        <button onClick={authorize}>Test</button>
      )}
    </div>
  );
}
