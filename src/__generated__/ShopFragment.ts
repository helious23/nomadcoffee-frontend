/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShopFragment
// ====================================================

export interface ShopFragment_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface ShopFragment {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (ShopFragment_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}
