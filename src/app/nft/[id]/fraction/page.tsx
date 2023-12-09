'use client'
import Image from "next/image";
import {useContractRead, useContractReads, useContractWrite} from "wagmi";
import NFTMarketplace from "@/NFTMarketplace.json";
import {useQuery} from "@tanstack/react-query";
import {fetchIPFS} from "@/app/marketplace/page";


export default function Page(props) {

    const {data: NFTList = [], isLoading} = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT,
        abi: NFTMarketplace.abi,
        functionName: 'getAllNFTs',
    })

    const {data: NFTFractions = [],} = useContractReads({
        contracts: NFTList.flatMap(nft =>
            nft.partIds.map(id => {
                    return {
                        address: process.env.NEXT_PUBLIC_CONTRACT,
                        abi: NFTMarketplace.abi,
                        functionName: 'getPartURI',
                        args: [nft.tokenId, id],
                    }
                }
            )
        ),
    })
    const randomNFTS = getRandomElementsFromArray(NFTFractions, 5)
    const {data: transactionData, isLoading: loadingTransaction, isSuccess, write} = useContractWrite({
        address: process.env.NEXT_PUBLIC_CONTRACT,
        abi: NFTMarketplace.abi,
        functionName: 'createNFT'
    })
    const onBuy = async () => {
        write({args: []})
    }
    const {data: NFTData, isError} = useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT,
            abi: NFTMarketplace.abi,
            functionName: 'getPartURI',
            args: [props.searchParams.parent, props.params.id],
        }
    )
    const {data: metadata} = useQuery(
        {
            queryKey: ['metadata', props.params.id],
            queryFn: () => fetchIPFS(NFTData.url),
            enabled: !!NFTData,
        }
    )
    console.log('NFTFractions', NFTFractions)

    if (metadata) {
        const price = NFTData.price === undefined ? 0: NFTData.price.toString();

        const url = `https://gateway.ipfs.io/ipfs/${metadata.image}${metadata.path}.png`
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

                                <div className="text-black font-['Roboto'] text-2xl leading-[normal]">{price} ETH
                                </div>
                            </div>
                            <button className="flex-shrink-0 w-[7.1875rem] h-10 rounded-full bg-customGreen-50"
                                    onClick={onBuy}>
                                Buy
                            </button>
                        </div>
                    </div>
                </section>
                <div className={'flex justify-center items-center my-20'}>
                    <div
                        className="text-[#121212] text-center font-['Roboto'] text-[2rem] font-semibold leading-[150%]">Similar
                        F-NFTs
                    </div>
                </div>
                <div className={'flex justify-between items-center'}>
                    {randomNFTS.map(_nft => <RandomNFTCard nft={_nft.result}/>)}
                </div>
            </div>
        </>)
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomElementsFromArray(array, count) {
    const shuffledArray = shuffleArray([...array]); // Create a copy to avoid modifying the original array
    return shuffledArray.slice(0, count);
}


const RandomNFTCard = ({nft}) => {
    const {data: metadata} = useQuery(
        {
            queryKey: ['metadata', nft.id.toString()],
            queryFn: () => fetchIPFS(nft.url),
        }
    )
    if (metadata) {
        const url = `https://gateway.ipfs.io/ipfs/${metadata.image}${metadata.path}.png`
        return (
            <div className={'flex flex-col justify-center items-center border-2 border-stale-950'}>
                <Image src={url} width={250} height={250} className={'p-4'} alt={'img'}/>
            </div>
        )
    }

}
