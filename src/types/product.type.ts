import { StaticImageData } from "next/image";

export type productType = {
  name: string;
  price: number;
  rating: number;
  totalRatings: number;
  store: string;
  short_desc?: string;
  _id: string;
  images: { url: string, public_id: string }[];
  slugname: string;
  category: 'cloth' | 'bag' | 'accessories' | 'shoe';
  purchased?: boolean
}