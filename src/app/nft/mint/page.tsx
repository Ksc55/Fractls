'use client'
import ImageUploader from "@/components/ImageUploader";
import StyledInput from "@/components/InputField";
import FractionatedNTFFields from "@/components/FractionatedNTFFields";
import {useState} from "react";

export default function Page() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className="flex justify-center items-center bg-customGray-50 h-96 mt-10">
                <ImageUploader {...{selectedImage, setSelectedImage}}/>
            </div>
            <div className="flex justify-between mt-10 gap-4">
                <StyledInput placeholder="Name of the NFT"/>
                <StyledInput placeholder="Description" />
            </div>
            <p className="text-center text-2xl font-bold my-10">Fractionalized NFTs</p>
            { selectedImage && <FractionatedNTFFields image={selectedImage}/>}
        </>
    )
}
