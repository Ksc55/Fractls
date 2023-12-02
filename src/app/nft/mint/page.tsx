'use client'
import ImageUploader from "@/components/ImageUploader";
import StyledInput from "@/components/InputField";
import FractionatedNTFFields, {Shard} from "@/components/FractionatedNTFFields";
import {useState} from "react";
import {useContractWrite, usePrepareContractWrite} from "wagmi";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import {useDisclosure} from "@nextui-org/use-disclosure";
import {useMutation} from "@tanstack/react-query";

interface formValues {
    name: string;
    description: string;
    shards: Shard[];
}
const saveToIpfs = async selectedImage => {
    await fetch('/nft/upload', {
        method: 'POST',
        body: JSON.stringify({image: selectedImage}),
    })
}
export default function Page() {
    const {mutateAsync, isLoading} = useMutation(saveToIpfs)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [form, setForm] = useState<formValues>({name: '', description: '', shards: []});
    const {name, description} = form;
    const inValidFrom = !name || !description || form.shards.some(shard => !shard.value);
    const { config } = usePrepareContractWrite({
        address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
        abi: [
            {
                name: 'mint',
                type: 'function',
                stateMutability: 'nonpayable',
                inputs: [],
                outputs: [],
            },
        ],
        functionName: 'mint',
    })
    const { write } = useContractWrite(config)
    const onChangeField = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const onChangeShards = (shards: Shard[]) => {
        setForm({...form, shards});
    }
    const mintTokens = async () => {
        mutateAsync(selectedImage)
        //write()
    };
    return (
        <>
            <Modal {...{isOpen: isLoading, onOpen, onOpenChange}} backdrop={'blur'} hideCloseButton>
                <ModalContent>
                    <ModalContent>
                        <ModalHeader>Minting NFT</ModalHeader>
                        <ModalBody>
                            Your NFT is being minted. Please wait...
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
