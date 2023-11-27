import Image from "next/image";

export default function Page() {
    const logos = ["/x-logo.png", "/instagram-logo.png", "/telegram-logo.png"];
    const NFTClassifications = [
        'CURATED',
        'RECONSTRUCTED',
        'SHARDS COLLECTION'
    ]
    return (<>
            <div className="flex justify-around items-center h-fit">
                <div className={'flex flex-col items center my-20'}>
                    <Image src="/image-19.png" width={200} height={200} className={'rounded-full'}/>
                    <h1 className="text-3xl font-bold text-center">Cooldeep</h1>
                    <p className="text-xl text-center my-2">This is my bio</p>
                </div>
                <div className={'flex gap-4'}>
                    {
                        logos.map((logo, index) => {
                            return <span key={index} className={'rounded-full border-slate-950 border-2 p-3'}>
                                <Image src={logo} width={30} height={30}/>
                            </span>
                        })
                    }
                </div>
            </div>
            <div>
                <div className={'flex justify-around items-center gap-8'}>
                    {
                        NFTClassifications.map((classification, index) => {
                            return <span className={'font-bold'} key={index}>
                                {classification}
                            </span>
                        })
                    }
                </div>
            </div>
        </>)
}
