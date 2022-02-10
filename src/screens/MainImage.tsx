import styled from "styled-components";
import mainImage from "../asset/main_cafe_image.jpeg";
import googlePlay from "../asset/google_play.png";
import appStore from "../asset/app_store.svg";
import { useReactiveVar } from "@apollo/client";
import { profileVar, onMenuClose } from "../apollo";

const Container = styled.div``;

const MainImg = styled.div`
  width: 100%;
  height: 60vh;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 1)
    ),
    url(${mainImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

const Title = styled.div``;
const SubTitle = styled.div`
  margin-top: 0.8rem;
`;

const MainSearch = styled.form`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 2.5rem;
  }
`;

const Icon = styled.svg`
  position: absolute;
  left: 2rem;
`;

const MainInput = styled.input`
  border: 2px solid ${(props) => props.theme.accent};
  background-color: #fff;
  font-size: 1rem;
  width: 35vw;
  padding: 1rem 5rem;
  border-radius: 2rem;
`;

const SearchBtn = styled.button`
  all: unset;
  position: absolute;
  text-align: center;
  right: 0;
  height: 3rem;
  width: 10vw;
  color: white;
  font-size: 1.3rem;
  background-color: ${(props) => props.theme.accent};
  border: 2px solid ${(props) => props.theme.accent};
  border-radius: 2rem;
`;

const StoreImage = styled.div`
  position: absolute;
  top: 50vh;
  right: 3rem;
  display: flex;
`;

const GooglePlay = styled.img`
  width: 11.5rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const AppStore = styled.img`
  width: 10rem;
  cursor: pointer;
`;

const MainImage = () => {
  const profileVisible = useReactiveVar(profileVar);
  return (
    <Container onClick={() => onMenuClose(profileVisible)}>
      <MainImg>
        <MainTitle>
          <Title>개발자들의 믿을 수 있는 솔직한 리뷰!</Title>
          <SubTitle>노마드 커피</SubTitle>
        </MainTitle>
        <MainSearch>
          <Icon
            fill="rgba(0,0,0,0.2)"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </Icon>
          <MainInput type="text" placeholder="지역, 카페 이름 또는 카테고리" />
          <SearchBtn>검색</SearchBtn>
        </MainSearch>
      </MainImg>

      <StoreImage>
        <GooglePlay src={googlePlay} />
        <AppStore src={appStore} />
      </StoreImage>
    </Container>
  );
};

export default MainImage;
