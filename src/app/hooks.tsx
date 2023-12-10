import {useContractRead, useContractReads} from "wagmi";
import NFTContract from "@/app/abi/NFTContract.json";
import NFTStakingContract from "@/app/abi/NFTStakingContract.json";
import {useQuery} from "@tanstack/react-query";
import {fetchIPFS} from "@/app/marketplace/page";

export const useLatestMintedNFT = () => {
    const {data: latestId, isError} = useContractRead({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
        abi: NFTContract.abi,
        functionName: 'getCurrentTokenId',
        args: [],
    })
    const latestIds: Array<number> = latestId === undefined ? [] : new Array(Number(latestId.toString())).fill(0).map((_, i) => i )

    const query = useContractReads({
        contracts: latestIds.map(id => ({
            address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
            abi: NFTContract.abi,
            functionName: 'tokenURI',
            args: [id]
        }))
    })

    return query
}

export const useNFT = (url: string) => {
    const query = useQuery(
        {
            queryKey: ['metadata', url],
            queryFn: () => fetchIPFS(url),
        }
    )

    return query
}
