'use client'
import Image from "next/image";
import {useState} from "react";
import ToggleSelector from "@/components/ToogleSelector";
import {assetsList, StakeSwitch, SummarySwitch} from "@/app/liquidity-pool/page";
import {Asset} from "@/interfaces";
import Slider from "@/components/Slider";
import {useContractRead, useContractWrite} from "wagmi";
import {useQuery} from "@tanstack/react-query";
import {fetchIPFS} from "@/app/marketplace/page";
import NFTContract from "@/app/abi/NFTContract.json";
import NFTStakingContract from "@/app/abi/NFTStakingContract.json";
import LiquidityProvidingContract from "@/app/abi/LiquidityProvidingContract.json";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import {useDisclosure} from "@nextui-org/use-disclosure";



const Page = (props) => {
    const [stakeSwitch, setStakeSwitch] = useState<StakeSwitch>(StakeSwitch.STAKE);
    const [activeStakeButton, setActiveStakeButton] = useState(false);
    const {data: NFTData, isError} = useContractRead({
            address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
            abi: NFTContract.abi,
            functionName: 'tokenURI',
            args: [props.params.id]
        }
    )
    const {data: metadata} = useQuery(
        {
            queryKey: ['metadata', props.params.id],
            queryFn: () => fetchIPFS(NFTData),
        }
    )

    const onStake = async () => {
        setActiveStakeButton(!activeStakeButton);
    }
    return <>
        <div className="flex  items-center rounded bg-[#e4e4e4] justify-between p-10 mt-20">
            <div className="w-80 ">
                <Image alt={'tmp'} src={`https://gateway.ipfs.io/ipfs/${metadata?.image}${metadata?.path}.png`}
                       width={300} height={300} className={'border-2 '} layout={'responsive'}/>
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
                {!activeStakeButton &&
                  <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light w-2/4 col-start-2'}
                          onClick={() => setActiveStakeButton(!activeStakeButton)}>
                    Stake NFT
                  </button>}
            </div>
        </div>
        <div className="flex justify-center w-full frame-36 gap-10 p-10 h-86 bg-[#e4e4e4] my-10">
            <StakeCard onStake={onStake} activeStakeButton={activeStakeButton} stakeSwitch={stakeSwitch}
                       setStakeSwitch={setStakeSwitch}/>
            <SummaryCard onStake={onStake} activeStakeButton={activeStakeButton} id={props.params.id}
                         stakeSwitch={stakeSwitch}/>
        </div>

    </>
};

export default Page;

const SummaryCard = ({activeStakeButton, onStake, id, stakeSwitch}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modal, setModal] = useState(false);

    const {data: transactionData, isLoading: loadingTransaction, isSuccess, write} = useContractWrite({
        address: process.env.NEXT_PUBLIC_CONTRACT,
        abi: NFTStakingContract.abi,
        functionName: 'stakeNFT'
    })
    const [summarySwitch, setSummarySwitch] = useState<SummarySwitch>(SummarySwitch.SUMMARY);
    const successButtonStyle = "flex flex-shrink-0 justify-center items-center pl-[3.3125rem] pr-[3.25rem] p-2  h-11 rounded-full bg-[#13ee00] text-[#121212] font-['Roboto'] leading-[150%]"
    const secondaryButtonStyle = "inline-flex flex-shrink-0 justify-center items-center pl-[1.1875rem] py-2 pr-5 h-11 rounded-full border-[0.5px] border-[#414141] text-[#414141] font-['Roboto'] leading-[150%]"
    const onStakeApprove = async () => {

        write({args: [id]})
    }
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
                    {activeStakeButton && <div className={'flex justify-center'}>
                      <div
                        onClick={onStakeApprove}
                        className={successButtonStyle}>
                        Approve Stake
                      </div>
                      <button
                        onClick={onStake}
                        className={secondaryButtonStyle}>
                        Cancel
                      </button>
                    </div>}
                    {false && <div className={'flex justify-center'}>
                      <div
                        className={successButtonStyle}>
                        Unstake
                      </div>
                      <button
                        onClick={onStake}
                        className={secondaryButtonStyle}>
                        Claim rewards
                      </button>
                    </div>}
                <ConfirmationModal {...{modal, onOpen, onOpenChange, loadingTransaction, isSuccess}}/>


        </div>
    )
}

const ConfirmationModal = ({modal, onOpen, onOpenChange, loadingTransaction, isSuccess}) => {
    <Modal {...{isOpen: modal, onOpen, onOpenChange}} backdrop={'blur'} hideCloseButton>
        <ModalContent>
            <ModalContent>
                <ModalHeader>Minting NFT</ModalHeader>
                <ModalBody>
                    {
                        loadingTransaction &&
                      <p className="text-center text-2xl font-bold my-10">Staking your NFT</p>
                    }
                    {
                        loadingTransaction &&
                      <p className="text-center text-2xl font-bold my-10">Check your Wallet</p>
                    }
                    {
                        isSuccess && <div className="flex justify-center mt-10">
                        <a
                          href="/profile"
                          className={`bg-customGreen-50 rounded-full px-4 h-10 font-light w-full text-center `}
                        >
                          Check NFT
                        </a>
                      </div>
                    }
                </ModalBody>
            </ModalContent>
        </ModalContent>
    </Modal>
}

const StakeCard = ({onStake, activeStakeButton, stakeSwitch, setStakeSwitch}) => {
    const [collateral, setCollateral] = useState<Asset>(assetsList[0]);
    const [supportingCollateral, setSupportingCollateral] = useState<Asset>(assetsList[1]);
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
            <ToggleSelector button1={'Stake'} button2={'Unstake'} onChange={setStakeSwitch} value={stakeSwitch}
                            colors={{text: 'text-customGreen-50', bg: 'bg-slate-950'}}/>

                    <div className={'flex justify-between my-5'}>
                        <div className="text-[#414141] font-['Roboto'] text-sm font-medium leading-[120%]">APR</div>
                        <div className="text-[#414141] font-['Roboto'] text-sm font-light leading-[120%]">100%</div>
                    </div>
                    <Slider label={'Duration:'} marks={daysMarks} step={7} maxValue={daysMarks[3].value}
                            minValue={daysMarks[0].value}/>
                    <div className={'flex justify-center mt-10'}>
                        <button
                            className={`rounded-full px-4 h-10 font-light w-2/4 ${activeStakeButton ? 'bg-[#BEB9B9]' : 'bg-customGreen-50'}`}
                            onClick={onStake}
                            disabled={activeStakeButton}
                        >
                            Stake NFT
                        </button>
                    </div>

        </div>
    )
}
