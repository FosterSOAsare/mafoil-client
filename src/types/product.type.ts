import { StaticImageData } from "next/image";

export interface productType {
  name: string;
  price: number;
  store: string;
  short_desc?: string;
  long_desc?: string;
  _id: string;
  images: { url: string, public_id: string }[];
  slugname: string;
  category: 'cloth' | 'bag' | 'accessories' | 'shoe';
  purchased?: boolean;
  rating: {
    totalRatings: number,
    avgRating: number,
    accumulatedRating: number,
  }
}