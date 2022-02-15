import DaumMap from "../components/DaumMap";
import defaultImage from "../asset/default_cafe_img.jpeg";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import {
  gql,
  useQuery,
  useMutation,
  useApolloClient,
  Reference,
} from "@apollo/client";
import { SHOP_DETAIL_FRAGMENT } from "../fragments";
import {
  seeCoffeeShop,
  seeCoffeeShopVariables,
} from "../__generated__/seeCoffeeShop";
import Loading from "../components/Loading";
import Likes from "../components/Likes";
import { useState } from "react";
import { isLoggedInVar, scrollVar } from "../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPencilAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import LoginNotice from "../components/LoginNotice";
import { Category } from "../components/shared";
import routes from "../routes";
import { useHistory } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Comments from "../components/home/Comments";
import ConfirmNotice from "../components/ConfirmNotice";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  deleteCoffeeShop,
  deleteCoffeeShopVariables,
} from "../__generated__/deleteCoffeeShop";

const DELETE_COFFEE_SHOP = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

export const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!, $lastId: Int) {
    seeCoffeeShop(id: $id) {
      ...ShopDetailFragment
      comments(lastId: $lastId) {
        id
        user {
          username
          avatarURL
        }
        payload
        rating
        isMine
        createdAt
      }
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const Container = styled.div`
  margin-top: 2rem;
`;

const PhotoContainer = styled.div`
  height: 35vh;
  width: 100%;
  display: flex;
`;

interface IPhotoProps {
  url: string | null | undefined;
}

const Photo = styled(motion.div)<IPhotoProps>`
  width: 25vw;
  height: 100%;
  background-image: url(${(props) => (props.url ? props.url : defaultImage)});
  background-position: center;
  background-size: cover;
  margin: 0.2rem;
`;
const DetailContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
const InfoContainer = styled.div`
  width: 45vw;
  margin: 3rem 15vw;
`;
const InfoDetail = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.7rem;
`;

const Rating = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.accent};
  margin-left: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textGrey};
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-right: 2rem;
  svg {
    font-size: 2rem;
  }
`;

const Write = styled.div`
  margin-top: 1rem;
`;

const SmallIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textGrey};
`;

const Seperator = styled.div`
  width: 100%;
  margin: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Detail = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.div`
  color: ${(props) => props.theme.textGrey};
  width: 7rem;
`;
const Content = styled.div``;

const CommentNumber = styled.div``;

const LikeNumber = styled.div`
  margin-left: 0.5rem;
`;

const MapContainer = styled(motion.div)`
  width: 25vw;
  height: 25rem;
`;

interface IParamProps {
  shopId: string;
}

const ShopDetail = () => {
  const client = useApolloClient();
  const { shopId } = useParams<IParamProps>();
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const history = useHistory();
  const isLoggedIn = isLoggedInVar();

  const { data, loading } = useQuery<seeCoffeeShop, seeCoffeeShopVariables>(
    SEE_COFFEE_SHOP_QUERY,
    {
      variables: {
        id: +shopId,
      },
    }
  );

  const updateDeleteCache = () => {
    const { cache } = client;
    cache.evict({ id: `CoffeeShop:${shopId}` });
    cache.modify({
      id: "ROOT_QUERY",
      fields: {
        seeCoffeeShops: (prev: Reference[]) =>
          prev.filter(
            (coffeeShop) => coffeeShop.__ref !== `CoffeeShop:${shopId}`
          ),
      },
    });
  };

  const onCompleted = (data: deleteCoffeeShop) => {
    const {
      deleteCoffeeShop: { ok, error },
    } = data;
    if (error) {
      console.log(error);
    } else if (ok) {
      updateDeleteCache();
      history.push(routes.home);
    }
  };

  const [deleteCoffeeShopMutation, { loading: deleteLoading }] = useMutation<
    deleteCoffeeShop,
    deleteCoffeeShopVariables
  >(DELETE_COFFEE_SHOP, {
    onCompleted,
  });

  const mutationTrigger = () => {
    handleClose("delete");
    deleteCoffeeShopMutation({
      variables: {
        id: +shopId,
      },
    });
  };

  const handleOpen = (value: "like" | "review" | "delete") => {
    switch (value) {
      case "like":
        setOpen(true);
        break;
      case "review":
        setReviewOpen(true);
        break;
      case "delete":
        setDeleteOpen(true);
        break;
    }
    scrollVar(true);
  };

  const handleClose = (value: "like" | "review" | "delete") => {
    switch (value) {
      case "like":
        setOpen(false);
        break;
      case "review":
        setReviewOpen(false);
        break;
      case "delete":
        setDeleteOpen(false);
        break;
    }
    scrollVar(false);
  };

  return loading || deleteLoading ? (
    <Loading size={6} screen={true} />
  ) : (
    <Container>
      {data?.seeCoffeeShop && (
        <>
          <PageTitle title={data.seeCoffeeShop.name} />
          <PhotoContainer>
            <AnimatePresence>
              {data.seeCoffeeShop.photos?.map((photo) => (
                <Photo
                  url={photo?.url}
                  key={photo?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1 },
                  }}
                />
              ))}
            </AnimatePresence>
          </PhotoContainer>
          <DetailContainer>
            <InfoContainer>
              <InfoDetail>
                <Header>
                  <TitleContainer>
                    <Title>{data.seeCoffeeShop.name}</Title>
                    <Rating>{data.seeCoffeeShop.averageRating}</Rating>
                  </TitleContainer>
                  <IconContainer>
                    {data.seeCoffeeShop.isMine ? (
                      <>
                        <Icon onClick={() => handleOpen("delete")}>
                          <FontAwesomeIcon icon={faMinus} />
                          <Write>카페 삭제</Write>
                        </Icon>
                        {deleteOpen ? (
                          <ConfirmNotice
                            handleClose={() => handleClose("delete")}
                            text={"정말 카페를 삭제하시겠습니까?"}
                            title={"카페 삭제"}
                            iconName={faTrashAlt}
                            mutationTrigger={mutationTrigger}
                          />
                        ) : null}
                        <Icon
                          onClick={() =>
                            history.push(routes.createCafe, {
                              shopId: data.seeCoffeeShop?.id,
                              name: data.seeCoffeeShop?.name,
                              latitude: data.seeCoffeeShop?.latitude,
                              longitude: data.seeCoffeeShop?.longitude,
                              address: data.seeCoffeeShop?.address,
                              photos: data.seeCoffeeShop?.photos,
                              categories: data.seeCoffeeShop?.categories,
                              description: data.seeCoffeeShop?.description,
                              edit: true,
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          <Write>정보 수정</Write>
                        </Icon>
                      </>
                    ) : null}
                    <Icon
                      onClick={
                        isLoggedIn
                          ? () => {
                              history.push(
                                `/comment/${data.seeCoffeeShop?.id}`,
                                {
                                  shopName: data.seeCoffeeShop?.name,
                                }
                              );
                            }
                          : () => handleOpen("review")
                      }
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                      <Write>리뷰 쓰기</Write>
                    </Icon>
                    {reviewOpen ? (
                      <LoginNotice
                        handleClose={() => handleClose("review")}
                        text={`이 카페의 리뷰를`}
                        text2={"작성할 수 있어요"}
                      />
                    ) : null}
                    <Likes
                      handleOpen={() => handleOpen("like")}
                      id={data.seeCoffeeShop.id}
                      isLiked={data.seeCoffeeShop.isLiked}
                    />
                    {open ? (
                      <LoginNotice
                        handleClose={() => handleClose("like")}
                        text={`가고 싶은 카페를`}
                        text2={"저장할 수 있어요"}
                      />
                    ) : null}
                  </IconContainer>
                </Header>
                <SmallIcon>
                  <CommentNumber>
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <span> {data.seeCoffeeShop.commentNumber}</span>
                  </CommentNumber>
                  <LikeNumber>
                    <FontAwesomeIcon icon={SolidStar} />
                    <span> {data.seeCoffeeShop.likes}</span>
                  </LikeNumber>
                </SmallIcon>
                <Seperator />
                <Detail>
                  <Label>주소</Label>
                  <Content>{data.seeCoffeeShop.address}</Content>
                </Detail>
                <Detail>
                  <Label>소개</Label>
                  <Content>{data.seeCoffeeShop.description}</Content>
                </Detail>

                <Detail>
                  <Label>카테고리</Label>
                  {data.seeCoffeeShop.categories.map((category) => (
                    <Category
                      onClick={() => history.push(`/category/${category.slug}`)}
                      key={category.slug}
                    >
                      # {category.name}
                    </Category>
                  ))}
                </Detail>
              </InfoDetail>
              <Seperator />
              <Comments {...data.seeCoffeeShop} />
            </InfoContainer>
            <AnimatePresence>
              <MapContainer
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              >
                <DaumMap
                  title={data.seeCoffeeShop.name}
                  latitude={data.seeCoffeeShop.latitude}
                  longitude={data.seeCoffeeShop.longitude}
                  id={data.seeCoffeeShop.id}
                />
              </MapContainer>
            </AnimatePresence>
          </DetailContainer>
        </>
      )}
    </Container>
  );
};

export default ShopDetail;
