'use client'
import WalletButton from "./WalletButton";
import {usePathname} from "next/navigation";
import Image from "next/image";

export default function Header() {
    const pathname = usePathname()
    const sectionsWithURL = [
        {url: '/', name: 'HOME'},
        {url: '/marketplace', name: 'MARKETPLACE'},
        {url: '/liquidity-pool', name: 'LIQUIDITY POOL'},
        {url: '/nft/mint', name: 'MINT NFT'},
        {url: '/about', name: 'ABOUT'},
        {url: '/profile', name: 'PROFILE'},
    ];

    const isActivePath = (url: string) => {
        return url.includes(pathname)
    }

    return (
        <header className="flex justify-between w-full items-center">
            <Image src="/fractis-logo.png" alt="logo" width={200} height={100}/>

            <nav className={'h-4'}>
                <ul className="flex space-x-6 ">
                    {sectionsWithURL.map((section, index) => (
                        <li key={`url-${index}`}
                            className={`
                                hover:border-b 
                                hover:border-customGreen-50 
                                hover:border-b-4 
                                ${isActivePath(section.url) ?'border-b-4 border-customGreen-50' : ''}
                            `}>
                            <a href={section.url} className="text-base font-semibold">
                                {section.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <WalletButton />
        </header>
    )
}
