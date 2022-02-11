/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCoffeeShopPhoto
// ====================================================

export interface deleteCoffeeShopPhoto_deleteCoffeeShopPhoto {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface deleteCoffeeShopPhoto {
  deleteCoffeeShopPhoto: deleteCoffeeShopPhoto_deleteCoffeeShopPhoto;
}

export interface deleteCoffeeShopPhotoVariables {
  id: number;
}
