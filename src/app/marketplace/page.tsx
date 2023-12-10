"use client";
import React from "react";
import { useContractRead, useContractReads } from "wagmi";
import NFTMarketplace from "@/NFTMarketplace.json";
import { useIsMounted } from "@/components/useIsMounted";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";
import { useLatestMintedNFT, useNFT } from "@/app/hooks";

function page() {
  const mounted = useIsMounted();
  const categories = [
    {
      name: "Fragments",
    },
    { name: "Completed" },
  ];
  const [currentCategory, setCurrentCategory] = React.useState(categories[0]);

  const { data: NFTList = [], isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
    abi: NFTMarketplace.abi,
    functionName: "getAllNFTs",
  });
  const { data: NFTFractions = [], isError } = useContractReads({
    contracts: NFTList.flatMap((nft) =>
      nft.partIds.map((id) => {
        return {
          address: process.env.NEXT_PUBLIC_MARKET_CONTRACT,
          abi: NFTMarketplace.abi,
          functionName: "getPartURI",
          args: [nft.tokenId, id],
        };
      })
    ),
  });

  //get minted NFTs
  const { data: NFTListMinted = [], isLoading: isLoadingMinted } =
    useLatestMintedNFT();
  const changeCategory = (category) => {
    setCurrentCategory(category);
  };
  return (
    <div className="relative bg-whitesmoke w-full overflow-hidden flex flex-col items-start justify-end pt-10 pb-[572px] box-border gap-[28px] text-left text-sm text-gray font-roboto">
      <div className=" shadow-[0px_0px_5px_rgba(0,_0,_0,_0.4)_inset] w-full h-[50px] flex flex-col items-center justify-center bg-[#e0e0e0]">
        <div className="w-full h-5 flex flex-row items-center justify-start gap-[14px] px-2">
          <div className="w-full h-5 flex flex-row items-center  justify-around">
            {categories.map((category, index) => (
              <button
                key={index + "category"}
                onClick={() => changeCategory(category)}
                className={`inline-flex justify-center items-center pr-[1.375rem] py-0 pl-6 rounded-full border border-[#121212] text-[#121212] font-['Roboto'] text-sm leading-[150%] ${
                  category.name === currentCategory.name ? "bg-white" : ""
                }`}
              >
                <div className="relative leading-[150%]">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {!isLoading && mounted && (
        <div className="grid grid-cols-5 gap-10 w-full justify-center">
          {currentCategory.name === "Fragments" &&
            NFTFractions.map((_nft) => {
              const parentNFT = NFTList.find((nft) =>
                nft.partIds.includes(_nft.result.id)
              ).tokenId;
              return <NFTFractionCard nft={_nft} parentNFT={parentNFT} />;
            })}
          {currentCategory.name === "Completed" &&
            NFTListMinted.map((_nft, index) => {
              return <CompletedNFTCard nft={_nft.result} index={index} />;
            })}
        </div>
      )}
    </div>
  );
}

export default page;

export function extractCID(ipfsUrl) {
  const regex = /ipfs:\/\/([a-zA-Z0-9]+)/;
  const match = ipfsUrl.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    console.error("Invalid IPFS URL:", ipfsUrl);
    return null;
  }
}

export const fetchIPFS = async (url) => {
  return fetch(`https://${extractCID(url)}.ipfs.dweb.link/?format=dag-json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return {
        ...data,
        image: data.image["/"],
        path: "/" + data.name.slice(6).toLowerCase(),
      };
    });
};

const NFTFractionCard = ({ nft, parentNFT }) => {
  const { data: metadata, isLoading } = useQuery({
    queryKey: ["metadata", nft.result.url],
    queryFn: () => fetchIPFS(nft.result.url),
  });
  if (metadata) {
    const url = `https://gateway.ipfs.io/ipfs/${metadata.image}${metadata.path}.png`;
    return (
      <a
        href={`/nft/${nft.result.id}/fraction?parent=${parentNFT}`}
        className="border-2 border-slate-950"
      >
        <Image
          src={url}
          width={200}
          height={200}
          className={"w-full"}
          alt={metadata.name}
        />
      </a>
    );
  }
  if (isLoading) {
    return (
      <div className="">
        <CircularProgress color="secondary" aria-label="Loading..." />
      </div>
    );
  }
};

const CompletedNFTCard = ({ nft, index }) => {
  const { data: metadata, isLoading } = useNFT(nft);
  if (metadata) {
    const url = `https://gateway.ipfs.io/ipfs/${metadata.image}/original.png`;

    return (
      <div className="flex flex-col">
        <Image
          src={url}
          width={200}
          height={200}
          className={"w-full"}
          alt={metadata.name}
        />
        <p>{metadata.name}</p>
        <div className={"flex"}></div>
        <a
          href={`/nft/${index}/original/`}
          className={
            "bg-customGreen-50 rounded-full px-4 h-10 font-light text-center align-center cursor-pointer"
          }
        >
          Buy NFT
        </a>
      </div>
    );
  }
};
