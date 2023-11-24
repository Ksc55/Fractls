'use client'
import ImageUploader from "@/components/ImageUploader";
import StyledInput from "@/components/InputField";
import FractionatedNTFFields, {Shard} from "@/components/FractionatedNTFFields";
import {useState} from "react";
import {useContractWrite, usePrepareContractWrite} from "wagmi";

interface formValues {
    name: string;
    description: string;
    shards: Shard[];
}
export default function Page() {
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
    const mintTokens = () => {
        write()
    };
    return (
        <>
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
