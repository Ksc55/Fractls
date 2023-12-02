'use client'
import Image from "next/image";
import EditModal from "@/components/ProfileModal";
import {useDisclosure} from "@nextui-org/use-disclosure";
import {useEffect, useState} from "react";
import {useAccount} from "wagmi";

export default function Page() {
    const { address } = useAccount()
    const [profile, setProfile] = useState()
    const logos = ["/x-logo.png", "/instagram-logo.png", "/telegram-logo.png"];
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const NFTClassifications = [
        'CURATED',
        'RECONSTRUCTED',
        'SHARDS COLLECTION'
    ]

    useEffect(() => {
        const fetchProfileData = async (address) => {
            const res = await fetch('/profile/' + address);
            const data = await res.json();
            return data;
        }
        if (address === undefined) return
        fetchProfileData(address).then(({data}) => {
            if (data === null) {
                onOpen()
            }
            setProfile({...data, links: JSON.parse(JSON.parse(data.links))})
        });
    }, [address])
    if (address === undefined || profile === undefined || profile === null) {
        return (<div className={'flex justify-center items-center h-screen'}>
            <h1 className={'text-3xl font-bold'}>Welcome please connect wallet</h1>
            <EditModal {...{onOpenChange, isOpen, onOpen, setProfile}}/>
        </div>)
    }
    return (<>
        <div className="flex justify-between items-center h-fit">
            <div className={'flex flex-col my-20'}>
                <Image src={profile.avatar} width={200} height={200} className={'rounded-full'}/>
                <h1 className="text-3xl font-bold text-center">{profile.name}</h1>
                <p className="text-xl text-center mt-1">{profile.biography}</p>
            </div>
            <div className={'flex gap-4'}>
                <button className={'inline-flex justify-center items-center gap-1 pt-[0.4375rem] pb-[0.4375rem] pl-[0.9375rem] pr-3 rounded-full border border-[#121212]'} onClick={onOpen}>
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.61763 16.2666C4.1093 16.2666 3.6343 16.0916 3.29263 15.7666C2.8593 15.3583 2.65097 14.7416 2.72597 14.075L3.0343 11.375C3.09263 10.8666 3.40097 10.1916 3.7593 9.82496L10.601 2.58329C12.3093 0.774959 14.0926 0.72496 15.901 2.43329C17.7093 4.14163 17.7593 5.92496 16.051 7.73329L9.2093 14.975C8.8593 15.35 8.2093 15.7 7.70096 15.7833L5.01763 16.2416C4.87597 16.25 4.75097 16.2666 4.61763 16.2666ZM13.276 2.42496C12.6343 2.42496 12.076 2.82496 11.5093 3.42496L4.66763 10.675C4.50097 10.85 4.3093 11.2666 4.27597 11.5083L3.96763 14.2083C3.9343 14.4833 4.00097 14.7083 4.15097 14.85C4.30097 14.9916 4.52597 15.0416 4.80097 15L7.4843 14.5416C7.72597 14.5 8.12597 14.2833 8.29263 14.1083L15.1343 6.86663C16.1676 5.76663 16.5426 4.74996 15.0343 3.33329C14.3676 2.69163 13.7926 2.42496 13.276 2.42496Z" fill="#292D32" />
                        <path d="M14.4497 9.12504C14.433 9.12504 14.408 9.12504 14.3914 9.12504C11.7914 8.8667 9.69971 6.8917 9.29971 4.30837C9.24971 3.9667 9.48305 3.65004 9.82471 3.5917C10.1664 3.5417 10.483 3.77504 10.5414 4.1167C10.858 6.13337 12.4914 7.68337 14.5247 7.88337C14.8664 7.9167 15.1164 8.22504 15.083 8.5667C15.0414 8.88337 14.7664 9.12504 14.4497 9.12504Z" fill="#292D32" />
                        <path d="M17.5 18.9583H2.5C2.15833 18.9583 1.875 18.6749 1.875 18.3333C1.875 17.9916 2.15833 17.7083 2.5 17.7083H17.5C17.8417 17.7083 18.125 17.9916 18.125 18.3333C18.125 18.6749 17.8417 18.9583 17.5 18.9583Z" fill="#292D32" />
                    </svg>
                    Edit profile
                </button>
            </div>
        </div>
        <div className={'flex items-center gap-3'}>
            {
                logos.map((logo, index) => {
                    return <span key={index} className={'rounded-full border-slate-950 border-2 p-3'}>
                                <a>
                                    <Image src={logo} width={30} height={30}/>
                                </a>
                            </span>
                })
            }
        </div>
        <div>
            <div className={'flex justify-around items-center gap-8 mt-10'}>
                {
                    NFTClassifications.map((classification, index) => {
                        return <span className="w-[22.5rem] text-[#292929] text-center font-['Roboto'] text-3xl leading-[90px] uppercase">

                        {classification}
                            </span>
                    })
                }
            </div>
        </div>
        <EditModal {...{onOpenChange, isOpen, onOpen, profile, setProfile}}/>
    </>)
}
