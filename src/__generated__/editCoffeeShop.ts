/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editCoffeeShop
// ====================================================

export interface editCoffeeShop_editCoffeeShop_shop {
  __typename: "CoffeeShop";
  id: number;
}

export interface editCoffeeShop_editCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface editCoffeeShop_editCoffeeShop {
  __typename: "EditCoffeeShopResult";
  ok: boolean;
  error: string | null;
  shop: editCoffeeShop_editCoffeeShop_shop | null;
  photos: (editCoffeeShop_editCoffeeShop_photos | null)[] | null;
}

export interface editCoffeeShop {
  editCoffeeShop: editCoffeeShop_editCoffeeShop;
}

export interface editCoffeeShopVariables {
  id: number;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  description?: string | null;
  categories?: (string | null)[] | null;
  photos?: (any | null)[] | null;
}
