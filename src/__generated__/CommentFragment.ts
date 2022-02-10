/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentFragment
// ====================================================

export interface CommentFragment_user {
  __typename: "User";
  username: string;
}

export interface CommentFragment {
  __typename: "Comment";
  id: number;
  createdAt: string;
  payload: string;
  isMine: boolean;
  user: CommentFragment_user;
}
