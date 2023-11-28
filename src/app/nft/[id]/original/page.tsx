import Image from "next/image";

export default function Page(props) {
    const id = props.params.id
    const {name, description, history} = props//get properties from subquery
    const links = [
        {icon: 'ipfs-icon', text: 'View in IPFS', url: `https://ipfs.io/ipfs/${id}`},
        {icon: 'etherscan-icon', text: 'View in Etherscan', url: `https://etherscan.io/address/${id}`},
        {icon: 'metadata-icon', text: 'View metadata', url: `${id}`}
    ]
    return (<>
        <div className="flex flex-col  h-screen">
            <section className={'w-100  bg-[#d9d9d9]  h-3/6 flex justify-center items center'}>
                <Image src={'/image-19.png'}  width={600} height={600} className={'p-4'} />
            </section>
            <section className={'flex  w-full mt-6'}>
                <div className={'w-3/6'}>
                    <h3 className="text-black font-['Roboto'] text-[3.5rem] leading-[normal]">{name}</h3>
                    <div className={'grid grid-cols-2 gap-1'}>
                        <span className="text-black/[.70] font-['Roboto'] text-[.9375rem] leading-[normal]">Created By</span>
                        <span className="text-black/[.70] font-['Roboto'] text-[.9375rem] leading-[normal]">Owned By</span>
                        <span className="text-black font-['Roboto'] text-2xl leading-[normal]">@Artist</span>
                        <span className="text-black font-['Roboto'] text-2xl leading-[normal]">@Collector</span>
                    </div>
                    <DetailHeader field={'Description'}>
                        {description}
                    </DetailHeader>
                    <DetailHeader field={'Details'}>
                        here is
                    </DetailHeader>
                    <div>
                        {
                            links.map(({icon, text, url}) => (
                                <div className={'flex justify-between items-center'}>
                                    <div className={'flex justify-between items-center'}>
                                        <Image src={`/${icon}.png`}  width={20} height={20} className={'p-4'} />
                                        <a href={url} className="text-black font-['Roboto'] text-2xl leading-[normal]">{text}</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className=" w-[475px] h-16 rounded-[0.875rem] border border-black bg-white mt-4 flex justify-between items-center">
                        <span className="text-black font-['Roboto'] text-2xl leading-[normal] mx-4">Price</span>
                        <button className="flex-shrink-0 w-[7.1875rem] h-10 rounded-full bg-customGreen-50">
                            Buy
                        </button>
                    </div>

                    <DetailHeader field={'Transaction History'}>

                    </DetailHeader>
                </div>
            </section>
        </div>
    </>)
}


const DetailHeader = ({field, children}) => (
    <div className={'my-20'}>
        <div className="text-black font-['Roboto'] text-2xl leading-[normal]">{field}</div>
        <div className="w-[475.038px] h-px bg-black" />

        <div className="w-[475px] text-[#111] font-['Roboto'] text-lg leading-[normal]">{children}</div>
    </div>
);

