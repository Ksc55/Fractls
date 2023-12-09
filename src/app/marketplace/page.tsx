"use client";
import React from "react";
import { useContractRead, useContractReads } from "wagmi";
import NFTMarketplace from "@/NFTMarketplace.json";
import { useIsMounted } from "@/components/useIsMounted";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/progress";

function page() {
  const mounted = useIsMounted();
  const categories = [
    {
      name: "Pop Art",
    },
    { name: "Cubism" },
    { name: "Abstract" },
    { name: "Minimalism" },
    { name: "Modern Art" },
    { name: "Surrealism" },
    { name: "Contemporary" },
  ];
  const { data: NFTList = [], isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: NFTMarketplace.abi,
    functionName: "getAllNFTs",
  });

  const { data: NFTFractions = [], isError } = useContractReads({
    contracts: NFTList.flatMap((nft) =>
      nft.partIds.map((id) => {
        console.log(nft.tokenId.toString(), id);
        return {
          address: process.env.NEXT_PUBLIC_CONTRACT,
          abi: NFTMarketplace.abi,
          functionName: "getPartURI",
          args: [nft.tokenId, id],
        };
      })
    ),
  });
  return (
    <div className="relative bg-whitesmoke w-full overflow-hidden flex flex-col items-start justify-end pt-10 pb-[572px] box-border gap-[28px] text-left text-sm text-gray font-roboto">
      <div className=" shadow-[0px_0px_5px_rgba(0,_0,_0,_0.4)_inset] w-full h-[50px] flex flex-col items-center justify-center bg-[#e0e0e0]">
        <div className="w-full h-5 flex flex-row items-center justify-start gap-[14px] px-2">
          <div className="w-full h-5 flex flex-row items-center  justify-around">
            {categories.map((category, index) => (
              <div
                key={index + "category"}
                className="inline-flex justify-center items-center pr-[1.375rem] py-0 pl-6 rounded-full border border-[#121212] text-[#121212] font-['Roboto'] text-sm leading-[150%]"
              >
                <div className="relative leading-[150%]">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isLoading && mounted && (
        <div className="grid grid-cols-5 gap-10 w-full justify-center">
          {NFTFractions.map((_nft) => {
            const parentNFT = NFTList.find((nft) =>
              nft.partIds.includes(_nft.result.id)
            ).tokenId;
            return <NFTFractionCard nft={_nft} parentNFT={parentNFT} />;
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
        className="border-2 border-slate-950 relative overflow-hidden"
        style={{ width: "200px", height: "200px" }}
      >
        <Image src={url} layout="fill" objectFit="cover" alt={metadata.name} />
      </a>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress color="secondary" aria-label="Loading..." />
      </div>
    );
  }
};
