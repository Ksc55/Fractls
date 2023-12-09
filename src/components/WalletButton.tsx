'use client'
import {useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import {useIsMounted} from "@/components/useIsMounted";
import Image from "next/image";
import {useEffect} from "react";

export default function WalletButton() {
        const { address, isConnected, connector } = useAccount()
        const mounted  = useIsMounted()
        const { data: ensName } = useEnsName({ address })
        const { connect } = useConnect({
            connector: new InjectedConnector(),
        })
        const { disconnect } = useDisconnect()
        useEffect(() => {
                const state = localStorage.getItem('walletConnectState') || '';

                if( !isConnected && state === 'true' ) connect();
        }, []);

        useEffect(() => {
                localStorage.setItem("walletConnectState", isConnected.toString());
        }, [isConnected]);
        const styleButton = 'font-bold border-2 border-customGreen-50 rounded-full px-4 h-10 text-base'
        if (isConnected && mounted) {
            return (<div className={'flex items-center  gap-2'}>
                    <div>{ensName ? `${ensName} (${address})` : address.substring(0,5)}</div>
                    <Image src='/metamask.png' width={30} height={30}/>
                    <button className={styleButton} onClick={() => disconnect()}>DISCONNECT</button>
            </div>)
        }
        return (<button className={styleButton} onClick={() => connect()}>CONNECT WALLET</button>)
}
