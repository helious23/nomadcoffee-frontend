/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
  id: number;
}

export interface seeCoffeeShops_seeCoffeeShops_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface seeCoffeeShops_seeCoffeeShops_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (seeCoffeeShops_seeCoffeeShops_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: seeCoffeeShops_seeCoffeeShops_categories[];
  user: seeCoffeeShops_seeCoffeeShops_user;
  averageRating: number;
}

export interface seeCoffeeShops {
  seeCoffeeShops: (seeCoffeeShops_seeCoffeeShops | null)[] | null;
}

export interface seeCoffeeShopsVariables {
  offset: number;
}
