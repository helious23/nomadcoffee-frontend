/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchShops
// ====================================================

export interface searchShops_searchShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
  id: number;
}

export interface searchShops_searchShops_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface searchShops_searchShops_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface searchShops_searchShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (searchShops_searchShops_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: searchShops_searchShops_categories[];
  user: searchShops_searchShops_user;
  averageRating: number;
}

export interface searchShops {
  searchShops: (searchShops_searchShops | null)[] | null;
}

export interface searchShopsVariables {
  keyword: string;
  lastId?: number | null;
}
