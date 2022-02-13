/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoffeeShopCache
// ====================================================

export interface CoffeeShopCache_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface CoffeeShopCache_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface CoffeeShopCache_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface CoffeeShopCache {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (CoffeeShopCache_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: CoffeeShopCache_categories[];
  user: CoffeeShopCache_user;
  averageRating: number;
}
