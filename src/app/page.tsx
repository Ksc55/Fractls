import Image from "next/image";

export default function Home() {
    const recentlyAdded = [{},{},{}]
  return (
    <main className="w-full">
        <section className='pt-24'>
            <div className="text-8xl font-bold w-2/4">
                Trade NFT’s As Shards
            </div>
            <div className="flex justify-end text-right text-base">
                <span className='w-60'>
                    We give a fair playground to all creators allowing you
                    <b> anonymously</b> list your NFT’s & Stake into pools for epic rewards while having fun playing puzzle games.
                </span>
            </div>
            <a href={'/marketplace'}>
                <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light'}>
                    Start Trading
                </button>
            </a>
        </section>
        <section className="flex justify-center text-7xl font-semibold space-x-6">
            <span className='text-customPurple-50'>Mint</span>
            <span>.</span>
            <span className='text-customGreen-50'>Trade</span>
            <span>.</span>
            <span className='text-customBlue-50'>Stake</span>
        </section>
        <section className={'flex  text-customBlack-50 font-bold h-40 justify-center text-lg'}>
            <p className={'text-center w-2/5'}>
            Enjoy <span className={'text-customPurple-100'}>Puzzle Like Gaming</span> Experience To collect <span className={'text-customPurple-100'}>Fractionalized NFTs & Reconstruct the Complete NFT</span> ART
            </p>
        </section>
        <section className={'flex justify-center h-56 h-96 gap-28'}>
            <div className={' w-28 self-end'}>
                <Image src={'/action1.png'}  alt={'Divide & Conquer'} width={100} height={100} layout={'responsive'}/>
                <p>Divide & Conquer</p>
            </div>
            <div className={' w-28 self-start'}>
                <Image src={'/action3.png'}  alt={'Rebuild & Reward'} width={100} height={100} layout={'responsive'}/>
                <p>Rebuild & Reward</p>
            </div>
            <div className={' w-28 self-end'}>
                <Image src={'/action2.png'} alt={'Swap & Profit'} width={100} height={100} layout={'responsive'}/>
                <p>Swap & Profit</p>
            </div>
            <div className={' w-28 self-start'}>
                <Image src={'/action4.png'} alt={'Pool & Earn'} width={100} height={100} layout={'responsive'}/>
                <p>Pool & Earn</p>
            </div>
        </section>
        <section className={'bg-customGray-50 mt-20'}>
          <h3 className={'text-center font-semibold text-4xl p-4'}>Recently Reconstructed NFTs </h3>
            <div className={'flex justify-center gap-14'}>
                {   recentlyAdded.map( _nft =>
                        <div className="grid grid-rows-3 grid-flow-col gap-4">
                            <div className="row-span-2 col-span-4 bg-customGreen-50">
                                <Image width={100} height={100} layout={'responsive'} src={'/image-19.png'} className={'max-w-xs max-h-xs'} alt={'nft'}/>
                            </div>
                            <div className="row-span-1 col-span-2 flex flex-col">
                                <span>Owner</span>
                                <span>CoolDeep</span>
                            </div>
                            <div className="row-span-1 col-span-2 flex justify-center">
                                <button
                                    className={'rounded-full border-primary  border-2 px-4 h-10 font-light border-black bg-customGray-100'}>View
                                    details
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
        <div className={'flex justify-center mt-10 mb-10'}>
            <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light'}>
                View More NFT’s
            </button>
        </div>

        <section className={'flex justify-center gap-14'}>
            <div className={''}>
                <Image width={100} height={100} layout={'responsive'} className={'max-w-xs max-h-xs'} src={'/stake.png'}  alt={'Stake'}/>
                <p>Stake</p>
            </div>
            <div className={''}>
                <Image width={100} height={100} layout={'responsive'} className={'max-w-xs max-h-xs'} src={'/borrow.png'}  alt={'borrow'}/>
                <p>Borrow</p>
            </div>
            <div className={''}>
                <Image width={100} height={100} layout={'responsive'} className={'max-w-xs max-h-xs'} src={'/liquidate.png'}  alt={'liquidate'}/>
                <p>Liquidate</p>
            </div>
        </section>
        <div className={'flex justify-center mt-10'}>
            <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light'}>
                Explore
            </button>
        </div>
    </main>
  )
}
