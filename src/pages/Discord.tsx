import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export function Discord() {
  const { provider, isActive } = useWeb3React();
  const [accessToken, _setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const setAccessToken = (token: string | null) => {
    _setAccessToken(token);
    if (!token) localStorage.removeItem("accessToken");
    else localStorage.setItem("accessToken", token);
  };

  if (!isActive) {
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <p>Please sign in to connect your discord account.</p>
      </div>
    );
  }

  const connectDiscord = async () => {
    const signer = await (provider as Web3Provider).getSigner(0);
    const request = await fetch(
      "https://f3bridge.experimental.xeno.yt/api/v1/auth",
      {
        body: JSON.stringify({
          walletAddress: signer.getAddress(),
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((r) => r.json());
    const response = await signer.signMessage(request);
    const verify = await fetch(
      "https://f3bridge.experimental.xeno.yt/api/v1/auth/verify",
      {
        body: JSON.stringify({
          ...request,
          response,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((r) => r.json());
    setAccessToken(verify.accessToken);
    const discordLink = await fetch(
      "https://f3bridge.experimental.xeno.yt/api/v1/discord",
      { headers: { Authorization: `Bearer ${verify.accessToken}` } }
    ).then((r) => r.json());
    window.location = discordLink.url;
  };

  return (
    <div className="max-w-3xl m-auto my-4 px-4">
      <button onClick={connectDiscord}>
        Connect Discord to view your friend recommendations
      </button>
    </div>
  );
}
