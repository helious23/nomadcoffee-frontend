/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
  id: number;
}

export interface seeCoffeeShop_seeCoffeeShop_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface seeCoffeeShop_seeCoffeeShop_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShop_seeCoffeeShop_comments_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShop_seeCoffeeShop_comments {
  __typename: "Comment";
  user: seeCoffeeShop_seeCoffeeShop_comments_user;
  payload: string;
  rating: number;
  isMine: boolean;
  createdAt: string;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (seeCoffeeShop_seeCoffeeShop_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  isMine: boolean;
  address: string | null;
  description: string | null;
  categories: seeCoffeeShop_seeCoffeeShop_categories[];
  user: seeCoffeeShop_seeCoffeeShop_user;
  averageRating: number;
  comments: (seeCoffeeShop_seeCoffeeShop_comments | null)[] | null;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop | null;
}

export interface seeCoffeeShopVariables {
  id: number;
  lastId?: number | null;
}
