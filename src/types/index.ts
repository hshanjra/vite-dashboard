import { ProductCondition } from "@/constants";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: Array<string>;
  isEmailVerified: boolean;
  merchantVerificationStatus: string | null;
  merchantAccountStatus: string | null;
}

export type Metadata = {
  make: string;
  models: {
    name: string;
    subModels: string[];
  }[];
  years: number[];
};

export type Product = {
  id: string;
  productId: string;
  title: string;
  slug: string;
  brand: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  keywords: string;
  partNumber: string;
  sku: string;
  dimensions: {
    length: number;
    height: number;
    width: number;
    weight: number;
  };
  isActive: boolean;
  isGenericProduct: boolean;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
  }>;
  availableStock: number;
  limitOrder: number;
  minimumOrderQty: number;
  regularPrice: number;
  salePrice: number;
  shippingPrice: number;
  images: {
    url: string;
    alt: string;
  }[];
  condition: ProductCondition;
  salesCount: number;
  addedToCartCount: number;
  reviewsCount: number;
  averageRating: number;
  createdAt: Date;
  attributesId: string;
  compatibleMake?: string;
  compatibleModels?: Array<string>;
  compatibleSubModels?: Array<string>;
  compatibleTrim?: Array<string>;
  compatibleYears?: Array<number>;
  seller?: {
    id: string;
    storeName: string;
    storeSlug: string;
    storeLogoURL: string;
    dispatchFrequency: number;
    contactEmail: string;
    contactPhone: string | number;
    merchantAccountStatus: string | null;
    aboutStore: string;
    shippingPolicyTerms: string;
    returnPolicyTerms: string;
    memberSince: Date;
    averageRating: number;
    ratingsCount: number;
  };
};

export type Category = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  parent: string | null;
  categoryThumbnail: string;
  categorySlug: string;
  categoryIcon: string;
  subcategories: Category[];
};
