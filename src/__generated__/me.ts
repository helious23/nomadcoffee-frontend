/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_likedShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
  id: number;
}

export interface me_me_likedShops_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface me_me_likedShops_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface me_me_likedShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (me_me_likedShops_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: me_me_likedShops_categories[];
  user: me_me_likedShops_user;
  averageRating: number;
}

export interface me_me {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
  name: string;
  email: string;
  location: string | null;
  githubUsername: string | null;
  likedShops: (me_me_likedShops | null)[] | null;
}

export interface me {
  me: me_me | null;
}
