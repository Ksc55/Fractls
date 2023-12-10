import {NFT} from "@/interfaces";
import Image from "next/image";

const CuratedNFTCard = () => {
    return (
        <div className="flex flex-col  justify-between    ">
            <div className="flex  justify-end   bg-gray-100 rounded-full">
                <Image src={'/image-19.png'}  className="w-full " width={200} height={200}/>
            </div>
            <div className="flex  items-center justify-between w-full space-y-2">
                <div className="w-[9.5625rem] text-[#414141] font-['Roboto'] text-lg font-semibold leading-[150%]">Expected Yield  5%</div>
                <a href={'/liquidity-pool/stake/7'} className="inline-flex justify-end items-center pt-[0.4375rem] pr-[1.375rem] pb-2 pl-7 rounded-full border border-[#121212] text-[#121212] font-['Roboto'] text-xl cursor-pointer">
                    Stake
                </a>
            </div>
        </div>
    );
}
export default CuratedNFTCard;
