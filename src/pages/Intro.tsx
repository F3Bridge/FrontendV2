import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { useState } from "react";
//import { Link } from "react-router-dom";
import { ConnectionModal } from "../components/ConnectionModal";
//import LivePeer from "../components/LivePeer/Live-peer";
import tw from "twin.macro";
import styled from "styled-components";
import { Element, Link } from "react-scroll";
import { BsArrowDownCircle } from "react-icons/bs";

// Disable Web3Auth due to bugs in web3auth modules
// import { Web3Auth } from "../connectors/web3auth";

import F3BridgeLogo from "../../f3bridge.png";

const HomeSectionContainer = tw(Element)`
		flex
		flex-col
		w-full
		h-screen
		relative
		bg-black
		overflow-x-hidden
		overflow-y-hidden
		align-middle
`;

const LandingSectionContainer = styled.div`
  ${tw`
		w-full
		h-screen
		flex
		flex-col
		overflow-x-hidden
		overflow-y-hidden
	`}
`;
const Logo = styled.div`
  ${tw`
		flex
		p-[5rem]
		//background-image[url(https:/\\/s2.favim.com/orig/150811/clouds-gif-pink-purple-Favim.com-3096843.gif)]
		background-image[url(https:/\\/i.imgur.com/gGtBm3F.jpeg)]
		bg-auto
		bg-center
		w-screen
		blur-md
		text-[200px]
		//tracking-[-.12em]
		font-extrabold
		bg-clip-text
		text-transparent
		justify-center
		md:text-[200px]
		lg:text-[200px]
		drop-shadow-2xl
	`};
`;

const Text = styled.p`
  ${tw`
	text-white
	text-lg
	font-medium
`}
`;

const Title = tw.h1`
	flex
	flex-col
	h-screen
	text-xl
	absolute
	left-1/4
	//mb-9
	//pb-9
	//xl:text-3xl
	//2xl:text-5xl
	//2xl:mt-6
	//2xl:mb-6
	font-bold
	text-white
`;

const ViewMoreButton = styled.button`
  ${tw`
  mt-20
		text-blue-200
		text-3xl
		transition-colors
		duration-200
		hover:text-pink-300
	`};
`;

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet";
  return "Unknown";
}
export function Intro() {
  const { connector, isActive, provider } = useWeb3React();
  const [modalShown, setModalShown] = useState(false);
  return (
    <HomeSectionContainer name="Home">
      <div className="flex justify-center mt-10">
        <img src={F3BridgeLogo} alt="logo" width={100} height={100} />
      </div>
      <LandingSectionContainer>
        <Logo>F3BRIDGE</Logo>
        <p className="flex pb-8 justify-center text-lg text-white/90">
          F3Bridge is a tool to bridge your existing Web2 groups and friends
          from Discord to the Web3 Lens Protocol.
        </p>
        <p className="flex justify-center text-lg text-white/80 mt-4">
          A Discord bot allows you to connect to your Discord account, to
          discover friends who already have a Web3 (Lens Protocol) social
          profile.
        </p>
        Web3
        <div className="flex w-full justify-center">
          <ViewMoreButton>
            <Link to="HomePage2" smooth={"easeInOutQuad"} duration={1500}>
              <BsArrowDownCircle />
            </Link>
          </ViewMoreButton>
        </div>
      </LandingSectionContainer>
    </HomeSectionContainer>
  );
}
