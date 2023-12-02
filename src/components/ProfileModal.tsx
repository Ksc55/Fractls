import {ChangeEvent, useState} from 'react';
import Image from "next/image";
import {Avatar} from "@nextui-org/avatar";
import {Modal, ModalBody, ModalContent, ModalFooter} from "@nextui-org/modal";
import {SocialLink} from "@/interfaces";
import {useAccount} from "wagmi";
import {useRouter} from "next/navigation";


interface ImageUploaderProps {
    selectedImage: string | null;
    setSelectedImage: (image: string) => void;
}

const AvatarUploader: React.FC<ImageUploaderProps> = ({selectedImage, setSelectedImage}) => {
    const router = useRouter();
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
            <div className=" w-[9.375rem] h-[9.375rem] rounded-full bg-[#414141]">
                {selectedImage ? (
                    <Avatar width={100} height={100} layout={'responsive'} src={selectedImage} alt="Selected"
                            className="w-full h-full text-large"/>

                ) : null}
            </div>
            {selectedImage !== null && <p className={''}>Add/Change Image</p>}

        </label>
    );
};


interface ProfileFormFields {
    biography: string;
    name: string;
    avatar: string | null
    links: SocialLink[];
}


const EditModal = ({onOpenChange, isOpen, onOpen, setProfile, profile}) => {
    const { address } = useAccount()
    const [form, setForm] = useState<ProfileFormFields>(profile || {
        biography: '',
        name: '',
        links: [{name: 'x', url: ''}, {name: 'instagram', url: '', }, {name: 'telegram', url: '', }],
        avatar: null
    });
    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const onSocialLinkChange = (index: number, value: string) => {
        const updatedSocialLinks = [...form.links];
        updatedSocialLinks[index] = {...updatedSocialLinks[index], url: value};
        setForm({...form, links: updatedSocialLinks});
    };



    const addAvatar = (avatar: string) => {
        setForm({...form, avatar})
    }

    const isFormValid = (): boolean => {
        // Check if bio, name, and avatar are not null or empty
        if (!form.biography || !form.name || form.avatar === null) {
            return false;
        }

        // Check if every social link is not null or empty
        if (!form.links.map(_link => _link.url).every(link => link.trim())) {
            return false;
        }

        return true;
    };

    const saveForm = (onClose) => {
        fetch('/profile/' + address, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {'Content-Type': 'application/json'}
        }).then(r => {
            setProfile(form)
            onClose()
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            onClose()
        })
    }
    return (<Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        placement="top-center"
    >
        <ModalContent>
            {(onClose) => (
                <>
                    <div className={'bg-[#e9e9e9] w-full p-5'}>
                        <AvatarUploader {...{selectedImage: form.avatar, setSelectedImage: addAvatar}}/>
                    </div>
                    <ModalBody>
                        <div className="flex-shrink-0 rounded-lg bg-white flex-col flex gap-2">
                            <div className="text-[#121212] font-['Roboto'] text-xl ">Name</div>
                            <input
                                name={'name'}
                                onChange={onChange}
                                value={form.name}
                                className="flex items-center pl-[1.375rem] w-full p-0  h-11 rounded-lg bg-[#e9e9e9] text-[#414141] font-['Roboto'] italic "
                                placeholder="Enter your name here"/>

                            <div className="text-[#121212] font-['Roboto'] text-xl ">Bio</div>
                            <input
                                name={'biography'}
                                onChange={onChange}
                                value={form.biography}
                                className="flex items-center pl-[1.375rem] w-full p-0  h-11 rounded-lg bg-[#e9e9e9] text-[#414141] font-['Roboto'] italic "
                                placeholder="Enter your bio here"/>
                            <div className="text-[#121212] font-['Roboto'] text-xl ">Social Links</div>

                            {form.links.map((link, index) => (
                                <input
                                    key={index}
                                    value={link.url}
                                    onChange={(e) => onSocialLinkChange(index, e.target.value)}
                                    className="flex items-center pl-[1.375rem] w-full p-0 h-11 rounded-lg bg-[#e9e9e9] text-[#414141] font-['Roboto'] italic"
                                    placeholder={`Enter your  ${link.name} link here`}
                                />
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            disabled={!isFormValid()}
                            onClick={() => {
                                saveForm(onClose);
                            }}
                            className={`bg-customGreen-50 rounded-full px-4 h-10 font-light w-1/6  text-[#121212] font-['Roboto'] text-xl ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={onClose}
                            className="flex flex-shrink-0 justify-center items-center pt-[0.4375rem] pb-[0.4375rem] pl-[4.25rem] pr-[4.25rem] w-[12.3125rem] h-11 rounded-full border border-[#121212] text-[#121212] text-center font-['Roboto'] text-xl  capitalize">
                            Cancel
                        </button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>)
}

export default EditModal;
