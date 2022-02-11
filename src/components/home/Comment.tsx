import styled from "styled-components";
import * as dateFns from "date-fns";
import { seeCoffeeShopComments_seeCoffeeShopComments } from "../../__generated__/seeCoffeeShopComments";
import Avatar from "../Avatar";

const CommentContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  padding: 2rem 1rem 4rem 1rem;
  :hover {
    background-color: ${(props) => props.theme.borderColor};
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10vw;
  justify-content: start;
  align-items: center;
`;
const UserName = styled.div`
  margin-top: 0.5rem;
`;

const DetailContainer = styled.div`
  width: 80vw;
  padding: 0 1rem;
`;
const Date = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textGrey};
`;
const Text = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  line-height: 1.5rem;
  word-break: keep-all;
`;
const Rating = styled.div`
  width: 10vw;
`;

const Comment: React.FC<seeCoffeeShopComments_seeCoffeeShopComments> = ({
  payload,
  user,
  createdAt,
  rating,
}) => {
  return (
    <CommentContainer>
      <UserContainer>
        <Avatar url={user.avatarURL} size={4} />
        <UserName>{user.username}</UserName>
      </UserContainer>
      <DetailContainer>
        <Date>{dateFns.format(+createdAt, "yyyy-MM-dd")}</Date>
        <Text>{payload}</Text>
      </DetailContainer>
      <Rating>{rating}</Rating>
    </CommentContainer>
  );
};

export default Comment;
