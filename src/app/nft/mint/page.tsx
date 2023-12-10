'use client'
import ImageUploader from "@/components/ImageUploader";
import StyledInput from "@/components/InputField";
import FractionatedNTFFields, {Shard} from "@/components/FractionatedNTFFields";
import {useState} from "react";
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite} from "wagmi";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import {useDisclosure} from "@nextui-org/use-disclosure";
import {useMutation} from "@tanstack/react-query";
import NFTMarketplace from "../../../NFTMarketplace.json";
import NFTContract from "@/app/abi/NFTContract.json";


interface formValues {
    name: string;
    description: string;
    shards: Shard[];
}
const saveToIpfs = async ({image, name , description}) => {
    const res = await fetch('/nft/upload', {
        method: 'POST',
        body: JSON.stringify({image, name, description}),
    })
    return await res.json()
}
export default function Page() {
    const { address } = useAccount()

    const {mutateAsync, isLoading} = useMutation(saveToIpfs)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modal, setModal] = useState(false);
    const { data, isError } = useContractRead({
        address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
        abi: NFTMarketplace.abi,
        functionName: 'getAllNFTs',
    })
    console.log(data)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [form, setForm] = useState<formValues>({name: '', description: '', shards: []});
    const {name, description} = form;
    const inValidFrom = !name || !description || form.shards.some(shard => !shard.value);
    const { data: transactionData, isLoading: loadingTransaction, isSuccess, write } = useContractWrite({
        address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
        abi: NFTMarketplace.abi,
        functionName: 'createNFT'
    })
    const { write: writeNFT } = useContractWrite({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
        abi: NFTContract.abi,
        functionName: 'mint'
    })
    const onChangeField = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const onChangeShards = (shards: Shard[]) => {
        setForm({...form, shards});
    }
    const mintTokens = async () => {
        setModal(true)
        const response = await mutateAsync({image: selectedImage, name: form.name, description: form.description})

        write({args: [response.tokenId, response.tokenURIs, response._ids, form.shards.map(shard => (shard.value))]})
        writeNFT({args: [address, response.original.url]})
    };
    if (address === undefined) {
        return (<div className={'flex justify-center items-center h-screen'}>
            <h1 className={'text-3xl font-bold'}>Welcome please connect wallet</h1>
        </div>)
    }
    return (
        <>
            <Modal {...{isOpen: modal, onOpen, onOpenChange}} backdrop={'blur'} hideCloseButton>
                <ModalContent>
                    <ModalContent>
                        <ModalHeader>Minting NFT</ModalHeader>
                        <ModalBody>
                            {
                                isLoading && <p className="text-center text-2xl font-bold my-10">Storing your NFT</p>
                            }
                            {
                                loadingTransaction && <p className="text-center text-2xl font-bold my-10">Check your Wallet</p>
                            }
                            {
                                isSuccess && <div className="flex justify-center mt-10">
                                    <a
                                        href="/marketplace"
                                        className={`bg-customGreen-50 rounded-full px-4 h-10 font-light w-full text-center `}
                                    >
                                        Check on Marketplace
                                    </a>
                              </div>
                            }
                        </ModalBody>
                    </ModalContent>
                </ModalContent>
            </Modal>
            <div className="flex justify-center items-center bg-customGray-50 h-96 mt-10">
                <ImageUploader {...{selectedImage, setSelectedImage}}/>
            </div>
            <div className="flex justify-between mt-10 gap-4">
                <StyledInput placeholder="Name of the NFT" value={name} onChange={onChangeField} name={'name'}/>
                <StyledInput placeholder="Description" value={description} onChange={onChangeField} name={'description'}/>
            </div>
            { selectedImage && <>
              <p className="text-center text-2xl font-bold my-10">Fractionalized NFTs</p>
                <FractionatedNTFFields image={selectedImage} setValue={onChangeShards}/>
              <div className={'flex justify-center mt-10 '}>
                <button
                  onClick={mintTokens}
                  disabled={inValidFrom}
                  className={`bg-customGreen-50 rounded-full px-4 h-10 font-light w-1/6 
                  ${inValidFrom ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  MINT
                </button>
              </div>
              </>
            }
        </>
    )
}
