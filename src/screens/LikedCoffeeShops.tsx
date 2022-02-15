import styled from "styled-components";
import { Title } from "../components/shared";
import PageTitle from "../components/PageTitle";
import CoffeeShop from "../components/home/CoffeeShop";
import { useMe } from "../hooks/useMe";

const Container = styled.div`
  margin-top: 5rem;
`;

const ShopContainer = styled.div``;

const LikedCoffeeShops = () => {
  const { data } = useMe();

  return (
    <Container>
      <PageTitle title="위시 리스트" />
      <Title>가고 싶은 카페</Title>
      <ShopContainer>
        {data?.me?.likedShops?.map(
          (shop) => shop && <CoffeeShop key={shop.slug} {...shop} />
        )}
      </ShopContainer>
    </Container>
  );
};

export default LikedCoffeeShops;
