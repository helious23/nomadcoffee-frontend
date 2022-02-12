/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editProfile
// ====================================================

export interface editProfile_editProfile {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
  avatarURL: string | null;
}

export interface editProfile {
  editProfile: editProfile_editProfile;
}

export interface editProfileVariables {
  username?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  location?: string | null;
  avatarURL?: any | null;
  githubUsername?: string | null;
}
