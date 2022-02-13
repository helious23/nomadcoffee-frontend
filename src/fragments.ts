import { gql } from "@apollo/client";

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
    slug
    photos {
      url
    }
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    createdAt
    payload
    isMine
    rating
    user {
      username
      avatarURL
    }
  }
`;

export const SHOP_DETAIL_FRAGMENT = gql`
  fragment ShopDetailFragment on CoffeeShop {
    ...ShopFragment
    isMine
    address
    description
    categories {
      name
      slug
    }
    user {
      id
      username
      avatarURL
    }
    averageRating
    photos {
      id
      url
    }
  }
  ${SHOP_FRAGMENT}
`;
