/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_shops_results_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeProfile_seeProfile_shops_results {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  slug: string;
  photos: (seeProfile_seeProfile_shops_results_photos | null)[] | null;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface seeProfile_seeProfile_shops {
  __typename: "MyShopResult";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  results: (seeProfile_seeProfile_shops_results | null)[] | null;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  name: string;
  username: string;
  location: string | null;
  avatarURL: string | null;
  githubUsername: string | null;
  totalShops: number;
  totalFollowing: number;
  totalFollowers: number;
  isFollowing: boolean;
  isMe: boolean;
  shops: seeProfile_seeProfile_shops;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
  page: number;
}
