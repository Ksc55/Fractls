import Image from "next/image";

const Page = () => (<>
    <div className="flex  items-center pb-[3.4375rem] pl-[6.5625rem] pr-[4.125rem] p-14 h-[19.75rem] rounded bg-[#e4e4e4] justify-between">
        <div className="p-2 bg-slate-50">
            <div className={'flex flex-row justify-between'}>
                <Image alt={'tmp'} src={'/usdc.png'}  width={80} height={80} className={'border-2 rounded-full'}/>
                <Image alt={'tmp'} src={'/aave.png'}  width={80} height={80} className={'border-2 rounded-full'}/>
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
    <div className="flex items-center pb-[3.4375rem] pl-[6.5625rem] pr-[4.125rem] p-14 h-[19.75rem] rounded bg-[#e4e4e4] justify-between mt-10 gap-6">
        <div className="bg-slate-100 w-2/4 flex justify-center flex-col items-center p-4">
            <div className="flex justify-between items-center  p-1 rounded-full bg-white w-2/9">
                <div className="text-[#121212] font-['Roboto'] font-bold leading-[120%] mx-3">Add</div>
                <div className="flex justify-center items-center pt-[0.5625rem] px-5  pb-2 h-9 rounded-full bg-[#beb9b9] text-[#121212] font-['Roboto'] font-bold leading-[120%]">
                    Remove
                </div>
            </div>
            <p>First Asset</p>
        </div>
        <div className="p-2 bg-slate-50 w-2/4">
            s
        </div>
    </div>

</>);

export default Page;
