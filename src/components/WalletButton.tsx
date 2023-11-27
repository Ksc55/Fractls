'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import {useIsMounted} from "@/components/useIsMounted";

export default function WalletButton() {
        const { address, isConnected } = useAccount()
        const mounted  = useIsMounted()
        const { connect } = useConnect({
            connector: new InjectedConnector(),
        })
        const { disconnect } = useDisconnect()
        const styleButton = 'font-bold border-2 border-customGreen-50 rounded-full px-4 h-10 text-base'
        if (isConnected && mounted) {
            return (<button className={styleButton} onClick={() => disconnect()}>DISCONNECT</button>)
        }
        return (<button className={styleButton} onClick={() => connect()}>CONNECT WALLET</button>)
}
