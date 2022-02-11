import { gql, useQuery } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";
import styled from "styled-components";
import CoffeeShop from "../components/home/CoffeeShop";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";
import { SHOP_DETAIL_FRAGMENT } from "../fragments";

export const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      ...ShopDetailFragment
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const Container = styled.div``;

const Title = styled.div`
  color: ${(props) => props.theme.accent};
  font-size: 1.5rem;
`;

const Home = () => {
  const { data, loading, fetchMore } = useQuery<
    seeCoffeeShops,
    seeCoffeeShopsVariables
  >(SEE_COFFEE_SHOPS_QUERY);

  const dataLength = data?.seeCoffeeShops?.length ?? 0;

  const moreFetch = async (lastId: number) => {
    await fetchMore({
      variables: {
        lastId,
      },
    });
  };

  return loading ? (
    <Loading size={6} screen={true} />
  ) : (
    <Container>
      <PageTitle title="홈" />
      <Title>찐 개발자들의 추천 카페</Title>
      <InfiniteScroll
        dataLength={dataLength}
        next={() =>
          data?.seeCoffeeShops &&
          moreFetch(data.seeCoffeeShops[dataLength - 1]?.id!)
        }
        hasMore={true}
        loader={null}
      >
        {data?.seeCoffeeShops?.map((shop) =>
          shop ? <CoffeeShop key={shop.id} {...shop} /> : null
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default Home;
