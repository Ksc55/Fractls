export interface Asset {
    name: string;
    address?: string;
    available?: number;
    value: number;
}

export interface SocialLink {
    name: string;
    url: string;
}

export interface NFT  {
    name: string;
    address: string;
    image: string;
    description: string
}
