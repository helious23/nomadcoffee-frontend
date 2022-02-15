import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  Reference,
  useMutation,
} from "@apollo/client";
import { toggleLike, toggleLikeVariables } from "../__generated__/toggleLike";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

const WannaGo = styled.div`
  margin-top: 1rem;
`;

const Like = styled.div`
  color: ${(props) => props.theme.textGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 2rem;
  }
`;

interface ILikesProps {
  id: number;
  handleOpen: () => void;
  isLiked: boolean;
}

const Likes: React.FC<ILikesProps> = ({ id, handleOpen, isLiked }) => {
  const isLoggedIn = isLoggedInVar();
  const { data: userData } = useMe();
  const updateToggleLike: MutationUpdaterFunction<
    toggleLike,
    toggleLikeVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        const cacheShopId = `CoffeeShop:${id}`;
        cache.modify({
          id: cacheShopId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev, { readField }) {
              if (readField("isLiked")) {
                return prev - 1;
              } else {
                return prev + 1;
              }
            },
          },
        });
        if (userData?.me) {
          cache.modify({
            id: `User:${userData.me.id}`,
            fields: {
              likedShops: (prev: Reference[]) => {
                if (prev.some((shop) => shop.__ref === cacheShopId)) {
                  return prev.filter((shop) => shop.__ref !== cacheShopId);
                } else {
                  return [{ __ref: cacheShopId }, ...prev];
                }
              },
            },
          });
        }
      }
    }
  };

  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <LinkContainer>
      <Like
        onClick={isLoggedIn ? () => toggleLikeMutation() : () => handleOpen()}
      >
        {loading ? (
          <Loading size={3} screen={false} />
        ) : (
          <StarContainer>
            <FontAwesomeIcon
              style={{ color: isLiked ? "#F2AE30" : "inherit" }}
              icon={isLiked ? SolidStar : faStar}
            />
            <WannaGo>가고싶다</WannaGo>
          </StarContainer>
        )}
      </Like>
    </LinkContainer>
  );
};

export default Likes;
