/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCoffeeShop
// ====================================================

export interface createCoffeeShop_createCoffeeShop_shop {
  __typename: "CoffeeShop";
  id: number;
}

export interface createCoffeeShop_createCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface createCoffeeShop_createCoffeeShop {
  __typename: "createCoffeeShopResult";
  ok: boolean;
  error: string | null;
  shop: createCoffeeShop_createCoffeeShop_shop | null;
  photos: (createCoffeeShop_createCoffeeShop_photos | null)[] | null;
}

export interface createCoffeeShop {
  createCoffeeShop: createCoffeeShop_createCoffeeShop;
}

export interface createCoffeeShopVariables {
  name: string;
  latitude: string;
  longitude: string;
  address?: string | null;
  description?: string | null;
  categories: (string | null)[];
  photos?: (any | null)[] | null;
}
