/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me {
  __typename: "User";
  username: string;
  avatarURL: string | null;
  name: string;
  email: string;
  location: string | null;
  githubUsername: string | null;
}

export interface me {
  me: me_me | null;
}
