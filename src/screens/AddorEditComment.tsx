import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useMe } from "../hooks/useMe";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../components/auth/Button";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh, faMeh, faSmile } from "@fortawesome/free-regular-svg-icons";
import { gql, useMutation } from "@apollo/client";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import { scrollVar } from "../apollo";
import ConfirmNotice from "../components/ConfirmNotice";
import { useHistory } from "react-router";

const CREATE_COMMENT = gql`
  mutation createComment($shopId: Int!, $payload: String!, $rating: Int!) {
    createComment(shopId: $shopId, payload: $payload, rating: $rating) {
      ok
      error
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
  z-index: 10;
  line-height: 1.5rem;
  white-space: pre-wrap;
`;

const TextPlaceholder = styled.div<{ invisible: boolean }>`
  position: absolute;
  display: ${(props) => (props.invisible ? "none" : "block")};
  top: 8.5rem;
  left: 1.1rem;
  font-size: 1rem;
  color: ${(props) => props.theme.borderColor};
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
}

interface IFormProps {
  payload: string;
}
interface IParamsProps {
  shopId: string;
}

const Comment = () => {
  const { state } = useLocation<ILocationProps>();
  const { shopId } = useParams<IParamsProps>();
  const { data: userData } = useMe();
  const [rating, setRating] = useState(5);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
    scrollVar(true);
  };
  const handleClose = () => {
    setOpen(false);
    scrollVar(false);
  };

  const { handleSubmit, formState, register, getValues } =
    useForm<IFormProps>();

  const [currentValue, setCurrentValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register("payload", { required: true });

  const onRatingClick = (value: number) => {
    setRating(value);
  };

  const onCompleted = () => {
    alert("리뷰가 작성 되었습니다.");
    history.goBack();
  };

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT, {
    onCompleted,
  });

  const onValid: SubmitHandler<IFormProps> = () => {
    handleOpen();
  };

  const mutationTrigger = () => {
    handleClose();
    const payload = getValues("payload");
    if (loading) return;
    createCommentMutation({
      variables: {
        payload,
        rating,
        shopId: +shopId,
      },
    });
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
      <PageTitle title={`${state?.shopName} 리뷰 쓰기`} />
      <Form onSubmit={handleSubmit(onValid)}>
        <Title htmlFor="payload">
          <ShopName>{state?.shopName}</ShopName>
          <Subtitle>에 대한 솔직한 리뷰를 써주세요.</Subtitle>
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
        />
        <RatingContainer>
          <FaceContainer>
            <Rating
              onClick={() => onRatingClick(5)}
              clicked={Boolean(rating === 5)}
            >
              <FontAwesomeIcon icon={faLaugh} />
              <div>맛있다</div>
            </Rating>
            <Rating
              onClick={() => onRatingClick(4)}
              clicked={Boolean(rating === 4)}
            >
              <FontAwesomeIcon icon={faSmile} />
              <div>괜찮다</div>
            </Rating>
            <Rating
              onClick={() => onRatingClick(3)}
              clicked={Boolean(rating === 3)}
            >
              <FontAwesomeIcon icon={faMeh} />
              <div>별로에요</div>
            </Rating>
          </FaceContainer>
        </RatingContainer>
        <TextPlaceholder invisible={Boolean(currentValue)}>
          {userData?.me?.username} 님, 주문하신 메뉴는 어떠셨나요? 카페의
          분위기와 메뉴도 궁금해요!
        </TextPlaceholder>
        <CountCountainer>
          <TextCount> {currentValue.length} / 1000</TextCount>
        </CountCountainer>
        <Button
          canClick={!Boolean(currentValue)}
          loading={loading}
          actionText={"리뷰 올리기"}
        />
      </Form>
      {open ? (
        <ConfirmNotice
          handleClose={handleClose}
          mutationTrigger={mutationTrigger}
          title={"리뷰 작성"}
          text={`리뷰를 작성 하시겠습니까?`}
        />
      ) : null}
    </Container>
  );
};

export default Comment;
