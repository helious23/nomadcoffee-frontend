import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { COMMENT_FRAGMENT } from "../../fragments";
import { seeCoffeeShops_seeCoffeeShops } from "../../__generated__/seeCoffeeShops";
import {
  seeCoffeeShopComments,
  seeCoffeeShopCommentsVariables,
} from "../../__generated__/seeCoffeeShopComments";
import Comment from "./Comment";
import Loading from "../Loading";

const SEE_COFFEE_SHOP_COMMENTS = gql`
  query seeCoffeeShopComments($id: Int!, $lastId: Int) {
    seeCoffeeShopComments(id: $id, lastId: $lastId) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

const CommentsContainer = styled.div`
  margin-top: 2rem;
`;

const CommentContents = styled.div``;

const TitleContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;
const Title = styled.div``;
const ReviewNumber = styled.div`
  margin-left: 0.2rem;
  color: ${(props) => props.theme.textGrey};
  font-weight: 500;
`;

const Comments: React.FC<seeCoffeeShops_seeCoffeeShops> = ({
  id,
  commentNumber,
}) => {
  const { data, loading } = useQuery<
    seeCoffeeShopComments,
    seeCoffeeShopCommentsVariables
  >(SEE_COFFEE_SHOP_COMMENTS, {
    variables: {
      id,
    },
  });

  console.log(data);
  return loading ? (
    <Loading screen={false} size={4} />
  ) : (
    <CommentsContainer>
      <CommentContents>
        <TitleContainer>
          <Title>리뷰</Title>
          <ReviewNumber>({commentNumber})</ReviewNumber>
        </TitleContainer>
        {data?.seeCoffeeShopComments?.map(
          (comment) => comment && <Comment key={comment.id} {...comment} />
        )}
      </CommentContents>
    </CommentsContainer>
  );
};

export default Comments;
