export interface AdImage {
  url: string;
  default: boolean;
}

export interface IAdOwner {
  name: string;
  email: string;
  idState: string;
}

export interface IAd {
  _id: string;
  title: string;
  price: number;
  priceNegotiable: boolean;
  description: string;
  views: number;
  status: boolean;
  idCategory: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  idState: string;
  adOwner: IAdOwner;
  images: [AdImage];
  defaultImg: AdImage;
}
