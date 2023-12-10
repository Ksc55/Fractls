import {NFT} from "@/interfaces";
import Image from "next/image";
import {useNFT} from "@/app/hooks";

const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const CuratedNFTCard = ({nft, index}) => {

    const {data: metadata, isLoading} = useNFT(nft)
    if (metadata) {
        const url = `https://gateway.ipfs.io/ipfs/${metadata.image}/original.png`
        return (
            <div className="flex flex-col  justify-between    ">
                <div className="flex  justify-end   bg-gray-100 rounded-full">
                    <Image src={url}  className="w-full " width={200} height={200}/>
                </div>
                <div className="flex  items-center justify-between w-full space-y-2">
                    <div className="w-[9.5625rem] text-[#414141] font-['Roboto'] text-lg font-semibold leading-[150%]">Expected Yield  {generateRandomInt(1,10)}%</div>
                    <a href={'/liquidity-pool/stake/' + index} className="cursor-pointer inline-flex justify-end items-center pt-[0.4375rem] pr-[1.375rem] pb-2 pl-7 rounded-full border border-[#121212] text-[#121212] font-['Roboto'] text-xl cursor-pointer">
                        Stake
                    </a>
                </div>
            </div>
        );
    }

}
export default CuratedNFTCard;
