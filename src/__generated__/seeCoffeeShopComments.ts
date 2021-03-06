/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShopComments
// ====================================================

export interface seeCoffeeShopComments_seeCoffeeShopComments_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface seeCoffeeShopComments_seeCoffeeShopComments_shop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
}

export interface seeCoffeeShopComments_seeCoffeeShopComments {
  __typename: "Comment";
  id: number;
  createdAt: string;
  payload: string;
  isMine: boolean;
  rating: number;
  user: seeCoffeeShopComments_seeCoffeeShopComments_user;
  shop: seeCoffeeShopComments_seeCoffeeShopComments_shop;
}

export interface seeCoffeeShopComments {
  seeCoffeeShopComments: (seeCoffeeShopComments_seeCoffeeShopComments | null)[] | null;
}

export interface seeCoffeeShopCommentsVariables {
  id: number;
  lastId?: number | null;
}
