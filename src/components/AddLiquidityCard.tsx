import {Avatar} from "@nextui-org/avatar";

export default function AddLiquidityCard() {
    return <div className="  justify-center items-center py-5 px-4  h-[12.8125rem] rounded bg-[#e4e4e4] w-1/4">
        <div className="flex ">
            <Avatar src="/aave.png" className="w-10 h-10 text-large" />
            <Avatar src="/usdc.png" className="w-10 h-10 text-large" />
        </div>

        <div className="text-[#121212] font-['Roboto'] text-xl font-medium my-3">ETH/USDC</div>
        <div className={'flex justify-between my-5'}>
            <div className="w-7 text-[#414141] font-['Roboto'] text-sm font-medium leading-[120%]">APR</div>
            <div className="w-[2.9375rem] text-[#3ec633] font-['Roboto'] text-sm font-bold leading-[120%]">19.76%</div>
        </div>
        <div className={'flex justify-center gap-5'}>
            <div
                className="flex flex-shrink-0 justify-center items-center pb-[0.3125rem] pl-[0.6875rem] pt-1 pr-3 w-[6.25rem] h-8 rounded-full border border-[#414141] text-[#414141] font-['Roboto'] text-sm leading-[150%]">
                View Details
            </div>
            <div
                className="flex flex-shrink-0 justify-center items-center pb-[0.3125rem] pr-[1.0625rem] pt-1 pl-4 w-[7.125rem] h-8 rounded-full bg-[#13ee00] text-[#121212] font-['Roboto'] text-sm leading-[150%]">
                Add Liquidity
            </div>
        </div>

    </div>
}
