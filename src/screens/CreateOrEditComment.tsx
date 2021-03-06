import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useMe } from "../hooks/useMe";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../components/auth/Button";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh, faMeh, faSmile } from "@fortawesome/free-regular-svg-icons";
import { gql, useMutation, useApolloClient, Reference } from "@apollo/client";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import { scrollVar } from "../apollo";
import ConfirmNotice from "../components/ConfirmNotice";
import { useHistory } from "react-router";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { ErrorOutput } from "../components/shared";
import FormError from "../components/auth/FormError";
import {
  editComment,
  editCommentVariables,
} from "../__generated__/editComment";
import routes from "../routes";
import { SEE_COFFEE_SHOP_QUERY } from "./ShopDetail";

const CREATE_COMMENT = gql`
  mutation createComment($shopId: Int!, $payload: String!, $rating: Int!) {
    createComment(shopId: $shopId, payload: $payload, rating: $rating) {
      ok
      error
      id
    }
  }
`;

const EDIT_COMMENT = gql`
  mutation editComment($id: Int!, $payload: String!, $rating: Int!) {
    editComment(id: $id, payload: $payload, rating: $rating) {
      ok
      error
      id
    }
  }
`;

const Container = styled.div`
  margin-top: 4.5rem;
  width: 100%;
`;

const Title = styled.label`
  width: 100%;
`;

const ShopName = styled.span`
  color: ${(props) => props.theme.accent};
  font-size: 1.8rem;
  margin-right: 0.3rem;
`;

const Subtitle = styled.span`
  color: ${(props) => props.theme.textGrey};
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TextArea = styled.textarea<{ hasError: boolean }>`
  all: unset;
  margin-top: 2rem;
  overflow: hidden;
  overflow-wrap: break-word;
  appearance: auto;
  padding: 4.5rem 1rem;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  border-radius: 3px;
  font-size: 1rem;
  z-index: 0;
  line-height: 1.5rem;
  white-space: pre-wrap;
  background-color: ${(props) => props.theme.boxBgColor};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: ${(props) => props.theme.borderColor};
  }
`;

const RatingContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 4rem;
  left: 1rem;
  height: 4rem;
  z-index: 10;
  width: 100%;
  color: ${(props) => props.theme.borderColor};
`;

const Rating = styled.div<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 1rem;
  color: ${(props) => (props.clicked ? props.theme.accent : "inherit")};
  cursor: pointer;
  svg {
    font-size: 2.5rem;
    margin-right: 0.5rem;
  }
`;

const FaceContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const CountCountainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 0.5rem;
`;

const TextCount = styled.div`
  color: ${(props) => props.theme.textGrey};
  font-weight: 300;
  font-size: 0.8rem;
`;

interface ILocationProps {
  shopName: string;
  edit: boolean;
  payload: string;
  rating: number;
  commentId: number;
}

interface IFormProps {
  payload: string;
  result?: string;
}
interface IParamsProps {
  shopId: string;
}

const CreateOrEditComment = () => {
  const client = useApolloClient();
  const { state } = useLocation<ILocationProps>();
  const { shopId } = useParams<IParamsProps>();
  const { data: userData } = useMe();
  const [rating, setRating] = useState(state?.rating || 5);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { handleSubmit, formState, register, getValues, setError, setValue } =
    useForm<IFormProps>();

  useEffect(() => {
    if (state?.edit) {
      setValue("payload", state?.payload);
      setCurrentValue(state?.payload);
    }
  }, [setValue, state?.edit, state?.payload]);

  const handleOpen = () => {
    setOpen(true);
    scrollVar(true);
  };
  const handleClose = () => {
    setOpen(false);
    scrollVar(false);
  };

  const [currentValue, setCurrentValue] = useState<string | undefined>(
    undefined
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register("payload", { required: true });

  const onRatingClick = (value: number) => {
    setRating(value);
  };

  const updateCommentCache = (id: number) => {
    const { cache } = client;
    const payload = getValues("payload");
    const queryResult = client.readQuery({
      query: SEE_COFFEE_SHOP_QUERY,
      variables: {
        id: +shopId,
      },
    });

    if (queryResult) {
      client.writeQuery({
        query: SEE_COFFEE_SHOP_QUERY,
        variables: {
          id: +shopId,
        },
        data: {
          seeCoffeeShop: {
            ...queryResult.seeCoffeeShop,
            averageRating: +(
              (queryResult.seeCoffeeShop.averageRating *
                queryResult.seeCoffeeShop.commentNumber +
                rating) /
              (queryResult.seeCoffeeShop.commentNumber + 1)
            ).toFixed(2),
          },
        },
      });
    }
    const newComment = {
      __typename: "Comment",
      id,
      createdAt: Date.now() + "",
      payload: payload,
      isMine: true,
      rating,
      shop: {
        __ref: `CoffeeShop:${shopId}`,
      },
      user: {
        __typename: "User",
        username: userData?.me?.username,
        avatarURL: userData?.me?.avatarURL,
      },
    };
    const newCacheComment = cache.writeFragment({
      fragment: gql`
        fragment CommentCache on Comment {
          id
          createdAt
          payload
          isMine
          rating
          shop
          user {
            username
            avatarURL
          }
        }
      `,
      data: newComment,
    });
    cache.modify({
      id: "ROOT_QUERY",
      fields: {
        seeCoffeeShopComments(prev) {
          return [newCacheComment, ...prev];
        },
      },
    });
    cache.modify({
      id: `CoffeeShop:${shopId}`,
      fields: {
        comments(prev) {
          return [newCacheComment, ...prev];
        },
        commentNumber(prev) {
          return prev + 1;
        },
      },
    });
  };

  const onCompleted = (data: createComment) => {
    const {
      createComment: { ok, error, id },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    } else if (ok && id) {
      updateCommentCache(id);
      history.goBack();
    }
  };

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT, {
    onCompleted,
  });

  const updateEditCommentCache = (id: number) => {
    const { cache } = client;
    const queryResult = client.readQuery({
      query: SEE_COFFEE_SHOP_QUERY,
      variables: {
        id: +shopId,
      },
    });
    // console.log(queryResult);
    if (queryResult) {
      client.writeQuery({
        query: SEE_COFFEE_SHOP_QUERY,
        variables: {
          id: +shopId,
        },
        data: {
          seeCoffeeShop: {
            ...queryResult.seeCoffeeShop,
            averageRating: +(
              (queryResult.seeCoffeeShop.averageRating *
                queryResult.seeCoffeeShop.commentNumber -
                queryResult.seeCoffeeShop.averageRating +
                rating) /
              queryResult.seeCoffeeShop.commentNumber
            ).toFixed(2),
          },
        },
      });
    }
    const payload = getValues("payload");
    const editedComment = {
      __typename: "Comment",
      id,
      createdAt: Date.now() + "",
      payload: payload,
      isMine: true,
      rating,
      shop: {
        __ref: `CoffeeShop"${shopId}`,
      },
      user: {
        __typename: "User",
        username: userData?.me?.username,
        avatarURL: userData?.me?.avatarURL,
      },
    };
    const newEditedCommentCache = cache.writeFragment({
      fragment: gql`
        fragment CommentCache on Comment {
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
      `,
      data: editedComment,
    });
    cache.modify({
      id: "ROOT_QUERY",
      fields: {
        seeCoffeeShopComments: (prev: Reference[]) => {
          const remain = prev.filter(
            (comment) => comment.__ref !== `Comment:${id}`
          );
          return [newEditedCommentCache, ...remain];
        },
      },
    });
    cache.modify({
      id: `CoffeeShop:${shopId}`,
      fields: {
        seeCoffeeShopComments: (prev: Reference[]) => {
          const remain = prev.filter(
            (comment) => comment.__ref !== `Comment:${id}`
          );
          return [newEditedCommentCache, ...remain];
        },
      },
    });
  };

  const onEditComplete = (data: editComment) => {
    const {
      editComment: { ok, error, id },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    } else if (ok && id) {
      updateEditCommentCache(id);
      history.goBack();
    }
  };

  const [editCommentMutation, { loading: editLoading }] = useMutation<
    editComment,
    editCommentVariables
  >(EDIT_COMMENT, {
    onCompleted: onEditComplete,
  });

  const onValid: SubmitHandler<IFormProps> = () => {
    handleOpen();
  };

  const mutationTrigger = () => {
    handleClose();
    const payload = getValues("payload");
    if (loading || editLoading) return;
    if (state?.edit) {
      editCommentMutation({
        variables: {
          id: state?.commentId,
          payload,
          rating,
        },
      });
    } else {
      createCommentMutation({
        variables: {
          payload,
          rating,
          shopId: +shopId,
        },
      });
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "3rem";
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight > 256) {
        textareaRef.current.style.height = scrollHeight / 16 - 13 + "rem";
        textareaRef.current.scrollIntoView(true);
      }
    }
  }, [currentValue]);

  const onHeightChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCurrentValue(e.target.value);
  };

  return (
    <Container>
      {state?.shopName ? (
        <>
          <PageTitle title={`${state?.shopName} ?????? ??????`} />
          <Form onSubmit={handleSubmit(onValid)}>
            <Title htmlFor="payload">
              <ShopName>{state?.shopName}</ShopName>
              <Subtitle>??? ?????? ????????? ????????? ????????????.</Subtitle>
            </Title>
            <TextArea
              maxLength={1000}
              id="payload"
              {...rest}
              name="payload"
              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
              onChange={onHeightChange}
              hasError={Boolean(formState.errors.payload)}
              placeholder={`${userData?.me?.username} ???, ???????????? ????????? ???????????????? ????????? ???????????? ????????? ????????????!`}
            />
            <RatingContainer>
              <FaceContainer>
                <Rating
                  onClick={() => onRatingClick(5)}
                  clicked={Boolean(rating === 5)}
                >
                  <FontAwesomeIcon icon={faLaugh} />
                  <div>?????????</div>
                </Rating>
                <Rating
                  onClick={() => onRatingClick(4)}
                  clicked={Boolean(rating === 4)}
                >
                  <FontAwesomeIcon icon={faSmile} />
                  <div>?????????</div>
                </Rating>
                <Rating
                  onClick={() => onRatingClick(3)}
                  clicked={Boolean(rating === 3)}
                >
                  <FontAwesomeIcon icon={faMeh} />
                  <div>????????????</div>
                </Rating>
              </FaceContainer>
            </RatingContainer>
            <CountCountainer>
              <TextCount> {currentValue?.length || "0"} / 1000</TextCount>
            </CountCountainer>
            <ErrorOutput>
              <FormError message={formState?.errors?.result?.message} />
            </ErrorOutput>
            <Button
              canClick={!Boolean(currentValue)}
              loading={loading || editLoading}
              actionText={state?.edit ? "?????? ????????????" : "?????? ?????????"}
            />
          </Form>{" "}
        </>
      ) : (
        <>{history.push(routes.home)}</>
      )}
      {open ? (
        <ConfirmNotice
          handleClose={handleClose}
          mutationTrigger={mutationTrigger}
          title={state?.edit ? "?????? ??????" : "?????? ??????"}
          text={
            state?.edit
              ? `????????? ?????? ???????????????????`
              : `????????? ?????? ???????????????????`
          }
          iconName={faPencilAlt}
        />
      ) : null}
    </Container>
  );
};

export default CreateOrEditComment;
