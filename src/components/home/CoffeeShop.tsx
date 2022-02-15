import styled from "styled-components";
import { seeCoffeeShops_seeCoffeeShops } from "../../__generated__/seeCoffeeShops";
import defaultImage from "../../asset/default_cafe_img.jpeg";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../Avatar";
import { Category, FatText } from "../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { scrollVar } from "../../apollo";
import LoginNotice from "../LoginNotice";
import { useState } from "react";
import Likes from "../Likes";
import { seeCategory_seeCategory } from "../../__generated__/seeCategory";


interface ICoffeeShopPhotoProps {
  url: string | null | undefined;
}

const Container = styled.div`
  margin: 3rem 0;
  width: 100%;
  display: flex;
`;

const PhotoContainer = styled(Link)`
  display: flex;
  align-items: center;
  width: 50%;
  border-radius: 1rem;
`;

const CoffeeShopPhoto = styled.div<ICoffeeShopPhotoProps>`
  background-image: url(${(props) => (props.url ? props.url : defaultImage)});
  background-position: center;
  background-size: cover;
  width: 30rem;
  height: 20rem;
  border-radius: 1rem;
`;

const ShopInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30%;
`;

const HeaderDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:30%;
`;

const UserLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
  svg {
    color: ${(props) => props.theme.textGrey};
  }
`;

const UserName = styled(FatText)`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.textGrey};
`;

const TitleDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(Link)`
  font-size: 2rem;
`;

const Rating = styled.div`
  color: ${(props) => props.theme.accent};
  font-size: 2rem;
  margin-left: 1rem;
`;

const Icons = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.accent};
`;

const CommentNumber = styled.div``;

const LikeNumber = styled.div`
  margin-left: 0.5rem;
`;

const AddressContainer = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
`;

const InfoDetail = styled.div`
  margin-top: 1.5rem;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Desc = styled.div`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.textGrey};
  height: max-content;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70%;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;
  height: 80%;
  width: 50%;
`;

const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MoreInfo = styled(Link)`
  margin-top: 1rem;
  color: ${(props) => props.theme.textGrey};
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const CoffeeShop: React.FC<seeCoffeeShops_seeCoffeeShops | seeCategory_seeCategory> = ({
  id,
  name,
  photos,
  categories,
  commentNumber,
  description,
  address,
  likes,
  averageRating,
  isLiked,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const history = useHistory()

  const handleOpen = () => {
    setOpen(true);
    scrollVar(true);
  };
  const handleClose = () => {
    setOpen(false);
    scrollVar(false);
  };

  return (
    <Container>
      <PhotoContainer to={`/shop/${id}`}>
        <CoffeeShopPhoto url={photos && photos[0]?.url} />
      </PhotoContainer>
      <ShopInfo>
        <InfoHeader>
          <HeaderDetail>
            <TitleDetail>
              <Title to={`/shop/${id}`}>{name}</Title>
              <Rating> {averageRating}</Rating>
            </TitleDetail>
            <AddressContainer>{address}</AddressContainer>
            <Icons>
              <CommentNumber>
                <FontAwesomeIcon icon={faPencilAlt} />
                <span> {commentNumber}</span>
              </CommentNumber>
              <LikeNumber>
                <FontAwesomeIcon icon={SolidStar} />
                <span> {likes}</span>
              </LikeNumber>
            </Icons>
          </HeaderDetail>
          <IconContainer>
            <Likes handleOpen={handleOpen} id={id} isLiked={isLiked} />
            <UserLink to={`/profile/${user.id}`}>
              <Avatar url={user.avatarURL} size={3} />
              <UserName>{user.username}</UserName>
            </UserLink>
          </IconContainer>
        </InfoHeader>
        <InfoDetail>
          <Desc>{description}</Desc>
          <DetailContainer>
            <CategoryContainer>
              {categories.slice(0, 3).map((category) => (
                <Category key={category.slug} onClick={() => history.push(`/category/${category.slug}`)}># {category.name}</Category>
              ))}
            </CategoryContainer>
            <MoreInfoContainer>
              {open ? (
                <LoginNotice
                  handleClose={handleClose}
                  text={`가고 싶은 식당을`}
                  text2={"저장할 수 있어요"}
                />
              ) : null}
              <MoreInfo to={`/shop/${id}`}>
                {name} 더보기 {">"}
              </MoreInfo>
            </MoreInfoContainer>
          </DetailContainer>
        </InfoDetail>
      </ShopInfo>
    </Container>
  );
};

export default CoffeeShop;
