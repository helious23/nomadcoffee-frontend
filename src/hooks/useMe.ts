import { useReactiveVar, gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "../__generated__/me";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatarURL
      name
      email
      location
      githubUsername
    }
  }
`;

export const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};
