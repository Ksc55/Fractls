import WalletButton from "./WalletButton";

export default function Header() {
    const sections = ['HOME', 'MARKETPLACE', 'LIQUIDITY POOL',  'MINT NFT', 'ABOUT', 'PROFILE']
    return (
        <header className="flex justify-between w-full items-center lg:px-24  py-10">
            <img src="/fractis-logo.png" alt="logo"/>
            <nav className={'h-4'}>
                <ul className="flex space-x-6 ">
                    {sections.map((section, index) => (
                        <li key={`url-${index}`} className={'hover:border-b hover:border-customGreen-50 hover:border-b-4'}>
                            <a href="#" className="text-base font-semibold">
                                {section}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <WalletButton />
        </header>
    )
}
