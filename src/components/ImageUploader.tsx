import { ChangeEvent } from 'react';
import Image from "next/image";

interface ImageUploaderProps {
    selectedImage: string | null;
    setSelectedImage: (image: string) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({selectedImage, setSelectedImage}) => {

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <label htmlFor={'imageInput'} className="cursor-pointer flex justify-center flex-col">
            <input
                type="file"
            accept="image/*"
            id="imageInput"
            className="hidden"
            onChange={handleImageChange}
            />
            <div className="bg-gray-200 p-4 rounded-md text-center w-80 flex justify-center max-h-80">
                {selectedImage ? (
                        <Image width={100} height={100} layout={'responsive'} src={selectedImage} alt="Selected" className="max-w-full h-auto" />
        ) : (
                <p className={'self-center'}>Upload Your NFT</p>
        )}
            </div>
            {selectedImage !== null && <p className={'self-center'}>Upload Your NFT</p>}

        </label>
);
};

export default ImageUploader;
