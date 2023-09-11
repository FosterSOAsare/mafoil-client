import { StaticImageData } from "next/image";

export type productType = {
  name: string;
  price: number;
  rating: number;
  totalRatings: number;
  author: string;
  description?: string;
  id: string;
  images: StaticImageData[];
  slugName: string;
  type: 'cloth' | 'bag' | 'accessories' | 'shoe'
}