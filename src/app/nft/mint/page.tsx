"use client";
// Importing dependencies and components
import React, { useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useMutation } from "@tanstack/react-query";
import ImageUploader from "@/components/ImageUploader";
import StyledInput from "@/components/InputField";
import FractionatedNTFFields, {
  Shard,
} from "@/components/FractionatedNTFFields";
import NFTMarketplace from "../../../NFTMarketplace.json";
import NFTContract from "@/app/abi/NFTContract.json";
import { CircularProgress } from "@nextui-org/react";

// Defining form values interface
interface FormValues {
  name: string;
  description: string;
  shards: Shard[];
}

// Async function to save data to IPFS
const saveToIpfs = async ({ image, name, description }: any) => {
  const res = await fetch("/nft/upload", {
    method: "POST",
    body: JSON.stringify({ image, name, description }),
  });
  return await res.json();
};

// Main component function
export default function Page() {
  const { address } = useAccount();
  const [modal, setModal] = useState(false);

  // Hooks for handling image upload and form modal
  const { mutateAsync, isLoading } = useMutation(saveToIpfs);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Hooks for handling contract data and errors
  const { data, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
    abi: NFTMarketplace.abi,
    functionName: "getAllNFTs",
  });

  // Hooks for handling selected image and form data
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [form, setForm] = useState<FormValues>({
    name: "",
    description: "",
    shards: [],
  });

  // Destructuring form values
  const { name, description } = form;

  // Validation for minting
  const isFormInvalid =
    !name ||
    !description ||
    form.shards.length !== 9 ||
    form.shards.some(
      (shard) =>
        shard.value === null || shard.value === "" || shard.value === "0"
    );

  // Hooks for handling minting errors and messages
  const [mintError, setMintError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Hooks for handling contract transactions
  const {
    data: transactionData,
    isLoading: loadingTransaction,
    isSuccess,
    write,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
    abi: NFTMarketplace.abi,
    functionName: "createNFT",
  });

  // Hooks for handling NFT contract transactions
  const { write: writeNFT } = useContractWrite({
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT,
    abi: NFTContract.abi,
    functionName: "mint",
  });

  // Function to handle form field changes
  const onChangeField = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle shard changes
  const onChangeShards = (shards: Shard[]) => {
    setForm({ ...form, shards });
  };

  // Function to mint tokens
  const mintTokens = async () => {
    if (!selectedImage) {
      setMintError("Please upload an image");
      return;
    }

    if (form.shards.length === 0) {
      setMintError("Please fractionate the NFT");
      return;
    }

    if (!name || !description) {
      setMintError("Please fill the form");
      return;
    }

    setModal(true);

    try {
      console.log(form.shards.map((shard) => shard.value));
      const response = await mutateAsync({
        image: selectedImage,
        name: form.name,
        description: form.description,
      });

      write({
        args: [response.tokenId, response.tokenURIs, response._ids],
      });

      // writeNFT({ args: [address, response.original.url] });

      setMessage(isLoading ? "Storing your NFT..." : "Check on Marketplace");
    } catch (error) {
      console.error(error);
      setMintError("Something went wrong");
    }
  };

  // Render content based on user's wallet connection
  if (address === undefined) {
    return (
      <div className={"flex justify-center items-center h-screen"}>
        <h1 className={"text-3xl font-bold"}>Welcome please connect wallet</h1>
      </div>
    );
  }

  // Render main content
  return (
    <>
      <Modal
        {...{ isOpen: modal, onOpen, onOpenChange }}
        backdrop="blur"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader>Minting NFT</ModalHeader>
          <ModalBody>
            {isLoading && (
              <div className="flex items-center justify-center flex-col my-5">
                <p className="text-xl font-semibold mb-4">Storing your NFT</p>
                <CircularProgress className="text-center mb-4" />
              </div>
            )}

            {loadingTransaction && (
              <p className="text-center text-xl font-semibold my-5">
                Check your Wallet
              </p>
            )}

            {isSuccess && (
              <div className="flex justify-center mt-5">
                <a
                  href="/marketplace"
                  className="bg-customGreen-50 rounded-full px-6 h-10 font-semibold flex items-center justify-center"
                >
                  Check on Marketplace
                </a>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="flex justify-center items-center bg-customGray-50 h-96 mt-10">
        <ImageUploader {...{ selectedImage, setSelectedImage }} />
      </div>

      <div className="flex justify-between mt-10 gap-4">
        <StyledInput
          placeholder="Name of the NFT"
          value={name}
          onChange={onChangeField}
          name={"name"}
        />
        <StyledInput
          placeholder="Description"
          value={description}
          onChange={onChangeField}
          name={"description"}
        />
      </div>

      {selectedImage && (
        <>
          <p className="text-center text-2xl font-bold my-10">
            Fractionalized NFTs
          </p>
          <FractionatedNTFFields
            image={selectedImage}
            setValue={onChangeShards}
          />

          <div className={"flex justify-center mt-10 "}>
            {mintError && (
              <p className="text-red-500 text-sm mb-4">{mintError}</p>
            )}

            <button
              onClick={mintTokens}
              disabled={isFormInvalid}
              className={`bg-customGreen-50 rounded-full px-4 h-10 font-light w-1/6 
                    ${isFormInvalid ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              MINT
            </button>

            {message === "Check on Marketplace" && (
              <button className="bg-customGreen-50 rounded-full px-4 h-10 font-light w-1/6 ml-4">
                <a href="/marketplace">Check on Marketplace</a>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
