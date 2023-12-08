'use client'
import AddLiquidityCard from "@/components/AddLiquidityCard";
import ToggleSelector from "@/components/ToogleSelector";
import {useState} from "react";
import AssetSelector from "@/components/AssetSelector";
import {Asset, Asset} from "@/interfaces";
import Slider from "@/components/Slider";
import Image from "next/image";
import CuratedNFTCard from "@/components/CuratedNFTCard";

enum StakeSwitch {
    STAKE = 0,
    UNSTAKE = 1
}

export default function Page() {
    return (
        <div className="liquidity-pool mt-20">
            <div className="div w-full">
                <div className="flex justify-between">
                    <p className="earn-attractive">
                        <span className="text-wrapper-43">Earn attractive yields, </span>
                        <span className="text-wrapper-13">Stake</span>
                        <span className="text-wrapper-43"> &amp; </span>
                        <span className="text-wrapper-44">Borrow</span>
                        <span className="text-wrapper-43">&nbsp;</span>
                        <span className="text-wrapper-45">NFT’s</span>
                        <span className="text-wrapper-43"> to leverage your portfolio. </span>
                    </p>
                    <div className="frame-35">
                        <div className="group-12">
                            <div className="group-13">
                                <a href="link_to_your_destination" className="text-wrapper-14">Learn How It
                                    Works</a>
                                <img className="video-circle" src="/video-circle.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="flex justify-center w-full ">
                    <div className="frame-36 w-full py-10 my-10">
                        <div className="group-42 flex items-center justify-center gap-10 ">
                            <div className="group-15">
                                <div className="text-wrapper-15">Total Value Locked (TVL)</div>
                                <div className="text-wrapper-16 text-center">$870,000</div>
                            </div>
                            <div className="group-16">
                                <div className="text-wrapper-15">Total Staked NFT’s</div>
                                <div className="text-wrapper-17 text-center">17,000</div>
                            </div>
                            <div className="group-43">
                                <div className="text-wrapper-15">Total Participating Wallets</div>
                                <div className="text-wrapper-46 text-center">17,000</div>
                            </div>
                            <div className="group-44">
                                <div className="text-wrapper-15">Total Rewards Claimed</div>
                                <div className="text-wrapper-17 text-center">17,000</div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex justify-between my-5">
                    {[1, 2, 3].map(_nft => <CuratedNFTCard/>)}
                </div>
                <div className="w-full flex justify-center items-center my-20">
                    <a href="your_link_destination" className="">
                        <div
                            className="inline-flex justify-center items-center pl-[1.5625rem] pr-[1.5625rem] p-1 rounded-full border border-[#121212] text-[#121212] font-['Roboto'] text-2xl leading-[150%]">
                            View More NFT’s
                        </div>
                    </a>
                </div>
                <div className="flex justify-between">
                    <p className="p">
                        <span className="span">Contribute Your Token To </span>
                        <span className="text-wrapper-13">Pools</span>
                        <span className="span"> &amp; Earn Rewards</span>
                    </p>
                    <div className="frame-35">
                        <div className="group-12">
                            <div className="group-13 bg-[#13ee00]">
                                <a href="link_to_your_destination" className="text-wrapper-14">Learn How It
                                    Works</a>
                                <img className="video-circle" src="/video-circle.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full ">
                    <div className="frame-36 w-full py-10 my-10">
                        <div className="group-42 flex items-center justify-center gap-10 ">
                            <div className="group-15">
                                <div className="text-wrapper-15">Total Value Locked (TVL)</div>
                                <div className="text-wrapper-16 text-center">$870,000</div>
                            </div>
                            <div className="group-16">
                                <div className="text-wrapper-15">Total Staked NFT’s</div>
                                <div className="text-wrapper-17 text-center">17,000</div>
                            </div>
                            <div className="group-43">
                                <div className="text-wrapper-15">Total Participating Wallets</div>
                                <div className="text-wrapper-46 text-center">17,000</div>
                            </div>
                            <div className="group-44">
                                <div className="text-wrapper-15">Total Rewards Claimed</div>
                                <div className="text-wrapper-17 text-center">17,000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'flex justify-start gap-5'}>
                    <div className="frame_39 inline-flex items-center p-2 rounded-full border-[0.5px] border-[#414141]">
                        <div className="text-[#414141] font-['Roboto'] text-sm font-semibold leading-[120%]">Search
                            Pool
                        </div>
                        <div className="flex justify-center items-center w-3 h-3">
                            <svg width={12} height={13} viewBox="0 0 12 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.215 9.91006C7.12 9.91006 7.025 9.87506 6.95 9.80006C6.805 9.65506 6.805 9.41506 6.95 9.27006L9.72 6.50006L6.95 3.73006C6.805 3.58506 6.805 3.34506 6.95 3.20006C7.095 3.05506 7.335 3.05506 7.48 3.20006L10.515 6.23506C10.66 6.38006 10.66 6.62006 10.515 6.76506L7.48 9.80006C7.405 9.87506 7.31 9.91006 7.215 9.91006Z"
                                    fill="#292D32"/>
                                <path
                                    d="M10.165 6.875H1.75C1.545 6.875 1.375 6.705 1.375 6.5C1.375 6.295 1.545 6.125 1.75 6.125H10.165C10.37 6.125 10.54 6.295 10.54 6.5C10.54 6.705 10.37 6.875 10.165 6.875Z"
                                    fill="#292D32"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="inline-flex justify-center items-center gap-2.5 p-2 rounded-full border-[0.5px] border-[#414141]">
                        <div className="text-[#414141] font-['Roboto'] text-sm font-semibold leading-[120%]">Filter by
                            APR
                        </div>
                        <div className="flex justify-center items-center w-3 h-3">
                            <svg width={12} height={13} viewBox="0 0 12 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.00001 8.90007C5.65001 8.90007 5.30001 8.76507 5.03501 8.50007L1.77501 5.24007C1.63001 5.09507 1.63001 4.85507 1.77501 4.71007C1.92001 4.56507 2.16001 4.56507 2.30501 4.71007L5.56501 7.97007C5.80501 8.21007 6.19501 8.21007 6.43501 7.97007L9.69501 4.71007C9.84001 4.56507 10.08 4.56507 10.225 4.71007C10.37 4.85507 10.37 5.09507 10.225 5.24007L6.96501 8.50007C6.70001 8.76507 6.35001 8.90007 6.00001 8.90007Z"
                                    fill="#292D32"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="inline-flex justify-center items-center gap-2.5 p-2 rounded-full border-[0.5px] border-[#414141]">
                        <div className="text-[#414141] font-['Roboto'] text-sm font-semibold leading-[120%]">Filter by
                            Volume
                        </div>
                        <div className="flex justify-center items-center w-3 h-3">
                            <svg width={12} height={13} viewBox="0 0 12 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.00001 8.90007C5.65001 8.90007 5.30001 8.76507 5.03501 8.50007L1.77501 5.24007C1.63001 5.09507 1.63001 4.85507 1.77501 4.71007C1.92001 4.56507 2.16001 4.56507 2.30501 4.71007L5.56501 7.97007C5.80501 8.21007 6.19501 8.21007 6.43501 7.97007L9.69501 4.71007C9.84001 4.56507 10.08 4.56507 10.225 4.71007C10.37 4.85507 10.37 5.09507 10.225 5.24007L6.96501 8.50007C6.70001 8.76507 6.35001 8.90007 6.00001 8.90007Z"
                                    fill="#292D32"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="inline-flex justify-center items-center gap-2.5 p-2 rounded-full border-[0.5px] border-[#414141]">
                        <div className="text-[#414141] font-['Roboto'] text-sm font-semibold leading-[120%]">Filter by
                            Lock Period
                        </div>
                        <div className="flex justify-center items-center w-3 h-3">
                            <svg width={12} height={13} viewBox="0 0 12 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 8.90007C5.65 8.90007 5.3 8.76507 5.035 8.50007L1.775 5.24007C1.63 5.09507 1.63 4.85507 1.775 4.71007C1.92 4.56507 2.16 4.56507 2.305 4.71007L5.565 7.97007C5.805 8.21007 6.195 8.21007 6.435 7.97007L9.695 4.71007C9.84 4.56507 10.08 4.56507 10.225 4.71007C10.37 4.85507 10.37 5.09507 10.225 5.24007L6.965 8.50007C6.7 8.76507 6.35 8.90007 6 8.90007Z"
                                    fill="#292D32"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="inline-flex justify-center items-center gap-2.5 p-2 rounded-full border-[0.5px] border-[#414141]">
                        <div className="text-[#414141] font-['Roboto'] text-sm font-semibold leading-[120%]">Filter by
                            Date
                        </div>
                        <div className="flex justify-center items-center w-3 h-3">
                            <svg width={12} height={13} viewBox="0 0 12 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 8.90007C5.65 8.90007 5.3 8.76507 5.035 8.50007L1.775 5.24007C1.63 5.09507 1.63 4.85507 1.775 4.71007C1.92 4.56507 2.16 4.56507 2.305 4.71007L5.565 7.97007C5.805 8.21007 6.195 8.21007 6.435 7.97007L9.695 4.71007C9.84 4.56507 10.08 4.56507 10.225 4.71007C10.37 4.85507 10.37 5.09507 10.225 5.24007L6.965 8.50007C6.7 8.76507 6.35 8.90007 6 8.90007Z"
                                    fill="#292D32"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <section className={'flex gap-5 justify-between my-5'}>
                    <AddLiquidityCard/>
                    <AddLiquidityCard/>
                    <AddLiquidityCard/>
                    <AddLiquidityCard/>
                </section>
                <div className="flex  justify-center items-center w-full my-10">
                    <a className=" justify-center items-center pl-[1.5625rem] pr-[1.5625rem] p-1 rounded-full bg-[#121212] text-[#13ee00] font-['Roboto'] text-2xl leading-[150%]">
                        View More Pools
                    </a>
                </div>
                <div className="flex justify-between">
                    <p className="p">
                        <span className="text-wrapper-13">Stake </span>
                        <span className="span">& Earn High Yield</span>
                    </p>
                    <div className="frame-35">
                        <div className="group-12">
                            <div className="group-13">
                                <a href="link_to_your_destination" className="text-wrapper-14">Learn How It
                                    Works</a>
                                <img className="video-circle" src="/video-circle.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="flex justify-center w-full ">
                    <div className="frame-36 w-full py-10 my-10">
                        <div className="group-42 flex items-center justify-center gap-10 ">
                            <div className="group-15">
                                <div className="text-wrapper-15">Total Value Locked (TVL)</div>
                                <div className="text-wrapper-16 text-center">$870,000</div>
                            </div>
                            <div className="group-16">
                                <div className="text-wrapper-15">Total Staked NFT’s</div>
                                <div className="text-wrapper-17 text-center">17,000</div>
                            </div>
                            <div className="group-43">
                                <div className="text-wrapper-15">Total Participating Wallets</div>
                                <div className="text-wrapper-46 text-center">17,000</div>
                            </div>
                            <div className="group-44">
                                <div className="text-wrapper-15">Total Rewards Claimed</div>
                                <div className="text-wrapper-17 text-center">17,000</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex justify-center w-full frame-36 gap-10 p-10 ">
                    <StakeCard/>
                    <SummaryCard/>
                </section>
                <section className="flex justify-center w-full frame-36 gap-10 py-20 my-20">
                    <div className={'flex-col flex gap-3'}>
                        <p className="p">
                            <div className={'block'}>
                                <span className="text-wrapper-13">Estimate</span>
                                <span className="span">Your Token</span>
                            </div>
                        </p>
                        <div className="p span w-3/6">Rewards When You Contribute To Pools</div>

                        <div className="w-3/6 text-[#414141] font-['Roboto'] my-5">This helps you decide the trades you
                            would participate in and plan your asset allocation.
                        </div>
                        <Image src="/action3.png" width={200} height={200}/>
                    </div>
                    <YieldCalculator/>
                </section>
            </div>
        </div>
    )
}

const assetsList: Asset[] = [
    {
        name: 'ETH',
        address: '0x123'
    },
    {
        name: 'USDC',
        address: '0x122'
    }
]

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
        <div className={'bg-[#F1F1F1] rounded border-[0.5px] border-black w-1/3 p-5 h-86'}>
            <ToggleSelector button1={'Stake'} button2={'Unstake'} onChange={setStakeSwitch} value={0}/>
            <AssetSelector value={asset} onChange={onAssetChange} assets={assetsList} label={'I want to stake'}/>
            <div className={'flex justify-between my-5'}>
                <div className="text-[#414141] font-['Roboto'] text-sm font-medium leading-[120%]">APR</div>
                <div className="text-[#414141] font-['Roboto'] text-sm font-light leading-[120%]">100%</div>
            </div>
            <Slider label={'Duration:'} marks={daysMarks} step={7} maxValue={daysMarks[3].value}
                    minValue={daysMarks[0].value}/>
            <div className={'flex justify-center mt-10'}>
                <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light w-2/4'}>
                    Stake
                </button>
            </div>
        </div>
    )
}


enum SummarySwitch {
    SUMMARY,
    ANALYTICS
}

const SummaryCard = () => {
    const [summarySwitch, setSummarySwitch] = useState<SummarySwitch>(SummarySwitch.SUMMARY);

    return (
        <div className="bg-[#F1F1F1] rounded border-[0.5px] border-black w-1/3 p-5  h-86">
            <ToggleSelector button1={'Summary'} button2={'Analytics'} onChange={setSummarySwitch}
                            value={summarySwitch}/>
            <div class="grid grid-cols-2 gap-4 text-center">
                <div>POL/ETH</div>
                <div></div>
                <div>Amount Staked</div>
                <div>200</div>
                <div>APR</div>
                <div>100%</div>
                <div>Duration</div>
                <div>28 days</div>
                <div>Rewards</div>
                <div>100 matic</div>
                <div>Transaction fee</div>
                <div>0.0001 ETH</div>
            </div>
        </div>
    )
}

const YieldCalculator = () => {
    const [stakes, setStakes] = useState<Asset>(assetsList[0])
    const [earnings, setEarnings] = useState<Asset>(assetsList[0])
    const [apr, setApr] = useState<number>(0)
    const onStakeChange = (asset: Asset) => {
        setStakes(asset)
    }

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
        <div className={'bg-[#f1f1f1] p-5'}>
            <div className="text-black font-['Roboto'] text-xl font-semibold text-center">Yield Calculator</div>
            <AssetSelector value={stakes} onChange={onStakeChange} assets={assetsList} label={'I want to stake'}/>
            <AssetSelector value={earnings} onChange={onAssetChange} assets={assetsList} label={'I want to earn'}/>
            <div className="text-[#414141] font-['Roboto'] text-sm font-medium py-3">APR</div>
            <div className="relative w-full">
                <input
                    type={'number'}
                    className="bg-white  p-4   placeholder-gray-500 h-10 w-full"
                    value={apr}
                    onChange={(e) => setApr(parseInt(e.target.value))}
                />
            </div>
            <Slider label={'Duration:'} marks={daysMarks} step={7} maxValue={daysMarks[3].value}
                    minValue={daysMarks[0].value}/>
        </div>
    )
}
