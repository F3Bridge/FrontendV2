import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { useState } from "react";
//import { Link } from "react-router-dom";
import { ConnectionModal } from "../components/ConnectionModal";
import tw from "twin.macro";
import styled from "styled-components";
import { Element, Link } from "react-scroll";
import { BsArrowDownCircle } from "react-icons/bs";

// Disable Web3Auth due to bugs in web3auth modules
// import { Web3Auth } from "../connectors/web3auth";

import F3BridgeLogo from "../../f3bridge.png";

const LensLogo =
  "https://icodrops.com/wp-content/uploads/2022/02/LensProtocol_logo-1.jpeg";

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
	`}
`;
const Logo = styled.div`
  ${tw`
		flex
		p-[5rem]
		//background-image[url(https:/\\/s2.favim.com/orig/150811/clouds-gif-pink-purple-Favim.com-3096843.gif)]
		background-image[url(https:/\\/i.imgur.com/gGtBm3F.jpeg)]
		bg-contain
		bg-center
		w-screen
		hover:bg-auto
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
		absolute
		bottom-4
		left-1/2
		-translate-x-1/2
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
export function IntroCont() {
  const { connector, isActive, provider } = useWeb3React();
  const [modalShown, setModalShown] = useState(false);
  return (
    <HomeSectionContainer name="HomePage2">
      <div className="ml-64 mr-64">
        <p
          className="flex pb-8 justify-center text-4xl font-bold text-white/100 line-through
			"
        >
          FAQ
        </p>
        <p className="flex pb-8 justify-center text-lg font-bold text-white/90">
          What is F3Bridge?
        </p>

        <p className="flex pb-8 align-middle text-md font-medium text-white/90 ">
          F3Bridge is a decentralised application that acts both as a bridge and
          social media app. First of all it allows web2 apps users to transition
          smoothly to the web3 environment, and use their web2 data. Since the
          content is completely decentralised in our app, there is almost* no
          way of banning us from the posting any kind of content.{" "}
          <br className="mt-2" />
          Naturally, there are still some edge-cases when it would be better to
          remove certain content. We can ban the given user or the content, in
          the way of democratic/ DAO voting. user. <br className="mt-2" />
          Since Web3 is heavily connected to the idea of barter and money, in
          our app we also give the option to support our favourite creators by
          creating money streams. Additionally, this solutions gives the
          possibility to stop the money stream if the content creator is not
          matching with the given supporter's preferences anymore.
        </p>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex items-center bg-black justify-center w-[200px] m-30 ">
          <div className="relative group w-full lg:mt-40">
            <div className="animate-tilt  transition group-hover:duration-200 duration-500 group-hover:opacity-100 opacity-75 absolute rounded-lg -inset-0.5 bg-gradient-to-r from-green-400/80 via-violet-400/20 to-blue-500 filter blur"></div>
            <button className="relative w-[200px] py-4 leading-none bg-black divide-x divide-gray-600 rounded-lg px-7">
              <span className="text-gray-100 text-xl font-extrabold">
                Enter App
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex m-10 lg:space-x-80 absolute bottom-0 flex-row space-x-10 justify-center">
        <img
          src="https://icodrops.com/wp-content/uploads/2022/02/LensProtocol_logo-1.jpeg"
          width="150"
          height="150"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/768px-Ipfs-logo-1024-ice-text.png"
          width="150"
          height="150"
        />
        <img
          src="https://cryptologos.cc/logos/polygon-matic-logo.png"
          width="150"
        />
        <img
          src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
          width="150"
        />
      </div>
    </HomeSectionContainer>
  );
}
