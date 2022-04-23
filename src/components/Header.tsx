import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Navbar from "./Navbar";

const HeaderContainer = styled.div`
  ${tw`flex flex-col w-screen h-16 overflow-x-hidden text-xl bg-blue-500 border-b-2 shadow-sm  border-b-gray-300`}
`;

const Logo = styled.div`
  ${tw`mt-4 ml-4 font-medium text-white rounded-sm `}
`;

export function Header() {
  return <Navbar />;
}
