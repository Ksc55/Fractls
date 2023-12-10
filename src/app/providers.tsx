"use client";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import {polygon, polygonMumbai, polygonZkEvm, polygonZkEvmTestnet} from "viem/chains";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

import { MessagesProvider } from "@/context/messages";
import { FC, ReactNode } from "react";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon, polygonMumbai, polygonZkEvmTestnet, polygonZkEvm],
  [
    alchemyProvider({ apiKey: "0Z8bgqW0ESlNsj7Zl7GoLtzL9yVhwqmh" }),
    publicProvider(),
  ]
); //remove hardcoded api key

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
          <MessagesProvider client={queryClient}>
            <NextUIProvider>{children}</NextUIProvider>
          </MessagesProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  );
};

export default Layout;
