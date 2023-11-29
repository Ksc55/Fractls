'use client'
import Image from "next/image";
import AssetSelector from "@/components/AssetSelector";
import {useState} from "react";
import {Asset, SelectedAsset} from "@/interfaces";
import ToggleSelector from "@/components/ToogleSelector";

enum Actions {
    remove,
    add
}

const assets: Asset[] = [
    {
        name: 'USDC',
        address: '0x0',
        available: 1000
    },
    {
        name: 'ETH',
        address: '0x01',
        available: 1000
    }
]

interface AddLiquidityFormState {
    firstAsset: SelectedAsset;
    secondAsset: SelectedAsset;
    action: Actions;
}
const Page = () => {
    const [formState, setFormState]: AddLiquidityFormState = useState({
        firstAsset: {
            name: 'USDC',
            value: 0
        },
        secondAsset: {
            name: 'AAVE',
            value: 0
        },
        action: Actions.remove
    })
    const onChange = (_selectedAsset, field) => {
        setFormState( {...formState, [field]: _selectedAsset})
    }
    const onChangeToggle = (index) => {
        setFormState({...formState, action: index})
    }
    return (<>
        <div
            className="flex  items-center pb-[3.4375rem] pl-[6.5625rem] pr-[4.125rem] p-14 h-[19.75rem] rounded bg-[#e4e4e4] justify-between">
            <div className="p-2 bg-slate-50">
                <div className={'flex flex-row justify-between'}>
                    <Image src={'/usdc.png'} width={80} height={80} className={'border-2 rounded-full'}/>
                    <Image src={'/aave.png'} width={80} height={80} className={'border-2 rounded-full'}/>
                </div>
                <p>ETH/USDC</p>
                <div className={'flex justify-between'}>
                    <span>APR</span>
                    <span className={'text-customGreen-50'}>19.76%</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-12">
                <div className={'text-center'}>
                    <div>Total Volume Locked (TVL)</div>
                    <div>$555</div>
                </div>
                <div className={'text-center'}>
                    <div>APR</div>
                    <div>19.76%</div>
                </div>
                <div className={'text-center'}>
                    <div>24Hr Trade Volume</div>
                    <div>30 Days</div>
                </div>
                <div className={'text-center'}>
                    <div>No of Stakers</div>
                    <div>115,113</div>
                </div>
                <div className={'text-center'}>
                    <div>Total Rewards Claimed</div>
                    <div>17,000</div>
                </div>
            </div>
        </div>
        <div
            className="flex  pb-[3.4375rem] pl-[6.5625rem] pr-[4.125rem] p-14  rounded bg-[#e4e4e4] justify-around mt-10 h-30">
            <div className="bg-[#F1F1F1]  justify-center  p-4 w-2/6 min-h-full">
                <ToggleSelector
                    button1={'Add'}
                    button2={'Remove'}
                    onChange={onChangeToggle}
                    colors={{
                        text: 'text-customGreen-50',
                        bg: 'bg-slate-950',
                    }}
                    value={formState.action}/>
                <AssetSelector
                    label={'First Asset'}
                    value={formState.firstAsset}
                    onChange={(_selectedAsset) => onChange(_selectedAsset, 'firstAsset')}
                    assets={assets}/>
                <AssetSelector
                    label={'Supporting Asset'}
                    value={formState.secondAsset}
                    onChange={(_selectedAsset) => onChange(_selectedAsset, 'secondAsset')}
                    assets={assets}/>
            </div>
            <div className="bg-[#F1F1F1]  justify-center  p-4 w-2/6 min-h-full">
                <ToggleSelector
                    button1={'Summary'}
                    button2={'Analytics'}
                    onChange={onChangeToggle}
                    value={formState.action}/>
                <div class="grid grid-cols-4 gap-4">
                    <b className={'col-start-1 col-span-2 '}>First Asset</b>
                    <span className={'col-start-4 justify-self-end'}>{formState.firstAsset.value} {formState.firstAsset.name}</span>
                    <b className={'col-start-1 col-span-2'}>Second Asset</b>
                    <span className={'col-start-4 justify-self-end'}>{formState.secondAsset.value} {formState.secondAsset.name}</span>
                </div>
            </div>
        </div>
    </>)
};

export default Page;
