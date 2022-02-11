import styled from "styled-components";
import * as dateFns from "date-fns";
import { seeCoffeeShopComments_seeCoffeeShopComments } from "../../__generated__/seeCoffeeShopComments";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh, faSmile, faMeh } from "@fortawesome/free-regular-svg-icons";

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
  white-space: pre-wrap;
`;
const RatingContainer = styled.div`
  width: 10vw;
  display: flex;
  height: 100%;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-right: 1rem;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  svg {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Comment: React.FC<seeCoffeeShopComments_seeCoffeeShopComments> = ({
  payload,
  user,
  createdAt,
  rating,
}) => {
  const showRating = (value: number) => {
    if (value === 5) {
      return (
        <Rating>
          <FontAwesomeIcon icon={faLaugh} />
          <div>맛있다</div>
        </Rating>
      );
    } else if (value === 4) {
      return (
        <Rating>
          <FontAwesomeIcon icon={faSmile} />
          <div>괜찮다</div>
        </Rating>
      );
    } else if (value === 3) {
      return (
        <Rating>
          <FontAwesomeIcon icon={faMeh} />
          <div>별로에요</div>
        </Rating>
      );
    }
  };
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
      <RatingContainer>{showRating(rating)}</RatingContainer>
    </CommentContainer>
  );
};

export default Comment;
