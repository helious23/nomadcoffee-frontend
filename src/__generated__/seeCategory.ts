/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCategory
// ====================================================

export interface seeCategory_seeCategory_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
  id: number;
}

export interface seeCategory_seeCategory_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface seeCategory_seeCategory_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface seeCategory_seeCategory {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (seeCategory_seeCategory_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: seeCategory_seeCategory_categories[];
  user: seeCategory_seeCategory_user;
  averageRating: number;
}

export interface seeCategory {
  seeCategory: (seeCategory_seeCategory | null)[] | null;
}

export interface seeCategoryVariables {
  categoryName: string;
  page: number;
}
