'use client'
import Image from "next/image";
import {useState} from "react";
import ToggleSelector from "@/components/ToogleSelector";
import {assetsList, StakeSwitch, SummarySwitch} from "@/app/liquidity-pool/page";
import {Asset} from "@/interfaces";
import AssetSelector from "@/components/AssetSelector";
import Slider from "@/components/Slider";
import {useContractRead} from "wagmi";
import NFTMarketplace from "@/NFTMarketplace.json";
import {useQuery} from "@tanstack/react-query";
import {fetchIPFS} from "@/app/marketplace/page";
import NFTContract from "@/app/abi/NFTContract.json";

//NFTContract.json

const getCIDFromURI = (url: string) => {
    const cidRegex = /bafk[a-zA-Z0-9]+/;

    const match = url.match(cidRegex);

return match ? match[0] : null;

}
const Page = (props) => {
    const {data: NFTImage, isError} = useContractRead({
            address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
            abi: NFTContract.abi,
            functionName: 'tokenURI',
            args: [props.params.id],
        }
    )
    const image = `https://gateway.ipfs.io/ipfs/${getCIDFromURI(NFTImage)}`
    return <>
    <div className="flex  items-center rounded bg-[#e4e4e4] justify-between p-10 mt-20">
        <div className="w-80 ">
                <Image alt={'tmp'} src={image}  width={300} height={300} className={'border-2 '} layout={'responsive'}/>
        </div>
        <div className="grid grid-cols-3 gap-12 grow-[3]">
            <div className={'text-center'}>
                <div>Total Volume Locked (TVL)</div>
                <div>$555</div>
            </div>
            <div className={'text-center'}>
                <div>Total Staked NFT’s</div>
                <div>17,000</div>
            </div>
            <div className={'text-center'}>
                <div>APR</div>
                <div>19.76%</div>
            </div>

            <div className={'text-center'}>
                <div>No of Stakers</div>
                <div>115,113</div>
            </div>
            <div className={'text-center'}>
                <div>Total Rewards Claimed</div>
                <div>17,000</div>
            </div>
            <div className={'text-center'}>
                <div>Staking Period</div>
                <div>28 days</div>
            </div>
            <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light w-2/4 col-start-2'}>
                Stake NFT
            </button>
        </div>
    </div>
    <div className="flex justify-center w-full frame-36 gap-10 p-10 h-86 bg-[#e4e4e4] my-10">
            <StakeCard/>
            <SummaryCard/>
    </div>

</>};

export default Page;

const SummaryCard = () => {
    const [summarySwitch, setSummarySwitch] = useState<SummarySwitch>(SummarySwitch.SUMMARY);

    return (
        <div className="bg-[#F1F1F1] rounded border-[0.5px] border-black w-1/5 p-5  h-86">
            <ToggleSelector button1={'Summary'} button2={'Analytics'} onChange={setSummarySwitch}
                            value={summarySwitch}/>
            <div class="grid grid-cols-2 gap-4 text-center my-5">
                <div>APR</div>
                <div>100%</div>
                <div>Stacking Duration</div>
                <div>0</div>
                <div>Transaction fee</div>
                <div>0.0001 ETH</div>
            </div>
        </div>
    )
}

const StakeCard = () => {
    const [stakeSwitch, setStakeSwitch] = useState<StakeSwitch>(StakeSwitch.STAKE);
    const [asset, setAsset] = useState<Asset>(assetsList[0]);
    const onAssetChange = (Asset: Asset) => {
        setAsset(Asset)
    }
    const daysMarks = [
        {
            value: 7,
            label: '7 days',
        },
        {
            value: 14,
            label: '14 days',
        },
        {
            value: 21,
            label: '21 days',
        },
        {
            value: 28,
            label: '28 days',
        }
    ]
    return (
        <div className={'bg-[#F1F1F1] rounded border-[0.5px] border-black w-1/5 p-5 h-96 '}>
            <ToggleSelector button1={'Stake'} button2={'Unstake'} onChange={setStakeSwitch} value={0} colors={{text: 'text-customGreen-50', bg: 'bg-slate-950'}}/>
            <div className={'flex justify-between my-5'}>
                <div className="text-[#414141] font-['Roboto'] text-sm font-medium leading-[120%]">APR</div>
                <div className="text-[#414141] font-['Roboto'] text-sm font-light leading-[120%]">100%</div>
            </div>
            <Slider label={'Duration:'} marks={daysMarks} step={7} maxValue={daysMarks[3].value}
                    minValue={daysMarks[0].value}/>
            <div className={'flex justify-center mt-10'}>
                <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light w-2/4'}>
                    Stake NFT
                </button>
            </div>
        </div>
    )
}
