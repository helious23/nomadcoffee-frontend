/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShopDetailFragment
// ====================================================

export interface ShopDetailFragment_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
  id: number;
}

export interface ShopDetailFragment_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface ShopDetailFragment_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface ShopDetailFragment {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (ShopDetailFragment_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: ShopDetailFragment_categories[];
  user: ShopDetailFragment_user;
  averageRating: number;
}
