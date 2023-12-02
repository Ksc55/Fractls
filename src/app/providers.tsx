'use client'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {polygonMumbai} from "viem/chains";
import {NextUIProvider} from "@nextui-org/system";


const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: '0Z8bgqW0ESlNsj7Zl7GoLtzL9yVhwqmh' }), publicProvider()],
)//remove hardcoded api key

const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains })
    ],
    publicClient,
    webSocketPublicClient
})
export function Providers({ children }) {
    return (
        <WagmiConfig config={config}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </WagmiConfig>
    );
}
