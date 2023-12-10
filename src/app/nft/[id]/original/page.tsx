'use client'
import Image from "next/image";
import {useContractRead, useContractWrite} from "wagmi";
import NFTContract from "@/app/abi/NFTContract.json";
import NFTStakingContract from "@/app/abi/NFTStakingContract.json";
import NFTMarketplace from "@/NFTMarketplace.json";

import {useQuery} from "@tanstack/react-query";
import {fetchIPFS} from "@/app/marketplace/page";

export default function Page(props) {
    const id = props.params.id
    const links = [
        {icon: 'ipfs-icon', text: 'View in IPFS', url: `https://ipfs.io/ipfs/${id}`},
        {icon: 'etherscan-icon', text: 'View in Etherscan', url: `https://etherscan.io/address/${id}`},
        {icon: 'metadata-icon', text: 'View metadata', url: `${id}`}
    ]
    const {data: NFTData, isError} = useContractRead({
            address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
            abi: NFTContract.abi,
            functionName: 'tokenURI',
            args: [props.params.id]
        }
    )
    const {data: owner} = useContractRead({
            address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
            abi: NFTContract.abi,
            functionName: 'ownerOf',
            args: [props.params.id]
        }
    )
    console.log('owner', owner)
    const {data: transactionData, isLoading: loadingTransaction, isSuccess, write} = useContractWrite({
        address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
        abi: NFTMarketplace.abi,
        functionName: 'buyNFT'
    })
    const {data: metadata} = useQuery(
        {
            queryKey: ['metadata', props.params.id],
            queryFn: () => fetchIPFS(NFTData),
            enabled: !!NFTData,
        }
    )
    const onBuy = () => {
        write({args: [props.params.id, process.env.NEXT_PUBLIC_NFT_CONTRACT]})
    }
    if (metadata) {
        const url = `https://gateway.ipfs.io/ipfs/${metadata.image}/original.png`
        const {description, name} = metadata
        return (<>
            <div className="flex flex-col  h-screen">
                <section className={'w-100  bg-[#d9d9d9]  h-3/6 flex justify-center items center'}>
                    <Image alt="tmp" src={url} width={600} height={600} className={'p-4'}/>
                </section>
                <section className={'flex justify-between w-full mt-6'}>
                    <div>
                        <div className={'grid grid-cols-2 gap-1'}>
                            <span
                                className="text-black/[.70] font-['Roboto'] text-[.9375rem] leading-[normal]">Owned By</span>
                            <span className="text-black font-['Roboto'] text-2xl leading-[normal]"></span>
                            <span className="text-black font-['Roboto'] text-2xl leading-[normal]">{owner?.toString()}</span>
                        </div>
                        <DetailHeader field={'Name'}>
                            {name}
                        </DetailHeader>
                        <DetailHeader field={'Details'}>
                            {description}

                        </DetailHeader>
                        <div>
                            {
                                links.map(({icon, text, url}) => (
                                    <div className={'flex justify-between items-center'}>
                                        <div className={'flex justify-between items-center'}>
                                            <Image alt="tmp" src={`/${icon}.png`} width={70} height={70}
                                                   className={'p-4'}/>
                                            <a href={url}
                                               className="text-black font-['Roboto'] text-2xl leading-[normal] cursor-pointer">{text}</a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div
                            className=" w-[475px] h-16 rounded-[0.875rem] border border-black bg-white mt-4 flex justify-between items-center px-2">
                            <span className="text-black font-['Roboto'] text-2xl leading-[normal] mx-4">Price</span>
                            <button className="flex-shrink-0 w-[7.1875rem] h-10 rounded-full bg-customGreen-50" onClick={onBuy}>
                                Buy
                            </button>
                        </div>

                        <DetailHeader field={'Transaction History'}>

                        </DetailHeader>
                    </div>
                </section>
            </div>
        </>)
    }

}

interface DetailHeaderProps {
    field: string
    children?: React.ReactNode
}

const DetailHeader: React.FC<DetailHeaderProps> = ({field, children}) => (
    <div className={'my-20'}>
        <div className="text-black font-['Roboto'] text-2xl leading-[normal]">{field}</div>
        <div className="w-[475.038px] h-px bg-black"/>

        <div className="w-[475px] text-[#111] font-['Roboto'] text-lg leading-[normal]">{children}</div>
    </div>
);

