import styled from "styled-components";
import * as dateFns from "date-fns";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaugh,
  faSmile,
  faMeh,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faPen, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { seeCoffeeShopComments_seeCoffeeShopComments } from "../../__generated__/seeCoffeeShopComments";
import { useState } from "react";
import { scrollVar } from "../../apollo";
import ConfirmNotice from "../ConfirmNotice";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
import Loading from "../Loading";

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

const CommentContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 4rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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
  font-size: 0.9rem;
  font-weight: 500;
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
  svg {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  svg {
    font-size: 1rem;
    color: ${(props) => props.theme.textGrey};
    cursor: pointer;
    :not(:last-child) {
      margin-right: 1rem;
    }
    :hover {
      color: ${(props) => props.theme.accent};
    }
  }
`;

const Comment: React.FC<seeCoffeeShopComments_seeCoffeeShopComments> = ({
  id,
  payload,
  user,
  createdAt,
  rating,
  isMine,
  shop,
}) => {
  const client = useApolloClient();
  const history = useHistory();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpen = (value: "edit" | "delete") => {
    if (value === "edit") {
      setEditOpen(true);
    } else if (value === "delete") {
      setDeleteOpen(true);
    }
    scrollVar(true);
  };
  const handleClose = (value: "edit" | "delete") => {
    if (value === "edit") {
      setEditOpen(false);
    } else if (value === "delete") {
      setDeleteOpen(false);
    }
    scrollVar(false);
  };

  const goToEditComment = () => {
    scrollVar(false);
    history.push(`/comment/${shop.id}`, {
      payload,
      rating,
      commentId: id,
      shopName: shop.name,
      edit: true,
    });
  };

  const deleteCommentCacheUpdate = () => {
    const { cache } = client;
    cache.evict({ id: `Comment:${id}` });
    cache.modify({
      id: `CoffeeShop:${shop.id}`,
      fields: {
        commentNumber(prev) {
          return prev - 1;
        },
      },
    });
  };

  const onCompleted = (data: deleteComment) => {
    const {
      deleteComment: { ok },
    } = data;
    if (ok) {
      deleteCommentCacheUpdate();
    }
  };

  const [deleteCommentMutation, { loading }] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT, {
    onCompleted,
  });

  const deleteComment = () => {
    scrollVar(false);
    deleteCommentMutation({
      variables: {
        id,
      },
    });
  };

  const EditDeleteIcon = () => {
    if (isMine) {
      return (
        <IconContainer>
          <FontAwesomeIcon icon={faPen} onClick={() => handleOpen("edit")} />
          {loading ? (
            <Loading screen={false} size={1} />
          ) : (
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => handleOpen("delete")}
            />
          )}
        </IconContainer>
      );
    } else {
      return <></>;
    }
  };
  const showRating = (value: number) => {
    switch (value) {
      case 5:
        return (
          <Rating>
            <FontAwesomeIcon icon={faLaugh} />
            <div>맛있다</div>
            <EditDeleteIcon />
          </Rating>
        );
      case 4:
        return (
          <Rating>
            <FontAwesomeIcon icon={faSmile} />
            <div>괜찮다</div>
            <EditDeleteIcon />
          </Rating>
        );
      case 3:
        return (
          <Rating>
            <FontAwesomeIcon icon={faMeh} />
            <div>별로에요</div>
            <EditDeleteIcon />
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
      {editOpen && (
        <ConfirmNotice
          handleClose={() => handleClose("edit")}
          mutationTrigger={goToEditComment}
          title={"리뷰 수정"}
          text={`리뷰를 수정 하시겠습니까?`}
          iconName={faPencilAlt}
        />
      )}
      {deleteOpen && (
        <ConfirmNotice
          handleClose={() => handleClose("delete")}
          mutationTrigger={deleteComment}
          title={"리뷰 삭제"}
          text={`리뷰를 삭제 하시겠습니까?`}
          iconName={faTrashAlt}
        />
      )}
    </CommentContainer>
  );
};

export default Comment;
