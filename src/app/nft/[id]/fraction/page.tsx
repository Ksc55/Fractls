'use client'
import Image from "next/image";
import {useContractRead} from "wagmi";
import NFTMarketplace from "@/NFTMarketplace.json";
import {useQuery} from "@tanstack/react-query";
import {fetchIPFS} from "@/app/marketplace/page";

export default function Page(props) {

    const {data: NFTData, isError} = useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT,
            abi: NFTMarketplace.abi,
            functionName: 'getPartURI',
            args: [props.searchParams.parent, props.params.id],
        }
    )
    const {data: metadata} = useQuery(
        {
            queryKey: ['metadata', NFTData.url],
            queryFn: () => fetchIPFS(NFTData.url),
            enabled: !!NFTData,
        }
    )
    console.log('metadata', metadata)

    if (metadata) {
        const url = `https://gateway.ipfs.io/ipfs/${metadata.image}${metadata.path}.png`
        console.log('url', url)
        return (<>
            <div className="flex flex-col  h-screen">
                <section className={'w-100  bg-[#d9d9d9]  h-3/6 flex justify-center items center'}>
                    <Image src={url} width={600} height={600} className={'p-4'} alt={'img'}/>
                </section>
                <section className={'flex justify-between w-full mt-6'}>
                    <div>
                        <div className={'grid grid-cols-1 gap-1'}>
                            <span
                                className="text-black/[.70] font-['Roboto'] text-[.9375rem] leading-[normal]">Owned By</span>
                            <span className="text-black font-['Roboto'] text-2xl leading-[normal]">@Collector</span>
                        </div>
                    </div>
                    <div>
                        <div
                            className=" w-[475px] h-16 rounded-[0.875rem] border border-black bg-white mt-4 flex justify-between items-center px-2">
                            <div className={'flex flex-col'}>
                                <div className="text-black/[.70] font-['Roboto'] text-[.9375rem] leading-[normal]">Last
                                    Sold
                                </div>
                                <div className="text-black font-['Roboto'] text-2xl leading-[normal]">0.55 ETH</div>
                            </div>
                            <button className="flex-shrink-0 w-[7.1875rem] h-10 rounded-full bg-customGreen-50">
                                Buy
                            </button>
                        </div>
                    </div>
                </section>
                <div className={'flex justify-between items-center mt-20'}>
                    <Image alt={'tmp'} src={'/back-arrow.svg'} width={80} height={80} className={'p-4'}/>
                    <div
                        className="text-[#121212] text-center font-['Roboto'] text-[2rem] font-semibold leading-[150%]">Similar
                        F-NFTs
                    </div>
                    <Image alt={'tmp'} src={'/next-arrow.svg'} width={80} height={80} className={'p-4'}/>
                </div>
                <div className={'flex justify-between items-center'}>
                    <Image alt={'tmp'} src={'/image-19.png'} width={250} height={250}/>
                    <Image alt={'tmp'} src={'/image-19.png'} width={250} height={250}/>
                    <Image alt={'tmp'} src={'/image-19.png'} width={250} height={250}/>
                    <Image alt={'tmp'} src={'/image-19.png'} width={250} height={250}/>
                    <Image alt={'tmp'} src={'/image-19.png'} width={250} height={250}/>

                </div>
            </div>
        </>)
    }
}



