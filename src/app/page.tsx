export default function Home() {

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
            <button className={'bg-customGreen-50 rounded-full px-4 h-10 font-light'}>
                Start Trading
            </button>
        </section>
        <section className="flex justify-center text-7xl font-semibold space-x-6">
            <span className='text-customPurple-50'>Mint</span>
            <span>.</span>
            <span className='text-customGreen-50'>Trade</span>
            <span>.</span>
            <span className='text-customBlue-50'>Stake</span>
        </section>
        <section className={'flex  text-customBlack-50 font-bold mt-10 justify-center text-lg'}>
            <p className={'text-center w-2/5'}>
            Enjoy <span className={'text-customPurple-100'}>Puzzle Like Gaming</span> Experience To collect <span className={'text-customPurple-100'}>Fractionalized NFTs & Reconstruct the Complete NFT</span> ART
            </p>
        </section>
        <section className={'flex justify-center h-56 pt-48 gap-28'}>
            <img src={'/action1.png'} className={' w-28 self-start'} alt={'Divide & Conquer'}/>
            <img src={'/action2.png'} className={' w-28 self-end'} alt={'Rebuild & Reward'}/>
            <img src={'/action3.png'} className={' w-28 self-start'} alt={'Swap & Profit'}/>
            <img src={'/action4.png'} className={' w-28 self-end'} alt={'Pool & Earn'}/>
        </section>
    </main>
  )
}
